var inquirer = require('inquirer');
var mysql = require('mysql');
var questions = require('./questions.js');
require('console.table');


var conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});


function main () {
	inquirer.prompt(questions.bamazonSupervisor.main).then(function(answer) {
		switch(answer.action) {
			case 'View Product Sales by Department' :
				view_products();
				break;
			case 'Create New Department' :
				create_department();
				break;
		};
	});
}

function view_products () {
	var quer = 'SELECT  t1.department_id, t1.department_name, t1.over_head_cost, t2.product_sales, ' +
	'( t2.product_sales - t1.over_head_cost) total_profit  FROM departments t1 ' + 
	'INNER JOIN (SELECT SUM(products.product_sales) product_sales, products.department_name ' +
	'FROM products group by department_name ) t2 ON t1.department_name = t2.department_name ;';
	 
	conn.query(quer, function(err, res) {
		if (err) throw err;
		console.table(res);
		main();
	});
}


function create_department() {
	inquirer.prompt(questions.bamazonSupervisor.add).then(function(answer) {
		console.log(answer);
		var quer = 'INSERT INTO departments SET ?;';
		var querObj = {department_name : answer.department_name, over_head_cost : answer.overhead};
		conn.query(quer, querObj, function (err, res) {
			if (err) throw err;
			console.log('/****************\nDeparments Inserted!\n/****************');
			main();
		});
	});
}


main();