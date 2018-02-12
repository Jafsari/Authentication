const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');


function tokenforUser(user){
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp },config.secret)
}


exports.signup = function(req,res,next){
  const email = req.body.email;
  const password = req.body.password;
    
  if (!email || !password){
    return res.status(422).send({error:'You must provide an email and password'});
  }
  //See if a given user email exists already
  User.findOne({email:email}, function(err,existingUser){
// check if their is an error connecting, to send an error back
      if (err) {return next(err);}
// check if the email is already in use send an error back
      if(existingUser){
        return res.status(422).send({error:'This email is already in use'});
      }
// If the email is not in use, lets create it and save it to the database.
      const user = new User({
          email:email,
          password:password
      });
      user.save(function(err){
        if (err) {return next(err);}
      
      res.json({ token: tokenforUser(user)});
    });
  });
}