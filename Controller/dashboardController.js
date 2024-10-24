const Controllers=require('./Controllers');
const {validationResult}=require('express-validator');

class DashboardControllers extends Controllers{
    async dashboard(req,res,next){
        try {
            res.render('/dashboard')
        } catch (error) {
            next(error)
        }
    }

}
module.exports=new DashboardControllers;