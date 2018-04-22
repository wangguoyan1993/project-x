/**
 * Title    : 用户表操作接口
 * Desc     : 用于操作用户表
 * version  : 1.0
 * Histroy  : 2018/4/10 by Mr.Wang
 *
 */

let express = require('express');
let router = express.Router();
let connector = require('../mysql-connector/mysql-connector');

/* GET users info */
router.get('/queryAll', function(req, res, next) {
    let sql = 'SELECT * FROM main';
    connector(sql, function(result){
        res.send(result);
    });
});

module.exports = router;