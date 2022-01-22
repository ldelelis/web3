// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 internal wavesCount;
  Wave[] internal waves;

  event NewWave(address indexed from, uint256 timestamp, string message);

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }


  constructor() payable {
    console.log("Yo yo, I am a contract and I am smart");
  }

  function wave(string memory _message) public {
    wavesCount += 1;
    console.log("%s waved w/ message %s", msg.sender, _message);

    waves.push(Wave(msg.sender, _message, block.timestamp));

    emit NewWave(msg.sender, block.timestamp, _message);

    uint256 prizeAmount = 0.0001 ether;

    console.log("%s balance", address(this).balance);

    require(
      prizeAmount < address(this).balance,
      "No more money to give away"
    );

    payable(msg.sender).transfer(prizeAmount);

    // (bool success, ) = (msg.sender).call{value: prizeAmount}("");
    // require(success, "Failed to withdraw money");
  }

  function getWaves() public view returns (Wave[] memory) {
    return waves;
  }

  function getWavesCount() public view returns (uint256) {
    console.log("We have %d total waves!", wavesCount);
    return wavesCount;
  }
}