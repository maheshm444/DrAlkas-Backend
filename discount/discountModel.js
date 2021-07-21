const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost/clinicDb', { useNewUrlParser: true }, { useUnifiedTopology: true });

  const discountSchema = new Schema({
            discount_id:{type:Number},
		        clinic: {type:Number},
            product:{type:Number},
            discount_name:{type:String},
            discount_desc:{type:String},
            discount_percentage:{type:Number},
            discount_validity:{type:Array}

         });
  
  const discountModel = mongoose.model('discounts',discountSchema);
  module.exports.discountModel  = discountModel ;
  



