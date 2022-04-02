const express = require('express');
const app = express();
const { Biodata } = require('../models')
const { User } = require('../models')
const { Kota } = require('../models')
const { Provinsi } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


app.get('/nama/:name', auth, (req,res) => {
    Biodata.findAll({
        where: {nama_lengkap: {[Op.like] : '%' + req.params.name  + '%'}},
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
        if(result){
            res.json(result)
        }
    })
    .catch(error => {
        res.json(error)
    })
})

app.get('/jurusan/:jurusan', (req,res) => {
    Biodata.findAll({
        where: {jurusan: req.params.jurusan},
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
        if(result){
            res.json(result)
        }
    })
    .catch(error => {
        res.json(error)
    })
})

app.get('/angkatan/:angkatan', (req,res) => {
    Biodata.findAll({
        where: {angkatan: req.params.angkatan},
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
        if(result){
            res.json(result)
        }
    })
    .catch(error => {
        res.json(error)
    })
})



module.exports = app