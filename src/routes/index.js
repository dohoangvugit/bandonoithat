const authRoute = require('./authRoute')
const adminProductRoute = require('./admin/products')
const homeRoute = require('../routes/home')
const categoryRoute = require('./categoryRoute')

function route(app) {
    app.use('/auth', authRoute);

    app.use('/admin', adminProductRoute);

    app.use('/',homeRoute)
    app.use('/', categoryRoute)
}

module.exports = route;
