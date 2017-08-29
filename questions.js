var mysql = require('mysql');
var conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

		
exports.bamazonCustomer = {
		main_q : [
		{
			type: 'input',
			message : 'ID of the product you would like to buy? ',
			name : 'ID',
			validate : function (answer) {
				return new Promise ((resolve, reject) => {
					var quer = 'SELECT item_id FROM products;';
					conn.query(quer, function(err, res) {
						if (err) reject(err);

						var FLAG = false;
						for (var i in res) {
							if (res[i].item_id == answer) {
								FLAG = true;
								break;
							}
						}

						if (FLAG) 
							resolve(true);
						else 
							reject('ID does not exists. Try again');
					});
				});
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
	]

}

exports.bamzonManager = {
	main_q :  [
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
	],
	update : [
		{
			type: 'input',
			message : 'ID of the product you would like to Update? ',
			name : 'ID',
			validate : function (answer) {
				return new Promise ((resolve, reject) => {
					var quer = 'SELECT item_id FROM products;';
					conn.query(quer, function(err, res) {
						if (err) reject(err);

						var FLAG = false;
						for (var i in res) {
							if (res[i].item_id == answer) {
								FLAG = true;
								break;
							}
						}

						if (FLAG) 
							resolve(true);
						else 
							reject('ID does not exists. Try again');
					});


				});
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
	],
	add :  [
		{
			type: 'input',
			message : "items name: ",
			name : "input_produc_name"
		},
		{
			type: 'list',
			message : "items department: ",
			name : "input_department_name",
			choices : function (answer) {
				return new Promise ( (resolve, reject) => {
					var quer = 'SELECT DISTINCT department_name FROM bamazon.products ORDER BY department_name;';
					var arr = [];
					conn.query(quer, function(err, res) {
						if (err) reject(err);
						for (var i in res) 
							arr.push(res[i].department_name);

						resolve(arr);
					});
				});

			}
			
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
	]
};