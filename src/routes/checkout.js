// src/routes/checkout.js
const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const requireLogin = require('../mdlw/requireLogin');

router.get('/', requireLogin, checkoutController.renderCheckoutPage);
router.post('/momo', requireLogin, checkoutController.createMomoPayment);

module.exports = router;
