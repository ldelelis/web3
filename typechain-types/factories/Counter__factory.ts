/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Counter, CounterInterface } from "../Counter";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "Increased",
    type: "event",
  },
  {
    inputs: [],
    name: "increase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "value",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101a8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633fa4f2451461003b578063e8927fbc14610059575b600080fd5b610043610063565b60405161005091906100c8565b60405180910390f35b610061610069565b005b60005481565b600160005461007891906100e3565b6000819055507f3496c3ede4ec3ab3686712aa1c238593ea6a42df83f98a5ec7df9834cfa577c56000546040516100af91906100c8565b60405180910390a1565b6100c281610139565b82525050565b60006020820190506100dd60008301846100b9565b92915050565b60006100ee82610139565b91506100f983610139565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561012e5761012d610143565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220eda829eb27b1515727a25464d5d6695f7e32e24c96c6d08c982549fdaebf080964736f6c63430008040033";

type CounterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CounterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Counter__factory extends ContractFactory {
  constructor(...args: CounterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Counter";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Counter> {
    return super.deploy(overrides || {}) as Promise<Counter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Counter {
    return super.attach(address) as Counter;
  }
  connect(signer: Signer): Counter__factory {
    return super.connect(signer) as Counter__factory;
  }
  static readonly contractName: "Counter";
  public readonly contractName: "Counter";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CounterInterface {
    return new utils.Interface(_abi) as CounterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Counter {
    return new Contract(address, _abi, signerOrProvider) as Counter;
  }
}
