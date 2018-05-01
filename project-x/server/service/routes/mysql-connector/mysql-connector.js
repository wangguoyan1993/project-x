/**
 * Title    : mysql数据库连接器
 * Desc     :
 * version  : 1.0
 * Histroy  : 2018/4/10 by Mr.Wang
 *
 */
let mysql = require('mysql');
let print = require('../plugins/print-log.js');

let queryDB = (sql, callback) => {
    try{
        let connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '123456',
            database : 'jack',
            port : 3306
        });

        print.log(`正在连接数据库...`);
        connection.connect();
        print.show(`数据库连接成功！`);

        /**
         * 执行sql语句
         */
        connection.query(sql, function(err, result){
            if(err){
                print.warn(`-------------------------mySQL错误-------------------------`);
                print.error(`mySQL 数据库操作错误！ 执行语句：`);
                print.error(sql);
                print.warn(`-----------------------------------------------------------`);
                return false;
            }else{
                if(typeof(callback) === 'function'){
                    callback(result);
                }
            }
        });

        connection.end();

    }catch(e){
        print.error(e);
    }
};

module.exports = queryDB;