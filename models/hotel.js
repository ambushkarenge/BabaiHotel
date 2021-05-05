
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
        return pool.query('SELECT * FROM tables');

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
        return pool.query("select * from item;");
    }

    static add_item_order(order_no,item_no,q)
    {
        return pool.query("INSERT into orders(order_no,item_no,numitems,status) values ($1,$2,$3,'placed');",[order_no,item_no,q]);
    }

    //waiter3
    static get_order_details()
    {
        return pool.query("select item.name, order_table.table_no, orders.order_no,orders.item_no,orders.numitems,orders.status from item, orders,order_table where item.item_no = orders.item_no and orders.order_no = order_table.order_no and orders.status <> 'closed';");
    }

    static get_status(item_no,order_no)
    {
        return pool.query("select status from orders where item_no = $1 and order_no = $2;",[item_no,order_no]);
    }

    static close_item(item_no,order_no)
    {
        return pool.query("update orders set status = 'closed' where item_no = $1 and order_no = $2;",[item_no,order_no]);
    }
    //manager1
    static add_feedback(c_name,c_feedback)
    {
        return pool.query("insert into feedback(name,comment) values ($1,$2);",[c_name,c_feedback]);
    }

    //manager2
    static get_ingredients()
    {
        return pool.query("select * from ingredient;");
    }
    static add_ingredients(id,q)
    {
        return pool.query("update ingredient set quantity = quantity + $2 where ingredient_id = $1;",[id,q]);
    }
    static add_cashflow(cost)
    {
        return pool.query("insert into moneyflow(amount, io_check) values ($1, 'out');",[cost]);
    }
};