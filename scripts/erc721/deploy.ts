import { ethers } from "hardhat"

async function main() {
  const erc721ContractFactory = await ethers.getContractFactory(
    "Erc721PayPerMint",
  )

  const erc721Contract = await erc721ContractFactory.deploy()

  await erc721Contract.deployed()

  console.log("Greeter address =>", erc721Contract.address)
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
