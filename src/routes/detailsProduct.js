const express = require('express');
const router = express.Router();
const DetailsProductControllers = require('../controllers/detailsProduct')

router.get('/product/:id', DetailsProductControllers.details )

module.exports = router
