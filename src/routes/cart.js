const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCart);

module.exports = router;
