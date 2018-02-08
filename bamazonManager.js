var inquirer = require('inquirer');
var mysql = require('mysql');
var chalk = require('chalk');


inquirer
    		.prompt({
     				name: "decision",
      				type: "list",
      				message: "Hello Manager, what would you like to do?",
      				choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]


      			}) // end of prompt


    		.then(function(answer) {

    			 switch (answer.decision) {

        case "View products for sale":

        	viewProducts();
          	console.log("Here are all the current products in inventory:")
          break;

        case "View Low Inventory":
        	initDB();
          	console.log("I'll show you all inventory with less than 5 items")
          break;

        case "Add to Inventory":
        	initDB();
          	console.log("I'll let you add new inventory to exisintg products")
          break;

        case "Add New Product":
        	initDB();
          	console.log("I'll show you add entirely new items")
           break;
      };

  });



   function initDB () {

   		var connection = mysql.createConnection({
  		host: "localhost",
 		port: 3306,

  // Your username
  		user: "root",

  // Your password
  		password: "Equ1f4x!",
  		database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to db as " + connection.threadId);




   })
};

function viewProducts () {


   		var connection = mysql.createConnection({
  		host: "localhost",
 		port: 3306,

  // Your username
  		user: "root",

  // Your password
  		password: "Equ1f4x!",
  		database: "bamazon_db"
});


	connection.connect(function(err) {
  	if (err) throw err;
  	console.log("connected to db as " + connection.threadId);




   });

		var query = "SELECT * FROM products";
  		connection.query(query, function(err, res) {
  		if (err) throw err;


  		console.log("Item ID | Product Name | Retail Price | Quantity\n-------------------------------------");

    	for (var i = 0; i < res.length; i++) {
      	console.log(res[i].item_id + " | " + res[i].product_name + " | $ "+ res[i].price + " | " + res[i].stock_quantity + " | ");







};
});
};










    		