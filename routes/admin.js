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
router.get('/manager1',adminCon.get_manager1);
router.get('/manager2',adminCon.get_manager2);
router.get('/cashier1',adminCon.get_cashier1);
router.get('/cashier2',adminCon.get_cashier2);

router.post('/waiter1',adminCon.post_waiter1);
router.post('/waiter2',adminCon.post_waiter2);
router.post('/manager1',adminCon.post_manager1);
router.post('/manager2',adminCon.post_manager2);

module.exports = router;
