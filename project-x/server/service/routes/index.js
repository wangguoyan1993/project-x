let express = require('express');
let router = express.Router();
let cache = require('./plugins/cache-manager');

/* GET home page. */
router.all('/', function(req, res, next) {
    //获取请求中存储的cookies
    let cookie = req.headers.cookie;
    //如果有cookie，
    if(cookie){
        //获取cookie中存储的登录者的uuid
        let loginInfo = cookie.login;
        //如果存在uuid
        if(loginInfo){
            //获取缓存中存储的登陆者uuid
            let _uuid = cache.get('login');

            //匹配登录信息标志
            let hasLogin = false;

            //遍历缓存中所有的uuid，与当前请求中的cookie进行匹配
            for(let i in _uuid){
                //当前的uuid缓存对象
                let _curLog = _uuid[i];

                //如果成功匹配登录信息，则直接跳转到项目主页
                if(_curLog === loginInfo){
                    res.redirect('http://localhost:8080/test/test-main.html');
                    hasLogin = true;
                    break;
                }
            }

            //如果匹配不到登录信息，则定向到登录界面
            if(!hasLogin){
                res.redirect('http://localhost:8080/login.html');
            }
        }else{
            res.redirect('http://localhost:8080/login.html');
        }
    }else{
        res.redirect('http://localhost:8080/login.html');
    }
});

module.exports = router;
