const express=require('express');
const router=express.Router();
const authRouter=require('./auth');
const config = require('../config');


router.use('/auth',authRouter);

router.all('*',async(req,res,next)=>{
    try {
        const err=new Error('Your request is not find!!');
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