/**
 * Created by Administrator on 2017/5/15 0015.
 */
var mongoose = require('mongoose');
var User = require('../Schema/User');
var UserModel = mongoose.model('UserModel', User);

module.exports = UserModel;
