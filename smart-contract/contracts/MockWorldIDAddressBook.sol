// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract MockWorldIDAddressBook {
    mapping(address => uint256) public addressVerifiedUntil;
    
    function setAddressVerifiedUntil(address user, uint256 timestamp) external {
        addressVerifiedUntil[user] = timestamp;
    }
} 