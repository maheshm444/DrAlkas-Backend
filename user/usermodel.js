const mongoose = require('mongoose');require('mongoose-type-email');require('mongoose-unique-validator');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

  const userSchema = new Schema({
		        username: {type:String},
		        password: {type:String},
            email: {type: mongoose.SchemaTypes.Email, correctTld: true,unique:true},
            address: {type:String},
		        last_logged_in: {type:Date,default:Date.now()},
		        mobile_no: {type:Number,unique:true },
		        otp: {type:Number},
            validity: {type:Date},
		        status: {type:Boolean},
         });
  

    autoIncrement.initialize(mongoose.connection);
  //  userSchema.plugin(autoIncrement.plugin, 'user');

   userSchema.plugin(autoIncrement.plugin, {
    model: "users", // collection or table name in which you want to apply auto increment
    field: "id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
    
  });
  

  const userModel = mongoose.model('user',userSchema);
  module.exports.userModel  = userModel ;
  



