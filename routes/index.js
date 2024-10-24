const express=require('express');
const router=express.Router();
const authRouter=require('./auth');
const authDashboard=require('../routes/dashboard') ;
const config = require('../config');

router.use('/auth',authRouter);
router.use('/dashboard',authDashboard)
router.get('/logout',(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return res.status(500).json({ message: "Error during logout." });
        }
         res.redirect('/');
    });
});
router.all('*',async(req,res,next)=>{
    try {
        const err=new Error('Your request is not defind!!');
        err.status= 404;
        throw err;
    } catch (err) {
        next(err);
    }
});

router.use((err,req,res,next)=>{
    const code=err.status || 500;
    const message=err.message || "";
    const stack=err.stack || "";

    if(config.debug){
        return res.render('errors/error',{message,stack})
    }else{
        return res.render(`errors/status${code}`,{message})
    }
});

module.exports=router;