var express = require('express');
var imageUploadModel = require('./imageUploadModel');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb',{ useNewUrlParser: true },{ useUnifiedTopology: true });


var router = express.Router();