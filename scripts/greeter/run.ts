import { ethers } from "hardhat"

async function main() {
  const [owner] = await ethers.getSigners()

  const greeterContractFactory = await ethers.getContractFactory("Greeter")

  const greeting = "Hello world"
  const greeterContract = await greeterContractFactory.deploy(greeting)

  await greeterContract.deployed()

  console.log("Contract deployed to:", greeterContract.address)
  console.log("Contract deployed by:", owner.address)

  await greeterContract.greet()

  console.log("Greeted")
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
