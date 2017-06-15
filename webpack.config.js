/**
 * Created by Administrator on 2017/5/3 0003.
 */
var path = require("path");

module.exports = {
    entry:'./src/index.js',//入口
    output:{//输出
        path:path.join(__dirname,"./public/js"),
        filename:"bundle.js"
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},{
            test:/\.js?$/,
            loader:'babel-loader',
            exclude:/node_modules/,
            query:{compact:false,presets:['es2015','react']}
        }]
    }
};