const express = require('express');
const app = express();

const { Biodata } = require('../models');
const { User } = require('../models');


app.put('/:user_id', auth, async(req,res) => {

    let data = {
        username : req.body.username,
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