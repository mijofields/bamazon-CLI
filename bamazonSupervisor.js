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
      				choices: ["View Product Sales by Department", "Create a New Department"]


})
.then(function(answer) {

    			 switch (answer.decision) {

        case "View Product Sales by Department":

        	departmentSales();
          	break;

        case "Create a New Department":

        	newDepartment();
          	break;

    };//end switch

  });



}; //end of begin


function departmentSales () {

		var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS 'Total Sales', SUM(products.product_sales) - over_head_costs AS 'Profit' FROM departments INNER JOIN products ON products.department_name = departments.department_name GROUP BY departments.department_id";

  		connection.query(query, function(err1, res1) {
  		if (err1) throw err1;

  		console.table(res1);





});
}; //end of department sales



function newDepartment () {



inquirer


.prompt([{

			name: "department",
      		type: "string",
      		message: chalk.bold.greenBright("What is the name of the department to be added?"),




},{

			name: "overhead",
      		type: "string",
      		message: chalk.bold.greenBright("How much is the overhead for this new department?"),
      		validate: function (overhead) {

           			return /[1-9]/gi.test(overhead);  //this is a  validation that check for alpha or numeric [a-z1-9]
           								


  } //end of validation



}]).then(function(answer) {

				var overhead = parseFloat(answer.overhead);

				var query = "INSERT INTO departments (department_name, over_head_costs) VALUES (?,?);" 

  				connection.query(query, [ answer.department , overhead ] , function(err3, res3) {
    			if (err3) throw err3;

    			console.log(chalk.red.underline("New department, " + answer.department + " has been added."));






}); // end of connection





})//end of then



}; //end of new department,.


begin();