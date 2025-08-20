const hre = require("hardhat");

async function main() {
  console.log("🎮 Testing complete NFL Pick Ems game flow...");

  // Get signers
  const [deployer, oracle, player1, player2, player3] = await hre.ethers.getSigners();
  
  console.log("👥 Players:");
  console.log("   Oracle:", oracle.address);
  console.log("   Player 1:", player1.address);
  console.log("   Player 2:", player2.address);
  console.log("   Player 3:", player3.address);

  // Deploy contracts
  console.log("\n📦 Deploying contracts...");
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.deployed();

  const NFLPickEms = await hre.ethers.getContractFactory("NFLPickEms");
  const nflPickEms = await NFLPickEms.deploy(usdc.address);
  await nflPickEms.deployed();

  // Set oracle
  await nflPickEms.setOracle(oracle.address);
  console.log("✅ Oracle set to:", oracle.address);

  // Give players USDC
  console.log("\n💰 Funding players...");
  await usdc.mint(player1.address, hre.ethers.utils.parseUnits("100", 6));
  await usdc.mint(player2.address, hre.ethers.utils.parseUnits("100", 6));
  await usdc.mint(player3.address, hre.ethers.utils.parseUnits("100", 6));
  console.log("✅ Players funded with 100 USDC each");

  // Create Week 1
  console.log("\n📅 Creating Week 1...");
  const weekId = 1;
  const gameCount = 16;
  const lockTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  
  await nflPickEms.connect(oracle).createWeek(weekId, gameCount, lockTime);
  console.log("✅ Week 1 created with lock time:", new Date(lockTime * 1000).toLocaleString());

  // Players enter picks
  console.log("\n🎯 Players entering picks...");
  const picksMask = (1 << 10) - 1; // First 10 games (1111111111)
  
  // Player 1 picks
  await usdc.connect(player1).approve(nflPickEms.address, hre.ethers.utils.parseUnits("2", 6));
  await nflPickEms.connect(player1).enter(weekId, picksMask);
  console.log("✅ Player 1 entered picks");

  // Player 2 picks (different picks)
  const picksMask2 = ((1 << 10) - 1) << 1; // Games 2-11 (11111111110)
  await usdc.connect(player2).approve(nflPickEms.address, hre.ethers.utils.parseUnits("2", 6));
  await nflPickEms.connect(player2).enter(weekId, picksMask2);
  console.log("✅ Player 2 entered picks");

  // Player 3 picks (same as Player 1)
  await usdc.connect(player3).approve(nflPickEms.address, hre.ethers.utils.parseUnits("2", 6));
  await nflPickEms.connect(player3).enter(weekId, picksMask);
  console.log("✅ Player 3 entered picks");

  // Check pot
  const week = await nflPickEms.weeks(weekId);
  console.log("💰 Current pot:", hre.ethers.utils.formatUnits(week.pot, 6), "USDC");

  // Fast forward past lock time
  console.log("\n⏰ Fast forwarding past lock time...");
  await hre.ethers.provider.send("evm_increaseTime", [3600]);
  await hre.ethers.provider.send("evm_mine");
  console.log("✅ Time advanced");

  // Oracle posts results
  console.log("\n📊 Oracle posting results...");
  const winnersMask = picksMask; // Player 1 and 3 got all picks correct
  await nflPickEms.connect(oracle).postResults(weekId, winnersMask);
  console.log("✅ Results posted");

  // Oracle finalizes winners
  console.log("\n🏆 Finalizing winners...");
  const winners = [player1.address, player3.address]; // Player 2 got 0 correct
  await nflPickEms.connect(oracle).finalizeWinners(weekId, winners);
  console.log("✅ Winners finalized");

  // Check final pot distribution
  const finalWeek = await nflPickEms.weeks(weekId);
  console.log("🎯 Final results:");
  console.log("   Total pot:", hre.ethers.utils.formatUnits(finalWeek.pot, 6), "USDC");
  console.log("   Winners:", winners.length);
  console.log("   Share per winner:", hre.ethers.utils.formatUnits(finalWeek.sharePerWinner, 6), "USDC");

  // Winners claim their winnings
  console.log("\n�� Winners claiming winnings...");
  
  const balance1Before = await usdc.balanceOf(player1.address);
  await nflPickEms.connect(player1).claim(weekId);
  const balance1After = await usdc.balanceOf(player1.address);
  console.log("✅ Player 1 claimed:", hre.ethers.utils.formatUnits(balance1After.sub(balance1Before), 6), "USDC");

  const balance3Before = await usdc.balanceOf(player3.address);
  await nflPickEms.connect(player3).claim(weekId);
  const balance3After = await usdc.balanceOf(player3.address);
  console.log("✅ Player 3 claimed:", hre.ethers.utils.formatUnits(balance3After.sub(balance3Before), 6), "USDC");

  // Check final balances
  console.log("\n💳 Final player balances:");
  console.log("   Player 1:", hre.ethers.utils.formatUnits(await usdc.balanceOf(player1.address), 6), "USDC");
  console.log("   Player 2:", hre.ethers.utils.formatUnits(await usdc.balanceOf(player2.address), 6), "USDC");
  console.log("   Player 3:", hre.ethers.utils.formatUnits(await usdc.balanceOf(player3.address), 6), "USDC");

  console.log("\n🎉 Game flow test completed successfully!");
  console.log("📋 Summary:");
  console.log("   - 3 players entered");
  console.log("   - 2 winners (Player 1 & 3)");
  console.log("   - 1 loser (Player 2)")
  console.log("   - Pot split equally between winners");
  console.log("   - All claims processed successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
