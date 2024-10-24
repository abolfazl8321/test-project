const Controllers=require('./Controllers');

class AuthController extends Controllers{
    static async loginForm(req,res,next){
       try {
        res.render('auth/login')

       } catch (error) {
        next(error)
       }
    }
    static async registerForm(req,res,next){
        try {
            res.render('auth/register')
        } catch (error) {
            next(error)
        }
    }

    static async register(req,res,next){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports=AuthController