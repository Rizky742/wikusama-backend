const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const alamat = require('./routes/alamat')
const biodata = require('./routes/biodata')
const deleteUser = require('./routes/delete-user')
const findUser = require('./routes/find-user')
const editProfile = require('./routes/edit-profile')
const editPassword = require('./routes/edit-password')
const deleteFotoProfile = require('./routes/delete-foto-profil')

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', register);
app.use('/login', login);
app.use('/alamat', alamat);
app.use('/biodata', biodata);
app.use('/delete-user', deleteUser);
app.use('/find-user', findUser);
app.use('/edit-profile', editProfile);
app.use('/edit-password', editPassword);
app.use('/delete-profile-photo', deleteFotoProfile);

module.exports = app;
