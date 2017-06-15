/**
 * Created by Administrator on 2017/5/16 0016.
 */
var express = require('express');
var Promise = require('promise');
var router = express.Router();
var UserModel = require('../src/models/UserModel');
var BlogModel = require('../src/models/BlogModel');
var CommentModel = require('../src/models/CommentModel');

router.get('/', (req, res, next) => {
    res.render('index',{
        title: '博客家园'
    });
});

// 用户注册
router.post('/addUser', (req, res, next) => {
    let newItem = req.body;
 //   insert(newItem);
    UserModel.create(newItem, (err) => {
        if (err !== null) {
            console.log('Add user failed',err);
            res.json(err);
        }else {
            console.log('Add user successed');
            res.json(newItem);
        }
    })
});

// 用户登录
router.post('/userLogin', (req, res, next) => {
    let newItem = req.body;
    UserModel.findOne(newItem, function(err,doc) {
        if (doc === null) {
            console.log('User login failed',err);
            res.json(doc);
        }else {
            console.log('User login successed ');
            res.json(newItem);
        }
    });
});

router.post('/publishBlog',(req, res, next) => {
    let time = new Date();
    let newItem = req.body;
    BlogModel.create({theme:newItem.theme,category:newItem.category,tags:newItem['tags[]'],content:newItem.content,
        author:newItem.author,time:time,scanNumber:0,commentNumber:0}, (err,data) => {
        if (err !== null) {
            console.log('Publish failed',err);
            res.json(err);
        }else {
            console.log('Publish successed');
            res.json(data);
        }
    })
})

router.get('/getMyBlogs/:nickname',(req,res,next) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',req.params.nickname);
    BlogModel.find({author:req.params.nickname}, ['theme','category','tags','content'], function (err, articles) {
        if(err){
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',err);
            res.json(err);
        }else{
            console.log('cccccccccccccccccccccccccccccccccc');
            res.json(articles);
        }
    })
})

router.get('/getAllBlogs',(req,res,next) => {
    BlogModel.find({}, function (err, articles) {
        if(err){
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',err);
            res.json(err);
        }else{
            console.log('cccccccccccccccccccccccccccccccccc');
            res.json(articles);
        }
    })
})

router.get('/getBlogById/:id', (req,res,next) => {
    console.log('dddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaa',req.params.id);
    var pro = new Promise(function (resolve, reject) {
        BlogModel.update({_id:req.params.id}, {$inc: { scanNumber: 1 }}, function (err) {
            if(err){
                console.log('update scanNumber failed',err);
                reject(err);
            }else{
                console.log('update scanNumber successed');
                resolve('success');
            }
        })
    });
    pro.then(function (mess) {
        BlogModel.find({_id:req.params.id}, function (err, article) {
            if(err){
                console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',err);
                res.json(err);
            }else{
                console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffff');
                res.json(article);
            }
        })
    });
})

router.post('/updateBlog/:id', (req,res,next) => {
    console.log('dddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaa',req.params.id);
    var newItem = req.body;
    BlogModel.update({_id:req.params.id}, {theme:newItem.theme,category:newItem.category,tags:newItem['tags[]'],
        content:newItem.content,time:new Date()}, function (err) {
        if(err){
            console.log('error',err);
            res.json(err);
        }else{
            console.log('successed');
            res.json(req.body);
        }
    })
})

router.post('/removeBlogById/:id', (req,res,next) => {
    console.log('removeBlog',req.params.id);
    BlogModel.remove({_id:req.params.id}, function (err) {
        if(err){
            console.log('RemoveBlog failed',err);
            res.json(err);
        }else{
            console.log('RemoveBlog success');
            res.json({"execute":"success"});
        }
    })
})

router.post('/addComment/:id',(req,res,next)=>{
    console.log('addComment: id: ', req.params.id);
    let newItem = req.body;
    var pro = new Promise(function (resolve, reject) {
        CommentModel.find({article_id:req.params.id,to_uid:''},(err,comments)=>{
            if(err){
                console.log('getFlootNumber failed ',err);
                reject(-1);
            }else{
                console.log('getFlootNumber successed ');
                console.log('getFloorNumber: n: ',comments.length);
                resolve(comments.length);
            }
        })

    });
    pro.then(function (n) {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth();
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var curTime = year + '-' + (month+1)+'-'+day+' '+hour+':'+minute+':'+second;
        CommentModel.create({
            article_id: req.params.id,
            from_uid: newItem.nickname,
            to_uid: newItem.to_uid||'',
            content: newItem.content,
            floor: newItem.floor||++n,
            time: curTime,
            favour:0,
        },(err, data)=>{
            if(err){
                console.log('add comment failed',err);
                res.json(err);
            }else{
                console.log('add comment successed');
                BlogModel.update({_id:req.params.id}, {$inc:{commentNumber:1}}, function (err) {
                    if(err){
                        console.log('error',err);
                    }else{
                        console.log('successed');
                    }
                })
                res.json(data);
            }
        });
    });
})

router.get('/getCommentsById/:id',(req,res,next)=>{
    console.log('/getCommentsById/:id: ',req.params.id);
    CommentModel.find({article_id:req.params.id,to_uid:''},function (err,comments) {
        if(err){
            console.log('getComments failed. ',err);
            res.json(err);
        }else{
            console.log('getComments successed',comments);
            res.json(comments);
        }
    })
})

router.get('/getReplyCommentsById/:id/:floor',(req,res,next)=>{
    console.log('/getReplyCommentsById/:id:/:floor ',req.params.id,req.params.floor);
    CommentModel.find({article_id:req.params.id,floor:req.params.floor,to_uid:{$ne:''}},function (err,comments) {
        if(err){
            console.log('getReplyComments failed. ',err);
            res.json(err);
        }else{
            console.log('getReplyComments successed',comments);
            res.json(comments);
        }
    })
})

router.post('/updateCommentById/:id',(req,res,next)=>{
    console.log('/updateCommentById/:id',req.params.id);
    CommentModel.update({_id:req.params.id},{$inc: { favour: 1 }},function (err,comment) {
        if(err){
            console.log('updateComment failed ',err);
            res.json(err);
        }else{
            console.log('updateComment successed ',comment);
            res.json(comment);
        }
    })
})

module.exports = router;