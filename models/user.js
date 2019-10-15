var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
name :{type:String},
rollno :{type:String},
role : {type:String},
age : {type:Number},
email : {type:String},
username : {type:String},
collagename : {type:String}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);