const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const register = require('./routes/register');
const login = require('./routes/login');
const alamat = require('./routes/alamat')
const biodata = require('./routes/biodata')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', register);
app.use('/login', login);
app.use('/alamat', alamat);
app.use('/biodata', biodata);

module.exports = app;
