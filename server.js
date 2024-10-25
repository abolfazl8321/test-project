const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const config=require('./config');
const Data=require('./sql_models/Data');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
require('dotenv').config;
const mysql=require('mysql2');
const secret=config.session_secret;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser(process.env.Cookie_SECRET));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(methodOverride('method'));

app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie:{secure:true,expires:new Date(Date.now()+1000*3600*24*100)},
}))
app.use(flash());
require('./passport/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals={errors:req.flash("errors"),req};
    next();
})
app.get('/',(req,res)=>{
    res.render('index');
});

app.use('/',require('./routes/index'));

const port=config.port;
app.listen(port,()=>{
    console.log(`connection is success to ${port}`)
});