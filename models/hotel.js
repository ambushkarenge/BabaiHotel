
const pool= require('../utils/database');
module.exports = class Hotel{

    // constructor( title, image, price, quantity){
    //     this.title = title;
    //     this.image = image;
    //     this.price = price;
    //     this.quantity = quantity;
    // }

    add_prod(){
        return pool.query('INSERT INTO products(title, price, image, quantity) VALUES ($1, $2, $3, $4);', [this.title, this.price, this.image, this.quantity]);
    }
    static get_all_tables(){
        return pool.query('SELECT * FROM tables order by table_no');

    }
    // waiter1
    static get_table_status(table_id)
    {
        return pool.query('SELECT active from tables where table_no = $1;',[table_id]);
    }
    static update_table_occupied(table_id)
    {
        return pool.query("update tables set active = 'yes' where table_no = $1;",[table_id]);
    }
    static update_table_vacant(table_id)
    {
        return pool.query("update tables set active = 'no' where table_no = $1;",[table_id]);
    }

    static add_order_table(table_id)
    {
        return pool.query("insert into order_table(table_no) values ($1);",[table_id]);
    }
    static get_latest_order()
    {
        return pool.query("select max(order_no) as max_ord_no from order_table");
    }
    // waiter2

    static get_num_items()
    {
        return pool.query("select count(*) as no_items from item;");
    }
    static get_items()
    {
        return pool.query("select * from item order by item_no;");
    }

    static add_item_order(order_no,item_no,q)
    {
        return pool.query("INSERT into orders(order_no,item_no,numitems,status) values ($1,$2,$3,'placed');",[order_no,item_no,q]);
    }

    //waiter3
    static get_order_details()
    {
        return pool.query("select item.name, order_table.table_no, orders.order_no,orders.item_no,orders.numitems,orders.status,thour, tmin, tsec from item, orders,order_table where item.item_no = orders.item_no and orders.order_no = order_table.order_no and orders.status <> 'closed' and orders.status <> 'served' order by entrytime;");
    }

    static get_status(order_no,item_no, thour, tmin, tsec)
    {
        return pool.query("select status from orders where item_no = $1\
         and order_no = $2 and thour = $3 and tmin = $4 and \
         tsec = $5;",[item_no,order_no,thour,tmin,tsec]);
    }

    static close_item(order_no,item_no, thour, tmin, tsec)
    {
        return pool.query("update orders set status = 'closed' where item_no = $1 and order_no = $2 and thour = $3 and tmin = $4 and tsec = $5;",[item_no,order_no, thour, tmin, tsec]);
    }

    static serve_item(order_no,item_no, thour, tmin, tsec)
    {
        return pool.query("update orders set status = 'served' where item_no = $1 and order_no = $2 and thour = $3 and tmin = $4 and tsec = $5;",[item_no,order_no, thour, tmin, tsec]);
    }
    //manager1
    static add_feedback(c_name,c_feedback)
    {
        return pool.query("insert into feedback(name,comment) values ($1,$2);",[c_name,c_feedback]);
    }

    //manager2
    static get_ingredients()
    {
        return pool.query("select * from ingredient order by ingredient_id;");
    }
    static add_ingredients(id,q)
    {
        return pool.query("update ingredient set quantity = quantity + $2 where ingredient_id = $1;",[id,q]);
    }
    static add_cashflow(cost)
    {
        return pool.query("insert into moneyflow(amount, io_check) values ($1, 'out');",[cost]);
    }

    //manager3

    static get_feedbacks()
    {
        return pool.query("select * from feedback;");
    }

    static get_moneyflow()
    {
        return pool.query("select * from moneyflow;");
    }
    //chef1
    static get_orders()
    {
        return pool.query("select order_no, name, item.item_no as item_no, numitems, status, thour, tmin, tsec from orders, item where orders.item_no = item.item_no order by entrytime;");
    }
    static check_quantity(item_no,quantity)
    {
        return pool.query("update ingredient set quantity = quantity - $2*(select quantity_used from preparedby where ingredient.ingredient_id = preparedby.ingredient_id and preparedby.item_no = $1) where ingredient_id in (select ingredient_id from preparedby where preparedby.item_no = $1);",[item_no,quantity]);
    }
    static approve(order_no,item_no, thour, tmin, tsec)
    {
        return pool.query("update orders set status = 'approved' where item_no = $1 and order_no = $2 and thour = $3 and tmin = $4 and tsec = $5;",[item_no,order_no, thour, tmin, tsec]);
    }
    static decline(order_no,item_no, thour, tmin, tsec)
    {
        return pool.query("update orders set status = 'declined' where item_no = $1 and order_no = $2 and thour = $3 and tmin = $4 and tsec = $5;",[item_no,order_no, thour, tmin, tsec]);
    }
    static ready(order_no,item_no, thour, tmin, tsec)
    {
        return pool.query("update orders set status = 'ready' where item_no = $1 and order_no = $2 and thour = $3 and tmin = $4 and tsec = $5;",[item_no,order_no, thour, tmin, tsec]);
    }

    //cashier1
    static get_active()
    {
        return pool.query("select * from tables where active = 'yes';");
    }
    static add_bill()
    {
        return pool.query("Insert into bill(status) values ('not paid');");
    }
    static get_bill_no()
    {
        return pool.query("select max(bill_no) as bill_no from bill;");
    }
    static get_order_no(table_no)
    {
        return pool.query("select order_no from order_table where table_no = $1 and order_no not in (select order_no from bill_order);", [table_no]);
    }
    static add_bill_order(bill_no, order_no)
    {
        return pool.query("Insert into bill_order(bill_no,order_no) values ($1,$2);", [bill_no, order_no]);
    }
    static get_price(bill_no)
    {
        return pool.query("Select sum(numitems*price) as tot_price from item, bill_order, orders where bill_no = $1 and \
        bill_order.order_no = orders.order_no and orders.item_no = item.item_no and\
        orders.status = 'served';", [bill_no]);
    }
    static get_list_items(bill_no)
    {
        return pool.query("Select numitems, item.item_no as num, name, numitems*price as t_price, price as i_price from item, bill_order, orders where bill_no = $1 and \
        bill_order.order_no = orders.order_no and orders.item_no = item.item_no and\
        orders.status = 'served';", [bill_no]);
    }

    //cashier2
    static change_bill_status(bill_no)
    {
        return pool.query("Update bill set status = 'paid' where bill_no = $1;",[bill_no]);
    }
    static add_moneyflow(price)
    {
        return pool.query("Insert into moneyflow(amount, io_check) values ($1, 'in');",[price]);
    }
};