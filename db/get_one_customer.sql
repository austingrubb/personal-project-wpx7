select name from customers
WHERE name ILIKE concat('%', $1, '%')