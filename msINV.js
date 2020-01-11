




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


// --------- RUN --------- --------- --------- --------- --------- --------- --------- --------- --------- //

connection.connect(function(err) {
  if (err) throw err;
  
  console.log("                                                       ");
  console.log("                                                       ");
  console.log("-------------------------------------------------------");
  console.log("//---                  MUSIC SHOP!                ---//");
  console.log("//---              INVENTORY CHECKER              ---//");
  console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - -");
  console.log(" ");
  console.log("                                                       ");  
  console.log("                                                       ");  
  welcomeMessage();
  // connection.end();
});


function welcomeMessage(){

  inquirer
    .prompt([
      {
        name: "confirm",
        type: "list",
        message: "What do you want to do?",
        choices: ["Check Inventory", "Add Inventory"]
      }
    ])
    .then(function(answer){
      if (answer.confirm === "Check Inventory"){
        displayProducts();
      } else if (answer.confirm === "Add Inventory"){
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("Sorry, we don't support that yet")
        console.log("")
        console.log("")
        console.log("-------------------------------------------------------");
        connection.end();
      }
    })
}





function displayProducts(){
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("-------------------------------------------------------");
  console.log("//---                  INVENTORY:                 ---//");
  console.log("                                                       ");  
  console.log("                                                       ");  
  connection.query("SELECT * FROM inventory", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
      console.log(`${res[i].stock}|${res[i].product_name}|${res[i].price}`)
    }
    console.log("_____")
  })
  connection.end();
}