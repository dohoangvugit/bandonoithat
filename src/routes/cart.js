const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const requireLogin = require('../mdlw/requireLogin');
const requireLoginPage = require('../mdlw/requireLoginPage');

router.get('/', requireLoginPage, cartController.renderCartPage);
router.get('/api', requireLogin, cartController.getCart);
router.post('/add', requireLogin, cartController.addToCart);
router.put('/update', requireLogin, cartController.updateCart);
router.delete('/remove', requireLogin, cartController.removeFromCart);

module.exports = router;
