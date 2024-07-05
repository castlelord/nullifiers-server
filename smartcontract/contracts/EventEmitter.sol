
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventEmitter {
    event TransactionReceived(address indexed sender, uint256 value);

    receive() external payable {
        emit TransactionReceived(msg.sender, msg.value);
    }
}