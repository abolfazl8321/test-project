const Validation=require('./Validation');
const {check}=require('express-validator');
class authValidation extends Validation{
    register(){
        return[
            check("username","You Must Fill Username").not().isEmpty(),
            check("gmail","You Must Fill Gmail").isEmail(),
            check("pass","You Must Fill Password").isLength({min:5})
        ];
    };
    login(){
        return[
            check("username","You Must Fill Username").not().isEmpty(),
            check("gmail","You Must Fill Gmail").isEmail(),
            check("pass","You Must Fill Password").isLength({min:5})
        ];
    };
}
module.exports=new authValidation;