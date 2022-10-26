INSERT INTO books(name) VALUES("Book 1"), ("Book 2"), ("Book 3"), ("Book 4"), ("Book 5"), ("Book 6"), ("Book 7"), ("Book 8"), ("Book 9"), ("Book 10");
SELECT * FROM books;

INSERT INTO library_detail(library_id, book_id) VALUES(1, 1), (1, 2), (1, 3), (2, 4), (2, 5), (2, 6), (3, 7), (3, 8), (3, 9), (3, 10);

SELECT * FROM transactions t
JOIN transaction_detail td
ON t.id = td.transaction_id;

SELECT t.id, borrow_date, return_date, fine, b.name book_name, username, s.name staff_name, l.name library_name, location FROM transactions t
JOIN transaction_detail td
ON t.id = td.transaction_id
JOIN books b
ON td.book_id = b.id
JOIN members m
ON t.member_id = m.id
JOIN staffs s
ON t.staff_id = s.id
JOIN library l
ON t.library_id = l.id;

SELECT s.id, name, day FROM staffs s
JOIN staff_schedule ss
ON s.schedule_id = ss.id;