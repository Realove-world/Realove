// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


interface IWorldIdAddressBook {
    function addressVerifiedUntil(address) external view returns (uint256);
}


contract TUTE is ERC20 {
    IWorldIdAddressBook public immutable worldAddressBook;

    uint256 public constant CLAIM_FREQUENCY_SECONDS = 60 * 5;
    uint256 public constant CLAIM_AMOUNT = 1 ether;

    mapping(address => uint256) public lastMint;

    constructor(IWorldIdAddressBook _worldAddressBook) ERC20("TUTE", "TUTE") {
        worldAddressBook = _worldAddressBook;
    }

    function claim() external {
        // Ensure msg.sender is in the registry
        // require (worldAddressBook.addressVerifiedUntil(msg.sender) > 0, "Address not verified");
        // require(
        //     lastMint[msg.sender] + CLAIM_FREQUENCY_SECONDS < block.timestamp,
        //     "Your claim is not available yet"
        // );
        lastMint[msg.sender] = block.timestamp;
        _mint(msg.sender, CLAIM_AMOUNT);
    }
}