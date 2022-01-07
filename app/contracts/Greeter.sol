// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; 

contract Greeter {
  string private greeting;

  constructor(string memory _greeting) {
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }
}