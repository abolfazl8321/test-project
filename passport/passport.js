const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const Data=require('../sql_models/Data');

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser(async(id,done)=>{
    const user=await Data.query(`select * from customers where id=?`,[id]);
    if(user) done(null,user);
});

passport.use("local.register",new localStrategy(
    {
        usernameField: 'gamil',
        passwordField : 'pass',
        passReqToCallback:true
    },
    async (req,gmail,passport,done)=>{
        try {
        const gmail=req.body.gmail; 
        const user=await Data.query(`select * from customers where gmail=?`,[gmail]);
        if(user){
            return done(null,false,req.flash('errors' , "There is such a user with this email"));
        }
        const newUser=new Data({
            username:req.body.username,
            gmail:req.body.gmail,
            pass:bcrypt.hashSync(req.body.pass,10)
        })
        await newUser.query(`insert into customers (username,pass,gmail) values(?,?,?)`,[username,gmail,pass]);
        done(null,newUser);
        } catch (error) {
            return done(error,false,{message:error})
        }

    }
))

passport.use("local.login",new localStrategy(
    {
        usernameField:'gmail',
        passwordField:'pass',
        passReqToCallback:true
    },
    async (req,gmail,pass , done)=>{
        try {
            const gmail=req.body.gmail;
            const user = await Data.query(`select * from customers where gmail=?`,[gmail]);
            if(!user || !bcrypt.compareSync(req.body.pass,user.pass)){
                return done(null , false , req.flash('errors' , 'Your information is inconsistent'));
            }
            done(null , user);
        } catch (error) {
            return done(error , false , {message : error})
        }
    }
))
