const path = require('path');
const express = require('express');
//const checkAuth = require('../app');
const adminCon = require('../controllers/admin');

const router = express.Router();
//console.log(checkAuth);

function checkAuthentication1(req,res,next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated() && req.user.type == "waiter"){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/dashboard");
    }
}
function checkAuthentication4(req,res,next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated() && req.user.type == "cashier"){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/dashboard");
    }
}
function checkAuthentication2(req,res,next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated() && req.user.type == "chef"){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/dashboard");
    }
}
function checkAuthentication3(req,res,next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated() && req.user.type == "manager"){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/dashboard");
    }
}

router.get('/add-product', checkAuthentication1,adminCon.get_test);
router.post('/add-product', checkAuthentication1,adminCon.post_test);
router.get('/waiter1', checkAuthentication1, adminCon.get_waiter1);
router.get('/waiter2', checkAuthentication1,adminCon.get_waiter2);
router.get('/waiter3', checkAuthentication1,adminCon.get_waiter3);
router.get('/chef1', checkAuthentication2,adminCon.get_chef1);
router.get('/manager1', checkAuthentication3,adminCon.get_manager1);
router.get('/manager2', checkAuthentication3,adminCon.get_manager2);
router.get('/manager3', checkAuthentication3,adminCon.get_manager3);
router.get('/cashier1', checkAuthentication4,adminCon.get_cashier1);
router.get('/main',adminCon.get_main);
//router.get('/cashier2',adminCon.get_cashier2);

router.post('/waiter1',adminCon.post_waiter1);
router.post('/waiter2',adminCon.post_waiter2);
router.post('/waiter3',adminCon.post_waiter3);
router.post('/manager1',adminCon.post_manager1);
router.post('/manager2',adminCon.post_manager2);
router.post('/chef1',adminCon.post_chef1);
router.post('/cashier1',adminCon.post_cashier1);
router.post('/cashier2',adminCon.post_cashier2);

module.exports = router;
