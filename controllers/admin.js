const Prod = require('../models/prod');


exports.get_test = (req,res,next) => {


    res.render('admin/add_product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });


};

exports.get_waiter1 = (req,res,next) => {


    res.render('waiter1', {
        pageTitle: 'waiter1',
        path: '/waiter1',
        editing: false
    });


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