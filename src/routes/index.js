const authRoute = require('./authRoute')
const adminProductRoute = require('./admin/products')
const homeRoute = require('../routes/home')

function route(app) {
    app.use('/auth', authRoute);

    app.use('/admin', adminProductRoute);

    app.use('/',homeRoute)
}

module.exports = route;
