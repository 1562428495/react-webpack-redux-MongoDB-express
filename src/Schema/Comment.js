/**
 * Created by Administrator on 2017/6/2 0002.
 */
/**
 * 评论信息
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    article_id : { type: String },                    //文章ID
    from_uid:{ type:String},                        //回复用户昵称
    to_uid:{ type:String},                        //被回复用户昵称
    content : { type: String},                       //评论内容
    floor:{type:Number},                        //所在楼层
    time:{type:String},                           //时间
    favour:{type:Number}                         //赞的数量
});

//module.exports = mongoose.model('User',UserSchema);
module.exports = CommentSchema;