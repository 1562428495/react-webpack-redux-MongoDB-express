/**
 * Created by Administrator on 2017/5/15 0015.
 */
var mongoose = require('mongoose');
var Comment = require('../Schema/Comment');
var CommentModel = mongoose.model('CommentModel', Comment);

module.exports = CommentModel;
