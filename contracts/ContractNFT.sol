// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ContractNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _nftIds;

  mapping(uint => CNFT) public contractNFTList;

  struct CNFT {
    uint id;
    string title;
    address author;
    address owner;
  }

  event MintNFT(
    uint id,
    string title,
    address author,
    address owner
  );

  constructor() ERC721("Contract NFT", "CNFT") {}

  function buyContract(string memory _title, address _author) external payable {
    _nftIds.increment();
    uint _id = _nftIds.current();

    contractNFTList[_id] = CNFT(_id, _title, _author, msg.sender);
    _mint(msg.sender, _id);

    emit MintNFT(_id, _title, _author, msg.sender);
  }
}