const express = require('express');
const app = express();
const axios = require('axios');
app.set("view engine","ejs");

var port = process.env.PORT || 8000;
const callAPIState = () =>{
 //https://api.printful.com/countries
 axios.get('https://api.printful.com/countries').then(data=>{
    return data;

 }).catch(error=>{
     console.log(error)
 })
}

app.get('*',(req,res)=>{
   //let data=  callAPIState();
    res.render("pages/index",{message:"Contattaci"})

})
app.post('/contact',(req,res)=>{
     console.log("req.body");
     res.render("pages/index",{message:"Contattaci"})
 })

app.listen(port,function(){
    console.log("App in ascolto...");
});