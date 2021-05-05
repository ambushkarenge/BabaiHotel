const Prod = require('../models/prod');
const Hotel = require('../models/hotel');

var cur_tab_no;
exports.get_test = (req,res,next) => {


    res.render('admin/add_product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });


};

exports.get_waiter1 = (req,res,next) => {

    Hotel
    .get_all_tables()
    .then((x)=>
    {
        res.render('waiter1', {
            pageTitle: 'waiter1',
            path: '/waiter1',
            tab_rows: x.rows,
            editing: false
        });
    }
    )
};
exports.post_waiter1 = (req,res,next) => {
    const table_id = req.body.table_id;
    cur_tab_no = table_id;
    //console.log(table_id)
    Hotel
        .get_table_status(table_id)
        .then((x) => {
            var val = x.rows[0].active
            //console.log(val)
            //console.log(val.localeCompare('no'))
            if(val.localeCompare('no')==0)
            {
                //console.log('no');
                Hotel 
                .update_table_occupied(table_id)
                .then(()=>
                {
                    Hotel
                    .add_order_table(table_id)
                    .then(()=>{
                        res.redirect("/waiter2");
                    });
                    
                })
                .catch(err=>console.log(err));
            }
            else
            {
                //console.log('yes');
                Hotel 
                .update_table_vacant(table_id)
                .then(()=>
                {
                    res.redirect('/waiter1');
                })
                .catch(err=>console.log(err));
            }
        })
        .catch(err => console.log(err));
};
exports.get_waiter2 = (req,res,next) => {

    //console.log(cur_tab_no);
    Hotel
    .get_items()
    .then((x)=>
    {
        Hotel
        .get_latest_order()
        .then((y)=>{

            res.render('waiter2',{
                order_no_curr:y.rows[0].max_ord_no,
                pageTitle: 'waiter2',
                path: '/waiter2',
                item_rows:x.rows,
                tab_no: cur_tab_no,
                editing: false
            });
        });
        });
};

exports.post_waiter2 = (req,res,next) => {
    const table_no = req.body.table_no;
    const order_no = req.body.order_no;
    //var cost = 0;
    Hotel
    .get_items()
    .then((x) => {
        for(i=0;i<x.rows.length;++i){
            const name = x.rows[i].item_no;
            if(req.body[name]!=0){
                const q = req.body[name];
                //cost = cost + q*x.rows[i].price;
                Hotel.add_item_order(order_no,name,q);
            }
        }
        // Hotel
        // .add_cashflow(cost)
        // .then(() => {
            
        // })
        // .catch(err => console.log(err));
    })
    res.redirect('/waiter3');
};
exports.get_waiter3 = (req,res,next) => {


    Hotel
    .get_order_details()
    .then((x)=>{
        res.render('waiter3', {
            pageTitle: 'waiter3',
            path: '/waiter3',
            order_rows:x.rows,
            editing: false
        });
    })
};

exports.post_waiter3 = (req,res,next) => {
    const item_no = req.body.item_no;
    const order_no = req.body.order_no;
    //var cost = 0;
    Hotel
    .get_status(item_no,order_no)
    .then((x)=>
    {
        if(x.rows[0].status == 'declined' || x.rows[0].status == 'ready')
        {
            Hotel
            .close_item(item_no,order_no)
            .then((x) => {
                    res.redirect('/waiter3');
                
            })
        }
        else
        {
            res.redirect('/waiter3');
        }
    })
    
};
exports.get_chef1 = (req,res,next) => {


    res.render('chef1', {
        pageTitle: 'chef1',
        path: '/chef1',
        editing: false
    });


};
exports.get_manager1 = (req,res,next) => {

    res.render('manager1', {
        pageTitle: 'manager1',
        path: '/manager1',
        editing: false
    });


};
exports.get_manager2 = (req,res,next) => {

    Hotel
    .get_ingredients()
    .then((x) => {
        res.render('manager2', {
            pageTitle: 'manager2',
            path: '/manager2',
            editing: false,
            ingredients: x
        });
    })

};
exports.get_cashier1 = (req,res,next) => {


    res.render('cashier1', {
        pageTitle: 'cashier1',
        path: '/cashier1',
        editing: false
    });


};
exports.get_cashier2 = (req,res,next) => {


    res.render('cashier2', {
        pageTitle: 'cashier2',
        path: '/cashier2',
        editing: false
    });


};
exports.post_test = (req,res,next) => {
    const title = req.body.title;
    const image = req.body.image
    const price = req.body.price;
    const quantity = req.body.quantity;
    const product = new Prod( title, image, price,quantity);
    product
        .add_prod()
        .then(() => {
            res.redirect('/admin/add-product');
        })
        .catch(err => console.log(err));
};

exports.post_manager2 = (req,res,next) => {
    var cost = 0;
    Hotel
    .get_ingredients()
    .then((x) => {
        for(i=0;i<x.rows.length;++i){
            const name = x.rows[i].ingredient_id;
            if(req.body[name]!=0){
                const q = req.body[name];
                cost = cost + q*x.rows[i].price;
                Hotel.add_ingredients(name,q);
            }
        }
        Hotel
        .add_cashflow(cost)
        .then(() => {
            res.redirect('/manager2');
        })
        .catch(err => console.log(err));
    })

};

exports.post_manager1 = (req,res,next) => {

    const c_name = req.body.name;
    const feedback = req.body.feedback;
    Hotel
        .add_feedback(c_name,feedback)
        .then(()=>{
            res.redirect('/manager1');
        })
        .catch(err => console.log(err));

};