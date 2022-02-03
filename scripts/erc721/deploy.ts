import { ethers } from "hardhat"

async function main() {
  const [owner] = await ethers.getSigners()
  const erc721ContractFactory = await ethers.getContractFactory(
    "Erc721PayPerMint",
  )

  const gasPrice = 1e9

  const erc721Contract = await erc721ContractFactory.deploy({
    from: owner.address,
    gasPrice,
  })

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
