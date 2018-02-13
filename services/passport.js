const passport = require('passport');
const user = require('../models/user');
const config = require('../config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const localOptions = {username:'email'};
const localLogin = new LocalStrategy(localOptions,function(email,password,done){
  User.findOne({email:email}),function(err,user){
    if (err) {return done(err);}
    if (!user) {return done(null,false);}

    user.comparePassword(password,function(err,isMatch){
      if (err) { return done(err); }
      if (!isMatch) { return done(null,false); }
      return done(null,user);
    });
  }
});

//Setup the options for the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secret:config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
  // see if the user.payload exists 

  User.findById(payload.sub,function(err,user){
    if (err) {return done(err,false);}

    if(user){
      done(null,user);
    } else {
      done(null,false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);