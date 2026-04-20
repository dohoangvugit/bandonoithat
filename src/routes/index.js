const authRoute = require('./authRoute');
const adminProductRoute = require('./admin/products');
const homeRoute = require('../routes/home');
const categoryRoute = require('./categoryRoute');
const productRoutes = require('./detailsProduct');
const cartRoute = require('./cart');
const checkoutRoute = require('./checkout');
const authController = require('../controllers/authController');

function route(app) {
    app.use('/auth', authRoute);
    app.get('/logout', (req, res, next) => {
        try {
            authController.logout(req, res);
        } catch (err) {
            next(err);
        }
    });
    app.use('/cart', cartRoute);
    app.use('/checkout', checkoutRoute);
    app.use('/admin', adminProductRoute);
    app.use('/product', productRoutes);
    app.use('/', homeRoute);
    app.use('/', categoryRoute);
}

module.exports = route;
