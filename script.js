document.addEventListener("DOMContentLoaded", async function() {
    const connectWalletBtn = document.getElementById("connectWalletBtn");
    const listItemBtn = document.getElementById("listItemBtn");
    const homeBtn = document.getElementById("homeBtn");
    const myItemsBtn = document.getElementById("myItemsBtn");
    const buyBtn = document.getElementById("buyBtn");
    const listItemForm = document.getElementById("listItemForm");
    const itemForm = document.getElementById("itemForm");
    const itemsContainer = document.getElementById("itemsContainer");
    const myitemsContainer = document.getElementById("myitemsContainer");
    const myItemsContainer = document.getElementById("myItemsContainer");
    const displayContainer = document.getElementById( "displayContainer" );
    const homeContainer = document.getElementById( "homeContainer");
    const buyTitle = document.getElementById("buy-title")
    const myItemsTitle = document.getElementById("my-items-title")
    const homeTitle =  document.getElementById("home-title")
    const titleTextBox = document.getElementById("title");
    const descriptionTextBox =  document.getElementById("description");
    const priceTextBox = document.getElementById("price");
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    let isConnected = false;
    let accounts = [];
    const contractAddress = '0xEEfE079DedA78a2823d9B4E526dBFd3fe46B4651';
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
                            "name": "owner",
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
                            "name": "owner",
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
                            "internalType": "uint256",
                            "name": "_itemId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "_available",
                            "type": "bool"
                        }
                    ],
                    "name": "changeItemAvailability",
                    "outputs": [],
                    "stateMutability": "nonpayable",
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
                                    "name": "owner",
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
                            "name": "owner",
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
                    displayItems();
                    checkAccountChange();
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("MetaMask extension is not installed!");
            }
        }
    });

    function checkAccountChange() {
        ethereum.on('accountsChanged', function(accounts) {
            const latestAccount = accounts[0];
            console.log("MetaMask account changed to:", latestAccount);
            if(latestAccount){
                connectWalletBtn.textContent = latestAccount;
            }else{
                connectWalletBtn.textContent = "Connect Wallet";
            }
            location.reload();
            displayItems();
        });
    }

    homeBtn.addEventListener("click", function(){
        listItemForm.style.display = "none";
        displayContainer.style.display = "none";
        myitemsContainer.style.display = "none";
        buyTitle.style.display="none";
        myItemsTitle.style.display= "none";
        homeContainer.style.display ="block";
        homeTitle.style.display="block";
    });

    listItemBtn.addEventListener("click", function() {
        if (!isConnected) {
            listItemForm.style.display = "none";
            return alert('Please connect your wallet first!');
        }
        else{
            listItemForm.style.display = "block";
            displayContainer.style.display="none";
            myitemsContainer.style.display ="none";
            buyTitle.style.display="none";
            myItemsTitle.style.display= "none";
            homeContainer.style.display ="none";
            homeTitle.style.display="none";
        }
    })

    myItemsBtn.addEventListener("click", function(){
        listItemForm.style.display = "none";
        displayContainer.style.display = "none";
        myitemsContainer.style.display= "block" ;
        myItemsContainer.style.display = "flex";
        buyTitle.style.display="none";
        myItemsTitle.style.display= "block";
        homeContainer.style.display ="none";
        homeTitle.style.display="none";
        displayMyItems()
    })

    buyBtn.addEventListener("click", function () {
        if (!isConnected) {
            listItemForm.style.display = "none";
            return alert('Please connect your wallet first!');
        }
        else{
            console.log(accounts[0])
            console.log("Buy Button Clicked");
            listItemForm.style.display = "none";
            displayContainer.style.display = "block"
            itemsContainer.style.display = "flex"
            myitemsContainer.style.display = "none";
            myItemsContainer.style.display = "none";
            buyTitle.style.display="block";
            myItemsTitle.style.display= "none";
            homeContainer.style.display ="none";
            homeTitle.style.display="none";
            displayItems()
        }
    })

    async function displayMyItems() {
        try {
            const items = await getAllItems();
            console.log(items);
            myItemsContainer.innerHTML = '';
            const w3 = new Web3(window.ethereum);
            items.forEach(item => {
                console.log(item.owner, '!=', accounts[0]);
                if (item.owner.toUpperCase() == accounts[0].toUpperCase()) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    let cardContent = `
                        <h2>${sanitizeData(item.title)}</h2>
                        <p>${sanitizeData(item.description)}</p>
                        <p>Price: ${w3.utils.fromWei(item.price.toString(), 'ether')} ETH</p>
                    `;
                    if (item.available) {
                        cardContent += `<p style="color: green;">On Sale</p>`;
                    }
                    card.innerHTML = cardContent;
                    myItemsContainer.appendChild(card);
                }
            });
    
        } catch (error) {
            console.log('Error displaying My Items: ', error)
        }
    }

    function sanitizeData(input) {
        // Replace '<' and '>' characters with their HTML entity equivalents
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    itemForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(itemForm);
        const title = formData.get("title");
        const description = formData.get("description");
        const price = document.getElementById("price").value;
        await listNewItem(title, description, price).send({from:accounts[0]}); 
        
    });


    async function listNewItem(title, description, price) {

        try {
            const w3 = new Web3(window.ethereum);
            const contract = new w3.eth.Contract(contractABI, contractAddress);
            
            const wprice = w3.utils.toWei(price, 'ether'); 
            const logres = await contract.methods.listNewItem(title, description, wprice).send({from:accounts[0]});
            console.log("Item listed successfully");
            console.log(accounts[0]);
            titleTextBox.value = "";
            descriptionTextBox.value = "";
            priceTextBox.value = "";
            console.log(logres.transactionHash)
            showAlert(logres.transactionHash);
        } catch (error) {
            console.error("Error listing item:", error);
        }
    }
    // Function to display modal with message
    function showAlert(transactionHash) {
        const message = `Item Listed Successfully!!<br>Transaction Hash: <a href="https://sepolia.etherscan.io/tx/${transactionHash}" target="_blank">${transactionHash}</a>`;
        document.getElementById("alertMessage").innerHTML = message;
        modal.style.display = "block";
    }
    // Function to display modal with message
    function showPurchaseAlert(transactionHash) {
        const message = `Item Purchased Successfully!!<br>Transaction Hash: <a href="https://sepolia.etherscan.io/tx/${transactionHash}" target="_blank">${transactionHash}</a>`;
        document.getElementById("alertMessage").innerHTML = message;
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Function to disconnect wallet
    function disconnectWallet() {
        isConnected = false;
        accounts = [];
        connectWalletBtn.textContent = "Connect Wallet";
        myItemsBtn.style.display = "none";
        location.reload();
    }

    // Function to get all items from the smart contract
    async function getAllItems() {
        try{
            const w3 = new Web3(window.ethereum);
            const contract = new w3.eth.Contract(contractABI, contractAddress); 
            const itemCount  = await contract.methods.itemCount().call();
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

    async function displayItems() {
        try{
            const items = await getAllItems();
            console.log(items);
            itemsContainer.innerHTML = '';
            const w3 = new Web3(window.ethereum);
            items.forEach(item => {
                console.log(accounts[0])
                if((item.owner.toUpperCase() != accounts[0].toUpperCase()) && item.available == true) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    const cardContent = `
                        <h2>${sanitizeData(item.title)}</h2>
                        <p>${sanitizeData(item.description)}</p>
                        <p>Price: ${w3.utils.fromWei(item.price.toString(), 'ether')} ETH</p>
                        <button class="buy-button" data-item-id="${item.id}" data-item-price=${item.price}>Buy</button>
                    `;
                    card.innerHTML = cardContent;
                    itemsContainer.appendChild(card);
                }
            });
        }catch(error){
            console.log(error);
        }
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', handleBuyButtonClick);
        });
    }

    async function handleBuyButtonClick(event) {
        const itemId = event.target.dataset.itemId;
        const itemPrice = event.target.dataset.itemPrice;
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];
            ethereum.on('accountsChanged', function(accounts) {
                const selectedAccount = accounts[0];
                console.log("MetaMask account changed to:", selectedAccount);
            });

            const web3 = new Web3(window.ethereum);

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("LLLLLL", accounts[0]);
            const tx = await contract.methods.purchaseItem(itemId, selectedAccount).send({
                from: selectedAccount,
                value: itemPrice
            });
            console.log("Item purchased successfully:", tx);
            showPurchaseAlert(tx.transactionHash);
            displayItems()
            console.log(accounts[0])
        } catch (error) {
            console.error("Error purchasing item:", error);
        }
    }
    displayContainer.style.display="none";
});
