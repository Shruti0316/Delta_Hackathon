const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("../models/user");
var username="";
router.get("/",(req,res) =>{
    res.redirect("/login");
})
router.get("/login",(req,res) =>{
  res.render("login.ejs",{msg:""});
})
router.get("/signup",(req,res) =>{
  res.render("signup.ejs",{msg:""});
})
router.post("/signup", async (req, res) => {
  var username = req.body.name;
  var email = req.body.email;
  var pwd = req.body.password;
  if(username == "" || email == "" || pwd == ""){
    res.render("signup.ejs",{msg:"Fill all the Details"});
  }
  User.findOne({ name: username })
    .then(user => {
      if (user) {
        res.render("signup.ejs",{msg:"User Already Exists"});
      }
  })
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.render("signup.ejs",{msg:"Email not available"});
      }
  })

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password,salt);
  const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    newUser
    .save()
    .then(user => {
      res.redirect("/login");
    })
    .catch(err => {
      console.log(err);
    });
});
router.post("/login",(req,res)=>{
    User.findOne({name:req.body.name})
    .then(async(result) =>{
      if (result){
        var userid= await User.findOne({name:req.body.name});
        const isMatch = await bcrypt.compare(req.body.password,userid.password);
        if(isMatch){
          this.username=req.body.name;
          res.render("index.ejs",{user:username});
          }
        else{
          res.render("login.ejs",{msg:"Invalid Credentials"});
        }
      }
      else{
        res.render("login.ejs",{msg:"User Not Found"});
      }
    })
});
router.post("/serve",(req,res)=>{
  Server.findOne({ name: username })
      .then(user => {
        if (user) {
          res.send("Server already Exist");
        }
    })
    const newServer = new User({
      name: req.body.name
    })
    newServer
    .save()
    .then(user => {
      res.render("index.ejs",{user:this.username});
    })
    .catch(err => {
      console.log(err);
    });
})
post("/schema",(req,res) => {
      res.render("schema.ejs");
  })
  router.post("/model",(req,res) => {
    var newschema = req.body.schema;
    newschema = new mongoose.Schema({
      name: {
          type:String,
          required:true,
          unique: true
      }
  });
});
module.exports = router;