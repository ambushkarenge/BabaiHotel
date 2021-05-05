
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
};