const express = require('express');
const router = express.Router();
const DetailsProductControllers = require('../controllers/detailsProduct');

router.get('/:id', DetailsProductControllers.details);


module.exports = router;
