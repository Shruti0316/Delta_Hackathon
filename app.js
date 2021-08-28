const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const port =5000;

//INITIALIZES APP
const app = express();

//CONNECTING WITH DB
mongoose.connect("mongodb://localhost/hacka");
let db = mongoose.connection;

db.once("open",function(){
    console.log("Successfully connected to database");
}).on("error",function(error){
    console.log(error);
})

app.set("view-engine","ejs");

//BODY PARSER
app.use(express.urlencoded({ extended: false }));

//SETTING ROUTES
app.use("/",require("./routes/index"));


//STATIC FILES
app.use('/public', express.static('public'));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});