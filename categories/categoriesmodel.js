var mongoose = require('mongoose');
  const { Schema } = mongoose;
  mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true }, { useUnifiedTopology: true });

  // var categoriesSchema = new Schema({
  //   id: {type:Number},
  //   name: { type: String},
  //   hasSubCategory: {type: Boolean},
  //   parentId:{type:Number}
  //   // posts: [{ type: Schema.Types.ObjectId, ref:'Post' }]
    
  // });
  
  // const categoriesModel = mongoose.model('categories',categoriesSchema);
  // module.exports  = categoriesModel ;



  