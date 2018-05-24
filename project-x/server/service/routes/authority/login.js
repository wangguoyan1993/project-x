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
 * 检查用户账号是否存在于数据库表中
 * @param account
 */
function checkUserAccount(account, callback) {
    account *= 1;

    //查询所有用户名称
    let sql = `SELECT number FROM main`;
    //连接数据库查询
    conDB(sql, (result)=>{
        if(result.length > 0){
            //比对
            for(let i = 0; i < result.length; i++){
                if(account === result[i].number){
                    callback(true);
                    return;
                }
            }
            callback(false);
        }
    });
}

/**
 * 登录实现方法
 * @param req
 * @param res
 */
function loginMethod(req, res) {
    let account = req.body['userAccount'];
    let password = req.body['password'];

    let sql = `SELECT * FROM main WHERE number=${account}`;
    checkUserAccount(account, (ckResult)=>{
        if(ckResult){
            conDB(sql, function(result){
                let relPassword = result[0].password;           //密码
                let userName = result[0].name;                  //用户姓名
                let userId = result[0].id;                      //用户id
                let userType = result[0].type;                  //用户类型
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
                        url : 'http://localhost:8080/web-mods/index.html',
                        sig : 0,
                        userName : userName,
                        userId : userId,
                        userType : userType
                    });
                }else{
                    res.send({
                        sig : 1,
                        error : '密码错误，请核对重试！'
                    });
                }
            });
        }
        else{
            res.send({
                sig : 1,
                error : `账号 ${account} 不存在！`
            })
        }
    });

};

/**
 * 修改用户密码
 * @param req
 * @param res
 */
function updateUserPassword(req, res){
    let account = req.body['account'];              //账号
    let oldPassword = req.body['oldPassword'].toString();      //旧密码
    let newPassword = req.body['newPassword'].toString();      //新密码

    //查询账号的原始密码
    let sql = `SELECT password FROM main WHERE account=${account}`;
    //调用查询原始密码
    conDB(sql, (result)=>{
        //获取真实原始密码
        let realPassword = result[0].password.toString();
        if(realPassword === oldPassword){
            let upSql = `UPDATE main password='${newPassword}' WHERE account=${account}`;
            conDB(upSql, ()=>{
                res.send({
                    sig : 0
                });
            });
        }
    });
}

/**
 * 登录接口
 */
router.post('/login', (req, res)=>{
    loginMethod(req, res);
});

/**
 * 修改密码接口
 */
router.post('/updatePassword', (req, res)=>{
    updateUserPassword(req, res);
});

module.exports = router;