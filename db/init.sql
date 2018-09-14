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
    customer_type text NOT NULL,
    appointment_date text,
    appointment_time text
);

create table horses(
    id serial primary key,
    customer_id integer references customers(id),
    name text not null,
    age integer not null,
    breed text,
    height integer,
    sex text,
    foaling_year integer,
    color text
);

insert into customers(name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time)
values('bill', '123n street', 85343, '6238089959', 'bill@bill.com', 'shoeing', '12/2', '3:00');

insert into customers(name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time)
values('bob', '153n street', 85343, '6068089959', 'bob@bill.com', 'shoeing', '12/7', '12:30');

insert into customers(name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time)
values('joe', '333n street', 85343, '3038089959', 'joe@bill.com', 'shoeing', '12/3', '8:00');

insert into customers(name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time)
values('john', '321n street', 85343, '6578089959', 'john@bill.com', 'shoeing', '12/24', '11:30');

insert into customers(name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time)
values('austin', '222n street', 85343, '5558089959', 'austinl@bill.com', 'shoeing', '12/13', '4:00');


insert into horses(customer_id, name, age, breed, height, sex, foaling_year, color)
values(1, 'hname1', 23, 'breed1', 15, 'male', 2001, 'black');

insert into horses(customer_id, name, age, breed, height, sex, foaling_year, color)
values(2, 'hname2', 17, 'breed1', 17, 'male', 2011, 'brown');

insert into horses(customer_id, name, age, breed, height, sex, foaling_year, color)
values(2, 'hname3', 12, 'breed1', 13, 'male', 2007, 'white');

insert into horses(customer_id, name, age, breed, height, sex, foaling_year, color)
values(3, 'hname4', 43, 'breed1', 11, 'female', 200, 'blue');

insert into horses(customer_id, name, age, breed, height, sex, foaling_year, color)
values(4, 'hname5', 3, 'breed1', 19, 'female', 2012, 'red');

select * from customers 
join horses on (customers.id = horses.customer_id);

select * from customers;

select * from horses;

select * from customers 
join horses on (customers.id = horses.customer_id);

update customers
set appointment_date = '12/1'
where appointment_date = '12/2';


update customers
set appointment_time = '10:00'
where appointment_time = '3:00';


delete from customers 
where id = 5;

