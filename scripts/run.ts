import { ethers } from "hardhat"

async function main() {
  const waveContractFactory = await ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy()

  await waveContract.deployed()

  console.log("Contract deployed to:", waveContract.address)
}

const runMain = async () => {
  try {
    await main()

    process.exit(0)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

runMain()
