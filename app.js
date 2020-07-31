const express = require('express');
const app = express();
const axios = require('axios');
const { json } = require('express');
app.set("view engine","ejs");

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const callAPIState = async ( ) =>{
 //https://api.printful.com/countries
 axios.get('https://api.printful.com/countries').then(data=>{
   
   return data
 }).catch(error=>{
     console.log(error)
 })
}

app.get('*',  function(req,res){

  axios.get('https://api.printful.com/countries').then(data=>{
    
    res.render("pages/index",{message:"Contattaci", stati: data.data.result})

 }).catch(error=>{
     console.log(error)
 })
    
   

})
app.post('/contact',function(req,res){
     console.log("req.body");
    res.json({result:'ok'})
 })

app.listen(port,function(){
    console.log("App in ascolto...");
});