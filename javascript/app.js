


document.getElementById('create').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validate input fields
  if (!username || !password) {
    alert('Username and password cannot be empty.');
    return;
  }

  // Disable the button while creating an account
  const createButton = document.getElementById('create');
  createButton.disabled = true;

  try {
    const response = await fetch('/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('username', username);
      window.location.href = 'raid.html'; // Change this to your target page
    } else {
      alert('Account creation failed: ' + (result.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error creating account:', error);
    alert('Account already exists or server error.');
  } finally {
    // Re-enable the button after process is done
    createButton.disabled = false;
  }
});

document.getElementById('login').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validate input fields
  if (!username || !password) {
    alert('Username and password cannot be empty.');
    return;
  }

  // Disable the button while logging in
  const loginButton = document.getElementById('login');
  loginButton.disabled = true;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('username', username);
      window.location.href = 'raid.html'; // Change this to your target page
    } else {
      alert('Login failed: ' + (result.message || 'Wrong password.'));
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Account doesn\'t exist or server error.');
  } finally {
    // Re-enable the button after process is done
    loginButton.disabled = false;
  }
});






//import { loot } from "./loot.js";
  // Global variables
  // let randLoot
  // let currentUserName;
  // // Load accounts from local storage or initialize as an empty object
  // //let accounts = JSON.parse(localStorage.getItem('accounts')) || {};
  // let sellcounter = 0;
  // let userTime
  // On button click, run roll function
  // $("#roll").click(roll);
  
  // function roll() {
  //     sellcounter = 0;
  //     userTime = accounts[currentUserName].time;
  //     if (userTime < 1){
  //         accounts[currentUserName].time = 10; // Update the time in the accounts object
  //         saveAccounts();
  //     }
  //     userTime = accounts[currentUserName].time;
  //     $("#roll").hide();
  //     $(".loot-container, #bank, .stash").show().empty();
  
  //     // Initial display of time
  //     $(".loot-container").html(`<p class="time">${formatTime(userTime)}</p>`);
  
  //     // Countdown function
  //     const countdown = setInterval(() => {
  //         userTime--;
  //         let newTime = userTime
  //         accounts[currentUserName].time = newTime; // Update the time in the accounts object
  //         saveAccounts();
  //         $(".loot-container").html(`<p class="time">${formatTime(userTime)}</p>`);
  //         if (userTime < 1) {
  //             clearInterval(countdown);
  //             $(".loot-container").empty();
  //             // Run the lootroll function 3 times
  //             for (let i = 0; i < 3; i++) setTimeout(lootroll, 1800 * i);
  //         }
  //     }, 1000);
  // }
  
  // // Helper function to format time as MM:SS
  // function formatTime(seconds) {
  //     const minutes = Math.floor(seconds / 60);
  //     const secs = seconds % 60;
  //     return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  // }
  
  // // Lootroll function - determines rarity and runs postloot
  // function lootroll() {
  //     randLoot = loot[Math.floor(Math.random() * loot.length)];
  //     const chances = { medium: 5, rare: 10, insane: 25 };
  //     const rarity = chances[randLoot.rare];
  //     (!rarity || Math.random() * rarity < 1) ? postloot() : lootroll();
  // }
  
  // // Postloot function - appends loot to the page
  // function postloot() {
  //     var lootbox = $('<div>', {
  //         class: 'loot-box',
  //     });
      
  //     // Balance is displayed with comma separators
  //     var price = randLoot.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
  //     // Create the sell button and store the price in a data attribute
  //     var sellButton = $('<button>', {
  //         id: 'sell',
  //         text: 'Sell',
  //         'data-price': randLoot.price // Store the price here
  //     });
  
  //     const stashButton = $('<button>', {
  //         id: 'stash',
  //         class: 'stash',
  //         text: 'Stash'
  //     });
  
  
  //     lootbox.append("<img src=" + randLoot.img + ">")
  //         .append("<br>")
  //         .append("<p class='randlootname'>" + randLoot.name + "</p>")
  //         .append("<br>")
  //         .append("<p class='randlootprice'>" + price + "₽" + "</p>")
  //         .append("<br>")
  //         .append(sellButton)
  //         .append(stashButton);
  
  //     $(".loot-container").append(lootbox);
  // }
  
  // // Quick sell functionality
  // $(document).on('click', '#sell', function () {
  //     sellcounter ++
  //     if (sellcounter == 3) {
  //         $('.loot-container').empty();
  //         $('#roll').show();
  //     }
  //     //currentUserName = localStorage.getItem('currentUserName');
  //     if (!currentUserName) {
  //         console.error("No user is currently logged in.");
  //         return; // Exit if no user is logged in
  //     }
  
  //     let price = parseInt($(this).data('price')); // Get price from the button's data attribute
  
  //     // Check if the account exists
  //     if (accounts.hasOwnProperty(currentUserName)) {
  //         let lootBox = $(this).closest('.loot-box'); // Get the closest loot box
  //         lootBox.addClass('dim'); // Dim the loot box
  //         $(this).remove(); // Remove the sell button
  //         $('#stash').remove();
  //         // Update the balance in memory
  //         accounts[currentUserName].balance += price;
  //         // Update the display balance
  //         $(".balance").html(accounts[currentUserName].balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₽");
  //         // Save updated accounts to local storage
  //         saveAccounts();
  //     } else {
  //         console.error("Account not found for user:", currentUserName);
  //     }
  // });
  
  // $(document).on('click', '.stash', function () {
  //     const lootBox = $(this).closest('.loot-box'); // Get the closest loot box
  //     const lootName = lootBox.find('.randlootname').text(); // Get the loot name
  //     const lootPrice = parseInt(lootBox.find('.randlootprice').text().replace(/\D/g, '')); // Get the loot price
  
  //     // Find the corresponding loot item in the current loot array
  //     const stashItem = loot.find(item => item.name === lootName && item.price === lootPrice);
  
  //     if (stashItem) {
  //         // Store the item in the user's stash
  //         if (accounts[currentUserName]) {
  //             accounts[currentUserName].stash.push(stashItem);
  //             saveAccounts(); // Save updated accounts to local storage
  //         }
  //     }
  
  //     lootBox.addClass('dim2'); // Dim the loot box to indicate it has been stashed
  //     $(this).remove(); // Remove the stash button (optional)
  //     $('#sell').remove();
  // });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // /////////////////////////ACCOUNT SECTION/////////////////////////////////////////////////////////
  
  
  
  
  // //////////////////////////////CREATE ACCOUNT BUTTON///////////////////////////////////////////////
  // $(document).on('click', '#create', function () {
  //     let userName = $("#username").val().trim(); // Get the value from the username input
  //     let passWord = $("#password").val().trim(); // Get the value from the password input
  
  //     // Check if either the username or password is empty
  //     if (!userName || !passWord) {
  //         alert("Please fill in both fields.");
  //         return; // Stop further execution
  //     }
  
  //     // Check if the username already exists
  //     if (accounts.hasOwnProperty(userName)) {
  //         alert("Sorry, this account already exists.");
  //     } else {
  //         //Insert new user into the database
  //         db.getCollection('Users').insertOne(
  //             { 'username': '', 'password': '', 'balance': 0, 'stash': [], 'time': 90 }
  //         );
  //         // Store user data as an object
  //         accounts[userName] = {
  //             password: passWord,
  //             balance: 0,
  //             stash: [],
  //             time: 10
  //         };
  //         saveAccounts(); // Save updated accounts to local storage
  //         alert("Account created successfully!");
  //         window.location.href = 'assets/raid.html';
  //     }
  // });
  
  
  // db.getCollection('sales').insertMany([
  //     { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  //     { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  //     { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  //     { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  //     { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  //     { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  //     { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  //     { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
  //   ]);
  // ////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // //////////////////////////LOGIN TO ACCOUNT BUTTON///////////////////////////////////////////////////
  // $(document).on('click', '#login', function () {
  //     let userName = $("#username").val().trim();
  //     let passWord = $("#password").val().trim();
  
  //     if (!userName || !passWord) {
  //         alert("Please fill in both fields.");
  //         return;
  //     }
  //     if (accounts.hasOwnProperty(userName)) {
  //         if (accounts[userName].password === passWord) {
  //             currentUserName = userName; // Set the current user name
  //             //localStorage.setItem('currentUserName', currentUserName); // Save to local storage
              
  //             // Retrieve and display user's balance
  //             let userBalance = accounts[currentUserName].balance || 0;
  //             $(".balance").html(userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₽");
  
  //             window.location.href = 'assets/raid.html';
  //         } else {
  //             $("#password").val("").attr("placeholder", "Wrong Password").addClass("placeholder-red");
  //         }
  //     } else {
  //         $("#username").val("").attr("placeholder", "Username not found").addClass("placeholder-red");
  //         $("#password").val("");
  //     }
  // });
  // ///////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  // // Function to save accounts to local storage
  // function saveAccounts() {
  //     localStorage.setItem('accounts', JSON.stringify(accounts));
  // }
  
  // function displayStash() {
  //         $(".grid-item").empty()
  //         for (let i = 0; i < accounts[currentUserName].stash.length; i++) {
  //             let image = accounts[currentUserName].stash[i].img
  //             $(".grid-item").append(`<img src="${image}">`)
  //             // .append(`<p class='stash-item-name'>${accounts[currentUserName].stash.name}</p>`)
  //             // .append(`<p class='stash-item-price'>${accounts[currentUserName].stash.price}₽</p>`);
  //           }
  // };
  
  
  // $(document).ready(function() {
  //     //currentUserName = localStorage.getItem('currentUserName');
  //     userTime = accounts[currentUserName].time
  //     if (userTime < 10){
  //         roll()
  //         $("#roll").hide();
  //     }
  //     // Check if the user is logged in
  //         let userBalance = accounts[currentUserName].balance;
  //         $(".balance").html(userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₽");
       
  //         displayStash()
  // });