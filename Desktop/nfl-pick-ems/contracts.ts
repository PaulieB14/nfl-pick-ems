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
  'function symbol() external view returns (string)',
  'function mint(address to, uint256 amount) external'
])

// Contract ABIs - these are the actual functions from your smart contract
export const NFL_PICK_EMS_ABI = parseAbi([
  'function enter(uint8 week, uint256 mask) external payable',
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

      // First, check USDC balance
      const usdcAddress = CONTRACT_ADDRESSES.MOCK_USDC as `0x${string}`
      const entryFee = BigInt(2000000000000000) // $2 USDC (6 decimals)
      
      console.log('Checking USDC balance and allowance...')
      console.log('USDC Contract Address:', usdcAddress)
      console.log('User Wallet Address:', this.walletClient.account.address)
      
      // First, validate the USDC contract exists and has the right functions
      try {
        const usdcSymbol = await this.publicClient.readContract({
          address: usdcAddress,
          abi: USDC_ABI,
          functionName: 'symbol',
          args: [],
        }) as string
        
        console.log('USDC Contract Symbol:', usdcSymbol)
        
        if (usdcSymbol !== 'USDC') {
          throw new Error(`Contract at ${usdcAddress} is not USDC. Got symbol: ${usdcSymbol}`)
        }
      } catch (symbolError) {
        console.error('Error reading USDC symbol:', symbolError)
        throw new Error(`Failed to validate USDC contract at ${usdcAddress}. Please check if the contract address is correct and the contract is deployed.`)
      }
      
      // Check USDC balance
      let usdcBalance: bigint
      try {
        usdcBalance = await this.publicClient.readContract({
          address: usdcAddress,
          abi: USDC_ABI,
          functionName: 'balanceOf',
          args: [this.walletClient.account.address],
        }) as bigint
        
        console.log('USDC Balance:', usdcBalance.toString(), 'wei (', Number(usdcBalance) / 1e6, 'USDC)')
      } catch (balanceError) {
        console.error('Error reading USDC balance:', balanceError)
        console.log('USDC contract call failed, falling back to ETH entry fee...')
        
        // Fallback to ETH entry fee
        const ethEntryFee = BigInt(2000000000000000) // 0.002 ETH in wei
        console.log('Using ETH entry fee:', ethEntryFee.toString(), 'wei (0.002 ETH)')
        
        // Call the smart contract's enter function with ETH value
        console.log('Submitting picks to NFL Pick Ems contract with ETH...')
        
        try {
          const { request } = await this.publicClient.simulateContract({
            address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
            abi: NFL_PICK_EMS_ABI,
            functionName: 'enter',
            args: [week, picksBitmask],
            account: this.walletClient.account.address,
            value: ethEntryFee,
          })

          console.log('Contract simulation successful, submitting transaction...')
          const hash = await this.walletClient.writeContract(request)
          
          console.log('Transaction submitted successfully:', hash)
          
          // Wait for transaction to be mined
          console.log('Waiting for transaction to be mined...')
          const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
          console.log('Transaction mined successfully:', receipt)
          
          return { success: true, hash }
        } catch (contractError) {
          console.error('Error in contract call with ETH:', contractError)
          throw new Error(`Failed to submit picks with ETH fallback: ${contractError instanceof Error ? contractError.message : 'Unknown error'}`)
        }
      }
      
      if (usdcBalance < entryFee) {
        console.log('Insufficient USDC balance, attempting to mint tokens...')
        
        try {
          // Try to mint some USDC (this will only work if the user is the contract owner)
          const mintAmount = BigInt(10000000) // 10 USDC
          const mintRequest = await this.publicClient.simulateContract({
            address: usdcAddress,
            abi: USDC_ABI,
            functionName: 'mint',
            args: [this.walletClient.account.address, mintAmount],
            account: this.walletClient.account.address,
          })
          
          const mintHash = await this.walletClient.writeContract(mintRequest.request)
          console.log('Minting USDC tokens:', mintHash)
          
          // Wait for mint transaction to be mined
          await this.publicClient.waitForTransactionReceipt({ hash: mintHash })
          console.log('USDC minting successful')
          
          // Update balance
          const newBalance = await this.publicClient.readContract({
            address: usdcAddress,
            abi: USDC_ABI,
            functionName: 'balanceOf',
            args: [this.walletClient.account.address],
          }) as bigint
          
          console.log('New USDC Balance:', newBalance.toString(), 'wei (', Number(newBalance) / 1e6, 'USDC)')
          
          if (newBalance < entryFee) {
            throw new Error(`Still insufficient USDC balance after minting. You have ${Number(newBalance) / 1e6} USDC, but need 2 USDC to enter.`)
          }
        } catch (mintError) {
          console.error('Failed to mint USDC:', mintError)
          throw new Error(`Insufficient USDC balance. You have ${Number(usdcBalance) / 1e6} USDC, but need 2 USDC to enter. Please contact the contract owner to get some MockUSDC tokens.`)
        }
      }
      
      // Check current allowance
      const currentAllowance = await this.publicClient.readContract({
        address: usdcAddress,
        abi: USDC_ABI,
        functionName: 'allowance',
        args: [this.walletClient.account.address, CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`],
      }) as bigint

      console.log('Current USDC Allowance:', currentAllowance.toString(), 'wei (', Number(currentAllowance) / 1e6, 'USDC)')

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

        const approveHash = await this.walletClient.writeContract(approveRequest.request)
        console.log('USDC approval transaction submitted:', approveHash)
        
        // Wait for approval to be mined
        console.log('Waiting for approval transaction to be mined...')
        await this.publicClient.waitForTransactionReceipt({ hash: approveHash })
        console.log('USDC approval successful and mined')
      } else {
        console.log('USDC allowance already sufficient')
      }

      // Now call the smart contract's enter function
      console.log('Submitting picks to NFL Pick Ems contract...')
      
      try {
        const { request } = await this.publicClient.simulateContract({
          address: CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`,
          abi: NFL_PICK_EMS_ABI,
          functionName: 'enter',
          args: [week, picksBitmask],
          account: this.walletClient.account.address,
        })

        console.log('Contract simulation successful, submitting transaction...')
        const hash = await this.walletClient.writeContract(request)
        
        console.log('Transaction submitted successfully:', hash)
        
        // Wait for transaction to be mined
        console.log('Waiting for transaction to be mined...')
        const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
        console.log('Transaction mined successfully:', receipt)
        
        return { success: true, hash }
      } catch (contractError) {
        console.error('Error in contract call:', contractError)
        
        // Check if it's a specific contract error
        if (contractError instanceof Error) {
          if (contractError.message.includes('transferFrom failed')) {
            throw new Error('USDC transfer failed. Please check your balance and try again.')
          } else if (contractError.message.includes('already entered')) {
            throw new Error('You have already submitted picks for this week.')
          } else if (contractError.message.includes('entries closed')) {
            throw new Error('Entries are closed for this week.')
          } else if (contractError.message.includes('must pick exactly 10')) {
            throw new Error('You must pick exactly 10 teams.')
          } else {
            throw new Error(`Contract error: ${contractError.message}`)
          }
        }
        
        throw contractError
      }
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
export function getNFLPickEmsContract(walletClient: any, publicClient?: any): NFLPickEmsContract {
  if (walletClient) {
    // Use provided publicClient or fall back to imported one
    const clientToUse = publicClient || publicClient
    // Since we have walletClient, we can always use the real contract
    console.log('✅ Using real contract with wallet client and public client')
    return new RealNFLPickEmsContract(walletClient, clientToUse)
  }
  
  // Fallback to mock if no wallet client
  console.warn('No wallet client available, using mock contract')
  return new MockNFLPickEmsContract()
}

// Test function to verify contract connectivity
export async function testContractConnectivity() {
  try {
    console.log('Testing contract connectivity...')
    
    // Check current network
    const chain = publicClient.chain
    console.log('🌐 Current Network:', {
      id: chain?.id,
      name: chain?.name,
      nativeCurrency: chain?.nativeCurrency
    })
    
    // Check if we're on the right network for these contracts
    const expectedChainId = CONTRACT_ADDRESSES.BASE_CHAIN_ID
    if (chain?.id !== expectedChainId) {
      console.warn(`⚠️ Warning: Contracts are deployed on Base (chain ID: ${expectedChainId}), but you're connected to ${chain?.name} (chain ID: ${chain?.id})`)
      console.warn(`🔧 To fix this: Switch your wallet to Base network (chain ID: ${expectedChainId})`)
    } else {
      console.log('✅ Connected to correct network (Base)')
    }
    
    // Test USDC contract
    const usdcAddress = CONTRACT_ADDRESSES.MOCK_USDC as `0x${string}`
    console.log('Testing USDC contract at:', usdcAddress)
    
    try {
      console.log('🔍 Debug: Calling USDC symbol() function...')
      console.log('🔍 Debug: USDC address:', usdcAddress)
      console.log('🔍 Debug: Current chain:', publicClient.chain?.id)
      
      const symbol = await publicClient.readContract({
        address: usdcAddress,
        abi: USDC_ABI,
        functionName: 'symbol',
        args: [],
      })
      console.log('✅ USDC contract accessible, symbol:', symbol)
    } catch (error) {
      console.error('❌ USDC contract error:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error'
      })
      
      // Try to discover what functions are actually available on MockUSDC
      console.log('🔍 Attempting to discover available MockUSDC functions...')
      
      const usdcCommonFunctions = [
        'symbol',
        'name',
        'decimals',
        'totalSupply',
        'balanceOf',
        'owner',
        'mint',
        'burn'
      ]
      
      for (const funcName of usdcCommonFunctions) {
        try {
          if (funcName === 'balanceOf') {
            // balanceOf needs an address parameter
            const result = await publicClient.readContract({
              address: usdcAddress,
              abi: parseAbi([`function ${funcName}(address) external view returns (uint256)`]),
              functionName: funcName,
              args: ['0x0000000000000000000000000000000000000000'], // Zero address
            })
            console.log(`✅ Found function: ${funcName}(address) = ${result}`)
          } else if (funcName === 'mint' || funcName === 'burn') {
            // These are write functions, skip for now
            console.log(`⏭️ Skipping write function: ${funcName}`)
          } else {
            // Try to call the function with no arguments
            const result = await publicClient.readContract({
              address: usdcAddress,
              abi: parseAbi([`function ${funcName}() external view returns (string)`]),
              functionName: funcName,
              args: [],
            })
            console.log(`✅ Found function: ${funcName}() = ${result}`)
          }
        } catch (funcError) {
          // Function doesn't exist or has different signature - that's expected
          console.log(`❌ Function ${funcName}() not available or has different signature`)
        }
      }
      
      // Try to get the contract's ABI from BaseScan
      console.log('🔍 MockUSDC address for BaseScan verification:', usdcAddress)
      console.log('🔍 Check this contract on https://basescan.org/address/' + usdcAddress)
      
      // 🚀 QUICK TEST: Try to submit picks with ETH instead of USDC
      console.log('🚀 QUICK TEST: Trying to submit picks with ETH...')
      try {
        const nflAddress = CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`
        console.log('📝 Testing ETH submission to NFL contract at:', nflAddress)
        
        // Try to call the enter function with ETH value
        const { request } = await publicClient.simulateContract({
          address: nflAddress,
          abi: NFL_PICK_EMS_ABI,
          functionName: 'enter',
          args: [1, BigInt(0)], // week 1, no picks (just testing)
          value: BigInt(2000000000000000), // 0.002 ETH
          account: '0x0000000000000000000000000000000000000000', // dummy address for simulation
        })
        
        console.log('✅ ETH submission simulation successful!')
        console.log('📊 Gas estimate:', request.gas?.toString())
        console.log('💰 Value sent:', request.value?.toString())
        
      } catch (ethError) {
        console.error('❌ ETH submission test failed:', ethError instanceof Error ? ethError.message : 'Unknown error')
      }
    }
    
    // Test NFL Pick Ems contract - try multiple functions
    const nflAddress = CONTRACT_ADDRESSES.NFL_PICK_EMS as `0x${string}`
    console.log('Testing NFL Pick Ems contract at:', nflAddress)
    
    // Try getEntryFee first
    try {
      console.log('🔍 Debug: Calling NFL getEntryFee() function...')
      console.log('🔍 Debug: NFL contract address:', nflAddress)
      console.log('🔍 Debug: Chain ID:', publicClient.chain?.id)
      console.log('🔍 Debug: Expected chain ID:', CONTRACT_ADDRESSES.BASE_CHAIN_ID)
      
      const entryFee = await publicClient.readContract({
        address: nflAddress,
        abi: NFL_PICK_EMS_ABI,
        functionName: 'getEntryFee',
        args: [],
      })
      console.log('✅ getEntryFee() works, entry fee:', entryFee.toString())
    } catch (error) {
      console.error('❌ getEntryFee() failed:', error instanceof Error ? error.message : 'Unknown error')
      
      // Try getWeekInfo instead
      try {
        console.log('🔄 Trying getWeekInfo(1) as alternative...')
        const weekInfo = await publicClient.readContract({
          address: nflAddress,
          abi: NFL_PICK_EMS_ABI,
          functionName: 'getWeekInfo',
          args: [1],
        })
        console.log('✅ getWeekInfo(1) works:', weekInfo)
        console.log('📊 Week 1 Info:', {
          gameCount: weekInfo[0],
          lockTime: weekInfo[1],
          resultsSet: weekInfo[2],
          finalized: weekInfo[3],
          pot: weekInfo[4],
          totalEntrants: weekInfo[5],
          lastOracleUpdate: weekInfo[6]
        })
      } catch (weekError) {
        console.error('❌ getWeekInfo(1) also failed:', weekError instanceof Error ? weekError.message : 'Unknown error')
        
        // Try to get contract code to see if it exists
        try {
          console.log('🔄 Checking if contract has code...')
          const code = await publicClient.getBytecode({ address: nflAddress })
          if (code && code !== '0x') {
            console.log('✅ Contract has code, but functions may have different signatures')
            console.log('🔍 Contract bytecode length:', code.length)
            
            // Try to discover what functions are actually available
            console.log('🔍 Attempting to discover available functions...')
            
            // Try common function names that might exist
            const commonFunctions = [
              'getEntryFee',
              'entryFee', 
              'fee',
              'getFee',
              'getWeekInfo',
              'weekInfo',
              'getCurrentWeek',
              'currentWeek',
              'getPot',
              'pot',
              'getTotalPlayers',
              'totalPlayers',
              'getPlayerCount',
              'playerCount'
            ]
            
            for (const funcName of commonFunctions) {
              try {
                // Try to call the function with no arguments
                const result = await publicClient.readContract({
                  address: nflAddress,
                  abi: parseAbi([`function ${funcName}() external view returns (uint256)`]),
                  functionName: funcName,
                  args: [],
                })
                console.log(`✅ Found function: ${funcName}() = ${result}`)
              } catch (funcError) {
                // Function doesn't exist or has different signature - that's expected
                console.log(`❌ Function ${funcName}() not available or has different signature`)
              }
            }
            
                  // Try to get the contract's ABI from BaseScan
      console.log('🔍 Contract address for BaseScan verification:', nflAddress)
      console.log('🔍 Check this contract on https://basescan.org/address/' + nflAddress)
      console.log('🔧 Debug Tip: Visit BaseScan to see the actual contract ABI and verify function signatures')
      console.log('🔧 Debug Tip: Check if getEntryFee() function exists or has different parameters')
            
          } else {
            console.log('❌ Contract has no code - address may be wrong')
          }
        } catch (codeError) {
          console.error('❌ Could not check contract code:', codeError instanceof Error ? codeError.message : 'Unknown error')
        }
      }
    }
    
  } catch (error) {
    console.error('Contract connectivity test failed:', error)
  }
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
