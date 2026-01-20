const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const db = require('../src/db');
const route = require('./routes');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// hbs
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        defaultLayout: 'main',
    }),
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

route(app);

app.get('/admin/add', (req, res) => {
    res.render('admin/admin', {
        layout: 'admin',
    });
});

app.get('/admin/products', async (req, res) => {
    //   const inventory = await getInventoryFromDB()
    res.render('admin/products', {
        layout: 'admin',
        // inventory
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
