DROP TABLE IF EXISTS bill_order;
DROP TABLE IF EXISTS bill;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_table;
DROP TABLE IF EXISTS preparedby;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS moneyflow;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS person;
DROP SEQUENCE IF EXISTS user_id_seq CASCADE;
DROP SEQUENCE IF EXISTS flow_id_seq CASCADE;
DROP SEQUENCE IF EXISTS item_no_seq CASCADE;
DROP SEQUENCE IF EXISTS ingredient_id_seq CASCADE;
DROP SEQUENCE IF EXISTS order_no_seq CASCADE;
DROP SEQUENCE IF EXISTS table_no_seq CASCADE;
DROP SEQUENCE IF EXISTS bill_no_seq CASCADE;

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.flow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.item_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.order_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.table_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.bill_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.person (
	user_id int PRIMARY KEY DEFAULT nextval('user_id_seq'),
	name text,
	contact_no text,
	address text,
    password text,
	type text CHECK (type in ('waiter','manager','chef','cashier')),
	CONSTRAINT chk_phone CHECK (contact_no like '__________')
);

CREATE TABLE public.feedback (
	name text,
	comment text,
	entrytime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (name, entrytime) 
);

CREATE TABLE public.moneyflow (
	flow_id int PRIMARY KEY DEFAULT nextval('flow_id_seq'),
	amount numeric(15,2),
	io_check text CHECK (io_check in ('in','out')),
	entrytime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.tables (
	table_no int PRIMARY KEY DEFAULT nextval('table_no_seq'),
	active text check (active in ('yes', 'no'))
);

CREATE TABLE public.item (
	item_no int PRIMARY KEY DEFAULT nextval('item_no_seq'),
	name text,
	price numeric(15,2)
);

CREATE TABLE public.ingredient (
	ingredient_id int PRIMARY KEY DEFAULT nextval('ingredient_id_seq'),
	name text,
	quantity int check (quantity >= 0),
	unit text,
	price numeric(15,2)
);

CREATE TABLE public.order_table (
	order_no int PRIMARY KEY DEFAULT nextval('order_no_seq'),
	table_no int REFERENCES public.tables (table_no)
);

CREATE TABLE public.orders (
	order_no int REFERENCES public.order_table (order_no),
	item_no int REFERENCES public.item (item_no),
	numitems int,
	status text CHECK (status in ('placed', 'approved', 'declined', 'ready', 'closed','served')),
    entrytime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (order_no, item_no, entrytime)
);

CREATE TABLE public.preparedby (
	item_no int REFERENCES public.item (item_no),
	ingredient_id int REFERENCES public.ingredient (ingredient_id),
	quantity_used int,
	PRIMARY KEY (item_no, ingredient_id)
);

CREATE TABLE public.bill (
	bill_no int PRIMARY KEY DEFAULT nextval('bill_no_seq'),
	billentry TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	status text CHECK (status in ('paid', 'not paid'))	
);

CREATE TABLE public.bill_order (
	bill_no int REFERENCES public.bill(bill_no),
	order_no int REFERENCES public.order_table	(order_no),
	PRIMARY KEY (bill_no, order_no)
);

COPY public.person (name, contact_no, address, type, password) FROM stdin;
\.

COPY public.feedback (name, comment) FROM stdin;
\.

COPY public.moneyflow (amount, io_check) FROM stdin;
\.

COPY public.tables (active) FROM stdin;
\.

COPY public.item (name, price) FROM stdin;
\.

COPY public.ingredient (name, quantity, unit, price) FROM stdin;
\.

COPY public.preparedby (item_no, ingredient_id, quantity_used) FROM stdin;
\.

COPY public.order_table (table_no) FROM stdin;
\.

COPY public.orders (order_no, item_no, numitems, status) FROM stdin;
\.

COPY public.bill (status) FROM stdin;
\.

COPY public.bill_order (bill_no, order_no) FROM stdin;
\.

CREATE INDEX "preparedby.items" on preparedby (item_no, ingredient_id, quantity_used);
CREATE INDEX "ingredient.quantity" on ingredient (ingredient_id, quantity);
CREATE INDEX "item.price" on item (item_no, price);
CREATE INDEX "orders.status" on orders (order_no, status);
CREATE INDEX "bill.status" on bill (bill_no, status);