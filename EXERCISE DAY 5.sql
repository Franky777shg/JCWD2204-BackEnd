-- SLIDE 1
-- #1
CREATE SCHEMA `purwadhika_student`;
CREATE SCHEMA `purwadhika_schedule`;
CREATE SCHEMA `purwadhika_branch`;

-- #2
SHOW DATABASES LIKE "%purwadhika%";

-- #3
DROP DATABASE purwadhika_schedule;

-- #4
USE purwadhika_student;
CREATE TABLE `students` (
id int primary key not null auto_increment,
last_name varchar(45), 
first_name varchar(45),
address varchar(45),
city varchar(45)
);

-- #5
ALTER TABLE students ADD COLUMN email varchar(45);

-- #6
ALTER TABLE students ADD COLUMN gender varchar(45), ADD COLUMN batch_code varchar(45), ADD COLUMN phone_number int, ADD COLUMN alternative_phone_number int;

-- #7
ALTER TABLE students CHANGE COLUMN alternative_phone_number description varchar(45);

-- #8
ALTER TABLE students DROP COLUMN gender;

-- SLIDE 2
-- #1
INSERT INTO branch(branch_name, PIC, address, city, province)
VALUES("BSD", "THOMAS", "GREEN OFFICE PARK 9", "BSD", "TANGERANG"),
("JKT", "BUDI", "MSIG TOWER", "JAKARTA SELATAN", "JAKARTA"),
("BTM", "ANGEL", "NONGSA", "BATAM", "KEP.RIAU");

-- #2
UPDATE branch SET PIC = "Dono" WHERE city = "BSD";

-- SLIDE 3
-- #1
SELECT first_name, last_name FROM actor;

-- #2
SELECT actor_id, first_name, last_name from actor WHERE first_name = "Joe";

-- #3
SELECT address, district, city_id FROM address WHERE district IN ("California", "Alberta", "Mekka");

-- #4
SELECT last_name, COUNT(*) as total FROM actor WHERE last_name = "WOOD";

-- #5
SELECT customer_id, SUM(amount) total_spent, COUNT(*) total_transaction FROM payment GROUP BY customer_id HAVING COUNT(customer_id) > 20;

-- #6
SELECT customer_id, SUM(amount) total_spent FROM payment GROUP BY customer_id ORDER BY total_spent desc LIMIT 3;

-- SLIDE 4
-- #6
SELECT a.actor_id, a.first_name, a.last_name, COUNT(fa.film_id) total_film FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id GROUP BY fa.actor_id;

-- SLIDE 5
-- #1
SELECT name, Population FROM country ORDER BY Population desc LIMIT 1;
SELECT name, Population FROM country WHERE Population = (SELECT MAX(Population) FROM country);

-- #2
SELECT name, Population FROM country ORDER BY Population desc;
SELECT name, Population FROM country ORDER BY Population desc LIMIT 1, 1;

-- #3
SELECT name, Population FROM country WHERE Population = 0;
SELECT name, Population FROM country WHERE Population = (SELECT MIN(Population) FROM country);
SELECT name, Population FROM country ORDER BY Population LIMIT 1;

-- #4
SELECT name, Population FROM country ORDER BY Population;
SELECT name, Population FROM country ORDER BY Population LIMIT 3, 1;
select name, Population
from country
where Population = (select min(Population)
                    from country as minimum
                    where Population > (select min(Population)
                                        from country
                                        where Population > (select min(Population) from country)));
SELECT name, Population FROM country WHERE Population > 0 ORDER BY Population LIMIT 1, 1;

-- #5
SELECT continent, sum(SurfaceArea) total_area, avg(LifeExpectancy) avg_life FROM country GROUP BY Continent HAVING avg_life > 75 ORDER BY total_area desc LIMIT 1;







