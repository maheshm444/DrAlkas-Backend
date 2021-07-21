const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

const clinicSchema = new Schema({
    name: {type:String},
    clinic_address: {type:String},
    clinic_status: {type:Boolean},
    created_date: {type:Date,default:Date.now()},
    clinic_id:{type:Number},
    // patient_id:{type:Number}
});
 autoIncrement.initialize(mongoose.connection);

//  clinicSchema.plugin(autoIncrement.plugin, {
//     model: "clinic", // collection or table name in which you want to apply auto increment
//     field: "clinic_id", // field of model which you want to auto increment
//     startAt: 1, // start your auto increment value from 1
//     incrementBy: 1, // incremented by 1
    
//   });
  

const clinicModel = mongoose.model('clinic',clinicSchema);
module.exports.clinicModel  = clinicModel