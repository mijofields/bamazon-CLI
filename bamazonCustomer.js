var inquirer = require('inquirer');
var mysql = require('mysql');
var chalk = require('chalk');

var choices = [];

function begin () {

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
  console.log("connected as id " + connection.threadId);
  console.log("These are the items currently for sale...");



	var query = "SELECT * FROM products";
  		connection.query(query, function(err, res) {
  		if (err) throw err;


  		console.log("Item ID | Product Name | Product Price\n-------------------------------------");

    	for (var i = 0; i < res.length; i++) {
      	console.log(res[i].item_id + " | " + res[i].product_name + " | $ "+ res[i].price + " | ");

      	choices.push(res[i].product_name);



   	 	}; //end of for loop

   	 	  	console.log("--------------------------------------");

   	 		inquirer
    		.prompt({
     				name: "decision",
      				type: "list",
      				message: "Which item would you like to purchase?",
      				choices: choices
    	}) //end of prompt 1
    		// console.log(answer);
    		// console.log("--------------------------------------");

    		
    		.then(function(answer) {
    		var item = answer.decision;

			inquirer
    		.prompt({
     				name: "quantity",
      				type: "string",
      				message: "How many items would you like to purchase?",
      				validate: function (answer) {

           			return /[1-9]/gi.test(answer);  //this is a  validation that check for alpha or numeric [a-z1-9]
           								


  } //end of validation

})

    		.then(function(answer) {

    			var quantity = parseInt(answer.quantity);

    		var query = "SELECT * FROM products WHERE ?";
  				connection.query(query, { product_name: item }, function(err, res) {
  				if (err) throw err;

  				console.log(res);

  				if (quantity > parseInt(res[0].stock_quantity)) {

  					console.log("Sorry we don't have enough in stock");


  				} else {

  					var newQuantity = parseInt(res[0].stock_quantity) - quantity;

  					console.log("OK transaction complete!\n The cost before tax is $" +(quantity*res[0].price));

  					var query = "UPDATE products SET ? WHERE ?";

  					connection.query(query,
    [
      {
        stock_quantity: newQuantity
      },
      {
        product_name: item
      }
    ],
    function(err, res) {
    	if (err) throw err;

      	console.log(item + " quantity has been updated, there are now " + newQuantity + " left in stock.");

    });

  				};





    		}); // end of connection


 // end of prompt2

}); //end of then

}); //end of then

}); //end of connection

});

}

begin();








	