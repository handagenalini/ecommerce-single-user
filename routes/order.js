const path = require('path');

const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();


router.get('/order', orderController.getOrder);

router.post('/order',orderController.postOrder);

module.exports=router;