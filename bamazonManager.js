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
  // console.log("connected to db as " + connection.threadId);

});


function begin() {

inquirer
    		.prompt({
     				name: "decision",
      				type: "list",
      				message: chalk.greenBright("Hello Manager, what would you like to do?"),
      				choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]


      			}) // end of prompt


    		.then(function(answer) {

    			 switch (answer.decision) {

        case "View products for sale":

        	viewProducts();
          	break;

        case "View Low Inventory":
        	lowInventory();
          break;

        case "Add to Inventory":
        	addInventory();
    
          break;

        case "Add New Product":
        	
          	addNew();
           break;
      };//end switch

  });//end then

    	}; // end of begin



function viewProducts () {


		var query = "SELECT * FROM products";
  		connection.query(query, function(err, res) {
  		if (err) throw err;


  		console.table(res);

  		begin();

}); //end of query
}; //enf od viewProducts

function lowInventory() {


  	var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
  		connection.query(query, function(err1, res1) {
  		if (err1) throw err1;


  		console.table(res1);


  		begin();



}) // end of query
//end of connection

}; // end of low inventory


function addInventory() {




	var query = "SELECT * FROM products";
  		connection.query(query, function(err2, res2) {
  		if (err2) throw err2;

    	for (var i = 0; i < res2.length; i++) {

      	choices.push(res2[i].product_name);



   	 	}; //end of for loop

   	 		inquirer
    		.prompt([{
     				name: "decision",
      				type: "list",
      				message: "For which item would you like to add inventory?",
      				choices: choices
    	}, {
     				name: "quantity",
      				type: "string",
      				message: chalk.cyanBright("How many items do you want to add to inventory?"),
      				validate: function (answer) {

           			return /[1-9]/gi.test(answer);  //this is a  validation that check for alpha or numeric [a-z1-9]
           								


  } //end of validation
}]) //end of prompt

  			.then(function(answer) {
  				// console.log(answer);

  				var item = answer.decision;
    			var quantity = parseFloat(answer.quantity);
    			// console.log(quantity);
    			// console.log(item);

    			var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name= ?" 

  				connection.query(query, [ quantity , item ] , function(err3, res3) {
    			if (err3) throw err3;

    			// console.log(res2.affectedRows + " record(s) updated");

      			console.log(chalk.greenBright(quantity + " items have been added to the " + item + " inventory"));
      			viewProducts(); //end of connection

  
    }); //end of connection

  

}); //end of second nested then






}); //end of earlier then
   //end of connection

  	}; // end of add inventory



  	function addNew () {


  		inquirer

  		.prompt([


  		{

            name: "product_name",
            type: "input",
            message: chalk.magenta("What is the name of the item you wish to stock?")
        },
        {
            name: 'department_name',
            type: 'input',
            message: chalk.blue("What is the department for this product?")
        },
        {
            name: 'price',
            type: 'input',
            message: chalk.cyan("How much does the product retail for?")
        },
        {
            name: 'stock_quantity',
            type: 'input',
            message: chalk.yellow("How much inventory would you like to add?")
        }



  		])

  		.then(function(answers) {


  			var query = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)';

  				connection.query(query, [answers.product_name, answers.department_name, parseFloat(answers.price), answers.stock_quantity], function(err4, res4) {
    			if (err4) throw err4;

      			console.log(chalk.greenBright("New item " + answers.product_name + " has been added!"));
      			viewProducts();








  		}); //end of connection

  			}); //end of then

  	}; //end of add new

  



begin();






    		