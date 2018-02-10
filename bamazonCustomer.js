var inquirer = require('inquirer');
var mysql = require('mysql');
var chalk = require('chalk');
var cTable= require("console.table");

var choices = [];


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "5qlp5word",
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;

  });

begin();



function begin () {

  	console.log(chalk.blue("These are the items currently for sale..."));



	var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  		connection.query(query, function(err, res) {
  		if (err) throw err;

  		console.table(res);


    	for (var i = 0; i < res.length; i++) {

      	choices.push(res[i].product_name);



   	 	}; //end of for loop

   	 	  	console.log("--------------------------------------");

   	 		inquirer
    		.prompt([{
     				name: "decision",
      				type: "list",
      				message: chalk.cyanBright("Which item would you like to purchase?"),
      				choices: choices
    	}, { 
    	     		name: "quantity",
      				type: "string",
      				message: chalk.green("How many items would you like to purchase?"),
      				validate: function (answer) {

           			return /[1-9]/gi.test(answer);  //this is a  validation that check for alpha or numeric [a-z1-9]
           								


  } //end of validation

}])

    		.then(function(answers) {

    			var quantity = parseInt(answers.quantity);
    			var item = answers.decision;

    		var query = "SELECT * FROM products WHERE ?";
  				connection.query(query, { product_name: item }, function(err1, res) {
  				if (err1) throw err1;

  				if (quantity > parseInt(res[0].stock_quantity)) {

  					console.log(chalk.red("Sorry we don't have enough in stock"));

  					begin();


  				} else {

  					var newQuantity = parseInt(res[0].stock_quantity) - quantity;

  					console.log(chalk.yellow("OK transaction complete!\nThe cost before tax is $" +(quantity*res[0].price)));

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

      	console.log(chalk.magenta(item + " quantity has been updated, there are now " + newQuantity + " left in stock."));


    });
  					begin();

  				};





    		}); // end of connection


 // end of prompt2

}); //end of then

}); //end of then
//end of connection


}










	