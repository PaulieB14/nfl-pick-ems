import { createPublicClient, http, parseAbi, createWalletClient, custom } from 'viem'
import { base, baseSepolia } from 'wagmi/chains'

// Contract addresses (updated with your deployed contract)
export const CONTRACT_ADDRESSES = {
  NFL_PICK_EMS: '0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06', // Your deployed contract address
  MOCK_USDC: '0xab83D7Da5C2752Bf7AcB5804bF81ac22C7A9034B', // Your deployed MockUSDC address
  BASE_CHAIN_ID: 8453,
  BASE_SEPOLIA_CHAIN_ID: 84532
}

// USDC Token ABI (ERC20)
export const USDC_ABI = parseAbi([
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)'
])

// Contract ABIs - these are the actual functions from your smart contract
export const NFL_PICK_EMS_ABI = parseAbi([
  'function enter(uint8 week, uint256 mask) external',
  'function getPlayerPicks(uint8 week, address player) external view returns (uint256 playerPicksMask, uint256 playerCorrectPicks, bool playerIsWinner, bool playerClaimed)',
  'function getWeekInfo(uint8 week) external view returns (uint8 gameCount, uint64 lockTime, bool resultsSet, bool finalized, uint256 pot, uint256 totalEntrants, uint64 lastOracleUpdate)',
  'function getEntryFee() external view returns (uint256)',
  'function getCurrentPot(uint8 week) external view returns (uint256)',
  'function getTotalPlayers(uint8 week) external view returns (uint256)'
])

// Create public client for reading from contract
export const publicClient = createPublicClient({
  chain: base,
  transport: http()
})

// Contract interface for now
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
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not available')
      }

      // Convert picks array to bitmask format
      const picksBitmask = this.convertPicksToBitmask(picks)
      
      console.log('Submitting picks with USDC entry fee:', {
        week,
        picks,
        picksBitmask: picksBitmask.toString(),
        entryFeeInUSDC: '$2 USDC'
      })

      // First, approve USDC spending
      const usdcAddress = CONTRACT_ADDRESSES.MOCK_USDC as `0x${string}`
      const entryFee = BigInt(2000000) // $2 USDC (6 decimals)
      
      // Check current allowance
      const currentAllowance = await this.publicClient.readContract({
        address: usdcAddress,
        abi: USDC_ABI,
        functionName: 'allowance',
        args: [this.walletClient.account.address, CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`],
      }) as bigint

      // If allowance is insufficient, approve
      if (currentAllowance < entryFee) {
        console.log('Approving USDC spending...')
        const approveRequest = await this.publicClient.simulateContract({
          address: usdcAddress,
          abi: USDC_ABI,
          functionName: 'approve',
          args: [CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`, entryFee],
          account: this.walletClient.account.address,
        })

        await this.walletClient.writeContract(approveRequest.request)
        console.log('USDC approval successful')
      }

      // Now call the smart contract's enter function
      const { request } = await this.publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'enter',
        args: [week, picksBitmask],
        account: this.walletClient.account.address,
      })

      const hash = await this.walletClient.writeContract(request)
      
      console.log('Transaction submitted successfully:', hash)
      
      return { success: true, hash }
    } catch (error) {
      console.error('Error submitting picks to contract:', error)
      throw error
    }
  }

  private convertPicksToBitmask(picks: string[]): bigint {
    let bitmask = BigInt(0)
    
    // Convert picks to bitmask format
    // This is a simplified conversion - you'll need to adjust based on your contract's expected format
    picks.forEach((pick, index) => {
      if (pick === 'home') {
        bitmask |= BigInt(1) << BigInt(index)
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
    } catch (error) {
      console.error('Error getting player picks:', error)
      return {
        picksMask: BigInt(0),
        correctPicks: BigInt(0),
        isWinner: false,
        claimed: false
      }
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
      
      return result[4] // pot is the 5th element
    } catch (error) {
      console.error('Error getting current pot:', error)
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
      
      return result[5] // totalEntrants is the 6th element
    } catch (error) {
      console.error('Error getting total players:', error)
      return BigInt(0)
    }
  }

  async getEntryFee(): Promise<bigint> {
    try {
      const result = await this.publicClient.readContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getEntryFee',
        args: [],
      })
      return result as bigint
    } catch (error) {
      console.error('Error getting entry fee:', error)
      return BigInt(2000000) // $2 USDC (6 decimals) as fallback
    }
  }
}

// Helper function to get contract instance
export function getNFLPickEmsContract(walletClient: any): NFLPickEmsContract {
  if (walletClient && publicClient) {
    return new RealNFLPickEmsContract(walletClient, publicClient)
  }
  
  // Fallback to mock if no wallet client
  console.warn('No wallet client available, using mock contract')
  return new MockNFLPickEmsContract()
}

// Keep mock implementation for fallback
export class MockNFLPickEmsContract implements NFLPickEmsContract {
  async submitPicks(week: number, picks: string[]) {
    console.log('Mock: Would submit picks:', { week, picks })
    return { success: true, hash: '0x...' }
  }

  async getPlayerPicks(playerAddress: string, week: number) {
    console.log('Mock: Would get player picks:', { playerAddress, week })
    return {
      picksMask: BigInt(0),
      correctPicks: BigInt(0),
      isWinner: false,
      claimed: false
    }
  }

  async getCurrentPot(week: number) {
    console.log('Mock: Would get current pot:', { week })
    return BigInt(0)
  }

  async getTotalPlayers(week: number) {
    console.log('Mock: Would get total players:', { week })
    return BigInt(0)
  }

  async getEntryFee() {
    console.log('Mock: Would get entry fee')
    return BigInt(2000000) // $2 USDC (6 decimals)
  }
}
