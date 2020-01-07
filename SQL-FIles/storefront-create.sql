DROP DATABASE IF EXISTS storefront_db;

CREATE DATABASE storefront_db;

USE storefront_db;

CREATE TABLE inventory (
id INTEGER NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(5,4) NULL,
stock INTEGER NOT NULL,
PRIMARY KEY(id)
);

USE storefront_db;
SELECT * FROM inventory;