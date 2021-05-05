DELETE FROM bill;
DELETE FROM orders;
DELETE FROM preparedby;
DELETE FROM ingredient;
DELETE FROM item;
DELETE FROM tables;
DELETE FROM moneyflow;
DELETE FROM feedback;
DELETE FROM person;

INSERT INTO person(name, contact_no, address, type) VALUES ('ManagerName', '1234567890', 'Flat 101, Babai Residency', 1);
INSERT INTO person(name, contact_no, address, type) VALUES ('CashierName', '1234567891', 'Flat 201, Babai Residency', 2);
INSERT INTO person(name, contact_no, address, type) VALUES ('Waiter1Name', '1234567892', 'Flat 301, Babai Residency', 3);
INSERT INTO person(name, contact_no, address, type) VALUES ('Waiter2Name', '1234567893', 'Flat 302, Babai Residency', 3);
INSERT INTO person(name, contact_no, address, type) VALUES ('Chef1Name', '1234567894', 'Flat 401, Babai Residency', 4);
INSERT INTO person(name, contact_no, address, type) VALUES ('Chef2Name', '1234567895', 'Flat 402, Babai Residency', 4);
INSERT INTO person(name, contact_no, address, type) VALUES ('Cust1Name', '1234567896', 'Flat 501, Babai Residency', 5);
INSERT INTO person(name, contact_no, address, type) VALUES ('Cust2Name', '1234567897', 'Flat 502, Babai Residency', 5);



INSERT INTO item(name, price) VALUES ('Veg Cheese Balls', 100.00);
INSERT INTO item(name, price)VALUES ('Veg Pakora', 90.00);
INSERT INTO item(name, price) VALUES ('Chicken 65', 90.00);
INSERT INTO item(name, price) VALUES ('Crispy Chicken', 100.00);
INSERT INTO item(name, price) VALUES ('Chicken Fried Rice', 130.00);
INSERT INTO item(name, price) VALUES ('Veg Fried Rice', 120.00);
INSERT INTO item(name, price) VALUES ('Choco Black Forest Cake', 50.00);



INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Potato', 20000 , 'gms', 0.02);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Onion',  30000, 'gms', 0.03);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Capsicum',  10000, 'gms', 0.03);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Carrot',  10000, 'gms', 0.05);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Cabbage',  20000, 'gms', 0.06);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Cauliflower',  10000, 'gms', 0.04);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Peas', 5000, 'gms',0.05);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Garlic', 3000, 'gms',0.13);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Chickpea Flour',  5000, 'gms', 0.12);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Red Chilli Powder',  5000, 'gms', 0.27);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Chicken',  10000, 'gms', 0.2);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Coriander Powder',  5000, 'gms', 0.24);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Curd',  5000, 'gms', 0.08);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Turmeric',  5000, 'gms', 0.35);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Curry Leaves',  5000, 'gms', 0.5);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Sweet Corn', 10000 , 'gms', 0.16);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Cheese',  20000, 'gms', 0.4);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Coriander Leaves',  5000, 'gms', 0.2);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Ginger',  5000, 'gms', 0.05);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Black Pepper Powder',  5000, 'gms', 0.7);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Chat Masala Powder',  5000, 'gms', 0.5);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Salt',  10000, 'gms', 0.02);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Bread Crumbs',  5000, 'gms', 0.25);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Green Chilli',  10000, 'gms', 0.02);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Purpose Flour', 5000, 'gms', 0.15);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Paprika Powder', 5000, 'gms', 3);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Rice', 10000, 'gms',0.05);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Sugar', 10000, 'gms',0.04);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Cocoa Powder', 5000, 'gms',1);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Baking Soda', 5000, 'gms',0.4);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Vanilla Extract', 5000, 'gms',1.5);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Tomato Ketchup',  10000, 'ml', 0.2);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Mustard Oil',  20000, 'ml', 0.18);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Vegetable Oil',  10000, 'ml', 0.08);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Milk',  10000, 'ml', 0.06);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Refined Oil',  20000, 'ml', 0.17);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Soy Sauce',  5000, 'ml', 0.25);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Vinegar', 5000, 'ml',.25);
INSERT INTO ingredient(name, quantity, unit, price) VALUES ('Egg', 500, '-',5);

INSERT INTO preparedby VALUES (1,1,350);
INSERT INTO preparedby VALUES (1,16,80);
INSERT INTO preparedby VALUES (1,17,200);
INSERT INTO preparedby VALUES (1,18,10);
INSERT INTO preparedby VALUES (1,19,1);
INSERT INTO preparedby VALUES (1,20,2);
INSERT INTO preparedby VALUES (1,21,4);
INSERT INTO preparedby VALUES (1,22,5);
INSERT INTO preparedby VALUES (1,23,15);
INSERT INTO preparedby VALUES (1,24,45);

INSERT INTO preparedby VALUES (2,1,100);
INSERT INTO preparedby VALUES (2,2,20);
INSERT INTO preparedby VALUES (2,3,20);
INSERT INTO preparedby VALUES (2,4,30);
INSERT INTO preparedby VALUES (2,5,40);
INSERT INTO preparedby VALUES (2,6,40);
INSERT INTO preparedby VALUES (2,24,45);
INSERT INTO preparedby VALUES (2,9,300);
INSERT INTO preparedby VALUES (2,22,10);
INSERT INTO preparedby VALUES (2,10,10);

INSERT INTO preparedby VALUES (3,11,500);
INSERT INTO preparedby VALUES (3,12,30);
INSERT INTO preparedby VALUES (3,13,60);
INSERT INTO preparedby VALUES (3,24,180);
INSERT INTO preparedby VALUES (3,10,5);
INSERT INTO preparedby VALUES (3,14,5);
INSERT INTO preparedby VALUES (3,15,10);
INSERT INTO preparedby VALUES (3,22,10);
INSERT INTO preparedby VALUES (3,32,50);
INSERT INTO preparedby VALUES (3,33,56);

INSERT INTO preparedby VALUES (4,11,270);
INSERT INTO preparedby VALUES (4,25,225);
INSERT INTO preparedby VALUES (4,22,15);
INSERT INTO preparedby VALUES (4,26,7);
INSERT INTO preparedby VALUES (4,20,5);
INSERT INTO preparedby VALUES (4,36,500);
INSERT INTO preparedby VALUES (4,39,2);

INSERT INTO preparedby VALUES (5,11,400);
INSERT INTO preparedby VALUES (5,27,225);
INSERT INTO preparedby VALUES (5,2,30);
INSERT INTO preparedby VALUES (5,22,15);
INSERT INTO preparedby VALUES (5,20,5);
INSERT INTO preparedby VALUES (5,36,30);
INSERT INTO preparedby VALUES (5,37,5);
INSERT INTO preparedby VALUES (5,38,3);

INSERT INTO preparedby VALUES (6,2,55);
INSERT INTO preparedby VALUES (6,5,60);
INSERT INTO preparedby VALUES (6,24,30);
INSERT INTO preparedby VALUES (6,7,30);
INSERT INTO preparedby VALUES (6,3,45);
INSERT INTO preparedby VALUES (6,4,40);
INSERT INTO preparedby VALUES (6,8,4);
INSERT INTO preparedby VALUES (6,19,2);
INSERT INTO preparedby VALUES (6,27,550);
INSERT INTO preparedby VALUES (6,22,20);
INSERT INTO preparedby VALUES (6,36,15);

INSERT INTO preparedby VALUES (7,25,330);
INSERT INTO preparedby VALUES (7,28,400);
INSERT INTO preparedby VALUES (7,29,70);
INSERT INTO preparedby VALUES (7,30,10);
INSERT INTO preparedby VALUES (7,31,10);
INSERT INTO preparedby VALUES (7,35,250);
INSERT INTO preparedby VALUES (7,34,120);
INSERT INTO preparedby VALUES (7,39,3);

INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');
INSERT INTO tables(active) VALUES ('no');