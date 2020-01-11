/*  REQUIREMENTS

WEEK 11 has most of the stuff needed for this

Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase. 
*/

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- // 


// TODO: Require MYSQL package, connect to database and set a variable for the database.



// TODO: Display the inital message and show the product menu from database
// TODO: Display a list that the user can choose from
// TODO: How many? (Text box that only accepts numbers)
//        * checks to see if there is enough inventory
// TODO: Completes the purchase 
//        * Display remaining inventory
//        * Display the price
// TODO: "Want to buy anything else?" if yes, repeat, if no, exit



// --------- CONNECTIONS --------- --------- --------- --------- --------- --------- --------- --------- --------- //

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "storefront_db"
});




// --------- WELCOME MESSAGE --------- --------- --------- --------- --------- --------- --------- --------- --------- //

connection.connect(function(err) {
  if (err) throw err;
  
  console.log("                                                       ");
  console.log("                                                       ");
  console.log("-------------------------------------------------------");
  console.log("//---                Welcome to the               ---//");
  console.log("//---                  MUSIC SHOP!                ---//");
  console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - -");
  console.log(" ");
  console.log("                                                       ");  
  console.log("                                                       ");  
  welcomeMessage();
  // connection.end();
});



// --------- ORDER --------- --------- --------- --------- --------- --------- --------- --------- --------- //

var productArr = [];
var totalBill = 0;




// --------- FUNCTIONS --------- --------- --------- --------- --------- --------- --------- --------- --------- //

// Welcome Message
// The main reason for this is just to give lag so the list can populate :)
  function welcomeMessage(){
    generateProductArr();
    // generatePriceArr();
    inquirer
      .prompt([
        {
          name: "confirm",
          type: "list",
          message: "Would you like to buy an instrument?",
          choices: ["Yes, I'd like to buy an instrument", "No, I don't want anything"]
        }
      ])
      .then(function(answer){
        if (answer.confirm === "Yes, I'd like to buy an instrument"){
          askForOrder();
        } else {
          console.log("")
          console.log("")
          console.log("")
          console.log("")
          console.log("Then don't touch anything!")
          console.log("")
          console.log("")
          console.log("-------------------------------------------------------");
          connection.end();
        }
      })
  }



// ORDER CONSTRUCTOR
  function ProductOrder(product, productPrice, quantity, productTotal) {
    this.product = product;
    this.productPrice = productPrice;
    this.quantity = quantity;
    this.productTotal = productTotal;
    this.printInfo = function() {
    console.log(
      `\n  Your order: 
       \n     Product: ${this.product} 
       \n     Price: $${this.productPrice} 
       \n     Quantity: ${this.quantity} 
       \n     Total for this item: $${this.productTotal}`);
    };
  };

// Pull PRODUCTS from data base  
  function generateProductArr(){
    connection.query("SELECT * FROM inventory", function(err,res){
      if(err) throw err;
      for (var i = 0; i < res.length; i++){
        var product = `${res[i].product_name} | $${res[i].price}, (In stock: ${res[i].stock})`;
        productArr.push(product);
      }
    })
  }







function askForOrder() {
  inquirer
    .prompt([
        {
          name: "product",
          type: "rawlist",
          message: "What would you like to buy?",
          choices: productArr
        }, {
          name: "quantity",
          type: "number",
          message: "How many would you like to buy?"
        }
    ]).then(function(answers){
      var orderValid;
      checkOrderValidity()

    // --- askForOrder Functions:

    function checkOrderValidity(){
    // Parse the Inventory:
      var productStr = answers.product;  
      var stock = productStr.split(": ")  //START HERE, this should get the current inventory
            stock = parseInt(stock[1]);
      var orderQty = answers.quantity;

    // Some math to determine whether there is enough stock
      if (stock < 1){
        console.log("Sorry, we don't have any of that item in stock")
      } else if (stock - orderQty > 0) {
        console.log("                                                       "); 
        console.log("                                                       "); 
        console.log("Sure, let me ring that up!")
        console.log("                                                       "); 
        placeOrder();
      }
      else {
        console.log("                                                       "); 
        console.log("                                                       "); 
        console.log(`Sorry, we don't have that many, we only have ${stock} of that item`);
        console.log("Give it some thought and try again:"); 
        console.log("                                                       "); 
        welcomeMessage();
      }
    }  

    function placeOrder(){
      //Parse String:
        var productStr = answers.product;

      // Parse the Inventory:
        var stock = productStr.split(": ")
            stock = parseInt(stock[1]);

      // Parse the Price:
        var price = productStr.split("$");
            price = parseInt(price[1]);

      // Parse the Product
        var product = productStr.split(" |");
            product = product[0];

      // Build Order:
        var quantity = answers.quantity;
        var productTotal = quantity * price;
        var newOrder = new ProductOrder(product, price, quantity, productTotal);
        


      // Add to the totalBill
        totalBill = totalBill + productTotal;

      //Report back to the user:
        newOrder.printInfo();
        console.log("                                                       "); 
        console.log(`     Your total bills so far is $${totalBill}`)
        console.log("                                                       "); 
        console.log("                                                       "); 
        askIfBuyAgain();

      // Reduce Inventory
      reduceInventory(product, price, quantity, productTotal, stock);

      // Display Updated Inventory:
      // FOR DEV PURPOSES
      // displayUpdatedInventory();  
    }

  })    
};



function reduceInventory(product, price, quantity, productTotal, stock){
  var newStock = stock - quantity;
  connection.query(
    `UPDATE inventory
     SET stock = ${newStock}
     WHERE product_name = "${product}"`, 
  function(err, res) {
    if (err) throw err;
  })
}


function askIfBuyAgain(){
  inquirer
    .prompt([
      {
        name: "confirm",
        type: "list",
        message: "Would you like to buy anything else?",
        choices: ["Yes","No"]
      }
      ])
    .then(function(answer){
      if (answer.confirm == "Yes") {
        askForOrder();
      } else {
        orderComplete()
      }
    })
};









function orderComplete(){
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("-------------------------------------------------------");
  console.log("                                                       "); 
  console.log("                                                       ");  
  console.log("          Thanks for shopping with us today!")
  console.log(`             Your total is $${totalBill}`)
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("-------------------------------------------------------");
  console.log("                                                       ");  
  connection.end();
}