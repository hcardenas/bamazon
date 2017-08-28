var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');


var conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});



function main () {
	var questions = [
		{
			type : 'list',
			name : 'action',
			message : 'what do you want to do? ',
			choices : [
			'View Products for Sale', 
			'View Low Inventory', 
			'Add to Inventory' ,
			'Add New Product'
			]
		}
	];

	inquirer.prompt(questions).then(function(answer) {
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

function view_products () {
	conn.query('SELECT * FROM products;', function(err, res) {
		if (err) throw err;
		console.table(res);
		main();
	});
}

function view_low () {
	var low_inve = 5;
	conn.query(`SELECT * FROM products WHERE stock_quantity < ${low_inve};`, function(err, res) {
		if (err) throw err;
		console.table(res);
		main();
	})
}

function update_inventory () {
	var questions = [
		{
			type: 'input',
			message : 'ID of the product you would like to Update? ',
			name : 'ID',
			validate : function (answer) {
				if (isNaN(answer) === false)
					return true;
				else 
					return "please enter a number.";
			}
		},
		{

			type: 'input',
			message : ' how many units of the product would you like to Update? ',
			name : 'amount',
			validate : function (answer) {
				if (isNaN(answer) === false)
					return true;
				else 
					return "please enter a number."
			}
		}
	];

	conn.query('SELECT * FROM products;', function(err, res) {
		if (err) throw err;
		console.table(res);

		inquirer.prompt(questions).then(function(answer) {
			var FLAG = true;
			for (var i in res) {
				if (res[i].item_id == answer.ID) {
					FLAG = false;
					break;
				}
			}

			if (FLAG) {
				console.log("sorry item ID doesnt exists!");
				main();
			}
			else {
				
				
				
				var quer = `SELECT stock_quantity FROM products WHERE item_id = ${answer.ID};`;
				conn.query(quer, function(err, res) {
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
						console.log('Products Updated!');
						main();
					});

				});

			}
		});

	});

}


function add_product () {
	var questions = [
		{
			type: 'input',
			message : "items name: ",
			name : "input_produc_name"
		},
		{
			type: 'list',
			message : "items department: ",
			name : "input_department_name",
			choices : ['Sports and Outdoors', 'Clothing', 'Arts and Crafts', 'Books', 'Gaming']
		},
		{
			type: 'input',
			message : "items price: ",
			name : "input_price",
			validate : function (answer) {
				if (isNaN(answer) === false)
					return true;
				else 
					return "please enter a number."
			}
		},
		{
			type: 'input',
			message : "items stock quantity: ",
			name : "input_stock_quantity",
			validate : function (answer) {
				if (isNaN(answer) === false)
					return true;
				else 
					return "please enter a number."
			}
		},
	];

	inquirer.prompt(questions).then(function(answer) {
		var quer = `INSERT INTO products  SET ?;`
		var querObj = {
			product_name : answer.input_produc_name,
			department_name :  answer.input_department_name,
			price : parseFloat(answer.input_price),
			stock_quantity : parseInt(answer.input_stock_quantity)
		};
			
		conn.query(quer, querObj ,function (err, res) {
			if (err) throw err;

			console.log('added to DB');
			main();

		});

	});
}

main();