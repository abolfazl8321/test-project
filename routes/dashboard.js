const express=require('express');
const router=express.Router();
const DashboardControllers=require('../Controller/dashboardController');

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
})

router.get('/',DashboardControllers.dashboard.bind(DashboardControllers));

module.exports=router;