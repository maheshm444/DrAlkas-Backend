const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

const patientHistorySchema = new Schema({
  doctor: { type: Number },
  payments: { type: Number },
  products: { type: Number },
  clinic: { type: Number },
  prescription: { type: String },
  appointments: { type: Number }

});
autoIncrement.initialize(mongoose.connection);
patientHistorySchema.plugin(autoIncrement.plugin, {
  model: "patienthistory", // collection or table name in which you want to apply auto increment
  field: "id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});
const patientHistoryModel = mongoose.model('patienthistory', patientHistorySchema);
module.exports.patientHistoryModel = patientHistoryModel;

