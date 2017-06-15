/**
 * Created by Administrator on 2017/5/15 0015.
 */
var mongoose = require('mongoose');
var Blog = require('../Schema/Blog');
var BlogModel = mongoose.model('BlogModel', Blog);

module.exports = BlogModel;
