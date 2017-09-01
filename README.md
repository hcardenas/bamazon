# bamazon

##Goal

The Goal of Bamazon is to simulate Amazon's back end using MySql. Bamazon has 3 main JavaScript files 

* [bamazonCustomer.js](##bamazonCustomer.js)
* [bamazonManager.js](##bamazonManager.js)
* [bamazonSupervisor.js](##bamazonSupervisor.js)

Additionally it contains __db_schema.sql__ where the databases and tables are declared and populated with some 
dummy data. Bamazon uses [npm MySQL](https://www.npmjs.com/package/mysql) to run queries, [inquirer](https://www.npmjs.com/package/inquirer) for user interface/input, [console.table](https://www.npmjs.com/package/console.table) to format and print to screen tables and lastly it uses [questions.js](./questions.js) where questions for inquirer are stored along with some validations


 ## bamazonCustomer.js

 Start it by running `node bamazonCustomer.js` on the terminal. the user will be prompted for the items ID printed on screen after a valid input the user will be prompted for how many items to buy.


## bamazonManager.js

 Start it by running `node bamazonCustomer.js` on the terminal. the user will be see 4 options

 1. [View Products for Sale](###View Products for Sale)
 2. [View Low Inventory](###View Low Inventory)
 3. [Add to Inventory](###Add to Inventory)
 4. [Add New Product](###Add New Product)


### View Products for Sale  

A simple print of the current DB table to screen

### View Low Inventory

A query is run and it shows all inventory with less than 5 items in stock

### Add to Inventory

The user is prompted as follows 

1. ID of the product you would like to Update?
2. how many units of the product would you like to Update?

Afterwards the DB is updated and the program goes back to the main menu

### Add New Product

The user is prompted as follows 

1. items name:
2. items department:
3. items price:
4. items stock quantity:

Afterwards the DB is updated and the program goes back to the main menu

## bamazonSupervisor.js

Start it by running `node bamazonSupervisor.js` on the terminal. the user will be pompted as follows:

1. [View Product Sales by Department](###Create New Department)
2. [Create New Department](###Create New Department)

### Create New Department

A querry is run to show the user the oveahead of the departments using the current sales of each department

### Create New Department

The user is prompted as follows

1. name of new department:
2. what is the department overhead?

Afterwards the DB is updated and the program goes back to the main menu

