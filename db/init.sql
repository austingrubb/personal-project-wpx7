drop table if exists customers cascade;
drop table if exists horses cascade;
drop table if exists users cascade;


create table users(
     id serial primary key,
     username varchar(32) not null unique,
     password text not null
);

create table customers(
    id serial primary key,
    name text not null,
    address text not null,
    zip_code integer not null,
    cell_phone text not null, 
    email text unique,
    customer_type text NOT NULL
);

create table horses(
    id serial primary key,
    customer_email text references customers(email) ON DELETE CASCADE,
    name text not null,
    age integer not null,
    breed text,
    height integer,
    sex text,
    foaling_year integer,
    color text,
    appointment_date text,
    appointment_time text
);


insert into customers(name, address, zip_code, cell_phone, email, customer_type)
values('bill', '123n street', 85343, '6238089959', 'bill@bill.com', 'shoeing');

insert into customers(name, address, zip_code, cell_phone, email, customer_type)
values('bob', '153n street', 85343, '6068089959', 'bob@bill.com', 'shoeing');

insert into customers(name, address, zip_code, cell_phone, email, customer_type)
values('joe', '333n street', 85343, '3038089959', 'joe@bill.com', 'shoeing');

insert into customers(name, address, zip_code, cell_phone, email, customer_type)
values('john', '321n street', 85343, '6578089959', 'john@bill.com', 'shoeing');

insert into customers(name, address, zip_code, cell_phone, email, customer_type)
values('austin', '222n street', 85343, '5558089959', 'austinl@bill.com', 'shoeing');


insert into horses(customer_email, name, age, breed, height, sex, foaling_year, color, appointment_date, appointment_time)
values('bill@bill.com', 'hname1', 23, 'breed1', 15, 'male', 2001, 'black','12/3','10:00');

insert into horses(customer_email, name, age, breed, height, sex, foaling_year, color, appointment_date, appointment_time)
values('bob@bill.com', 'hname2', 17, 'breed1', 17, 'male', 2011, 'brown','12/3','10:00');

insert into horses(customer_email, name, age, breed, height, sex, foaling_year, color, appointment_date, appointment_time)
values('bob@bill.com', 'hname3', 12, 'breed1', 13, 'male', 2007, 'white','12/3','10:00');

insert into horses(customer_email, name, age, breed, height, sex, foaling_year, color, appointment_date, appointment_time)
values('joe@bill.com', 'hname4', 43, 'breed1', 11, 'female', 200, 'blue','12/3','10:00');

insert into horses(customer_email, name, age, breed, height, sex, foaling_year, color, appointment_date, appointment_time)
values('austinl@bill.com', 'hname5', 3, 'breed1', 19, 'female', 2012, 'red', '12/3','10:00');

select * from customers 
join horses on (customers.email = horses.customer_email);

select * from customers;

select * from horses;

select * from customers 
join horses on (customers.email = horses.customer_email);

update horses
set appointment_date = '12/1'
where appointment_date = '12/2';



update horses
set appointment_time = '10:00'
where appointment_time = '3:00';

select name from customers
WHERE name ILIKE concat('%', 'b', '%')

select * from horses
where id = 2


delete from customers 
where email = 'bill@bill.com';


