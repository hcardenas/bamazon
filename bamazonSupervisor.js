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
				break;
			case 'Create New Department' :
				create_department();
				break;
		};
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