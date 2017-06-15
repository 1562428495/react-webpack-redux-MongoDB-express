/**
 * Created by Administrator on 2017/5/15 0015.
 */
/**
 * 用户信息
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname : { type: String },                    //用户账号
    password: {type: String},                        //密码
    email: {type: String},                        //年龄
    website : { type: String},                       //最近登录时间
    residence:{type:String},
    mobile:{type:String},
});

//module.exports = mongoose.model('User',UserSchema);
module.exports = UserSchema;