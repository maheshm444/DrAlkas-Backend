// import mongoose from 'mongoose';
var mongoose = require('mongoose');
  const { Schema } = mongoose;
  mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true }, { useUnifiedTopology: true });

  // var orderSchema = new Schema({
  //   food_name: { type: String},
  //   food_qty: {type: String},
  //   // posts: [{ type: Schema.Types.ObjectId, ref:'Post' }]
    
  // });
  
  // const orderModel = mongoose.model('orders',orderSchema);
  // module.exports  = orderModel ;



  