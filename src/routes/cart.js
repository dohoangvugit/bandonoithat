const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const requireLogin = require('../mdlw/requireLogin');

router.get('/', requireLogin, cartController.renderCartPage);
router.get('/api', requireLogin, cartController.getCart);
router.post('/add', requireLogin, cartController.addToCart);
router.put('/update', requireLogin, cartController.updateCart);
router.delete('/remove', requireLogin, cartController.removeFromCart);


module.exports = router;
