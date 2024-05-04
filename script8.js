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
    const contractAddress = '0x739F72d13258d1c1BE1d05b27810e46772b6384e';
            const contractABI = [
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
            // Handle the account change here
            const latestAccount = accounts[0];
            console.log("MetaMask account changed to:", latestAccount);
    
            // Update the displayed account on your website
            if(latestAccount){
                connectWalletBtn.textContent = latestAccount;
            }else{
                connectWalletBtn.textContent = "Connect Wallet";
            }
            //page refresh
            location.reload();
            // You may need to update other parts of your UI based on the new account
            // For example, refresh data associated with the new account
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
            //listItemForm.style.display = "block";
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
            itemsContainer.style.display = "block"
            myitemsContainer.style.display = "none";
            myItemsContainer.style.display = "none";
            buyTitle.style.display="block";
            myItemsTitle.style.display= "none";
            homeContainer.style.display ="none";
            homeTitle.style.display="none";
            displayItems()
        }
    })

    /*async  function displayMyItems(){
        try{
            const items = await getAllItems();
            console.log(items);
            myItemsContainer.innerHTML = '';

            // Loop through each item and create a card
            items.forEach(item => {
                console.log(item.owner,'!=', accounts[0]);
                if(item.owner.toUpperCase() == accounts[0].toUpperCase()){
                    const card = document.createElement('div');
                    card.classList.add('card');
                    const cardContent = `
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <p>Price: ${item.price} Wei</p>
                    `;
                    card.innerHTML = cardContent;
                    myItemsContainer.appendChild(card);
                }
            });

        }catch(error){
            console.log('Error displaying My  Items: ', error)
        }
    }*/

    async function displayMyItems() {
        try {
            const items = await getAllItems();
            console.log(items);
            myItemsContainer.innerHTML = '';
    
            // Loop through each item and create a card
            items.forEach(item => {
                console.log(item.owner, '!=', accounts[0]);
                if (item.owner.toUpperCase() == accounts[0].toUpperCase()) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    let cardContent = `
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <p>Price: ${item.price} Wei</p>
                    `;
                    // Check if the item is available
                    if (item.available) {
                        // Display "On Sale" text in green
                        cardContent += `<p style="color: green;">On Sale</p>`;
                    } /*else {
                        // Display "List for sale" button
                        cardContent += `<button class="sell-button" data-item-id="${item.id}">List for sale</button>`;
                    }*/
                    card.innerHTML = cardContent;
                    myItemsContainer.appendChild(card);
                }
            });
    
            // Add event listeners to the "List for sale" buttons
            /*const sellButtons = document.querySelectorAll('.sell-button');
            sellButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const itemId = button.dataset.itemId;
                    await sellItem(itemId);
                });
            });*/
    
        } catch (error) {
            console.log('Error displaying My Items: ', error)
        }
    }
    

    /*async function sellItem(itemId) {
        try {
            // Connect to MetaMask wallet
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];
    
            // Create Web3 instance
            const web3 = new Web3(window.ethereum);
    
            const contract = new web3.eth.Contract(contractABI, contractAddress);
    
            // Call the changeItemAvailability function in the smart contract
            await contract.methods.changeItemAvailability(itemId, true).send({
                from: selectedAccount
            });
    
            // Refresh the displayed items
            displayMyItems();
    
            console.log("Item on Sale!!");
        } catch (error) {
            console.error("Error selling item:", error);
        }
    }*/

    itemForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(itemForm);
        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");

        // Call function to list item in blockchain
        await listNewItem(title, description, price).send({from:accounts[0]}); 
        
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
            console.log(accounts[0]);
            titleTextBox.value = "";
            descriptionTextBox.value = "";
            priceTextBox.value = "";
            console.log(logres.transactionHash)
            showAlert("Item Listed Successfully!!\nTransaction Hash: " + logres.transactionHash);
            //alert("Item Listed Successfully!!\nTransaction Hash: "+logres.transactionHash);
        } catch (error) {
            console.error("Error listing item:", error);
        }
    }
    // Function to display modal with message
    function showAlert(message) {
        document.getElementById("alertMessage").textContent = message;
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

    // Function to display items using card layout
    async function displayItems() {
        try{
            const items = await getAllItems();
            console.log(items);
            // Clear items container
            itemsContainer.innerHTML = '';

            // Loop through each item and create a card
            items.forEach(item => {
                console.log(accounts[0])
                if((item.owner.toUpperCase() != accounts[0].toUpperCase()) && item.available == true) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    const cardContent = `
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <p>Price: ${item.price} Wei</p>
                        <button class="buy-button" data-item-id="${item.id}" data-item-price="${item.price}">Buy</button>
                    `;
                    card.innerHTML = cardContent;
                    itemsContainer.appendChild(card);
                }
            });
        }catch(error){
            console.log(error);
        }
        // Add event listeners to the Buy buttons
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', handleBuyButtonClick);
        });
    }

    // Event handler for the Buy button click event
    async function handleBuyButtonClick(event) {
        const itemId = event.target.dataset.itemId; // Get the ID of the item to buy
        const itemPrice = event.target.dataset.itemPrice; // Get the price of the item
        try {
            // Connect to MetaMask wallet
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];
            ethereum.on('accountsChanged', function(accounts) {
                // Handle the account change here
                const selectedAccount = accounts[0];
                console.log("MetaMask account changed to:", selectedAccount);
            });

            // Create Web3 instance
            const web3 = new Web3(window.ethereum);

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("LLLLLL", accounts[0]);
            const tx = await contract.methods.purchaseItem(itemId, selectedAccount).send({
                from: selectedAccount,
                value: itemPrice
            });
            //value: web3.utils.toWei(itemPrice, 'ether')
            // Transaction successful, update UI or display success message
            console.log("Item purchased successfully:", tx);
            //alert("You have bought an item!");
            showAlert("Item purchased Successfully!!\nTransaction Hash: " + tx.transactionHash);
            console.log(accounts[0])
        } catch (error) {
            // Handle errors, such as user rejection or transaction failure
            console.error("Error purchasing item:", error);
        }
    }
    displayContainer.style.display="none";
});
