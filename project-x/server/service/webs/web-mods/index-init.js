/**
 * Title    : 处理主页框架初始化js
 * Desc     : 补充额外功能
 * version  : 0.1
 * History  : 2018/5/24 by Mr.Wang
 *
 */

//当前登录用户
window.top.user = {};

/**
 * 主页初始化框架模块
 */
let initIndexMod = (function(){
    //缓存页面用户名存放控件
    let $userNameBox = $('#user_name_welcome');
    //右上角用户名管理按钮显示控件
    let $userNameManage = $('#user_name_manage');

    //定义用户种类映射
    let _userTypeCollection = {
        1 : '管理员',
        2 : '老师',
        3 : '同学'
    };

    /**
     * 获取地址中的参数
     * @param pname
     * @returns {*}
     */
    function _getUrlParam(pname) {
        let reg = new RegExp("(^|&)" + pname + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r) return decodeURI(r[2]);
        return null;
    }

    /**
     * 显示用户名
     * @private
     */
    function _showUserName() {
        let userName = _getUrlParam('userName');
        let type = _getUrlParam('userType') * 1;
        let account = _getUrlParam('account');
        let uid = _getUrlParam('uid');
        if(userName){
            let userNameText = `${userName} ${_userTypeCollection[type]}`;
            //左上角显示欢迎信息
            $userNameBox.html(userNameText);
            //右上角显示用户管理信息
            $userNameManage.html(userName);
            //存储账号信息
            $userNameManage.attr('user-account', account);

            //缓存当前用户信息
            window.top.user.name = userName;
            window.top.user.account = account;
            window.top.user.type = type;
            window.top.user.uid = uid;
        }
    }

    /**
     * 获取服务器时间
     * @param callBack
     */
    function _getTime(callBack) {
        let timePath = `${window.location.protocol}//${window.location.host}/api/v1/login/timestamp`;

        $.ajax({
            url : timePath,
            type : 'GET',
            async : true,
            data : '',
            // dataType : 'json',
            success : function(data, textStatus){
                if(typeof(callBack) === 'function'){
                    callBack(data);
                }
            },
            error : function(req, textStatus, errorThrown){
                console.log(textStatus);
            }
        })
    }

    /**
     * 循环调用刷新时间
     */
    function _timeInLoop() {
        let timeLoop = setInterval(()=>{
            _getTime((data)=>{
                let sig = data.errorCode *= 1;
                if(sig === 0){

                }else{
                    window.location = `http://localhost:8080`;
                }
            });
        }, 1000);
    }

    /**
     * 初始化执行方法
     */
    function init() {
        _showUserName();
        _timeInLoop();
    }

    return {
        init : init
    }
})();


$(function(){
    initIndexMod.init();
});