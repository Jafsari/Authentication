const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the model 
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase:true}, 
//make sure the email is always unique and that it will be lowercase
//to prevent duplicate usernames that are cased differently
  password: String
});


//Create the model class
const modelClass = mongoose.model('user',userSchema)

//Export the model
module.exports = ModelClass;
