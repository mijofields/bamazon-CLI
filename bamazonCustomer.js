var inquirer = require('inquirer');
var mysql      = require('mysql');

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
  console.log("These are the items currently for sale...")

	var query = "SELECT * FROM products";
  	connection.query(query, function(err, res) {
  		// console.log(res);
  		// var r = res[i];
  		console.log("Item ID | Product Name | Product Price\n-------------------------------------");

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | ");
    };

  });

});
	