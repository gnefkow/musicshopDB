




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
        restock();
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("Sorry, we don't support that yet")
        // console.log("")
        // console.log("")
        // console.log("-------------------------------------------------------");
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

function restock(){
  restockClassicalGuitar();
  restockElectricGuitar();
  restockAcousticGuitar();
  restockBassGuitar();
  restockUkelele();
  restockBanjo();
  restockGrandPiano();
  restockUprightPiano();
  restockTrumpet();
  restockTrombone();
  restockBaritone();
  restockFrenchHorn();
  restockTuba();
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("                   *** Restocking ***                  ");  
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("                                                       ");  
  console.log("-------------------------------------------------------");
  console.log("//---                                             ---//");  
  console.log("//---             INVENTORY RESTOCKED!            ---//");
  console.log("//---                                             ---//"); 
  console.log("-------------------------------------------------------");
  console.log("                                                       ");  
}



function restockClassicalGuitar() {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Classical Guitar";`, function(err,res){if(err) throw err;})}
function restockElectricGuitar()  {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Electric Guitar";`, function(err,res){if(err) throw err;})}
function restockAcousticGuitar()  {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Acoustic Guitar";`, function(err,res){if(err) throw err;})}
function restockUkelele()         {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Ukelele";`, function(err,res){if(err) throw err;})}
function restockBanjo()           {connection.query(`UPDATE inventory SET stock = 20 WHERE product_name = "Banjo";`, function(err,res){if(err) throw err;})}
function restockBassGuitar()      {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Bass Guitar";`, function(err,res){if(err) throw err;})}
function restockGrandPiano()      {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Grand Piano";`, function(err,res){if(err) throw err;})}
function restockUprightPiano()    {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Upright Piano";`, function(err,res){if(err) throw err;})}
function restockTrumpet()         {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Trumpet";`, function(err,res){if(err) throw err;})}
function restockTrombone()        {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Trombone";`, function(err,res){if(err) throw err;})}
function restockBaritone()        {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Baritone";`, function(err,res){if(err) throw err;})}
function restockFrenchHorn()      {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "French Horn";`, function(err,res){if(err) throw err;})}
function restockTuba()            {connection.query(`UPDATE inventory SET stock = 30 WHERE product_name = "Tuba";`, function(err,res){if(err) throw err;})}



