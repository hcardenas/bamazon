// imports modules and questiosn for inquirer
var inquirer = require('inquirer');
var mysql = require('mysql');
var questions = require('./questions.js');
require('console.table');

// creates connection to mysql
var conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});


// ---------------------------
// prompts starting questions for user
// ---------------------------
function main () {	
	inquirer.prompt(questions.bamzonManager.main_q).then(function(answer) {
		switch (answer.action) {
			case 'View Products for Sale':
				view_products();
				break; 
			case 'View Low Inventory':
				view_low();
				break;
			case 'Add to Inventory':
				update_inventory();
				break; 
			case 'Add New Product':
				add_product();
				break;
		}
	});
}
// ---------------------------
// prints to screen the table
// ---------------------------
function view_products () {
	conn.query('SELECT * FROM products;', function(err, res) {
		if (err) throw err;
		console.table(res);
		main();
	});
}
// ---------------------------
// prints to screen items with low stock
// ---------------------------
function view_low () {
	var low_inve = 5;
	conn.query(`SELECT * FROM products WHERE stock_quantity < ${low_inve};`, function(err, res) {
		if (err) throw err;
		console.table(res);
		main();
	})
}


// ---------------------------
//  calculates revenue and reduces 
// stock quantiy on the table
// ---------------------------
function update_inventory () {

	inquirer.prompt(questions.bamzonManager.update).then(function(answer) {
		
		var quer = 'SELECT stock_quantity FROM products WHERE ? ;';
		var querObj = {item_id : answer.ID};
		conn.query(quer, querObj, function(err, res) {
			if (err) throw err;

			var update_amount = (res[0].stock_quantity + Math.abs(parseInt(answer.amount)));


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
				console.log('/****************\nProducts Updated!\n/****************');
				main();
			});

		}); // end of inner conn
		
	}); // end of inquirer

}

// ---------------------------
// adds new products to the table
// ---------------------------
function add_product () {
	

	inquirer.prompt(questions.bamzonManager.add).then(function(answer) {
		var quer = `INSERT INTO products SET ?;`
		var querObj = {
			product_name : answer.input_produc_name,
			department_name :  answer.input_department_name,
			price : parseFloat(answer.input_price),
			stock_quantity : parseInt(answer.input_stock_quantity)
		};
			
		conn.query(quer, querObj ,function (err, res) {
			if (err) throw err;
			console.log('/****************\nadded to DB!\n/****************');
			main();
		});

	});
}

main();