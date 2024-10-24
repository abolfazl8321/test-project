const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const config=require('./config');
require('dotenv').config;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.use(methodOverride('method'));

app.use(flash());
app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/',require('./routes/index'));

const port=config.port;
app.listen(port,()=>{
    console.log(`connection is success to ${port}`)
});