// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint256 id;
        address payable owner;
        string title;
        string description;
        uint256 price;
        bool available;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;
    mapping(address => uint256[]) public sellerItems;

    event ItemListed(uint256 indexed id, address indexed owner, string title, uint256 price);
    event ItemPurchased(uint256 indexed id, address indexed buyer, address indexed owner, uint256 price);

    function listNewItem(string memory _title, string memory _description, uint256 _price) external {
        require(_price > 0, "Price must be greater than 0");

        itemCount++;
        items[itemCount] = Item(itemCount, payable(msg.sender), _title, _description, _price, true);
        sellerItems[msg.sender].push(itemCount);

        emit ItemListed(itemCount, msg.sender, _title, _price);
    }

    function purchaseItem(uint256 _itemId) external payable {
        require(_itemId > 0 && _itemId <= itemCount, "Invalid item ID");
        Item storage item = items[_itemId];
        require(item.available, "Item is not available");
        require(msg.value >= item.price, "Insufficient funds");

        item.available = false;
        address previousOwner = item.owner;
        item.owner = payable(msg.sender);
        item.owner.transfer(item.price);
        //payable(item.owner).transfer(item.price)
        sellerItems[previousOwner].pop(); // Remove item from previous owner's listings
        //sellerItems[item.owner].pop(); // Remove item from owner's listings

        emit ItemPurchased(_itemId, msg.sender, item.owner, item.price);
    }

    function changeItemAvailability(uint256 _itemId, bool _available) external {
        require(_itemId > 0 && _itemId <= itemCount, "Invalid item ID");
        require(items[_itemId].owner == msg.sender, "You are not the owner of this item");
    
        items[_itemId].available = _available;
    }


    function getSellerItems(address _seller) external view returns (uint256[] memory) {
        return sellerItems[_seller];
    }

    function getAllItems() external view returns (Item[] memory) {
        Item[] memory allItems = new Item[](itemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            allItems[i - 1] = items[i];
        }
        return allItems;
    }
}
