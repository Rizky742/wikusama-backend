const express = require('express');
const app = express();
const path = require("path")
const fs = require("fs")
const { User } = require("../models")
const auth = require('../auth')


app.delete('/:user_id',auth,async(req,res) => {
    try{
        let param = { id: req.params.user_id}
        let result = await User.findOne({where: param})
        let oldFileName = result.foto_profile
        let dir = path.join(__dirname, "../public/"+oldFileName)
        fs.unlink(dir, err => console.log(err))
        let data = {
            foto_profile : 'images/user/icon-user.png'
        }
        User.update(data, {where : param})
        res.json({
            message: "Sukses menghapus foto"
        })


    }catch(error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app
