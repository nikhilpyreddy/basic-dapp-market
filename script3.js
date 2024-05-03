document.addEventListener("DOMContentLoaded", async function() {
    const connectWalletBtn = document.getElementById("connectWalletBtn");
    const listItemBtn = document.getElementById("listItemBtn");
    const homeBtn = document.getElementById("homeBtn");
    const myItemsBtn = document.getElementById("myItemsBtn");
    const listItemForm = document.getElementById("listItemForm");
    const itemForm = document.getElementById("itemForm");
    const itemsContainer = document.getElementById("itemsContainer");
    let isConnected = false;
    let accounts = [];
    const contractAddress = '0x6B1ec0D7349d7976C4886a72c2Cb2291ffC6Ee84';
            const contractABI = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemListed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "ItemPurchased",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "listNewItem",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_itemId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseItem",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAllItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address payable",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "available",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Marketplace.Item[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_seller",
                        "type": "address"
                    }
                ],
                "name": "getSellerItems",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "itemCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "items",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "available",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "sellerItems",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
            ]

    connectWalletBtn.addEventListener("click", async function() {
        if (isConnected) {
            disconnectWallet();
        } else {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Request account access
                    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    myItemsBtn.style.display = 'inline-block';
                    console.log("Connected to MetaMask!");

                    // Update button text to display wallet address
                    connectWalletBtn.textContent = accounts[0];
                    isConnected = true;
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("MetaMask extension is not installed!");
            }
        }
    });

    homeBtn.addEventListener("click", function(){
        listItemForm.style.display = "none";
        displayContainer.style.display = "block";
    })

    listItemBtn.addEventListener("click", function() {
        if (!isConnected) {
            listItemForm.style.display = "none";
            return alert('Please connect your wallet first!');
        }
        else{
            //listItemForm.style.display = "block";
                listItemForm.style.display = "block";
                displayContainer.style.display="none";
        }
    });

    itemForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(itemForm);
        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");

        // Call function to list item in blockchain
        await listNewItem(title, description, price).send({from:accounts[0]}); 

        // Hide the form after listing item
        //listItemForm.style.display = "none";
        
    });

    // Function to list item in blockchain
    async function listNewItem(title, description, price) {

        try {
            // Create a contract instance
            const w3 = new Web3(window.ethereum);
            const contract = new w3.eth.Contract(contractABI, contractAddress);
            
            const wprice = w3.utils.toWei(price.toString(), 'ether'); 
            const logres = await contract.methods.listNewItem(title, description, wprice).send({from:accounts[0]});
    
            // Display success message or update items list
            // You can customize this based on your UI requirements
            console.log("Item listed successfully");
        } catch (error) {
            console.error("Error listing item:", error);
        }
    }

    // Function to disconnect wallet
    function disconnectWallet() {
        isConnected = false;
        connectWalletBtn.textContent = "Connect Wallet";
        myItemsBtn.style.display = "none";
    }

    // Function to get all items from the smart contract
    async function getAllItems() {
        try{
            //const items = []; // Array to store items
            // Create a contract instance
            const w3 = new Web3(window.ethereum);
            const contract = new w3.eth.Contract(contractABI, contractAddress); 

            // Call the contract function to get all items
            const itemCount  = await contract.methods.itemCount().call();
            //const itemCount = await contract.methods.getAllItems();
            console.log("Item Count: ", itemCount)
            
            let items = [];
            for (let i=1;i<=itemCount;i++){
                const item = await contract.methods.items(i).call()
                items.push(item);
            }
            return items;
        }
        catch(error) {
            console.log('Error fetching items: ', error);
        }
    }

    // Function to display items using card layout
    async function displayItems() {
        const items = await getAllItems();
        console.log(items);
        // Clear items container
        
        //itemsContainer.innerHTML = '';

        itemsContainer.innerHTML = '';

        // Loop through each item and create a card
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            // Create card content (title, description, price, etc.)
            // Replace 'item.title', 'item.description', 'item.price', etc. with your actual item properties
            const cardContent = `
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p>Price: ${item.price} Wei</p>
                
            `;
            card.innerHTML = cardContent;
            itemsContainer.appendChild(card);
        });
        //itemsContainer.appendChild('</div></div>');
    }

    // Call the function to display items when the page loads
    displayItems();
});
