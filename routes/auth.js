const express=require('express');
const router=express.Router();
const AuthController=require('../Controller/authControllers');

router.get('/register',AuthController.registerForm.bind(AuthController));
router.get('/login',AuthController.loginForm.bind(AuthController));
//router.post('/login',);
//router.post('/register',);

module.exports=router;