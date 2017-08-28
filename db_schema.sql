DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(50),
	price DECIMAL(10,4),
	stock_quantity INTEGER 
);


INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('soccer ball','Sports and Outdoors', 25.99 , 100  );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('cleats','Sports and Outdoors', 70.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('winter coat','Clothing', 70.55, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('shorts','Clothing', 25, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('paint','Arts and Crafts', 10.44, 30 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('paper' ,'Arts and Crafts',4 , 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('brilliance','Books', 25.55, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('fifty shades of gray','Books' , 30.0, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('nintendo switch','Gaming', 299, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('ps4','Gaming', 399, 100);