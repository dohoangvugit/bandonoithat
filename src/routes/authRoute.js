const express = require('express');
const router = express.Router();

const newAuth = require('../controllers/authController');

router.post('/login', (req, res, next) => {
    newAuth.login(req, res).catch(next);
});

router.post('/register', (req, res, next) => {
    newAuth.register(req, res).catch(next);
});

router.get('/logout', (req, res, next) => {
    try {
        newAuth.logout(req, res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
