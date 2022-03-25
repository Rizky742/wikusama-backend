const express = require('express');
const app = express();
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SECRET_KEY = "wikusamaoyee";

const { User } = require('../models');

app.post('/', async (req, res) => {
    const schema = {
        username: 'string|empty:false|unique:true|max:255',
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
    const password = await bcrypt.hash(req.body.password, 10);

    let data = {
        email: req.body.email,
        username: req.body.username,
        password
    }

    await User.create(data)
        .then(() => {
                User.findOne({ where: { email: req.body.email } })
                .then(result => {
                    let payload = JSON.stringify(result)
                    let token = jwt.sign(payload, SECRET_KEY)
                    res.json({
                        acces_token: token,
                        token_type: "Bearer",
                        user: result
                    })
                })
                .catch(error => {
                    res.json({
                        message: error
                    })
                })
            
        })
        .catch(error => {
            res.json({
                message: error
            })
        })

})

module.exports = app;

