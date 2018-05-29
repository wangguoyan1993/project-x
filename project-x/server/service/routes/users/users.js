/**
 * Title    : 用户管理中心
 * Desc     :
 * version  : 0.1
 * History  : 2018/5/29 by Mr.Wang
 *
 */

let express = require('express');

let router = express.Router();
let conDB = require('../mysql-connector/mysql-connector');

/**
 * 删除用户
 * @param req
 * @param res
 */
function deleteUser(req, res){
    let account = req.body.account;

    let ckSql = `SELECT * FROM main WHERE number=${account}`;

    conDB(ckSql, (ckResult)=>{
        if(ckResult && ckResult.length > 0){
            let sql = `DELETE FROM main WHERE number=${account}`;

            conDB(sql, (result)=>{
                res.send({
                    errorCode : 0,
                    data : '删除成功！'
                })
            });
        }else{
            res.send({
                errorCode : 1,
                data : '用户不存在！'
            });
        }
    });
}

/**
 * 添加用户
 * @param req
 * @param res
 */
function addUser(req, res){
    let userName = req.body.userName;
    let number = req.body.number;
    let userType = req.body.userType;
    let password = req.body.password;

    //验证当前注册账号是否存在sql语句
    let ckSql = `SELECT * FROM main WHERE number=${number}`;

    //链接数据库验证账号是否存在
    conDB(ckSql, (result)=>{
        if(result && result.length > 0){
            res.send({
                errorCode : 1,
                data : '账号已存在！'
            });
        }else{
            let sql = `INSERT INTO main(name,type,number,user_password) VALUE(${userName},${userType},${number},${password})`;

            //执行添加用户命令
            conDB(sql, (addResult)=>{
                res.send({
                    errorCode : 0,
                    data : '添加成功！'
                });
            });
        }
    });
}

/**
 * 添加用户
 */
router.post('/addUser', (req, res)=>{
    addUser(req, res);
});

router.post('/deleteUser', (req, res)=>{
    deleteUser(req, res);
});

module.exports = router;
