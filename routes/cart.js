const path = require('path');

const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();


router.get('/cart', cartController.getCart);

router.delete('/cart/:id',cartController.postCartDeleteProduct);
router.post('/cart',cartController.postCart);



module.exports = router;
