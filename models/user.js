const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

//Define the model 
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase:true}, 
//make sure the email is always unique and that it will be lowercase
//to prevent duplicate usernames that are cased differently
  password: String
});

//On the save hook, lets encrypt our password :)
//This function will be ran, before the model is saved
userSchema.pre('save',function(next){
  //gets access to the user model
  const user = this;

  bcrypt.genSalt(10,function(err,salt){ //generating the salt
    if (err) {return next(err);}
      
      bcrypt.hash(user.password,salt,null,function(err,hash){ //hash the password
        if (err) {return next(err); }

        user.password = hash; //replace the plain text password with the hash.
        next();
      });
  });
});

userSchema.comparePassword = function(candidatePassword,callback){
  bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    if (err) {return callback(err);}

    callback(null,isMatch);
  });
}


//Create the model class
const ModelClass = mongoose.model('user',userSchema)

//Export the model
module.exports = ModelClass;
