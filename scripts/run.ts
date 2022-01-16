import { ethers } from "hardhat"

async function main() {
  const [owner, randomPerson] = await ethers.getSigners()
  const waveContractFactory = await ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy()

  await waveContract.deployed()

  console.log("Contract deployed to:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  await waveContract.getTotalWaves()

  const waveTxn = await waveContract.wave()
  await waveTxn.wait()

  const randomWaveTx = await waveContract.connect(randomPerson).wave()
  await randomWaveTx.wait()

  await waveContract.getTotalWaves()
}

async function runMain() {
  try {
    await main()

    process.exit(0)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

runMain()
