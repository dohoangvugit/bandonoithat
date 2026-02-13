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

// handlebars
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main',

    helpers: {
      json: (x) => JSON.stringify(x),
      eq: (a, b) => a === b,
      formatPrice: (v) => v.toLocaleString()
    }
  })
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
