const express = require('express');
const app = express();
const axios = require('axios');
const { json } = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const ejs = require("ejs");
require('dotenv').config()
app.set("view engine","ejs");
var port = process.env.PORT || 6000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));



const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10,
  message:
    "Too many accounts created from this IP, please try again 5 minuti"
});
const callAPIState = async ( ) =>{
 //https://api.printful.com/countries
 axios.get('https://api.printful.com/countries').then(data=>{
   
   return data
 }).catch(error=>{
     console.log(error)
 })
}




app.get('/',  function(req,res){


  axios.get('https://api.printful.com/countries').then(data=>{
    
    res.render("pages/index",{message:"Contattaci", stati: data.data.result})

 }).catch(error=>{
     console.log(error)
 })
    
   

})
app.post('/contact',apiLimiter,async (req, res) => {
  listDestinatari = ['abdimohamed862992@gmail.com','info@mitofood.it'];
  const trasport = nodemailer.createTransport({
  
    host: "smtps.aruba.it",
    logger: true,
    debug:true,
    secure: true,
    port:465,
      auth:{
      user:process.env.USER,
      pass:process.env.PASS
      }
  })
  
  const output = await ejs.renderFile("./views/mail.ejs", {
    obj : req.body
  });
  let mailObject = {
    from:'postmaster@ladolcevia.it',
    to:listDestinatari,
    bcc: 'abdimohamed862992@gmail.com',
    subject:'prova email',
    html:output
  }
   //  res.json({message:'ok'})
     trasport.sendMail(mailObject,(error,info)=>{
      if(error) return console.log(error)
      res.json({send:"ok"})
    })


 })

 app.get('/mail',function(req,res){
   res.render("mail",{dati:req.body});
 })

app.listen(port,function(){
    console.log(`app in ascolto alla porta ${process.env.PORT}`);
});



