
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
    // static invert_table_entry(table_id)
    // {
    //     return pool.query('UPDATE tables SET active = CASE WHEN active = "yes" THEN "no" WHEN active = "no" THEN "yes" ELSE NULL WHERE table_no = $1 END;',[table_id]);
    // }

};