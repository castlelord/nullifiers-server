// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PublicKeyMerkleTree {
    uint256 public constant requiredAmount = 1 ether;
    address public owner;

    event PublicKeyAdded(address indexed sender, bytes publicKey);

    constructor() {
        owner = msg.sender;
    }

    function addPublicKey(bytes memory publicKey) public payable {
        require(msg.value == requiredAmount, "Incorrect amount of ETH sent");

        // Emit event with sender's address and public key
        emit PublicKeyAdded(msg.sender, publicKey);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
