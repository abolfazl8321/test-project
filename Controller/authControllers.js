const Controllers=require('./Controllers');
const {check,validationResult}=require('express-validator');
const passport=require('passport');

class AuthController extends Controllers{
     async loginForm(req,res,next){
       try {
        res.render('auth/login');
       } catch (error) {
        next(error)
       }
    }
     async registerForm(req,res,next){
        try {
            res.render('auth/register')
        } catch (error) {
            next(error)
        }
    }

     async register(req,res,next){
        try {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                req.flash("errors",errors.array());
                return res.redirect('auth/register');
            }
                passport.authenticate('local.register',
                {
                    successRedirect:'/dashboard',
                    failureRedirect:'/auth/register',
                    failureFlash:true
                })(req,res,next)
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next){
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                req.flash("errors",errors.array());
                return res.redirect('/auth/login');
            }
            passport.authenticate('local.login',(err,user)=>{
                if(!user) return res.redirect('/auth/login');
                req.logIn(user,err=>{
                    return res.redirect('/dashboard');
                })
            })
    }
    catch(err){
            next(err);
            }
        }
}

module.exports=new AuthController