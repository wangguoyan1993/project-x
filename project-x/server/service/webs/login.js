/**
 * Title    : 登录页面js
 * Desc     : 提供登录逻辑
 * version  : 0.1
 * History  : 2018/4/10 by Mr.Wang
 *
 */

$(function(){
    loginMod.init();
});

let loginMod = (function(){
    'use strict';
    /**
     * 登录方法
     */
    function _login() {
        let userAccount = $('#user_account').val();
        let password = $('#password').val();

        let url = `${window.location.protocol}//${window.location.host}/api/v1/login/login`;
        /**
         * 调用接口登录
         */
        $.ajax({
            url : url,
            type : 'POST',
            async : true,
            data : {
                userAccount : userAccount,
                password : password
            },
            // dataType : 'json',
            success : function(data, textStatus){
                console.log(data);
                if(data.sig === 0){
                    window.location = `${data.url}?userName=${data.userName}&userType=${data.userType}&account=${userAccount}&uid=${data.userId}`;
                    //将登录信息写入cookie中
                }else{
                    alert(data.error);
                }
            },
            error : function(req, textStatus, errorThrown){
                console.log(textStatus);
            }
        });
    }

    /**
     * 初始化登录界面
     */
    function init() {
        //登录按钮点击事件
        $('#sign_in').on('click', function(){
            _login();
        });
    }

    return {
        init : init
    };
})();