const express = require('express');
const methodOverride = require('method-override');
const {engine} = require('express-handlebars');
const {handleError} = require("./utils/errors");

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static('public'));
// app.use(express.json()); // Content-type: application/json

app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers, //  additional functionality to handlebars
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('children/list')
})

app.use(handleError);

const port = 3000;
app.listen(port, 'localhost', () => {
    console.log(`Server is listening on port: ${port}`)
})
