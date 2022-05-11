const express = require('express');
const app = express();
const region = require('./region/regions.json')

const { Provinsi } = require('../models')
const { Kota } = require('../models')

app.get('/kota', async(req,res) => {
    Kota.findAll()
    .then(result => {
        res.json(result)
    })
})

app.get('/provinsi', async(req,res) => {
    Provinsi.findAll()
    .then(result => {
        res.json(result)
    })
})

app.post('/', async(req,res) => {

    region.map((result,index) => {
        index++
        let data = {
            nama: result.provinsi
        }
         Provinsi.create(data)
        result.kota.map(hasil => {
            
            let data2 = {
                id_provinsi : index,
                nama : hasil
            }
            Kota.create(data2)
        })

        
    })

    res.json({
        message: "sukses"
    })
})

module.exports = app