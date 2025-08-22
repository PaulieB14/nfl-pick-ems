import { ethers } from 'ethers'

// Contract addresses (you'll need to update these with your deployed contracts)
export const CONTRACT_ADDRESSES = {
  NFL_PICK_EMS: '0x...', // Your deployed contract address
  MOCK_USDC: '0x...',    // Your deployed MockUSDC address
  BASE_CHAIN_ID: 8453,
  BASE_SEPOLIA_CHAIN_ID: 84532
}

// Contract ABIs (simplified versions - you'll need the full ABIs)
export const NFL_PICK_EMS_ABI = [
  'function submitPicks(uint8 week, uint256 picks) external payable',
  'function getPlayerPicks(address player, uint8 week) external view returns (uint256)',
  'function getWeekStatus(uint8 week) external view returns (uint8)',
  'function getEntryFee() external view returns (uint256)',
  'function getCurrentPot(uint8 week) external view returns (uint256)',
  'function getTotalPlayers(uint8 week) external view returns (uint256)'
]

export const MOCK_USDC_ABI = [
  'function balanceOf(address account) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function decimals() external view returns (uint8)'
]

// Smart contract interaction functions
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

  // Submit picks for a specific week
  async submitPicks(week: number, picks: string[], entryFee: string) {
    try {
      // Convert picks array to bit mask
      const picksMask = this.convertPicksToMask(picks)
      
      // Submit picks with entry fee
      const tx = await this.contract.submitPicks(week, picksMask, {
        value: ethers.parseEther(entryFee)
      })
      
      console.log('Picks submitted, transaction hash:', tx.hash)
      return await tx.wait()
    } catch (error) {
      console.error('Error submitting picks:', error)
      throw error
    }
  }

  // Get player's picks for a specific week
  async getPlayerPicks(playerAddress: string, week: number) {
    try {
      const picks = await this.contract.getPlayerPicks(playerAddress, week)
      return this.convertMaskToPicks(picks)
    } catch (error) {
      console.error('Error getting player picks:', error)
      throw error
    }
  }

  // Get current pot for a week
  async getCurrentPot(week: number) {
    try {
      const pot = await this.contract.getCurrentPot(week)
      return ethers.formatEther(pot)
    } catch (error) {
      console.error('Error getting current pot:', error)
      throw error
    }
  }

  // Get total players for a week
  async getTotalPlayers(week: number) {
    try {
      const players = await this.contract.getTotalPlayers(week)
      return players.toString()
    } catch (error) {
      console.error('Error getting total players:', error)
      throw error
    }
  }

  // Get entry fee
  async getEntryFee() {
    try {
      const fee = await this.contract.getEntryFee()
      return ethers.formatEther(fee)
    } catch (error) {
      console.error('Error getting entry fee:', error)
      throw error
    }
  }

  // Convert picks array to bit mask for smart contract
  private convertPicksToMask(picks: string[]): bigint {
    let mask = BigInt(0)
    picks.forEach((pick, index) => {
      if (pick === 'home') {
        mask |= BigInt(1) << BigInt(index)
      }
    })
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

// Mock USDC contract interaction
export class MockUSDCContract {
  private provider: ethers.Provider
  private signer: ethers.Signer
  private contract: ethers.Contract

  constructor(provider: ethers.Provider, signer: ethers.Signer) {
    this.provider = provider
    this.signer = signer
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESSES.MOCK_USDC,
      MOCK_USDC_ABI,
      signer
    )
  }

  // Get USDC balance
  async getBalance(address: string) {
    try {
      const balance = await this.contract.balanceOf(address)
      const decimals = await this.contract.decimals()
      return ethers.formatUnits(balance, decimals)
    } catch (error) {
      console.error('Error getting USDC balance:', error)
      throw error
    }
  }

  // Approve spending
  async approve(spender: string, amount: string) {
    try {
      const decimals = await this.contract.decimals()
      const amountWei = ethers.parseUnits(amount, decimals)
      const tx = await this.contract.approve(spender, amountWei)
      return await tx.wait()
    } catch (error) {
      console.error('Error approving USDC:', error)
      throw error
    }
  }
}
