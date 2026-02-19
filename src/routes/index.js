const authRoute = require('./authRoute');
const adminProductRoute = require('./admin/products');
const homeRoute = require('../routes/home');
const categoryRoute = require('./categoryRoute');
const productRoutes = require('./detailsProduct');
const cartRoute = require('./cart');
const checkoutRoute = require('./checkout');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/cart', cartRoute);
    app.use('/checkout', checkoutRoute);
    app.use('/admin', adminProductRoute);
    app.use('/product', productRoutes);
    app.use('/', homeRoute);
    app.use('/', categoryRoute);
}

module.exports = route;
