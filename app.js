const { engine } = require('express-handlebars');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes/index.js')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main'
  })
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home');
});

route(app)

app.listen(port, () =>
  console.log(`Server đang chạy tại http://localhost:${port}`)
);
