const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

const doctorsSchema = new Schema({
  doctor_name: { type: String },
  doctor_qualification: { type: String },
  doctor_dob: { type: Date },
  doctors_home_clinic: { type: Number }
});
autoIncrement.initialize(mongoose.connection);
doctorsSchema.plugin(autoIncrement.plugin, {
  model: "doctors", // collection or table name in which you want to apply auto increment
  field: "id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1

});
const doctorsModel = mongoose.model('doctors', doctorsSchema);
module.exports.doctorsModel = doctorsModel;