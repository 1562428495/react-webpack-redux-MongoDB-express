// /**
//  * Created by Administrator on 2017/5/10 0010.
//  */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();
var mongoose = require('mongoose');
var  DB_URL = 'mongodb://localhost:27017/blog';

/**
 * 连接数据库
 */
mongoose.connect(DB_URL);
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

// 设置views路径和模板
app.set('views', './view');
app.engine('.html', ejs.__express);  //将默认ejs引擎改为HTML引擎
app.set('view engine', 'html');
//app.set('view engine', 'ejs');      //设置ejs引擎
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');

app.use('/',index);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


