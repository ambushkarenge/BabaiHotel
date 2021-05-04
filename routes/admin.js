const path = require('path');
const express = require('express');

const adminCon = require('../controllers/admin');

const router = express.Router();


router.get('/add-product',adminCon.get_test);
router.post('/add-product',adminCon.post_test);
router.get('/waiter1',adminCon.get_waiter1);



module.exports = router;
