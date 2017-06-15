/**
 * Created by Administrator on 2017/5/12 0012.
 */
import mongodb from 'mongodb';
import React from 'react';

let MongoClient = mongodb.MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/blog'; // 数据库为 blog



export default class MongoDB{
    constructor(){

        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            this.db = db;
            // insertData(models, function(result) {
            //     console.log(result);
            //     models.close();
            // });
        });
    }
    insertUser(data){
        //连接到表 site
        var collection = this.db.collection('user');
        //插入数据
        // var data = [{"nickname":data.nickname,"password":data.password,"email":data.email,"residence":data.residence,
        // "phone":data.phone,"website":data.website}];
        var data = [{"nickname":data.nickname}];
        collection.insert(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            console.log(result);
            this.db.close();
        });
    }
}
