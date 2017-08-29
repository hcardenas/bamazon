// import modules 
var inquirer = require('inquirer');
var mysql = require('mysql');
var questions = require('./questions.js');
require('console.table');


// create connection with DB
var conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

// ---------------------------
// main prints the product table and starts inquire
// ---------------------------
function main() {
	var quer = 'SELECT * FROM products;'
	conn.query(quer, function (err, res) {
		if (err) throw err;

		console.table(res);
		prompt_questions(res);
	});
}


// ---------------------------
// uses the questions imported from 
// questions.js and prompts the user
// takes into account negative numbers 
// ---------------------------
function prompt_questions(res) {

	inquirer.prompt(questions.bamazonCustomer.main_q).then(function(answer) {
		
		var quer = 'SELECT stock_quantity FROM products WHERE ? ;';
		var querObj = {item_id : answer.ID};
		conn.query(quer, querObj, function(err, res) {
			if (err) throw err;

			var update_amount = (res[0].stock_quantity - Math.abs(parseInt(answer.amount)));

			if ( update_amount > 0 ) {

				var update_query = `UPDATE products SET ? WHERE ?`;
				var update_obj = [
					{ 
						stock_quantity :  update_amount
					},
					{
						item_id : answer.ID
					}
				];

				conn.query(update_query, update_obj, function (err, res) {
					if (err) throw err;
					console.log('Products Updated!');
					main();
				});

			}
			else {
				console.log('\n/****************\nInsufficient quantity!\n/****************\n');
				main();
			}
		});
		
	});
}


 main();