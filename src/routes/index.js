const authRoute = require('./authRoute');
const adminProductRoute = require('./admin/products');

function route(app) {
    app.use('/auth', authRoute);

    app.use('/admin', adminProductRoute);
}

module.exports = route;
