const express = require('express');
const app = express();
app.use(express.json());

const md5 = require("md5")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { User } = require("../models")

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./image/user")
    },

    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

//create data start
app.post("/", upload.single("foto_profile"), (req, res) =>{
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        email: req.body.email,
        role: req.body.role,
        // foto_profile: req.file.filename
        }
        User.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//create data end

//read all data start
app.get("/", (req, res) =>{
    User.findAll()
        .then(result => {
            res.json({
                user: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})
//read all data end

//read data by id start
app.get("/:user_id", (req, res) =>{
    User.findOne({ where: {user_id: req.params.user_id}})
    .then(result => {
        res.json({
            user: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
//read data by id end

//update photo start
app.put("/photo/:id", upload.single("foto_profile"), (req, res) =>{
    let param = { user_id: req.params.id}
    let data = {
        foto_profile : req.file.filename
    }
    if (req.file) {
        // get data by id
        const row = User.findOne({where: param})
        .then(result => {
            let oldFileName = result.foto_profile
           
            // delete old file
            let dir = path.join(__dirname,"../image/customer",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })

        // set new filename
        data.foto_profile = req.file.filename
    }

    User.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//update photo end

//update data start
app.put("/:id", upload.single("foto_profile"), (req, res) =>{
    let param = { user_id: req.params.id}
    let data = {
        username : req.body.username,
        password : req.body.password
    }

    if(req.body.password){
        data.password = md5(req.body.password)
    }

    User.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//update data end

//delete data start
app.delete("/:id", async (req, res) =>{
    try {
        let param = { user_id: req.params.id}
        let result = await User.findOne({where: param})
        let oldFileName = result.foto_profile
           
        // delete old file
        let dir = path.join(__dirname,"../image/user",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        User.destroy({where: param})
        .then(result => {
           
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
//delete data end

module.exports = app;
