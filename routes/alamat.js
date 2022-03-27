const express = require('express');
const app = express();
const region = require('./region/regions.json')

const { Provinsi } = require('../models')
const { Kota } = require('../models')

app.post('/', async(req,res) => {
    // let data = {
    //     nama_lengkap : req.body.nama_lengkap,
    //     jurusan : req.body.jurusan,
    //     tahun_lulus : req.body.tahun_lulus,
    //     kota_asal : 
    // }
    
    // Object.keys(region).map(index => {
    //     let data = {
    //         nama : region[index].provinsi
    //     }
        
    //     // res.json(result)
    //     Provinsi.create(data)
    //     .then(result => {
    //         console.log(result)
    //     })
    // })

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
    // for(let i=0; i<region.length; i++){
    //     console.log(region[i].provinsi)
    // }
    // res.json(region[0].provinsi)
})

module.exports = app