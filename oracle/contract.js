// On-chain interaction helpers using viem

import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base } from 'viem/chains'
import dotenv from 'dotenv'

dotenv.config()

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const PRIVATE_KEY = process.env.ORACLE_PRIVATE_KEY
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org'

// Minimal ABI — oracle + view functions only
export const NFL_ABI = [
  // Oracle write functions
  {
    name: 'createWeek',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'gameCount', type: 'uint8' },
      { name: 'lockTime', type: 'uint64' },
    ],
    outputs: [],
  },
  {
    name: 'addGame',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'gameIndex', type: 'uint8' },
      { name: 'startTime', type: 'uint64' },
    ],
    outputs: [],
  },
  {
    name: 'markGameStarted',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'gameIndex', type: 'uint8' },
    ],
    outputs: [],
  },
  {
    name: 'updateGameScore',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'gameIndex', type: 'uint8' },
      { name: 'homeScore', type: 'uint8' },
      { name: 'awayScore', type: 'uint8' },
      { name: 'finished', type: 'bool' },
    ],
    outputs: [],
  },
  {
    name: 'postResults',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'winnersMask', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'finalizeWinners',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'weekId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'sweepRemainder',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'to', type: 'address' },
    ],
    outputs: [],
  },
  // View functions
  {
    name: 'getWeekInfo',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'weekId', type: 'uint256' }],
    outputs: [
      { name: 'gameCount', type: 'uint8' },
      { name: 'lockTime', type: 'uint64' },
      { name: 'resultsSet', type: 'bool' },
      { name: 'finalized', type: 'bool' },
      { name: 'pot', type: 'uint256' },
      { name: 'totalEntrants', type: 'uint256' },
      { name: 'lastOracleUpdate', type: 'uint64' },
    ],
  },
  {
    name: 'getGameInfo',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'weekId', type: 'uint256' },
      { name: 'gameIndex', type: 'uint8' },
    ],
    outputs: [
      { name: 'startTime', type: 'uint64' },
      { name: 'started', type: 'bool' },
      { name: 'availableForPicks', type: 'bool' },
      { name: 'finished', type: 'bool' },
      { name: 'homeScore', type: 'uint8' },
      { name: 'awayScore', type: 'uint8' },
    ],
  },
]

export function createClients() {
  if (!PRIVATE_KEY) throw new Error('ORACLE_PRIVATE_KEY not set in .env')
  if (!CONTRACT_ADDRESS) throw new Error('CONTRACT_ADDRESS not set in .env')

  const account = privateKeyToAccount(PRIVATE_KEY)

  const publicClient = createPublicClient({
    chain: base,
    transport: http(RPC_URL),
  })

  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(RPC_URL),
  })

  return { publicClient, walletClient, account, contractAddress: CONTRACT_ADDRESS }
}

export async function readContract(publicClient, functionName, args) {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: NFL_ABI,
    functionName,
    args,
  })
}

export async function writeContract(walletClient, publicClient, functionName, args) {
  const account = walletClient.account

  // Simulate first to catch reverts
  const { request } = await publicClient.simulateContract({
    address: CONTRACT_ADDRESS,
    abi: NFL_ABI,
    functionName,
    args,
    account: account.address,
  })

  const hash = await walletClient.writeContract(request)
  console.log(`  tx: ${hash}`)

  const receipt = await publicClient.waitForTransactionReceipt({ hash })
  if (receipt.status !== 'success') {
    throw new Error(`Transaction reverted: ${hash}`)
  }
  return hash
}
