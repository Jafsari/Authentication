const passport = require('passport');
const user = require('../models/user');
const config = require('../config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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