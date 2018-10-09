insert into customers
(name, address, zip_code, cell_phone, email, customer_type)
values
($1, $2, $3, $4, $5, $6);

select * from customers;

