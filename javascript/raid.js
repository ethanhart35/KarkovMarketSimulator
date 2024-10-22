import {loot} from './loot.js'
  // Global variables
  let randLoot
  let currentUserName = localStorage.getItem('username')
  let accounts = localStorage.getItem('username')
  let sellcounter = 0;
  let userTime = 10
//   On button click, run roll function
  $("#roll").click(roll);





  function roll() {
    console.log(accounts)
      sellcounter = 0;
      $("#roll").hide();
      $(".loot-container").show().empty();
  
      // Initial display of time
      $(".loot-container").html(`<p class="time">${formatTime(userTime)}</p>`);
  
      // Countdown function
      const countdown = setInterval(() => {
        userTime--;
          $(".loot-container").html(`<p class="time">${formatTime(userTime)}</p>`);
          if (userTime < 1) {
              clearInterval(countdown);
              $(".loot-container").empty();
              // Run the lootroll function 3 times
              for (let i = 0; i < 3; i++) setTimeout(lootroll, 1800 * i);
          }
      }, 1000);
  }

  // // Helper function to format time as MM:SS
  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

    // // Lootroll function - determines rarity and runs postloot
  function lootroll() {
      randLoot = loot[Math.floor(Math.random() * loot.length)];
      const chances = { medium: 5, rare: 10, insane: 25 };
      const rarity = chances[randLoot.rare];
      (!rarity || Math.random() * rarity < 1) ? postloot() : lootroll();
  }

  // // Postloot function - appends loot to the page
  function postloot() {
      var lootbox = $('<div>', {
          class: 'loot-box',
      });
      
      // Balance is displayed with comma separators
      var price = randLoot.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
      // Create the sell button and store the price in a data attribute
      var sellButton = $('<button>', {
          id: 'sell',
          text: 'Sell',
          'data-price': randLoot.price // Store the price here
      });
  
      const stashButton = $('<button>', {
          id: 'stash',
          class: 'stash',
          text: 'Stash'
      });
  
  
      lootbox.append("<img src=" + randLoot.img + ">")
          .append("<br>")
          .append("<p class='randlootname'>" + randLoot.name + "</p>")
          .append("<br>")
          .append("<p class='randlootprice'>" + price + "₽" + "</p>")
          .append("<br>")
          .append(sellButton)
          .append(stashButton);
  
      $(".loot-container").append(lootbox);
  }


    // // Quick sell functionality
  $(document).on('click', '#sell', async function () {
      sellcounter ++
      if (sellcounter == 3) {
          $('.loot-container').empty();
          $('#roll').show();
      }
      //currentUserName = localStorage.getItem('currentUserName');
      if (!currentUserName) {
          console.error("No user is currently logged in.");
          return; // Exit if no user is logged in
      }
  
      let price = parseInt($(this).data('price')); // Get price from the button's data attribute
  
      // Check if the account exists
      if (currentUserName) {
          let lootBox = $(this).closest('.loot-box'); // Get the closest loot box
          lootBox.addClass('dim'); // Dim the loot box
          $(this).remove(); // Remove the sell button
          // Update the display balance
        //   $(".balance").html(.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₽");
      } else {
          console.error("Account not found for user:", currentUserName);
      }


      // Send the loot result to the server
      try {
        const username = localStorage.getItem('username'); // Retrieve the username from localStorage
        const response = await fetch('/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,  // Associate the loot with the logged-in user
                balance: price  // The loot rolled
            })
        });

        const result = await response.json();
        if (result.success) {
            console.log("Loot saved successfully!");
        } else {
            console.error("Failed to save loot:", result.message);
            alert("Failed to save loot: " + result.message);
        }
    } catch (error) {
        console.error('Error saving loot:', error);
        alert('Error saving loot to the server.');
    }
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////