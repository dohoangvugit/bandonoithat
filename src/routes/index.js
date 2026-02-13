const authRoute = require('./authRoute');
const adminProductRoute = require('./admin/products');
const homeRoute = require('../routes/home');
const categoryRoute = require('./categoryRoute');
const productRoutes = require('./detailsProduct');

function route(app) {
    app.use('/auth', authRoute);

    app.use('/admin', adminProductRoute);
    app.use('/', productRoutes);
    app.use('/', homeRoute);
    app.use('/', categoryRoute);
}

module.exports = route;
