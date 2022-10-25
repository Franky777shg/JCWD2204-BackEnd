-- cari identitas sales untuk tiap customer
SELECT * FROM customers
JOIN employees
ON customers.salesRepEmployeeNumber = employees.employeeNumber;

SELECT customerNumber, customerName, employeeNumber, CONCAT(firstName, " ", lastName) employeeName FROM customers
LEFT JOIN employees
ON customers.salesRepEmployeeNumber = employees.employeeNumber
WHERE employeeNumber is not null;

SELECT customerNumber, customerName, employeeNumber, CONCAT(firstName, " ", lastName) employeeName FROM customers
RIGHT JOIN employees
ON customers.salesRepEmployeeNumber = employees.employeeNumber;

SELECT * FROM customers
FULL JOIN employees
ON salesRepEmployeeNumber = employeeNumber;

-- cari product yang buyPrice nya diatas harga rata2 dari semua product
SELECT avg(buyPrice) FROM products;
SELECT * FROM products WHERE buyPrice > (SELECT avg(buyPrice) FROM products);

-- cari product yang buyPrice nya diatas harga rata2 product dengan category classic cars;
SELECT avg(buyPrice) FROM products WHERE productLine = "Classic Cars";
SELECT * FROM products WHERE buyPrice > (SELECT avg(buyPrice) FROM products WHERE productLine = "Classic Cars");

-- TRANSACTION
START TRANSACTION;
INSERT INTO users(username, email, password) VALUES("Miguel", "miguel@gmail.com", "miguel123");
INSERT INTO expenses(amount, user_id) VALUES(13000, 5);
ROLLBACK;
COMMIT;

-- INDEXING
EXPLAIN SELECT * FROM users WHERE username = "Loto";
CREATE INDEX idx_username ON users (username);







