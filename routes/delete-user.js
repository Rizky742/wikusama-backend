const express = require('express');
const app = express();
const { Biodata } = require('../models');
const { User } = require('../models');
const fs = require("fs")

app.delete('/:id',auth,(req,res) => {
    let param = {id: req.params.id}
    let param2 = {user_id: req.params.id}
    User.findByPk(req.params.id)
    .then(result => {
        if(!result) {
            return res.json("user tidak ditemukan")
        }
        let oldFileName = result.foto_profile
        let dir = path.join(__dirname,"../image/user",oldFileName)
        fs.unlink(dir, err => console.log(err))
        User.destroy({where : param})
        .then(() => {
            Biodata.destroy({where : param2})
            .then(() => {
                res.json("Berhasil menghapus akun")
            })
            .catch(error => {
                res.json(error)
            })
        })
        .catch(error => {
            res.json(error)
        })
    })
    .catch(error => {
        res.json(error)
    })
    
    
})

module.exports = app