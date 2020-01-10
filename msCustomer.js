/*  REQUIREMENTS

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
  console.log("            What are you in the market for?            ");
  console.log("                                                       ");  
  welcomeMessage();
  connection.end();
});



// --------- ORDER --------- --------- --------- --------- --------- --------- --------- --------- --------- //

var productArr = [];
var priceArr = [];

function ProductOrder(product, productPrice, quantity, productTotal) {
  this.product = product;
  this.productPrice = productPrice;
  this.quantity = quantity;
  this.productTotal = productTotal;
  this.printInfo = function() {
  console.log(`Your order: \nProduct: ${this.product} \nPrice: ${this.productPrice} \nQuantity: ${this.quantity} \nTotal for this item: $${this.productTotal}`);
  };
};


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
          type: "confirm",
          message: "Would you like to buy an instrument?",
          // choices: ["Yes", "No"]
        }
      ])
      .then(function(answer){
        if (answer.confirm === true){
          askForOrder();
        } else if (answer.confirm === false){
          console.log("Then don't touch anything!")
        }
      })
  }


// Pull PRODUCTS from data base  
  function generateProductArr(){
    connection.query("SELECT * FROM inventory", function(err,res){
      if(err) throw err;
      for (var i = 0; i < res.length; i++){
        var product = `${res[i].product_name} | $${res[i].price}`;
        productArr.push(product);
      }
    })
  }

  // Pull PRICES from data base
  // function generatePriceArr(){
  //   connection.query("SELECT * FROM inventory", function(err,res){
  //     if(err) throw err;
  //     for (var i = 0; i < res.length; i++){
  //       var product = res[i].price;
  //       priceArr.push(product);
  //     }
  //   })
  // }


function displayProducts(){
  console.log("OUR PRODUCTS:")
  console.log("_____")
  connection.query("SELECT * FROM inventory", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
      console.log(`||    ${res[i].product_name}, $${res[i].price}`)
    }
    console.log("_____")
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
      // Parse the Price:
        var priceClip = answers.product;
        priceClip = priceClip.split("$");
        var price = parseInt(priceClip[1]);

      // Parse the Product
        var productClip = answers.product;
        productClip = productClip.split(" |");
        var product = productClip[0];

      var productTotal = answers.quantity * price;
      var newOrder = new ProductOrder(product, price, answers.quantity, productTotal);
      newOrder.printInfo();
      
      }
    )    
};


