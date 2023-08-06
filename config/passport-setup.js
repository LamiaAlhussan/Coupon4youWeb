const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Admin = require("../models/Admin");

// saving user object in a the session
passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });

passport.use('local.addadmin', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,username,password, done)=> {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Passwords do not match'))
    } else {
        Admin.findOne({email: username}, (err,admin)=> {
            if(err) {
                return done(err)
            }
            if(admin) {
                return done(null, false, req.flash('error', 'Email already used'))
            }

            if (!admin) {
                //create user
                let newAdmin = new Admin()
                newAdmin.email = req.body.email
                newAdmin.password = newAdmin.hashPassword(req.body.password)
                newAdmin.save ((err,admin)=> {
                    if(!err) {
                        return done(null, admin, req.flash('success', 'User Added'))
                    } else {
                        console.log(err)
                    }
                })
            }
        })
    }
}))



// log in strategy

passport.use('local.login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true

},(req,username,password,done)=>{
    // find user
    Admin.findOne({email:username},(err,admin)=>{
      if(err){
        return done(null, false, req.flash('error', 'Something wrong happend'))
      }  
      if(!admin){
        return done(null, false, req.flash('error', 'User not found'))
      }
      if(admin){
        if(admin.comparePasswords(password,admin.password)){
        return done(null, admin, req.flash('success', 'Welcome back'))

        }else{
        return done(null, false, req.flash('error', 'Password is wrong'))

        }
      }
    })
}))