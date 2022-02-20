/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Membership, MembershipInterface } from "../Membership";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "MEMBERSHIP",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060600160405280602781526020016200332e602791396200003d816200006c60201b60201c565b5062000066336000633b9aca00604051806020016040528060008152506200008860201b60201c565b62000c9e565b80600290805190602001906200008492919062000553565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415620000fb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000f2906200082b565b60405180910390fd5b60006200010d6200024d60201b60201c565b9050620001468160008762000128886200025560201b60201c565b62000139886200025560201b60201c565b876200031e60201b60201c565b8260008086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620001a79190620008bc565b925050819055508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628787604051620002279291906200084d565b60405180910390a462000246816000878787876200032660201b60201c565b5050505050565b600033905090565b60606000600167ffffffffffffffff8111156200029b577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015620002ca5781602001602082028036833780820191505090505b509050828160008151811062000309577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080915050919050565b505050505050565b620003528473ffffffffffffffffffffffffffffffffffffffff166200053060201b620007da1760201c565b1562000528578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016200039b9594939291906200075f565b602060405180830381600087803b158015620003b657600080fd5b505af1925050508015620003ea57506040513d601f19601f82011682018060405250810190620003e791906200061a565b60015b6200049c57620003f962000ab2565b806308c379a014156200045d57506200041162000be2565b806200041e57506200045f565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004549190620007c3565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200049390620007e7565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161462000526576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200051d9062000809565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b8280546200056190620009b9565b90600052602060002090601f016020900481019282620005855760008555620005d1565b82601f10620005a057805160ff1916838001178555620005d1565b82800160010185558215620005d1579182015b82811115620005d0578251825591602001919060010190620005b3565b5b509050620005e09190620005e4565b5090565b5b80821115620005ff576000816000905550600101620005e5565b5090565b600081519050620006148162000c84565b92915050565b6000602082840312156200062d57600080fd5b60006200063d8482850162000603565b91505092915050565b620006518162000919565b82525050565b6000620006648262000884565b6200067081856200089a565b93506200068281856020860162000983565b6200068d8162000ad7565b840191505092915050565b6000620006a5826200088f565b620006b18185620008ab565b9350620006c381856020860162000983565b620006ce8162000ad7565b840191505092915050565b6000620006e8603483620008ab565b9150620006f58262000af5565b604082019050919050565b60006200070f602883620008ab565b91506200071c8262000b44565b604082019050919050565b600062000736602183620008ab565b9150620007438262000b93565b604082019050919050565b620007598162000979565b82525050565b600060a08201905062000776600083018862000646565b62000785602083018762000646565b6200079460408301866200074e565b620007a360608301856200074e565b8181036080830152620007b7818462000657565b90509695505050505050565b60006020820190508181036000830152620007df818462000698565b905092915050565b600060208201905081810360008301526200080281620006d9565b9050919050565b60006020820190508181036000830152620008248162000700565b9050919050565b60006020820190508181036000830152620008468162000727565b9050919050565b60006040820190506200086460008301856200074e565b6200087360208301846200074e565b9392505050565b6000604051905090565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000620008c98262000979565b9150620008d68362000979565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156200090e576200090d62000a25565b5b828201905092915050565b6000620009268262000959565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b83811015620009a357808201518184015260208101905062000986565b83811115620009b3576000848401525b50505050565b60006002820490506001821680620009d257607f821691505b60208210811415620009e957620009e862000a54565b5b50919050565b620009fa8262000ad7565b810181811067ffffffffffffffff8211171562000a1c5762000a1b62000a83565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d111562000ad45760046000803e62000ad160005162000ae8565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600060443d101562000bf45762000c81565b62000bfe6200087a565b60043d036004823e80513d602482011167ffffffffffffffff8211171562000c2857505062000c81565b808201805167ffffffffffffffff81111562000c48575050505062000c81565b80602083010160043d03850181111562000c6757505050505062000c81565b62000c7882602001850186620009ef565b82955050505050505b90565b62000c8f816200092d565b811462000c9b57600080fd5b50565b6126808062000cae6000396000f3fe608060405234801561001057600080fd5b50600436106100925760003560e01c80634e1273f4116100665780634e1273f41461014357806389df51f114610173578063a22cb46514610191578063e985e9c5146101ad578063f242432a146101dd57610092565b8062fdd58e1461009757806301ffc9a7146100c75780630e89341c146100f75780632eb2c2d614610127575b600080fd5b6100b160048036038101906100ac919061181d565b6101f9565b6040516100be9190611e5a565b60405180910390f35b6100e160048036038101906100dc91906118c5565b6102c2565b6040516100ee9190611cdd565b60405180910390f35b610111600480360381019061010c9190611917565b6103a4565b60405161011e9190611cf8565b60405180910390f35b610141600480360381019061013c9190611693565b610438565b005b61015d60048036038101906101589190611859565b6104d9565b60405161016a9190611c84565b60405180910390f35b61017b61068a565b6040516101889190611e5a565b60405180910390f35b6101ab60048036038101906101a691906117e1565b61068f565b005b6101c760048036038101906101c29190611657565b6106a5565b6040516101d49190611cdd565b60405180910390f35b6101f760048036038101906101f29190611752565b610739565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561026a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161026190611d5a565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061038d57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061039d575061039c826107fd565b5b9050919050565b6060600280546103b3906120c9565b80601f01602080910402602001604051908101604052809291908181526020018280546103df906120c9565b801561042c5780601f106104015761010080835404028352916020019161042c565b820191906000526020600020905b81548152906001019060200180831161040f57829003601f168201915b50505050509050919050565b610440610867565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610486575061048585610480610867565b6106a5565b5b6104c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104bc90611dba565b60405180910390fd5b6104d2858585858561086f565b5050505050565b6060815183511461051f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051690611e1a565b60405180910390fd5b6000835167ffffffffffffffff811115610562577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156105905781602001602082028036833780820191505090505b50905060005b845181101561067f576106298582815181106105db577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015185838151811061061c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516101f9565b828281518110610662577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018181525050806106789061212c565b9050610596565b508091505092915050565b600081565b6106a161069a610867565b8383610bcf565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610741610867565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610787575061078685610781610867565b6106a5565b5b6107c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107bd90611d7a565b60405180910390fd5b6107d38585858585610d3c565b5050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b81518351146108b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108aa90611e3a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610923576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091a90611d9a565b60405180910390fd5b600061092d610867565b905061093d818787878787610fbe565b60005b8451811015610b3a576000858281518110610984577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151905060008583815181106109c9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a6a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6190611dda565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b1f9190611fbd565b9250508190555050505080610b339061212c565b9050610940565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610bb1929190611ca6565b60405180910390a4610bc7818787878787610fc6565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3590611dfa565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610d2f9190611cdd565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610dac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da390611d9a565b60405180910390fd5b6000610db6610867565b9050610dd6818787610dc7886111ad565b610dd0886111ad565b87610fbe565b600080600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083811015610e6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e6490611dda565b60405180910390fd5b83810360008087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360008087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f229190611fbd565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628888604051610f9f929190611e75565b60405180910390a4610fb5828888888888611273565b50505050505050565b505050505050565b610fe58473ffffffffffffffffffffffffffffffffffffffff166107da565b156111a5578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161102b959493929190611bc2565b602060405180830381600087803b15801561104557600080fd5b505af192505050801561107657506040513d601f19601f8201168201806040525081019061107391906118ee565b60015b61111c57611082612202565b806308c379a014156110df5750611097612558565b806110a257506110e1565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d69190611cf8565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111390611d1a565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146111a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161119a90611d3a565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156111f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156112205781602001602082028036833780820191505090505b509050828160008151811061125e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080915050919050565b6112928473ffffffffffffffffffffffffffffffffffffffff166107da565b15611452578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016112d8959493929190611c2a565b602060405180830381600087803b1580156112f257600080fd5b505af192505050801561132357506040513d601f19601f8201168201806040525081019061132091906118ee565b60015b6113c95761132f612202565b806308c379a0141561138c5750611344612558565b8061134f575061138e565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113839190611cf8565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113c090611d1a565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611450576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161144790611d3a565b60405180910390fd5b505b505050505050565b600061146d61146884611ec3565b611e9e565b9050808382526020820190508285602086028201111561148c57600080fd5b60005b858110156114bc57816114a28882611570565b84526020840193506020830192505060018101905061148f565b5050509392505050565b60006114d96114d484611eef565b611e9e565b905080838252602082019050828560208602820111156114f857600080fd5b60005b85811015611528578161150e8882611642565b8452602084019350602083019250506001810190506114fb565b5050509392505050565b600061154561154084611f1b565b611e9e565b90508281526020810184848401111561155d57600080fd5b611568848285612087565b509392505050565b60008135905061157f816125ee565b92915050565b600082601f83011261159657600080fd5b81356115a684826020860161145a565b91505092915050565b600082601f8301126115c057600080fd5b81356115d08482602086016114c6565b91505092915050565b6000813590506115e881612605565b92915050565b6000813590506115fd8161261c565b92915050565b6000815190506116128161261c565b92915050565b600082601f83011261162957600080fd5b8135611639848260208601611532565b91505092915050565b60008135905061165181612633565b92915050565b6000806040838503121561166a57600080fd5b600061167885828601611570565b925050602061168985828601611570565b9150509250929050565b600080600080600060a086880312156116ab57600080fd5b60006116b988828901611570565b95505060206116ca88828901611570565b945050604086013567ffffffffffffffff8111156116e757600080fd5b6116f3888289016115af565b935050606086013567ffffffffffffffff81111561171057600080fd5b61171c888289016115af565b925050608086013567ffffffffffffffff81111561173957600080fd5b61174588828901611618565b9150509295509295909350565b600080600080600060a0868803121561176a57600080fd5b600061177888828901611570565b955050602061178988828901611570565b945050604061179a88828901611642565b93505060606117ab88828901611642565b925050608086013567ffffffffffffffff8111156117c857600080fd5b6117d488828901611618565b9150509295509295909350565b600080604083850312156117f457600080fd5b600061180285828601611570565b9250506020611813858286016115d9565b9150509250929050565b6000806040838503121561183057600080fd5b600061183e85828601611570565b925050602061184f85828601611642565b9150509250929050565b6000806040838503121561186c57600080fd5b600083013567ffffffffffffffff81111561188657600080fd5b61189285828601611585565b925050602083013567ffffffffffffffff8111156118af57600080fd5b6118bb858286016115af565b9150509250929050565b6000602082840312156118d757600080fd5b60006118e5848285016115ee565b91505092915050565b60006020828403121561190057600080fd5b600061190e84828501611603565b91505092915050565b60006020828403121561192957600080fd5b600061193784828501611642565b91505092915050565b600061194c8383611ba4565b60208301905092915050565b61196181612013565b82525050565b600061197282611f5c565b61197c8185611f8a565b935061198783611f4c565b8060005b838110156119b857815161199f8882611940565b97506119aa83611f7d565b92505060018101905061198b565b5085935050505092915050565b6119ce81612025565b82525050565b60006119df82611f67565b6119e98185611f9b565b93506119f9818560208601612096565b611a0281612224565b840191505092915050565b6000611a1882611f72565b611a228185611fac565b9350611a32818560208601612096565b611a3b81612224565b840191505092915050565b6000611a53603483611fac565b9150611a5e82612242565b604082019050919050565b6000611a76602883611fac565b9150611a8182612291565b604082019050919050565b6000611a99602b83611fac565b9150611aa4826122e0565b604082019050919050565b6000611abc602983611fac565b9150611ac78261232f565b604082019050919050565b6000611adf602583611fac565b9150611aea8261237e565b604082019050919050565b6000611b02603283611fac565b9150611b0d826123cd565b604082019050919050565b6000611b25602a83611fac565b9150611b308261241c565b604082019050919050565b6000611b48602983611fac565b9150611b538261246b565b604082019050919050565b6000611b6b602983611fac565b9150611b76826124ba565b604082019050919050565b6000611b8e602883611fac565b9150611b9982612509565b604082019050919050565b611bad8161207d565b82525050565b611bbc8161207d565b82525050565b600060a082019050611bd76000830188611958565b611be46020830187611958565b8181036040830152611bf68186611967565b90508181036060830152611c0a8185611967565b90508181036080830152611c1e81846119d4565b90509695505050505050565b600060a082019050611c3f6000830188611958565b611c4c6020830187611958565b611c596040830186611bb3565b611c666060830185611bb3565b8181036080830152611c7881846119d4565b90509695505050505050565b60006020820190508181036000830152611c9e8184611967565b905092915050565b60006040820190508181036000830152611cc08185611967565b90508181036020830152611cd48184611967565b90509392505050565b6000602082019050611cf260008301846119c5565b92915050565b60006020820190508181036000830152611d128184611a0d565b905092915050565b60006020820190508181036000830152611d3381611a46565b9050919050565b60006020820190508181036000830152611d5381611a69565b9050919050565b60006020820190508181036000830152611d7381611a8c565b9050919050565b60006020820190508181036000830152611d9381611aaf565b9050919050565b60006020820190508181036000830152611db381611ad2565b9050919050565b60006020820190508181036000830152611dd381611af5565b9050919050565b60006020820190508181036000830152611df381611b18565b9050919050565b60006020820190508181036000830152611e1381611b3b565b9050919050565b60006020820190508181036000830152611e3381611b5e565b9050919050565b60006020820190508181036000830152611e5381611b81565b9050919050565b6000602082019050611e6f6000830184611bb3565b92915050565b6000604082019050611e8a6000830185611bb3565b611e976020830184611bb3565b9392505050565b6000611ea8611eb9565b9050611eb482826120fb565b919050565b6000604051905090565b600067ffffffffffffffff821115611ede57611edd6121d3565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611f0a57611f096121d3565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611f3657611f356121d3565b5b611f3f82612224565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611fc88261207d565b9150611fd38361207d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561200857612007612175565b5b828201905092915050565b600061201e8261205d565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156120b4578082015181840152602081019050612099565b838111156120c3576000848401525b50505050565b600060028204905060018216806120e157607f821691505b602082108114156120f5576120f46121a4565b5b50919050565b61210482612224565b810181811067ffffffffffffffff82111715612123576121226121d3565b5b80604052505050565b60006121378261207d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561216a57612169612175565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d11156122215760046000803e61221e600051612235565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b600060443d1015612568576125eb565b612570611eb9565b60043d036004823e80513d602482011167ffffffffffffffff821117156125985750506125eb565b808201805167ffffffffffffffff8111156125b657505050506125eb565b80602083010160043d0385018111156125d35750505050506125eb565b6125e2826020018501866120fb565b82955050505050505b90565b6125f781612013565b811461260257600080fd5b50565b61260e81612025565b811461261957600080fd5b50565b61262581612031565b811461263057600080fd5b50565b61263c8161207d565b811461264757600080fd5b5056fea26469706673582212206634999c3e62c5ee9832779cff8613618745bf31762e4540dc9aa99a9468077664736f6c6343000801003368747470733a2f2f67616d652e6578616d706c652f6170692f6974656d2f7b69647d2e6a736f6e";

type MembershipConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MembershipConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Membership__factory extends ContractFactory {
  constructor(...args: MembershipConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Membership";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Membership> {
    return super.deploy(overrides || {}) as Promise<Membership>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Membership {
    return super.attach(address) as Membership;
  }
  connect(signer: Signer): Membership__factory {
    return super.connect(signer) as Membership__factory;
  }
  static readonly contractName: "Membership";
  public readonly contractName: "Membership";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MembershipInterface {
    return new utils.Interface(_abi) as MembershipInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Membership {
    return new Contract(address, _abi, signerOrProvider) as Membership;
  }
}
