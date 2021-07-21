var mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true }, { useUnifiedTopology: true });

var imageUploadSchema = new Schema({
    imageName:String
});

var imageUploadModel = mongoose.model('imageUploadSchema',imageUploadSchema);
module.exports = imageUploadModel;