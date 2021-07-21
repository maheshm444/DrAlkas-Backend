var express = require('express');
var orderModel = require('./ordermodel');
var mongoose = require('mongoose'); require('mongoose-type-email');;
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true }, { useUnifiedTopology: true });
var router = express.Router();

const newOrder = async  (req, res , next) => {
      var data = req.body;
      var count = [];
      // For multiple request body
      if(data.length > 1){
        data.forEach(function (item) {
            const orderCollection = new  orderModel(item);
              orderCollection.save ((err, result,next) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                    
                };
                var x = result;
                count.push(x);
                 if(count.length == data.length){
                    res.json({
                        message: "Order placed succesfully",
                        data:count
                    });
                 }
                
                
            });
            
        })
       
    
    }
    // For single request body
    else {
        const orderCollection = new orderModel(req.body);
        orderCollection.save ((err, result) => {
           if (err) {
               res.status(500).json({
                   error: err
               });
           }
               res.json({
                   message: "Order placed succesfully",
                   data:result
               });7
   
        })
    }
        
}


const getAllOrders = async (req, res, next) => {
    const results = await orderModel.find((err, data) => {
        if(err) {
            console.log('error while geting order details ', err);
            return res.status(500).json({error: err})
        }
       return res.status(200).json(data);
    })
}

const updateOrders = async (req, res) => {
    const formData = req.body;
    orderModel.updateOne(
        { "_id" : formData._id },
        { $set : formData },
        (err, result) => {
            if(err) {
                console.log('error while upating order detsils ', err);
                return res.status(500).json({error: err})
            }
            return res.status(200).json(result);
        }
    )
}
const deleteOrders = async (req,res)=>{
    const formData = req.body;
    orderModel.deleteOne(
        {"_id" : formData._id},
        { $set : formData},
        (err,result) =>{
            if(err){
                console.log('error while deleting',err);
                return res.status(500).json({error:err});
            }
            return res.status(200).json(result);
        }
    )
}                       

const extractData = async(req,res)=>{
  return res.status(200).json({data:{"firstName":req.body.data.substr(0,8),"lastName":req.body.data.substr(8,10),"clientid":req.body.data.substr(18,7)}});

}
const extractData1 = async(req,res)=>{
    var third = req.body.data.substr(18,7);
    var clientdata = third.slice(0,3) +"-" + third.slice(3)
    console.log(clientdata);
    
    return res.status(200).json({data:{"firstName":req.body.data.substr(0,4),"lastName":req.body.data.substr(8,7),"clientid":clientdata}});
  
  }

exports.newOrder = newOrder;
exports.getAllOrders = getAllOrders;
exports.updateOrders = updateOrders;
exports.deleteOrders = deleteOrders;
exports.extractData = extractData;
exports.extractData1 = extractData1;



