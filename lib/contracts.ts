import { ethers } from 'ethers'

// Contract addresses (updated with your deployed contract)
export const CONTRACT_ADDRESSES = {
  NFL_PICK_EMS: '0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06', // Your deployed contract address
  BASE_CHAIN_ID: 8453,
  BASE_SEPOLIA_CHAIN_ID: 84532
}

// Contract ABIs - these are the actual functions from your smart contract
export const NFL_PICK_EMS_ABI = [
  'function submitPicks(uint8 week, uint256 picks) external payable',
  'function getPlayerPicks(address player, uint8 week) external view returns (uint256)',
  'function getWeekStatus(uint8 week) external view returns (uint8)',
  'function getEntryFee() external view returns (uint256)',
  'function getCurrentPot(uint8 week) external view returns (uint256)',
  'function getTotalPlayers(uint8 week) external view returns (uint256)',
  'function getGame(uint8 week, uint8 gameIndex) external view returns (address, address, uint8, uint8, uint8)',
  'function getWeekGameCount(uint8 week) external view returns (uint8)',
  'function isWeekActive(uint8 week) external view returns (bool)',
  'function getPlayerBalance(address player) external view returns (uint256)',
  'function withdraw() external',
  'function pause() external',
  'function unpause() external',
  'function owner() external view returns (address)',
  'function paused() external view returns (bool)'
]

// Smart contract interaction class
export class NFLPickEmsContract {
  private provider: ethers.Provider
  private signer: ethers.Signer
  private contract: ethers.Contract

  constructor(provider: ethers.Provider, signer: ethers.Signer) {
    this.provider = provider
    this.signer = signer
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESSES.NFL_PICK_EMS,
      NFL_PICK_EMS_ABI,
      signer
    )
  }

  async submitPicks(week: number, picks: string[], entryFee: string) {
    try {
      // Convert picks to the format needed for smart contract
      const picksMask = this.convertPicksToMask(picks)
      
      console.log(`Submitting picks for week ${week}:`, {
        picks,
        picksMask: picksMask.toString(),
        entryFee
      })

      // Submit the transaction
      const tx = await this.contract.submitPicks(week, picksMask, {
        value: ethers.parseEther(entryFee)
      })

      console.log('Transaction submitted:', tx.hash)
      
      // Wait for confirmation
      const receipt = await tx.wait()
      console.log('Transaction confirmed:', receipt.hash)
      
      return {
        success: true,
        hash: tx.hash,
        receipt
      }
    } catch (error) {
      console.error('Error submitting picks:', error)
      throw error
    }
  }

  async getPlayerPicks(playerAddress: string, week: number) {
    try {
      const picksMask = await this.contract.getPlayerPicks(playerAddress, week)
      return this.convertMaskToPicks(picksMask)
    } catch (error) {
      console.error('Error getting player picks:', error)
      throw error
    }
  }

  async getCurrentPot(week: number) {
    try {
      const pot = await this.contract.getCurrentPot(week)
      return ethers.formatEther(pot)
    } catch (error) {
      console.error('Error getting current pot:', error)
      throw error
    }
  }

  async getTotalPlayers(week: number) {
    try {
      return await this.contract.getTotalPlayers(week)
    } catch (error) {
      console.error('Error getting total players:', error)
      throw error
    }
  }

  async getEntryFee() {
    try {
      const fee = await this.contract.getEntryFee()
      return ethers.formatEther(fee)
    } catch (error) {
      console.error('Error getting entry fee:', error)
      throw error
    }
  }

  async getWeekStatus(week: number) {
    try {
      const status = await this.contract.getWeekStatus(week)
      return Number(status)
    } catch (error) {
      console.error('Error getting week status:', error)
      throw error
    }
  }

  async isWeekActive(week: number) {
    try {
      return await this.contract.isWeekActive(week)
    } catch (error) {
      console.error('Error checking if week is active:', error)
      throw error
    }
  }

  // Convert picks array to bit mask for smart contract
  private convertPicksToMask(picks: string[]): bigint {
    let mask = BigInt(0)
    
    for (let i = 0; i < picks.length; i++) {
      if (picks[i] === 'home') {
        mask |= (BigInt(1) << BigInt(i))
      }
    }
    
    return mask
  }

  // Convert bit mask from smart contract to picks array
  private convertMaskToPicks(mask: bigint): string[] {
    const picks: string[] = []
    
    for (let i = 0; i < 10; i++) {
      if (mask & (BigInt(1) << BigInt(i))) {
        picks.push('home')
      } else {
        picks.push('away')
      }
    }
    
    return picks
  }
}

// Helper function to get contract instance
export function getNFLPickEmsContract(provider: ethers.Provider, signer: ethers.Signer): NFLPickEmsContract {
  return new NFLPickEmsContract(provider, signer)
}
