const express = require('express');
const app = express();
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SECRET_KEY = "wikusamaoyee";
const auth = require('../auth')
const { User } = require('../models/')

app.post('/', async(req,res) => {
    const schema = {
        email: 'string|empty:false|email|unique:true|max:255',
        password: 'string|min:6'
    }
    const validate = v.validate(req.body, schema);
    
    if (validate.length) {
        return res.status(404).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
        return res.json({
            status: 'error',
            message: 'email not found'
        })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    // res.json(isValidPassword)
    if (!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    const payload = JSON.stringify(user)
    let token = jwt.sign(payload, SECRET_KEY)

    res.json({
        acces_token: token,
        token_type: "Bearer",
        user: user
    })
})


module.exports = app;
