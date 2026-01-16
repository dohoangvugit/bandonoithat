const express = require('express');
const router = express.Router()

const newAuth = require('../controllers/authController')

router.post('/login', newAuth.login )
router.post('/register', newAuth.register )

module.exports = router