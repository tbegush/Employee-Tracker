use employeeDB;

insert into department (name) 
values ("IT"),("HR"),("Accounting"),("Janitorial");

insert into role (title,salary,department_id)
values 
("CTO",50, 1),("HRM",40, 2), ("AM",40,3),("CJO",40,4);

insert into employee (first_name,last_name,role_id,manager_id)
values
("bob","smith",1,NULL),
("lucy","smith",2,1),
("Dollar","mcdollarface",3,2),
("Tom","smithe",4,2);