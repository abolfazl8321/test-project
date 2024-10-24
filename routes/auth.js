const express=require('express');
const router=express.Router();
const authValidation=require('../Validations/authValidations');
const authControllers = require('../Controller/authControllers');

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
})

router.get('/register',authControllers.registerForm.bind(authControllers));
router.get('/login',authControllers.loginForm.bind(authControllers));
router.post('/login',authValidation.login(),authControllers.login.bind(authControllers));
router.post('/register',authValidation.register(),authControllers.register.bind(authControllers));

module.exports=router;