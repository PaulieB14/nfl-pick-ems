import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";

describe("NFLPickEms", function () {
  let nflPickEms: Contract;
  let mockUSDC: Contract;
  let owner: Signer;
  let oracle: Signer;
  let player1: Signer;
  let player2: Signer;
  let ownerAddress: string;
  let oracleAddress: string;
  let player1Address: string;
  let player2Address: string;

  beforeEach(async function () {
    [owner, oracle, player1, player2] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    oracleAddress = await oracle.getAddress();
    player1Address = await player1.getAddress();
    player2Address = await player2.getAddress();

    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    mockUSDC = await MockUSDC.deploy();
    await mockUSDC.waitForDeployment();

    // Deploy NFLPickEms
    const NFLPickEms = await ethers.getContractFactory("NFLPickEms");
    nflPickEms = await NFLPickEms.deploy(await mockUSDC.getAddress());
    await nflPickEms.waitForDeployment();

    // Set oracle
    await nflPickEms.setOracle(oracleAddress);

    // Mint USDC to players
    await mockUSDC.mint(player1Address, 10000000); // 10 USDC
    await mockUSDC.mint(player2Address, 10000000); // 10 USDC

    // Approve spending
    await mockUSDC.connect(player1).approve(await nflPickEms.getAddress(), 10000000);
    await mockUSDC.connect(player2).approve(await nflPickEms.getAddress(), 10000000);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await nflPickEms.owner()).to.equal(ownerAddress);
    });

    it("Should set the right token", async function () {
      expect(await nflPickEms.token()).to.equal(await mockUSDC.getAddress());
    });

    it("Should set the right oracle", async function () {
      expect(await nflPickEms.oracle()).to.equal(oracleAddress);
    });
  });

  describe("Week Management", function () {
    it("Should allow oracle to create a week", async function () {
      const weekId = 1;
      const gameCount = 16;
      const lockTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      await nflPickEms.connect(oracle).createWeek(weekId, gameCount, lockTime);
      
      const week = await nflPickEms.weekData(weekId);
      expect(week.gameCount).to.equal(gameCount);
      expect(week.lockTime).to.equal(lockTime);
    });

    it("Should not allow non-oracle to create a week", async function () {
      const weekId = 1;
      const gameCount = 16;
      const lockTime = Math.floor(Date.now() / 1000) + 3600;

      await expect(
        nflPickEms.connect(player1).createWeek(weekId, gameCount, lockTime)
      ).to.be.revertedWith("not oracle");
    });
  });

  describe("Entry", function () {
    beforeEach(async function () {
      // Create a week first
      const weekId = 1;
      const gameCount = 16;
      const lockTime = Math.floor(Date.now() / 1000) + 3600;
      await nflPickEms.connect(oracle).createWeek(weekId, gameCount, lockTime);
    });

    it("Should allow players to enter with valid picks", async function () {
      const weekId = 1;
      const picksMask = 1023; // 10 bits set (0b1111111111)

      await nflPickEms.connect(player1).enter(weekId, picksMask);
      
      const playerPicks = await nflPickEms.picksMask(weekId, player1Address);
      expect(playerPicks).to.equal(picksMask);
    });

    it("Should require exactly 10 picks", async function () {
      const weekId = 1;
      const picksMask = 511; // 9 bits set (0b111111111)

      await expect(
        nflPickEms.connect(player1).enter(weekId, picksMask)
      ).to.be.revertedWith("must pick exactly 10");
    });
  });
});
