const Prod = require('../models/prod');
const Hotel = require('../models/hotel');


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
    //console.log(table_id)
    Hotel
        .get_table_status(table_id)
        .then((x) => {
            var val = x.rows[0].active
            console.log(val)
            console.log(val.localeCompare('no'))
            if(val.localeCompare('no')==0)
            {
                console.log('no');
                Hotel 
                .update_table_occupied(table_id)
                .then(()=>
                {
                    res.redirect('/waiter2');
                })
                .catch(err=>console.log(err));
            }
            else
            {
                console.log('yes');
                Hotel 
                .update_table_vacant(table_id)
                .then(()=>
                {
                    res.redirect('/waiter2');
                })
                .catch(err=>console.log(err));
            }
        })
        .catch(err => console.log(err));
};
exports.get_waiter2 = (req,res,next) => {


    res.render('waiter2', {
        pageTitle: 'waiter2',
        path: '/waiter2',
        editing: false
    });


};
exports.get_waiter3 = (req,res,next) => {


    res.render('waiter3', {
        pageTitle: 'waiter3',
        path: '/waiter3',
        editing: false
    });


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


    res.render('manager2', {
        pageTitle: 'manager2',
        path: '/manager2',
        editing: false
    });


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