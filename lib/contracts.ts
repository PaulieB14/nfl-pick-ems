import { createPublicClient, http, parseAbi, createWalletClient, custom } from 'viem'
import { base, baseSepolia } from 'wagmi/chains'

// Contract addresses (updated with your deployed contract)
export const CONTRACT_ADDRESSES = {
  NFL_PICK_EMS: '0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06', // Your deployed contract address
  BASE_CHAIN_ID: 8453,
  BASE_SEPOLIA_CHAIN_ID: 84532
}

// Contract ABIs - these are the actual functions from your smart contract
export const NFL_PICK_EMS_ABI = parseAbi([
  'function submitPicks(uint8 week, uint256 picks) external payable',
  'function getPlayerPicks(address player, uint8 week) external view returns (uint256)',
  'function getWeekStatus(uint8 week) external view returns (uint8)',
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
  submitPicks(week: number, picks: string[], entryFee: string): Promise<{ success: boolean; hash: string }>
  getPlayerPicks(playerAddress: string, week: number): Promise<bigint>
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

  async submitPicks(week: number, picks: string[], entryFee: string): Promise<{ success: boolean; hash: string }> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not available')
      }

      // Convert picks array to bitmask format
      const picksBitmask = this.convertPicksToBitmask(picks)
      
      // Convert entry fee to wei (assuming $2 USDC = 0.002 ETH for now)
      const entryFeeWei = BigInt(2000000000000000) // 0.002 ETH in wei

      console.log('Submitting picks with real contract call:', {
        week,
        picks,
        picksBitmask: picksBitmask.toString(),
        entryFeeWei: entryFeeWei.toString()
      })

      // Call the smart contract
      const { request } = await this.publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'submitPicks',
        args: [week, picksBitmask],
        value: entryFeeWei,
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

  async getPlayerPicks(playerAddress: string, week: number): Promise<bigint> {
    try {
      const result = await this.publicClient.readContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getPlayerPicks',
        args: [playerAddress, week],
      })
      return result as bigint
    } catch (error) {
      console.error('Error getting player picks:', error)
      return BigInt(0)
    }
  }

  async getCurrentPot(week: number): Promise<bigint> {
    try {
      const result = await this.publicClient.readContract({
        address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getCurrentPot',
        args: [week],
      })
      return result as bigint
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
        functionName: 'getTotalPlayers',
        args: [week],
      })
      return result as bigint
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
      return BigInt(2000000000000000) // 0.002 ETH in wei as fallback
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
  async submitPicks(week: number, picks: string[], entryFee: string) {
    console.log('Mock: Would submit picks:', { week, picks, entryFee })
    return { success: true, hash: '0x...' }
  }

  async getPlayerPicks(playerAddress: string, week: number) {
    console.log('Mock: Would get player picks:', { playerAddress, week })
    return BigInt(0)
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
    return BigInt(2000000000000000) // 0.002 ETH in wei
  }
}
