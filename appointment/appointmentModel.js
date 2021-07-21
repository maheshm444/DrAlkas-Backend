const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

const appointmentSchema = new Schema({
    clinic: {type:String},
    doctor: {type:Number},
    from_time: {type:Date},
    to_time: {type:Date},
    confirmation: {type:Boolean },
    // patient_id:{type:Number}
});

autoIncrement.initialize(mongoose.connection);
appointmentSchema.plugin(autoIncrement.plugin, {
    model: "patients", // collection or table name in which you want to apply auto increment
    field: "appointment_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
    
  });
const appointmentModel = mongoose.model('appointment',appointmentSchema);
  module.exports.appointmentModel  = appointmentModel ;