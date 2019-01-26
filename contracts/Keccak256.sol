//Current version:0.5.2+commit.1df8f40c.Emscripten.clang
pragma solidity ^0.5.0;

/// @title  Reservez s'il vous plait
/// @author CagliariEthereumLab
/// @notice RSVP aka Reservez s'il vous plait version 0.0.2

contract Keccak256 {

    function getKeccak256(string memory _code) view public returns (bytes32) {
        return keccak256(bytes(_code));
    }
}
