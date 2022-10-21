-- cari customers yang tinggal di negara France
SELECT customerNumber, customerName, country FROM customers WHERE country='France';

-- hitung ada berapa total product yang jenisnya calssic cars
SELECT count(*) FROM products WHERE productLine='Classic Cars';

-- hitung total product per productLine
SELECT count(*) as total, productName, productLine FROM products GROUP BY productLine;

-- cari product yang paling murah
SELECT min(buyPrice) price FROM products;

-- cari product paling murah per productLine
SELECT productLine, min(buyPrice) price FROM products GROUP BY productLine;

-- cari product yang paling mahal
SELECT max(buyPrice) price FROM products;

-- cari product yang paling mahal per productLine
SELECT productLine, max(buyPrice) price FROM products GROUP BY productLine;

-- cari rata2 harga dari semua product
SELECT avg(buyPrice) price FROM products;

-- cari rata2 harga per productLine
SELECT productLine, avg(buyPrice) price FROM products GROUP BY productLine;

-- cari total harga dari semua product
SELECT sum(buyPrice) price FROM products;

-- cari total harga per productLine
SELECT productLine, sum(buyPrice) price FROM products GROUP BY productLine;

-- cari productLine yang rata2 harganya dibawah 50
SELECT productLine, avg(buyPrice) price FROM products GROUP BY productLine HAVING price < 50 AND price > 45;

SELECT * FROM offices LIMIT 2, 4;

-- get data office order by city
SELECT * FROM offices ORDER BY city;

-- get data office order by city in desc
SELECT * FROM offices ORDER BY city desc;

-- get data customer yang melakukan pembelian melalui sales, tinggal di germany, nama mengandung huruf n, dan urutkan berdarkan nama
SELECT * FROM customers WHERE salesRepEmployeeNumber IS NOT NULL AND country = 'Germany' AND customerName LIKE "%n%" ORDER BY customerName;

-- total price per order number
SELECT orderNumber, sum(priceEach * quantityOrdered) "total price" FROM orderdetails GROUP BY orderNumber;