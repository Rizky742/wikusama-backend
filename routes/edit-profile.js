const express = require('express');
const app = express();

const { Biodata } = require('../models');
const { User } = require('../models');
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const auth = require('../auth')

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./public/images/user/")
    },

    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})


app.put('/:user_id',  auth, upload.single("foto_profile"), async(req,res) => {

    let data = {
        username : req.body.username
    }

    if(req.file){
         data = {
            username : req.body.username,
            foto_profile : `images/user/${req.file.filename}`
        }
        await User.findOne({where: {id : req.params.user_id}})
        .then(result => {
            let oldFileName = result.foto_profile
            if(oldFileName !=='images/user/icon-user.png'){
                let dir = path.join(__dirname, "../public/"+oldFileName)
                fs.unlink(dir, err => console.log(err))
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    User.update(data, {where : {id : req.params.user_id}})
    .catch(error => {
        res.json({
            message: error
        })
    })

    let data2 = {
        nama_lengkap: req.body.nama_lengkap,
        angkatan: req.body.angkatan,
        jurusan : req.body.jurusan,
        tahun_lulus : req.body.tahun_lulus,
        provinsi_asal : req.body.provinsi_asal,
        kota_asal : req.body.kota_asal,
        provinsi_domisili : req.body.provinsi_domisili,
        kota_domisili : req.body.kota_domisili,
        quotes: req.body.quotes,
        last_position: req.body.last_position,
        phone_number: req.body.phone_number,
        profession: req.body.profession
    }

    Biodata.update(data2, {where : {user_id : req.params.user_id}})
    .then(() => {
        res.json({
            message: "Data berhasil di update",
        })
    })
    .catch(error => {
        res.json({
            message: error
        })
    })
})




module.exports = app