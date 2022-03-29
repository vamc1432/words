const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin123@cluster0.zgxwc.mongodb.net/wordsDB?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
);
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const wordSchema = {
    word: String
};
const wordModel = new mongoose.model("word",wordSchema);
app.get("/getall",(req,res)=>{
    wordModel.find({},(err,fData)=>{
        res.send(fData);
    });
});

app.post("/addnote",(req,res)=>{
    const note = new wordModel({
        word: req.body.content
    });
    note.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            wordModel.find({},(err,fData)=>{
                res.send(fData);
            }); 
        }
    });
});

app.post("/deletenote",(req,res)=>{
    wordModel.findByIdAndRemove(req.body.id,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            wordModel.find({},(err,fData)=>{
                res.send(fData);
            }); 
        }
    });
});

app.post("/editnote",(req,res)=>{
    wordModel.findByIdAndUpdate(req.body.id,
        {word:req.body.content}
        ,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
           res.json("success");
        }
    });
    
});


app.listen(port,(req,res)=>{
    console.log("server started at "+port);
});