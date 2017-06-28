require('node-jsx-babel').install({
    extensions: ['.js', '.jsx']
});

const { resolve } = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MonogSessionStore = require('connect-mongo')(session);

const { createMongoDBConnection, htmlResponse } = require('./helpers');
let router = require('./routes');

const app = express();
const publicPath = resolve(__dirname, 'public');

app.set('views', resolve(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'universal-react-mvc',
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true,
    store: new MonogSessionStore({
        mongooseConnection: mongoose.connection,
        collection: 'session'
    })
}));

app.use('/public', express.static(publicPath));
app.use('/', router);
app.use(/^\/(?!data)*/, htmlResponse((req, res) => Promise.resolve(true)));

createMongoDBConnection({ database: 'quickcart' }).then(() => {
    app.listen(3000);
}).catch(error => {
    console.log('Server Start Failed: Connection to database failed.');
});