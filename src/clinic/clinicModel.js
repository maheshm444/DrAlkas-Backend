const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

const clinicSchema = new Schema({
    name: { type: String },
    clinic_address: { type: String },
    clinic_status: { type: Boolean },
    created_date: { type: Date, default: Date.now() },
    clinic_id: { type: Number },
});
autoIncrement.initialize(mongoose.connection);
const clinicModel = mongoose.model('clinic', clinicSchema);
module.exports.clinicModel = clinicModel