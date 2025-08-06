import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  GasBalanceDeducted as GasBalanceDeductedEvent,
  GasDeposited as GasDepositedEvent,
  GasWithdrawn as GasWithdrawnEvent,
} from "../generated/VerifyingSingletonPaymaster/VerifyingSingletonPaymaster"
import {
  TokenPaymasterOperation as TokenPaymasterOperationEvent,
  TokenPaymentDue as TokenPaymentDueEvent,
} from "../generated/BiconomyTokenPaymaster/BiconomyTokenPaymaster"
import {
  UserOperationEvent as UserOperationEventEvent,
  AccountDeployed as AccountDeployedEvent,
  UserOperationRevertReason as UserOperationRevertReasonEvent,
  SignatureAggregatorChanged as SignatureAggregatorChangedEvent,
  StakeLocked as StakeLockedEvent,
  StakeUnlocked as StakeUnlockedEvent,
  StakeWithdrawn as StakeWithdrawnEvent,
} from "../generated/EntryPoint/EntryPoint"
import {
  Transfer as TransferEvent,
} from "../generated/ERC20/ERC20"
import {
  AccountCreated as AccountCreatedEvent,
} from "../generated/AccountFactory/AccountFactory"
import { 
  PaymasterFeeData, 
  Paymaster, 
  EntryPoint, 
  UserOperation, 
  Account, 
  Factory, 
  Bundler, 
  Aggregator, 
  TokenTransfer, 
  AccountCreated 
} from "../generated/schema"

// EntryPoint address on Base
const ENTRY_POINT_ADDRESS = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789"

// ============================================================================
// ENTRYPOINT EVENTS
// ============================================================================

export function handleUserOperationEvent(event: UserOperationEventEvent): void {
  const userOpHash = event.params.userOpHash
  const sender = event.params.sender
  const paymaster = event.params.paymaster
  const nonce = event.params.nonce
  const success = event.params.success
  const actualGasCost = event.params.actualGasCost
  const actualGasUsed = event.params.actualGasUsed
  
  // Create UserOperation entity - ID and timestamp are automatically managed by graph-node
  const userOp = new UserOperation("")
  userOp.userOpHash = userOpHash
  userOp.sender = sender
  userOp.nonce = nonce
  userOp.callData = Bytes.empty() // Will be filled from UserOperation struct if available
  userOp.callGasLimit = BigInt.fromI32(0)
  userOp.verificationGasLimit = BigInt.fromI32(0)
  userOp.preVerificationGas = BigInt.fromI32(0)
  userOp.maxFeePerGas = BigInt.fromI32(0)
  userOp.maxPriorityFeePerGas = BigInt.fromI32(0)
  userOp.paymasterAndData = Bytes.empty()
  userOp.signature = Bytes.empty()
  userOp.entryPoint = event.address
  userOp.bundler = event.transaction.from
  userOp.blockNumber = event.block.number
  userOp.transactionHash = event.transaction.hash
  userOp.success = success
  userOp.actualGasUsed = actualGasUsed
  userOp.actualGasCost = actualGasCost
  userOp.paymaster = paymaster
  userOp.factory = Address.zero() // Will be filled from AccountDeployed event
  userOp.aggregator = Address.zero()
  userOp.save()
  
  // Update Account entity
  let account = Account.load(sender)
  if (!account) {
    account = new Account(sender)
    account.address = sender
    account.factory = Address.zero()
    account.owner = Address.zero()
    account.deployedAt = event.block.number
    account.deployedAtTimestamp = event.block.timestamp
    account.totalOperations = BigInt.fromI32(0)
    account.totalGasUsed = BigInt.fromI32(0)
    account.totalGasCost = BigInt.fromI32(0)
    account.lastSeen = event.block.number
    account.lastSeenTimestamp = event.block.timestamp
    account.isActive = true
  } else {
    // Create new immutable entity
    const newAccount = new Account(sender.concatI32(event.block.number.toI32()))
    newAccount.address = sender
    newAccount.factory = account.factory
    newAccount.owner = account.owner
    newAccount.deployedAt = account.deployedAt
    newAccount.deployedAtTimestamp = account.deployedAtTimestamp
    newAccount.totalOperations = account.totalOperations.plus(BigInt.fromI32(1))
    newAccount.totalGasUsed = account.totalGasUsed.plus(actualGasUsed)
    newAccount.totalGasCost = account.totalGasCost.plus(actualGasCost)
    newAccount.lastSeen = event.block.number
    newAccount.lastSeenTimestamp = event.block.timestamp
    newAccount.isActive = true
    newAccount.save()
  }
  
  // Update Bundler entity
  let bundler = Bundler.load(event.transaction.from)
  if (!bundler) {
    bundler = new Bundler(event.transaction.from)
    bundler.address = event.transaction.from
    bundler.totalBundles = BigInt.fromI32(0)
    bundler.totalUserOps = BigInt.fromI32(0)
    bundler.totalGasUsed = BigInt.fromI32(0)
    bundler.totalGasCost = BigInt.fromI32(0)
    bundler.firstSeen = event.block.number
    bundler.lastSeen = event.block.number
    bundler.firstSeenTimestamp = event.block.timestamp
    bundler.lastSeenTimestamp = event.block.timestamp
  } else {
    // Create new immutable entity
    const newBundler = new Bundler(event.transaction.from.concatI32(event.block.number.toI32()))
    newBundler.address = event.transaction.from
    newBundler.totalBundles = bundler.totalBundles
    newBundler.totalUserOps = bundler.totalUserOps.plus(BigInt.fromI32(1))
    newBundler.totalGasUsed = bundler.totalGasUsed.plus(actualGasUsed)
    newBundler.totalGasCost = bundler.totalGasCost.plus(actualGasCost)
    newBundler.firstSeen = bundler.firstSeen
    newBundler.lastSeen = event.block.number
    newBundler.firstSeenTimestamp = bundler.firstSeenTimestamp
    newBundler.lastSeenTimestamp = event.block.timestamp
    newBundler.save()
  }
  
  // Update EntryPoint entity
  let entryPoint = EntryPoint.load(event.address)
  if (!entryPoint) {
    entryPoint = new EntryPoint(event.address)
    entryPoint.address = event.address
    entryPoint.totalOperations = BigInt.fromI32(0)
    entryPoint.totalGasCost = BigInt.fromI32(0)
    entryPoint.firstSeen = event.block.number
    entryPoint.lastSeen = event.block.number
    entryPoint.firstSeenTimestamp = event.block.timestamp
    entryPoint.lastSeenTimestamp = event.block.timestamp
    entryPoint.totalAccounts = BigInt.fromI32(0)
    entryPoint.totalBundlers = BigInt.fromI32(0)
    entryPoint.totalPaymasters = BigInt.fromI32(0)
  } else {
    // Create new immutable entity
    const newEntryPoint = new EntryPoint(event.address.concatI32(event.block.number.toI32()))
    newEntryPoint.address = event.address
    newEntryPoint.totalOperations = entryPoint.totalOperations.plus(BigInt.fromI32(1))
    newEntryPoint.totalGasCost = entryPoint.totalGasCost.plus(actualGasCost)
    newEntryPoint.firstSeen = entryPoint.firstSeen
    newEntryPoint.lastSeen = event.block.number
    newEntryPoint.firstSeenTimestamp = entryPoint.firstSeenTimestamp
    newEntryPoint.lastSeenTimestamp = event.block.timestamp
    newEntryPoint.totalAccounts = entryPoint.totalAccounts
    newEntryPoint.totalBundlers = entryPoint.totalBundlers
    newEntryPoint.totalPaymasters = entryPoint.totalPaymasters
    newEntryPoint.save()
  }
  
  // Update Paymaster entity if paymaster is used
  if (paymaster != Address.zero()) {
    let paymasterEntity = Paymaster.load(paymaster)
    if (!paymasterEntity) {
      paymasterEntity = new Paymaster(paymaster)
      paymasterEntity.address = paymaster
      paymasterEntity.totalOperations = BigInt.fromI32(0)
      paymasterEntity.totalGasCost = BigInt.fromI32(0)
      paymasterEntity.totalGasUsed = BigInt.fromI32(0)
      paymasterEntity.firstSeen = event.block.number
      paymasterEntity.lastSeen = event.block.number
      paymasterEntity.entryPoint = event.address
      paymasterEntity.firstSeenTimestamp = event.block.timestamp
      paymasterEntity.lastSeenTimestamp = event.block.timestamp
      paymasterEntity.uniqueUsers = BigInt.fromI32(0)
      paymasterEntity.successRate = BigInt.fromI32(0).toBigDecimal()
    } else {
      // Create new immutable entity
      const newPaymaster = new Paymaster(paymaster.concatI32(event.block.number.toI32()))
      newPaymaster.address = paymaster
      newPaymaster.totalOperations = paymasterEntity.totalOperations.plus(BigInt.fromI32(1))
      newPaymaster.totalGasCost = paymasterEntity.totalGasCost.plus(actualGasCost)
      newPaymaster.totalGasUsed = paymasterEntity.totalGasUsed.plus(actualGasUsed)
      newPaymaster.firstSeen = paymasterEntity.firstSeen
      newPaymaster.lastSeen = event.block.number
      newPaymaster.entryPoint = paymasterEntity.entryPoint
      newPaymaster.firstSeenTimestamp = paymasterEntity.firstSeenTimestamp
      newPaymaster.lastSeenTimestamp = event.block.timestamp
      newPaymaster.uniqueUsers = paymasterEntity.uniqueUsers
      newPaymaster.successRate = paymasterEntity.successRate
      newPaymaster.save()
    }
  }
}

export function handleAccountDeployed(event: AccountDeployedEvent): void {
  const userOpHash = event.params.userOpHash
  const sender = event.params.sender
  const factory = event.params.factory
  const paymaster = event.params.paymaster
  
  // Update Account entity with factory info
  const account = Account.load(sender)
  if (account) {
    const newAccount = new Account(sender.concatI32(event.block.number.toI32()))
    newAccount.address = sender
    newAccount.factory = factory
    newAccount.owner = account.owner
    newAccount.deployedAt = account.deployedAt
    newAccount.deployedAtTimestamp = account.deployedAtTimestamp
    newAccount.totalOperations = account.totalOperations
    newAccount.totalGasUsed = account.totalGasUsed
    newAccount.totalGasCost = account.totalGasCost
    newAccount.lastSeen = account.lastSeen
    newAccount.lastSeenTimestamp = account.lastSeenTimestamp
    newAccount.isActive = account.isActive
    newAccount.save()
  }
  
  // Update Factory entity
  let factoryEntity = Factory.load(factory)
  if (!factoryEntity) {
    factoryEntity = new Factory(factory)
    factoryEntity.address = factory
    factoryEntity.totalAccountsCreated = BigInt.fromI32(0)
    factoryEntity.totalGasUsed = BigInt.fromI32(0)
    factoryEntity.firstSeen = event.block.number
    factoryEntity.lastSeen = event.block.number
    factoryEntity.firstSeenTimestamp = event.block.timestamp
    factoryEntity.lastSeenTimestamp = event.block.timestamp
  } else {
    // Create new immutable entity
    const newFactory = new Factory(factory.concatI32(event.block.number.toI32()))
    newFactory.address = factory
    newFactory.totalAccountsCreated = factoryEntity.totalAccountsCreated.plus(BigInt.fromI32(1))
    newFactory.totalGasUsed = factoryEntity.totalGasUsed
    newFactory.firstSeen = factoryEntity.firstSeen
    newFactory.lastSeen = event.block.number
    newFactory.firstSeenTimestamp = factoryEntity.firstSeenTimestamp
    newFactory.lastSeenTimestamp = event.block.timestamp
    newFactory.save()
  }
}

export function handleUserOperationRevertReason(event: UserOperationRevertReasonEvent): void {
  // Handle failed user operations
  const userOpHash = event.params.userOpHash
  const sender = event.params.sender
  const nonce = event.params.nonce
  const revertReason = event.params.revertReason
  
  // Create UserOperation entity for failed operation - ID and timestamp are automatically managed
  const userOp = new UserOperation("")
  userOp.userOpHash = userOpHash
  userOp.sender = sender
  userOp.nonce = nonce
  userOp.callData = Bytes.empty()
  userOp.callGasLimit = BigInt.fromI32(0)
  userOp.verificationGasLimit = BigInt.fromI32(0)
  userOp.preVerificationGas = BigInt.fromI32(0)
  userOp.maxFeePerGas = BigInt.fromI32(0)
  userOp.maxPriorityFeePerGas = BigInt.fromI32(0)
  userOp.paymasterAndData = Bytes.empty()
  userOp.signature = Bytes.empty()
  userOp.entryPoint = event.address
  userOp.bundler = event.transaction.from
  userOp.blockNumber = event.block.number
  userOp.transactionHash = event.transaction.hash
  userOp.success = false
  userOp.actualGasUsed = BigInt.fromI32(0)
  userOp.actualGasCost = BigInt.fromI32(0)
  userOp.paymaster = Address.zero()
  userOp.factory = Address.zero()
  userOp.aggregator = Address.zero()
  userOp.save()
}

export function handleSignatureAggregatorChanged(event: SignatureAggregatorChangedEvent): void {
  const aggregator = event.params.aggregator
  
  // Update Aggregator entity
  let aggregatorEntity = Aggregator.load(aggregator)
  if (!aggregatorEntity) {
    aggregatorEntity = new Aggregator(aggregator)
    aggregatorEntity.address = aggregator
    aggregatorEntity.totalOperations = BigInt.fromI32(0)
    aggregatorEntity.totalGasUsed = BigInt.fromI32(0)
    aggregatorEntity.firstSeen = event.block.number
    aggregatorEntity.lastSeen = event.block.number
    aggregatorEntity.firstSeenTimestamp = event.block.timestamp
    aggregatorEntity.lastSeenTimestamp = event.block.timestamp
  } else {
    // Create new immutable entity
    const newAggregator = new Aggregator(aggregator.concatI32(event.block.number.toI32()))
    newAggregator.address = aggregator
    newAggregator.totalOperations = aggregatorEntity.totalOperations
    newAggregator.totalGasUsed = aggregatorEntity.totalGasUsed
    newAggregator.firstSeen = aggregatorEntity.firstSeen
    newAggregator.lastSeen = event.block.number
    newAggregator.firstSeenTimestamp = aggregatorEntity.firstSeenTimestamp
    newAggregator.lastSeenTimestamp = event.block.timestamp
    newAggregator.save()
  }
}

// ============================================================================
// PAYMASTER EVENTS (Enhanced)
// ============================================================================

export function handleGasBalanceDeducted(event: GasBalanceDeductedEvent): void {
  const paymasterId = event.params._paymasterId
  const charge = event.params._charge
  
  // Create timeseries data point - ID and timestamp are automatically managed by graph-node
  const feeData = new PaymasterFeeData("")
  feeData.paymaster = paymasterId
  feeData.gasUsed = BigInt.fromI32(0) // Will be calculated from context
  feeData.gasCost = charge
  feeData.operationType = "gas_deduction"
  feeData.success = true
  feeData.token = null
  feeData.userOpHash = null
  feeData.blockNumber = event.block.number
  feeData.transactionHash = event.transaction.hash
  feeData.sender = Address.zero()
  feeData.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
  feeData.bundler = event.transaction.from
  feeData.save()
  
  // Update paymaster entity (immutable, so create new if needed)
  let paymaster = Paymaster.load(paymasterId)
  if (!paymaster) {
    paymaster = new Paymaster(paymasterId)
    paymaster.address = paymasterId
    paymaster.totalOperations = BigInt.fromI32(0)
    paymaster.totalGasCost = BigInt.fromI32(0)
    paymaster.totalGasUsed = BigInt.fromI32(0)
    paymaster.firstSeen = event.block.number
    paymaster.lastSeen = event.block.number
    paymaster.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
    paymaster.firstSeenTimestamp = event.block.timestamp
    paymaster.lastSeenTimestamp = event.block.timestamp
    paymaster.uniqueUsers = BigInt.fromI32(0)
    paymaster.successRate = BigInt.fromI32(100).toBigDecimal()
  } else {
    // Create new immutable entity with updated data
    const newPaymaster = new Paymaster(paymasterId.concatI32(event.block.number.toI32()))
    newPaymaster.address = paymasterId
    newPaymaster.totalOperations = paymaster.totalOperations.plus(BigInt.fromI32(1))
    newPaymaster.totalGasCost = paymaster.totalGasCost.plus(charge)
    newPaymaster.totalGasUsed = paymaster.totalGasUsed
    newPaymaster.firstSeen = paymaster.firstSeen
    newPaymaster.lastSeen = event.block.number
    newPaymaster.entryPoint = paymaster.entryPoint
    newPaymaster.firstSeenTimestamp = paymaster.firstSeenTimestamp
    newPaymaster.lastSeenTimestamp = event.block.timestamp
    newPaymaster.uniqueUsers = paymaster.uniqueUsers
    newPaymaster.successRate = paymaster.successRate
    newPaymaster.save()
  }
  
  // Update entry point entity
  let entryPoint = EntryPoint.load(Bytes.fromHexString(ENTRY_POINT_ADDRESS))
  if (!entryPoint) {
    entryPoint = new EntryPoint(Bytes.fromHexString(ENTRY_POINT_ADDRESS))
    entryPoint.address = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
    entryPoint.totalOperations = BigInt.fromI32(0)
    entryPoint.totalGasCost = BigInt.fromI32(0)
    entryPoint.firstSeen = event.block.number
    entryPoint.lastSeen = event.block.number
    entryPoint.firstSeenTimestamp = event.block.timestamp
    entryPoint.lastSeenTimestamp = event.block.timestamp
    entryPoint.totalAccounts = BigInt.fromI32(0)
    entryPoint.totalBundlers = BigInt.fromI32(0)
    entryPoint.totalPaymasters = BigInt.fromI32(0)
  } else {
    // Create new immutable entity
    const newEntryPoint = new EntryPoint(Bytes.fromHexString(ENTRY_POINT_ADDRESS).concatI32(event.block.number.toI32()))
    newEntryPoint.address = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
    newEntryPoint.totalOperations = entryPoint.totalOperations.plus(BigInt.fromI32(1))
    newEntryPoint.totalGasCost = entryPoint.totalGasCost.plus(charge)
    newEntryPoint.firstSeen = entryPoint.firstSeen
    newEntryPoint.lastSeen = event.block.number
    newEntryPoint.firstSeenTimestamp = entryPoint.firstSeenTimestamp
    newEntryPoint.lastSeenTimestamp = event.block.timestamp
    newEntryPoint.totalAccounts = entryPoint.totalAccounts
    newEntryPoint.totalBundlers = entryPoint.totalBundlers
    newEntryPoint.totalPaymasters = entryPoint.totalPaymasters
    newEntryPoint.save()
  }
}

export function handleGasDeposited(event: GasDepositedEvent): void {
  const paymasterId = event.params._paymasterId
  const value = event.params._value
  
  // Create timeseries data point - ID and timestamp are automatically managed by graph-node
  const feeData = new PaymasterFeeData("")
  feeData.paymaster = paymasterId
  feeData.gasUsed = BigInt.fromI32(0)
  feeData.gasCost = value
  feeData.operationType = "gas_deposit"
  feeData.success = true
  feeData.token = null
  feeData.userOpHash = null
  feeData.blockNumber = event.block.number
  feeData.transactionHash = event.transaction.hash
  feeData.sender = Address.zero()
  feeData.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
  feeData.bundler = event.transaction.from
  feeData.save()
}

export function handleGasWithdrawn(event: GasWithdrawnEvent): void {
  const paymasterId = event.params._paymasterId
  const value = event.params._value
  
  // Create timeseries data point - ID and timestamp are automatically managed by graph-node
  const feeData = new PaymasterFeeData("")
  feeData.paymaster = paymasterId
  feeData.gasUsed = BigInt.fromI32(0)
  feeData.gasCost = value
  feeData.operationType = "gas_withdrawal"
  feeData.success = true
  feeData.token = null
  feeData.userOpHash = null
  feeData.blockNumber = event.block.number
  feeData.transactionHash = event.transaction.hash
  feeData.sender = Address.zero()
  feeData.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
  feeData.bundler = event.transaction.from
  feeData.save()
}

export function handleTokenPaymasterOperation(event: TokenPaymasterOperationEvent): void {
  const sender = event.params.sender
  const token = event.params.token
  const totalCharge = event.params.totalCharge
  const userOpHash = event.params.userOpHash
  
  // Create timeseries data point - ID and timestamp are automatically managed by graph-node
  const feeData = new PaymasterFeeData("")
  feeData.paymaster = event.address
  feeData.gasUsed = BigInt.fromI32(0) // Will be calculated from context
  feeData.gasCost = totalCharge
  feeData.operationType = "token_payment"
  feeData.success = true
  feeData.token = token.toHexString()
  feeData.userOpHash = userOpHash.toHexString()
  feeData.blockNumber = event.block.number
  feeData.transactionHash = event.transaction.hash
  feeData.sender = sender
  feeData.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
  feeData.bundler = event.transaction.from
  feeData.save()
  
  // Update paymaster entity
  let paymaster = Paymaster.load(event.address)
  if (!paymaster) {
    paymaster = new Paymaster(event.address)
    paymaster.address = event.address
    paymaster.totalOperations = BigInt.fromI32(0)
    paymaster.totalGasCost = BigInt.fromI32(0)
    paymaster.totalGasUsed = BigInt.fromI32(0)
    paymaster.firstSeen = event.block.number
    paymaster.lastSeen = event.block.number
    paymaster.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
    paymaster.firstSeenTimestamp = event.block.timestamp
    paymaster.lastSeenTimestamp = event.block.timestamp
    paymaster.uniqueUsers = BigInt.fromI32(0)
    paymaster.successRate = BigInt.fromI32(100).toBigDecimal()
  } else {
    // Create new immutable entity
    const newPaymaster = new Paymaster(event.address.concatI32(event.block.number.toI32()))
    newPaymaster.address = event.address
    newPaymaster.totalOperations = paymaster.totalOperations.plus(BigInt.fromI32(1))
    newPaymaster.totalGasCost = paymaster.totalGasCost.plus(totalCharge)
    newPaymaster.totalGasUsed = paymaster.totalGasUsed
    newPaymaster.firstSeen = paymaster.firstSeen
    newPaymaster.lastSeen = event.block.number
    newPaymaster.entryPoint = paymaster.entryPoint
    newPaymaster.firstSeenTimestamp = paymaster.firstSeenTimestamp
    newPaymaster.lastSeenTimestamp = event.block.timestamp
    newPaymaster.uniqueUsers = paymaster.uniqueUsers
    newPaymaster.successRate = paymaster.successRate
    newPaymaster.save()
  }
}

export function handleTokenPaymentDue(event: TokenPaymentDueEvent): void {
  const token = event.params.token
  const account = event.params.account
  const charge = event.params.charge
  
  // Create timeseries data point for failed payment - ID and timestamp are automatically managed
  const feeData = new PaymasterFeeData("")
  feeData.paymaster = event.address
  feeData.gasUsed = BigInt.fromI32(0)
  feeData.gasCost = charge
  feeData.operationType = "token_payment_failed"
  feeData.success = false
  feeData.token = token.toHexString()
  feeData.userOpHash = null
  feeData.blockNumber = event.block.number
  feeData.transactionHash = event.transaction.hash
  feeData.sender = account
  feeData.entryPoint = Bytes.fromHexString(ENTRY_POINT_ADDRESS)
  feeData.bundler = event.transaction.from
  feeData.save()
}

// ============================================================================
// TOKEN TRANSFER EVENTS
// ============================================================================

export function handleERC20Transfer(event: TransferEvent): void {
  const from = event.params.from
  const to = event.params.to
  const value = event.params.value
  
  // Create TokenTransfer entity - ID and timestamp are automatically managed by graph-node
  const transfer = new TokenTransfer("")
  transfer.token = event.address
  transfer.from = from
  transfer.to = to
  transfer.amount = value
  transfer.userOpHash = null // Will be linked if part of user operation
  transfer.paymaster = Address.zero()
  transfer.blockNumber = event.block.number
  transfer.transactionHash = event.transaction.hash
  transfer.save()
}

// ============================================================================
// ACCOUNT FACTORY EVENTS
// ============================================================================

export function handleAccountCreated(event: AccountCreatedEvent): void {
  const account = event.params.account
  const owner = event.params.owner
  const salt = event.params.salt
  
  // Create AccountCreated entity - ID and timestamp are automatically managed by graph-node
  const accountCreated = new AccountCreated("")
  accountCreated.account = account
  accountCreated.owner = owner
  accountCreated.factory = event.address
  accountCreated.salt = salt.toHexString() // Convert BigInt to string
  accountCreated.blockNumber = event.block.number
  accountCreated.transactionHash = event.transaction.hash
  accountCreated.userOpHash = null
  accountCreated.save()
  
  // Update Factory entity
  let factory = Factory.load(event.address)
  if (!factory) {
    factory = new Factory(event.address)
    factory.address = event.address
    factory.totalAccountsCreated = BigInt.fromI32(0)
    factory.totalGasUsed = BigInt.fromI32(0)
    factory.firstSeen = event.block.number
    factory.lastSeen = event.block.number
    factory.firstSeenTimestamp = event.block.timestamp
    factory.lastSeenTimestamp = event.block.timestamp
  } else {
    // Create new immutable entity
    const newFactory = new Factory(event.address.concatI32(event.block.number.toI32()))
    newFactory.address = event.address
    newFactory.totalAccountsCreated = factory.totalAccountsCreated.plus(BigInt.fromI32(1))
    newFactory.totalGasUsed = factory.totalGasUsed
    newFactory.firstSeen = factory.firstSeen
    newFactory.lastSeen = event.block.number
    newFactory.firstSeenTimestamp = factory.firstSeenTimestamp
    newFactory.lastSeenTimestamp = event.block.timestamp
    newFactory.save()
  }
}

// ============================================================================
// STAKE EVENTS (for completeness)
// ============================================================================

export function handleStakeLocked(event: StakeLockedEvent): void {
  // Handle stake locking events
  // This could be used for bundler/paymaster stake tracking
}

export function handleStakeUnlocked(event: StakeUnlockedEvent): void {
  // Handle stake unlocking events
}

export function handleStakeWithdrawn(event: StakeWithdrawnEvent): void {
  // Handle stake withdrawal events
} 