var inquirer = require('inquirer');
var mysql = require('mysql');
var chalk = require('chalk');
var cTable= require("console.table");

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


function begin () {


inquirer
    		.prompt({
     				name: "decision",
      				type: "list",
      				message: chalk.greenBright("What would you like to do Supervisor?"),
      				choices: ["View Product Sales by Department", "Create a new Department"]


})
.then(function(answer) {

    			 switch (answer.decision) {

        case "View products Sales by Department":

        	departmentSales();
          	break;

        case "Create a new Department":

        	newDepartment();
          	break;

    };//end switch

  });



} //end of begin


function departmentSales () {








} //end of department sales


begin();