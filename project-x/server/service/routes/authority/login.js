/**
 * Title    : 登录授权接口
 * Desc     : 提供登录授权的相关接口
 * version  : 1.0
 * Histroy  : 2018/4/10 by Mr.Wang
 *
 */

let express = require('express');

let app = express();

let router = express.Router();
let conDB = require('../mysql-connector/mysql-connector');
let print = require('../plugins/print-log');
let cookie = require('cookie-parser');
let session = require('express-session');
let uuId = require('node-uuid');
let cache = require('../plugins/cache-manager');

/**
 * 登录实现方法
 * @param req
 * @param res
 */
let loginMethod = (req, res) => {
    let account = req.body['userAccount'];
    let password = req.body['password'];

    let sql = `SELECT * FROM main WHERE number=${account}`;
    conDB(sql, function(result){
        let relPassword = result[0].password;
        if(password === relPassword){
            // let _uuid = uuId.v1();

            //定义cookie，并将uuid存入cookie对应当前用户的账号中
            // let _cookie = {};
            // _cookie[`${account}`] = _uuid;
            // res.cookie('login', _uuid, {maxAge : 60000});

            //将登录信息写入缓存
            // cache.setLogin(account.toString(), _uuid);

            //设置session
            // app.use(session({
            //     secret : '123456',
            //     name : 'login',
            //     cookie : {maxAge : 1000000},
            //     resave : false,
            //     saveUninitialized : true
            // }));

            res.send({
                url : 'http://localhost:8080/web-mods/page/index.html',
                sig : 0
            });
        }else{
            res.send({
                sig : 1,
                error : '账号或密码有误，请核对重试！'
            });
        }
    });
};

/**
 * 登录接口
 */
router.post('/login', function(req, res){
    loginMethod(req, res);
});

module.exports = router;