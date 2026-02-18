#!/usr/bin/env node

// NFL Pick Ems Oracle CLI
// Usage: node index.js <command> <weekId> [season]
//
// Commands:
//   setup-week    Fetch ESPN schedule, create week + games on-chain, write frontend JSON
//   monitor       Poll ESPN for game starts and score updates, post on-chain
//   post-results  After all games final, post results and finalize winners on-chain
//   status        Show on-chain and ESPN state for a week (read-only)

import { fetchWeekSchedule, computeWinnersMask } from './espn.js'
import { createClients, readContract, writeContract } from './contract.js'
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dir = dirname(fileURLToPath(import.meta.url))
const SCHEDULES_DIR = join(__dir, '..', 'public', 'schedules')
const LOCK_BUFFER = 3600 // 1 hour before first game

const [,, command, ...args] = process.argv

async function main() {
  switch (command) {
    case 'setup-week':    return setupWeek(args)
    case 'monitor':       return monitor(args)
    case 'post-results':  return postResults(args)
    case 'status':        return status(args)
    default:
      console.log('NFL Pick Ems Oracle')
      console.log('')
      console.log('Usage: node index.js <command> <weekId> [season]')
      console.log('')
      console.log('Commands:')
      console.log('  setup-week <weekId> [season]   Set up a week on-chain + generate frontend schedule')
      console.log('  monitor <weekId> [season]      Poll for game starts and score updates')
      console.log('  post-results <weekId> [season] Post final results and finalize winners')
      console.log('  status <weekId> [season]       Show current state (read-only)')
      process.exit(1)
  }
}

// ── setup-week ──────────────────────────────────────────────────────────

async function setupWeek([weekIdStr, seasonStr]) {
  const weekId = parseInt(weekIdStr)
  const season = parseInt(seasonStr || new Date().getFullYear())
  if (isNaN(weekId)) { console.error('Error: weekId required'); process.exit(1) }

  console.log(`\nSetting up Week ${weekId} (${season} season)...\n`)

  // 1. Fetch schedule from ESPN
  const games = await fetchWeekSchedule(season, weekId)
  if (games.length === 0) {
    console.error('No games found. Check the season/week or try later.')
    process.exit(1)
  }
  console.log(`Found ${games.length} games from ESPN.\n`)

  // 2. Compute lock time (first game minus 1 hour)
  const firstGameTime = new Date(games[0].startTime)
  const lockTimestamp = Math.floor(firstGameTime.getTime() / 1000) - LOCK_BUFFER
  console.log(`Lock time: ${new Date(lockTimestamp * 1000).toISOString()}`)
  console.log(`First game: ${new Date(games[0].startTime).toISOString()}\n`)

  // 3. Create week on-chain
  const { publicClient, walletClient } = createClients()

  console.log(`createWeek(${weekId}, ${games.length}, ${lockTimestamp})`)
  await writeContract(walletClient, publicClient, 'createWeek', [
    BigInt(weekId),
    games.length,
    BigInt(lockTimestamp),
  ])

  // 4. Add each game on-chain
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const ts = Math.floor(new Date(game.startTime).getTime() / 1000)
    console.log(`addGame(${weekId}, ${i}) — ${game.awayTeam.abbreviation} @ ${game.homeTeam.abbreviation}`)
    await writeContract(walletClient, publicClient, 'addGame', [
      BigInt(weekId),
      i,
      BigInt(ts),
    ])
  }

  // 5. Write frontend schedule JSON
  mkdirSync(SCHEDULES_DIR, { recursive: true })
  const schedule = {
    weekId,
    season,
    gameCount: games.length,
    lockTime: new Date(lockTimestamp * 1000).toISOString(),
    games: games.map((g, i) => ({
      gameIndex: i,
      espnEventId: g.espnEventId,
      homeTeam: { name: g.homeTeam.name, abbreviation: g.homeTeam.abbreviation, displayName: g.homeTeam.displayName },
      awayTeam: { name: g.awayTeam.name, abbreviation: g.awayTeam.abbreviation, displayName: g.awayTeam.displayName },
      startTime: g.startTime,
    })),
  }
  const outPath = join(SCHEDULES_DIR, `week-${weekId}.json`)
  writeFileSync(outPath, JSON.stringify(schedule, null, 2))
  console.log(`\nSchedule written to ${outPath}`)
  console.log('\nDone! Week is ready for picks.')
}

// ── monitor ─────────────────────────────────────────────────────────────

async function monitor([weekIdStr, seasonStr]) {
  const weekId = parseInt(weekIdStr)
  const season = parseInt(seasonStr || new Date().getFullYear())
  if (isNaN(weekId)) { console.error('Error: weekId required'); process.exit(1) }

  // Load stored game ordering
  const schedulePath = join(SCHEDULES_DIR, `week-${weekId}.json`)
  if (!existsSync(schedulePath)) {
    console.error(`Schedule not found: ${schedulePath}\nRun setup-week first.`)
    process.exit(1)
  }
  const schedule = JSON.parse(readFileSync(schedulePath, 'utf-8'))
  const eventIdToIndex = Object.fromEntries(
    schedule.games.map(g => [g.espnEventId, g.gameIndex])
  )

  const { publicClient, walletClient } = createClients()
  console.log(`\nMonitoring Week ${weekId} (polling every 60s)...\n`)

  while (true) {
    try {
      const games = await fetchWeekSchedule(season, weekId)
      let allFinished = true

      for (const game of games) {
        const idx = eventIdToIndex[game.espnEventId]
        if (idx === undefined) continue

        // Read on-chain state
        const onChain = await readContract(publicClient, 'getGameInfo', [BigInt(weekId), idx])
        const now = Math.floor(Date.now() / 1000)
        const gameTs = Math.floor(new Date(game.startTime).getTime() / 1000)

        // Mark started
        if (!onChain[1] && now >= gameTs) {
          console.log(`[${idx}] Marking started: ${game.awayTeam.abbreviation} @ ${game.homeTeam.abbreviation}`)
          try {
            await writeContract(walletClient, publicClient, 'markGameStarted', [BigInt(weekId), idx])
          } catch (err) {
            console.warn(`  Failed: ${err.message}`)
          }
        }

        // Update score
        if (onChain[1] && !onChain[3]) {
          console.log(`[${idx}] Score: ${game.awayTeam.abbreviation} ${game.awayTeam.score} @ ${game.homeTeam.abbreviation} ${game.homeTeam.score} (${game.status.description})`)
          try {
            await writeContract(walletClient, publicClient, 'updateGameScore', [
              BigInt(weekId), idx,
              game.homeTeam.score, game.awayTeam.score,
              game.status.completed,
            ])
          } catch (err) {
            console.warn(`  Failed: ${err.message}`)
          }
        }

        if (!game.status.completed) allFinished = false
      }

      if (allFinished) {
        console.log('\nAll games finished! Run: node index.js post-results ' + weekId)
        process.exit(0)
      }
    } catch (err) {
      console.error('Poll error:', err.message)
    }

    await new Promise(r => setTimeout(r, 60_000))
  }
}

// ── post-results ────────────────────────────────────────────────────────

async function postResults([weekIdStr, seasonStr]) {
  const weekId = parseInt(weekIdStr)
  const season = parseInt(seasonStr || new Date().getFullYear())
  if (isNaN(weekId)) { console.error('Error: weekId required'); process.exit(1) }

  // Load stored game ordering
  const schedulePath = join(SCHEDULES_DIR, `week-${weekId}.json`)
  if (!existsSync(schedulePath)) {
    console.error(`Schedule not found: ${schedulePath}\nRun setup-week first.`)
    process.exit(1)
  }
  const schedule = JSON.parse(readFileSync(schedulePath, 'utf-8'))
  const eventIdToIndex = Object.fromEntries(
    schedule.games.map(g => [g.espnEventId, g.gameIndex])
  )

  console.log(`\nFetching final results for Week ${weekId}...\n`)
  const games = await fetchWeekSchedule(season, weekId)

  // Verify all games are finished
  const incomplete = games.filter(g => !g.status.completed)
  if (incomplete.length > 0) {
    console.error(`${incomplete.length} game(s) not yet finished:`)
    incomplete.forEach(g =>
      console.error(`  ${g.awayTeam.abbreviation} @ ${g.homeTeam.abbreviation}: ${g.status.description}`)
    )
    process.exit(1)
  }

  // Build winners mask using stored index ordering
  const orderedGames = new Array(schedule.games.length)
  for (const game of games) {
    const idx = eventIdToIndex[game.espnEventId]
    if (idx === undefined) {
      console.error(`Unknown ESPN event: ${game.espnEventId}`)
      process.exit(1)
    }
    orderedGames[idx] = game
  }

  const winnersMask = computeWinnersMask(orderedGames)
  console.log(`Winners mask: 0b${winnersMask.toString(2)}`)
  console.log('')

  // Print results
  for (let i = 0; i < orderedGames.length; i++) {
    const g = orderedGames[i]
    const homeWon = (winnersMask >> BigInt(i)) & BigInt(1)
    const marker = homeWon ? 'HOME' : 'AWAY'
    console.log(`  [${i}] ${g.awayTeam.abbreviation} ${g.awayTeam.score} @ ${g.homeTeam.abbreviation} ${g.homeTeam.score} => ${marker} wins`)
  }

  // Post on-chain
  const { publicClient, walletClient } = createClients()

  console.log('\nPosting results on-chain...')
  await writeContract(walletClient, publicClient, 'postResults', [BigInt(weekId), winnersMask])

  console.log('Finalizing winners...')
  await writeContract(walletClient, publicClient, 'finalizeWinners', [BigInt(weekId)])

  // Summary
  const weekInfo = await readContract(publicClient, 'getWeekInfo', [BigInt(weekId)])
  console.log(`\nWeek ${weekId} finalized:`)
  console.log(`  Total pot:  ${Number(weekInfo[4]) / 1e6} USDC`)
  console.log(`  Winners:    ${weekInfo[5].toString()} entrants, winner count from contract`)
  console.log(`  Entrants:   ${weekInfo[5]}`)
  console.log('\nDone! Winners can now call claim().')
}

// ── status ──────────────────────────────────────────────────────────────

async function status([weekIdStr, seasonStr]) {
  const weekId = parseInt(weekIdStr)
  const season = parseInt(seasonStr || new Date().getFullYear())
  if (isNaN(weekId)) { console.error('Error: weekId required'); process.exit(1) }

  // On-chain state
  console.log(`\n=== On-Chain: Week ${weekId} ===\n`)
  try {
    const { publicClient } = createClients()
    const info = await readContract(publicClient, 'getWeekInfo', [BigInt(weekId)])
    console.log(`  Games:       ${info[0]}`)
    console.log(`  Lock time:   ${info[1] ? new Date(Number(info[1]) * 1000).toISOString() : 'n/a'}`)
    console.log(`  Results set: ${info[2]}`)
    console.log(`  Finalized:   ${info[3]}`)
    console.log(`  Pot:         ${Number(info[4]) / 1e6} USDC`)
    console.log(`  Entrants:    ${info[5]}`)
  } catch {
    console.log('  Week not yet created on-chain.')
  }

  // ESPN state
  console.log(`\n=== ESPN: Week ${weekId} (${season}) ===\n`)
  try {
    const games = await fetchWeekSchedule(season, weekId)
    if (games.length === 0) {
      console.log('  No games found.')
    }
    for (let i = 0; i < games.length; i++) {
      const g = games[i]
      const st = g.status.completed ? 'FINAL' : g.status.state === 'in' ? 'LIVE' : 'SCHED'
      console.log(`  [${String(i).padStart(2)}] ${g.awayTeam.abbreviation.padEnd(4)} ${String(g.awayTeam.score).padStart(2)} @ ${g.homeTeam.abbreviation.padEnd(4)} ${String(g.homeTeam.score).padStart(2)}  ${st}`)
    }
  } catch (err) {
    console.error(`  ESPN error: ${err.message}`)
  }

  console.log('')
}

main().catch(err => {
  console.error('\nFatal error:', err.message || err)
  process.exit(1)
})
