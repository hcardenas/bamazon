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

function main() {
	var quer = 'SELECT * FROM products;'
	conn.query(quer, function (err, res) {
		if (err) throw err;

		console.table(res);

		prompt_questions(res);


	});
}

function prompt_questions(res) {
	//console.log(res);
	var questions = [
		{
			type: 'input',
			message : 'ID of the product you would like to buy? ',
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
			message : ' how many units of the product would you like to buy? ',
			name : 'amount',
			validate : function (answer) {
				if (isNaN(answer) === false)
					return true;
				else 
					return "please enter a number."
			}
		}
	];

	inquirer.prompt(questions).then(function(answer) {
		
		var FLAG = true;
		for (var i in res) {
			console.log(res[i].item_id);
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

				var update_amount = (res[0].stock_quantity - parseInt(answer.amount));

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
					console.log('Insufficient quantity!');
					main();
				}
			});
		}

		
	});
}


 main();