'use strict';

const exphbs     = require('express-handlebars');
const express    = require('express');
const mongoose   = require('mongoose');
const path       = require('path');
const todoRoutes = require('./routes/todos');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname      : 'hbs',
    helpers      : {
        eq : function (v1, v2) {
            return v1 === v2;
        },
        ne : function (v1, v2) {
            return v1 !== v2;
        },
        lt : function (v1, v2) {
            return v1 < v2;
        },
        gt : function (v1, v2) {
            return v1 > v2;
        },
        lte: function (v1, v2) {
            return v1 <= v2;
        },
        gte: function (v1, v2) {
            return v1 >= v2;
        },
        and: function () {
            return Array.prototype.slice.call(arguments).every(Boolean);
        },
        or : function () {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        },
    },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin@cluster0-3cssc.mongodb.net/test?retryWrites=true&w=majority',
            {
                useNewUrlParser   : true,
                useFindAndModify  : false,
                useUnifiedTopology: true,
            },
        );
        app.listen(3000, () => {
            console.log('server started');
        });
    } catch (e) {
        console.log(e);
    }
}

start();
