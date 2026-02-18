import { createPublicClient, http, parseAbi, createWalletClient, custom } from 'viem'
import { base } from 'wagmi/chains'

// Contract addresses — update NFL_PICK_EMS after redeployment
export const CONTRACT_ADDRESSES = {
  NFL_PICK_EMS: '0x0652Fb04BC3aE381088a5a0A2D1924EfA38D4be7',
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Real Base mainnet USDC
  BASE_CHAIN_ID: 8453,
}

// USDC Token ABI (ERC20)
export const USDC_ABI = parseAbi([
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
])

// Contract ABI — player + oracle + view functions
export const NFL_PICK_EMS_ABI = parseAbi([
  // Player functions
  'function enter(uint256 weekId, uint256 mask) external',
  'function claim(uint256 weekId) external',
  // Oracle functions
  'function createWeek(uint256 weekId, uint8 gameCount, uint64 lockTime) external',
  'function addGame(uint256 weekId, uint8 gameIndex, uint64 startTime) external',
  'function markGameStarted(uint256 weekId, uint8 gameIndex) external',
  'function updateGameScore(uint256 weekId, uint8 gameIndex, uint8 homeScore, uint8 awayScore, bool finished) external',
  'function postResults(uint256 weekId, uint256 winnersMask) external',
  'function finalizeWinners(uint256 weekId) external',
  'function sweepRemainder(uint256 weekId, address to) external',
  // Owner functions
  'function setOracle(address _oracle) external',
  'function emergencyPauseWeek(uint256 weekId) external',
  'function emergencyUnpauseWeek(uint256 weekId, uint64 newLockTime) external',
  // View functions
  'function getPlayerPicks(uint256 weekId, address player) external view returns (uint256 playerPicksMask, uint256 playerCorrectPicks, bool playerIsWinner, bool playerClaimed)',
  'function getWeekInfo(uint256 weekId) external view returns (uint8 gameCount, uint64 lockTime, bool resultsSet, bool finalized, uint256 pot, uint256 totalEntrants, uint64 lastOracleUpdate)',
  'function getGameInfo(uint256 weekId, uint8 gameIndex) external view returns (uint64 startTime, bool started, bool availableForPicks, bool finished, uint8 homeScore, uint8 awayScore)',
  'function ENTRY_FEE() external view returns (uint256)',
  'function oracle() external view returns (address)',
  'function token() external view returns (address)',
  'function picksMask(uint256 weekId, address player) external view returns (uint256)',
  'function isWinner(uint256 weekId, address player) external view returns (bool)',
  'function claimed(uint256 weekId, address player) external view returns (bool)',
  'function correctPicks(uint256 weekId, address player) external view returns (uint256)',
])

// Create public client for reading from contract
export const publicClient = createPublicClient({
  chain: base,
  transport: http()
})

// Contract interface
export interface NFLPickEmsContract {
  submitPicks(week: number, picks: string[]): Promise<{ success: boolean; hash: string }>
  getPlayerPicks(playerAddress: string, week: number): Promise<{ picksMask: bigint; correctPicks: bigint; isWinner: boolean; claimed: boolean }>
  getCurrentPot(week: number): Promise<bigint>
  getTotalPlayers(week: number): Promise<bigint>
  getEntryFee(): Promise<bigint>
}

// Real implementation using viem
export class RealNFLPickEmsContract implements NFLPickEmsContract {
  private walletClient: any
  private publicClient: any

  constructor(walletClient: any, publicClient: any) {
    this.walletClient = walletClient
    this.publicClient = publicClient
  }

  async submitPicks(week: number, picks: string[]): Promise<{ success: boolean; hash: string }> {
    if (!this.walletClient) {
      throw new Error('Wallet client not available')
    }

    const picksBitmask = this.convertPicksToBitmask(picks)
    const usdcAddress = CONTRACT_ADDRESSES.USDC as `0x${string}`
    const entryFee = BigInt(2000000) // $2 USDC (6 decimals)

    // Check USDC balance
    const usdcBalance = await this.publicClient.readContract({
      address: usdcAddress,
      abi: USDC_ABI,
      functionName: 'balanceOf',
      args: [this.walletClient.account.address],
    }) as bigint

    if (usdcBalance < entryFee) {
      throw new Error(`Insufficient USDC balance. You have ${Number(usdcBalance) / 1e6} USDC, but need 2 USDC to enter.`)
    }

    // Check/set USDC allowance
    const currentAllowance = await this.publicClient.readContract({
      address: usdcAddress,
      abi: USDC_ABI,
      functionName: 'allowance',
      args: [this.walletClient.account.address, CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`],
    }) as bigint

    if (currentAllowance < entryFee) {
      const approveRequest = await this.publicClient.simulateContract({
        address: usdcAddress,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`, entryFee],
        account: this.walletClient.account.address,
      })
      const approveHash = await this.walletClient.writeContract(approveRequest.request)
      await this.publicClient.waitForTransactionReceipt({ hash: approveHash })
    }

    // Submit picks
    const { request } = await this.publicClient.simulateContract({
      address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
      abi: NFL_PICK_EMS_ABI,
      functionName: 'enter',
      args: [week, picksBitmask],
      account: this.walletClient.account.address,
    })

    const hash = await this.walletClient.writeContract(request)
    await this.publicClient.waitForTransactionReceipt({ hash })

    return { success: true, hash }
  }

  private convertPicksToBitmask(picks: string[]): bigint {
    let bitmask = BigInt(0)
    picks.forEach((pick, gameIndex) => {
      if (pick === 'home') {
        bitmask |= BigInt(1) << BigInt(gameIndex)
      }
    })
    return bitmask
  }

  async getPlayerPicks(playerAddress: string, week: number): Promise<{ picksMask: bigint; correctPicks: bigint; isWinner: boolean; claimed: boolean }> {
    try {
      const result = await this.publicClient.readContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getPlayerPicks',
        args: [week, playerAddress],
      }) as [bigint, bigint, boolean, boolean]

      return {
        picksMask: result[0],
        correctPicks: result[1],
        isWinner: result[2],
        claimed: result[3]
      }
    } catch {
      return { picksMask: BigInt(0), correctPicks: BigInt(0), isWinner: false, claimed: false }
    }
  }

  async getCurrentPot(week: number): Promise<bigint> {
    try {
      const result = await this.publicClient.readContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getWeekInfo',
        args: [week],
      }) as [bigint, bigint, boolean, boolean, bigint, bigint, bigint]

      return result[4] // pot
    } catch {
      return BigInt(0)
    }
  }

  async getTotalPlayers(week: number): Promise<bigint> {
    try {
      const result = await this.publicClient.readContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getWeekInfo',
        args: [week],
      }) as [bigint, bigint, boolean, boolean, bigint, bigint, bigint]

      return result[5] // totalEntrants
    } catch {
      return BigInt(0)
    }
  }

  async getEntryFee(): Promise<bigint> {
    return BigInt(2000000)
  }
}

// Helper function to get contract instance
export function getNFLPickEmsContract(walletClient: any, client?: any): NFLPickEmsContract {
  const clientToUse = client || publicClient
  return new RealNFLPickEmsContract(walletClient, clientToUse)
}
