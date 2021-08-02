drop database if exists employeeDB;

create database employeeDB;

use employeeDB;

create table department (
    id int auto_increment primary key,
    name varchar(30)
);
create table role (
    id int auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id) references department(id)
);
create table employee (
    id int auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    foreign key (role_id) references role(id),
    manager_id int,
    foreign key (manager_id) references employee(id)
);



