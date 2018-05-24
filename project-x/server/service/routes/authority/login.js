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

const NodeCache = require('node-cache');
const myCache = new NodeCache();

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
                    let uuid = uuId.v1();

                    //存储10个小时的登录缓存信息
                    myCache.set(account.toString(), {uuid : uuid}, 60000);
                    //记录登录cookie
                    res.cookie('account', {account : account.toString(), uuid : uuid}, {maxAge : 60000});

                    res.send({
                        url : 'http://localhost:8080/web-mods/index.html',
                        sig : 0,
                        userName : userName,
                        userId : userId,
                        userType : userType,
                        uuid : uuid
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
}

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
 * 登出系统方法
 * @param req
 * @param res
 */
function logoutMethod(req, res){
    let account = req.body['account'];
    //删除登录者信息缓存
    myCache.del(account.toString(), (err, count)=>{
        //返回状态
        res.send({
            sig : 0
        });
    });
}


/**
 * 验证是否登录
 * @param req
 * @param callBack
 */
function validLogin(req, callBack){
    //获取cookie中的登录信息
    let cookie = req.cookies.account;
    if(cookie){
        let account = cookie.account;
        let uuid = cookie.uuid;
        if(account && uuid){
            myCache.get(account, (err, value)=>{
                if(value){
                    if(value.uuid === uuid){
                        callBack(true);
                        return;
                    }else{
                        callBack(false);
                        return;
                    }
                }

                callBack(false);
            });
        }else{
            callBack(false);
        }
    }
}

/**
 * 获取当前时区格式化时间
 * @returns {string}
 */
function getTimestamp(){
    let date = new Date();
    return date.toLocaleDateString();
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

/**
 * 登出系统接口
 */
router.post('/logout', (req, res)=>{
    logoutMethod(req, res);
});

/**
 * 获取时间戳
 */
router.get('/timestamp', (req, res)=>{
    validLogin(req, (ckResult)=>{
        if(ckResult){
            //获取时间戳
            let timestamp = getTimestamp();
            //返回
            res.send({
                sig : 0,
                timestamp : timestamp
            });
        }else{
            res.redirect('http://localhost:8080');
        }
    });
});

module.exports = router;