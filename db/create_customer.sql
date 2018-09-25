insert into customers
(name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time)
values
($1, $2, $3, $4, $5, $6, $7, $8);

select * from customers;

