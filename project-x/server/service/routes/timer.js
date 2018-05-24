/**
 * Title    : 时间接口
 * Desc     :
 * version  : 0.1
 * History  : 2018/5/24 by Mr.Wang
 *
 */

let express = require('express');

let app = express();

let router = express.Router();

const NodeCache = require('node-cache');
const myCache = new NodeCache();

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
                    if(value === uuid){
                        callBack(true);
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
            res.redirect('http://localhost:8080/test/test-main.html');
        }
    });
});

module.exports = router;