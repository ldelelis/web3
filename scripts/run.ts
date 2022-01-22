import { ethers } from "hardhat"

async function main() {
  const [owner, randomPerson] = await ethers.getSigners()
  const waveContractFactory = await ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.001"),
  })

  await waveContract.deployed()

  console.log("Contract deployed to:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  let contractBalance

  contractBalance = await ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance: ", ethers.utils.formatEther(contractBalance))

  const wavesCount = await waveContract.getWavesCount()
  console.log("waveCount", wavesCount.toNumber())

  const waveTxn = await waveContract.wave("A message")
  await waveTxn.wait()

  const randomWaveTx = await waveContract
    .connect(randomPerson)
    .wave("Random message")
  await randomWaveTx.wait()

  contractBalance = await ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance: ", ethers.utils.formatEther(contractBalance))

  const waves = await waveContract.getWaves()
  console.log("waves", waves)
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
