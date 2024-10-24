module.exports=class Controller{
    constructor(){
    }
    error(message,status){
        const err=new Error(message);
        err.status=status;
        throw err;
    }
    
}