-- #1
SELECT country_id, country FROM country WHERE country IN("China", "Bangladesh", "India");

-- #2
SELECT * FROM actor WHERE last_name LIKE "%OD%";
SELECT * FROM actor WHERE last_name LIKE "%OD%" ORDER BY last_name, first_name;

-- #3
ALTER TABLE actor ADD COLUMN middle_name varchar(45) AFTER first_name;

-- #4
SELECT *, COUNT(*) total FROM actor GROUP BY last_name HAVING total >= 2;

-- #5
SELECT s.first_name, s.last_name, a.address FROM staff s
JOIN address a
USING (address_id);

-- #6
SELECT f.title, COUNT(*) total FROM inventory i
JOIN film f
USING(film_id)
WHERE f.title = "HUNCHBACK IMPOSSIBLE";

-- #7
SELECT f.title, COUNT(*) total FROM rental r
JOIN inventory i
USING(inventory_id)
JOIN film f
USING(film_id)
GROUP BY film_id
ORDER BY total desc;

-- #8
SELECT store_id, city, country FROM store s
JOIN address a
USING(address_id)
JOIN city c
USING(city_id)
JOIN country co
USING(country_id);

-- #9
SELECT title FROM film WHERE title = "Alone Trip";
SELECT f.film_id, a.actor_id, concat(first_name, " ", last_name) actor_name, f.title FROM actor a
JOIN film_actor fa
USING(actor_id)
JOIN film f
USING(film_id)
WHERE f.title = (SELECT title FROM film WHERE title = "Alone Trip");

-- #10
ALTER TABLE actor DROP COLUMN middle_name;