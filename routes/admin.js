const path = require('path');
const express = require('express');

const adminCon = require('../controllers/admin');

const router = express.Router();


router.get('/add-product',adminCon.get_test);
router.post('/add-product',adminCon.post_test);
router.get('/waiter1',adminCon.get_waiter1);
router.get('/waiter2',adminCon.get_waiter2);
router.get('/waiter3',adminCon.get_waiter3);
router.get('/chef1',adminCon.get_chef1);



module.exports = router;
