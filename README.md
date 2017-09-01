# bamazon

##Goal

The Goal of Bamazon is to simulate Amazon's back end using MySql. Bamazon has 3 main JavaScript files 

* [bamazonCustomer.js](## bamazonCustomer.js)
* [bamazonManager.js]()
* [bamazonSupervisor.js]()

Additionally it contains __db_schema.sql__ where the databases and tables are declared and populated with some 
dummy data. Bamazon uses [npm MySQL](https://www.npmjs.com/package/mysql) to run queries, [inquirer](https://www.npmjs.com/package/inquirer) for user interface/input, [console.table](https://www.npmjs.com/package/console.table) to format and print to screen tables and lastly it uses [questions.js](./questions.js) where questions for inquirer are stored along with some validations


 ## bamazonCustomer.js

 Start it by running `node bamazonCustomer.js` on the terminal. the user will be prompted for the items ID printed on screen after a valid input the user will be prompted for how many items to buy.


## bamazonManager.js

 Start it by running `node bamazonCustomer.js` on the terminal. the user will be see 4 options

 1 [View Products for Sale](###View Products for Sale)
 2 [View Low Inventory](###View Low Inventory)
 3 [Add to Inventory](###Add to Inventory)
 4 [Add New Product]()


### View Products for Sale  

A simple print of the current DB table to screen

### View Low Inventory

### Add to Inventory