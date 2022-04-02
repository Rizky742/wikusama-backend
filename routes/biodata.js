const express = require('express');
const app = express();

const { Biodata } = require('../models')
const { User } = require('../models')
const { Kota } = require('../models')
const { Provinsi } = require('../models')
const multer = require("multer")
const path = require("path")
const fs = require("fs")
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


app.post('/', auth,upload.single("foto_profile") , async (req, res) => {
    let data = {
        nama_lengkap: req.body.nama_lengkap,
        user_id: req.body.user_id,
        angkatan: req.body.angkatan,
        jurusan: req.body.jurusan,
        tahun_lulus: req.body.tahun_lulus,
        kota_asal: req.body.kota_asal,
        provinsi_asal: req.body.provinsi_asal,
        
        kota_domisili: req.body.kota_domisili,
        provinsi_domisili: req.body.provinsi_domisili
    }
    let data2 = {
        foto_profile : `images/user/${req.file.filename}`
    }

    Biodata.create(data)
        .then(respons => {
            User.update(data2, {where : {id : data.user_id}})
            .then(() => {
                res.json({
                    message: respons,
                    path: `images/user/${req.file.filename}`
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

app.get('/', async (req, res) => {
    Biodata.findAll({
        include: [
            {
                model: User,
                attributes: ['username','email','role','foto_profile']
            },
            {
                model: Kota,
                required: true,
                as: "kotaAsal",
            },
            {
                model: Kota,
                required: true,
                as: "kotaDomisili",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiAsal",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiDomisili",
            }
        ]
    })
        .then(result => {
            res.json(result)
        })
})

app.get('/:id', async (req, res) => {
    let user_id = req.params.id
    Biodata.findOne({
        where: {
            user_id: user_id
        },
        include: [
            {
                model: User,
            },
            {
                model: Kota,
                required: true,
                as: "kotaAsal",
            },
            {
                model: Kota,
                required: true,
                as: "kotaDomisili",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiAsal",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiDomisili",
            }
        ]
    })
        .then(result => {
            res.json(result)
        })
})


module.exports = app