const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { User } = require('../models');

app.put('/:user_id', auth, async(req,res) => {
  let cari = await User.findOne({where : {id : req.params.user_id}})
  let oldPassword = await bcrypt.compare(req.body.oldPassword, cari.password)
  if(!oldPassword){
      return res.json("Password anda tidak sesuai")
  }
  let newPassword = await bcrypt.hash(req.body.newPassword, 10)
  let data = {
      password : newPassword
  }
  await User.update(data, {where: {id : req.params.user_id}})
  .then(() => {
      res.json({
          message: "berhasil di update"
      })
  })
  .catch(error => {
      res.json({
          message: error
      })
  })

})

module.exports = app