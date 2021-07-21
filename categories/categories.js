var express = require('express');
var categoriesModel = require('./categoriesmodel');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true }, { useUnifiedTopology: true });
var router = express.Router();

const getCategorieDetails = async (req, res, next) => {
    const results = await categoriesModel.find((err, data) => {
        if(err) {
            console.log('error while geting order details ', err);
            return res.status(500).json({error: err})
        }
       return res.status(200).json(data);
    })
}

exports.getCategorieDetails = getCategorieDetails;