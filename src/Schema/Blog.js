/**
 * Created by Administrator on 2017/5/18 0018.
 */
/**
 * 博客信息
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
    theme : { type: String },                    //标题
    category: {type: String},                        //分类
    tags: {type: Array},                        //标签
    content : { type: String},                       //内容
    author:{type:String},                        //作者
    time:{type:Date},                           //时间
    scanNumber:{type:Number},                  //浏览量
    commentNumber:{type:Number},               //评论数
});

//module.exports = mongoose.model('User',UserSchema);
module.exports = BlogSchema;