/**
 * Created by qijialin on 2016/12/26.
 */

/**
 * 数据通信 ibcpAjax 类
 * @type {{}}
 */
;var ibcpAjax = (function(){

    /**
     *查询方法
     * @param dataUrl   数据请求的URL
     * @param jsonData  Json数据参数
     * @param isAsync   是否异步 true/false
     * @param callBack  成功回调函数
     * @param noLoop    不显示等待动画
     * @param traditional 是否对参数进行序列化
     * @param loadMsg 加载时显示的信息
     * @constructor
     */
    var ibcpSelect = function(dataUrl, jsonData, isAsync, callBack, noLoop, traditional,loadMsg){
        var type = 'get';
        isGetMethodNeedTraditional = traditional;
        CallAjax(dataUrl,jsonData,type, isAsync, callBack, noLoop,loadMsg);
    };

    var isGetMethodNeedTraditional = false;

    /**
     *查询方法  PV 专用 不处理 异常信息
     * @param dataUrl   数据请求的URL
     * @param jsonData  Json数据参数
     * @param isAsync   是否异步 true/false
     * @param callBack  成功回调函数
     * @constructor
     */
    var ibcpSelectPV = function(dataUrl, jsonData, isAsync, callBack){
        //是否对参数进行序列化 get模式下默认不需要
        var tra = false;
        var type = 'get';
        $.ajax({
            url: dataUrl,
            data: jsonData,
            type: type,
            traditional: tra,
            xhrFields:{ withCredentials:true},
            dataType: "json",
            async: isAsync,
            success: function (result) {
                callBack(result);
            },
            error: function () {
                ibcpLayer.ShowMsg('通讯异常!请尝试重新登录!');
            }
        });
    };

    /**
     *添加方法
     * @param dataUrl   数据请求的URL
     * @param jsonData  Json数据参数
     * @param isAsync   是否异步 true/false
     * @param callBack  成功回调函数
     * @param noLoop    不显示等待动画
     * @constructor
     */
    var ibcpInsert = function(dataUrl, jsonData, isAsync, callBack, noLoop){
        var type = 'post';
        CallAjax(dataUrl,jsonData,type, isAsync, callBack, noLoop);
    };

    /**
     *修改方法
     * @param dataUrl   数据请求的URL
     * @param jsonData  Json数据参数
     * @param isAsync   是否异步 true/false
     * @param callBack  成功回调函数
     * @param noLoop    不显示等待动画
     * @constructor
     */
    var ibcpUpdate = function(dataUrl, jsonData, isAsync, callBack, noLoop){
        var type = 'put';
        CallAjax(dataUrl,jsonData,type, isAsync, callBack, noLoop);
    };

    /**
     *删除方法
     * @param dataUrl   数据请求的URL
     * @param jsonData  Json数据参数
     * @param isAsync   是否异步 true/false
     * @param callBack  成功回调函数
     * @param noLoop    不显示等待动画
     * @constructor
     */
    var ibcpDelete = function(dataUrl, jsonData, isAsync, callBack, noLoop){
        var type = 'delete';
        CallAjax(dataUrl,jsonData,type, isAsync, callBack, noLoop);
    };

    /**
     *Ajax 访问后台数据
     * @param dataUrl   数据请求的URL
     * @param jsonData  Json数据参数
     * @param type      请求类型
     * @param isAsync   是否异步 true/false
     * @param callBack  成功回调函数
     * @param noLoop  不显示等待动画
     * @param loadMsg 加载时显示的信息
     * @constructor
     */
    var CallAjax = function(dataUrl, jsonData, type, isAsync, callBack, noLoop, loadMsg){
        var tra = true; //是否对参数进行序列化 get模式下默认不需要
        var loadIndex;
        if(!noLoop){
            var msg = loadMsg || "加载中...";
            var loadIndex = ibcpLayer.LoadWithMsg(msg);
        }
        if(type == 'get' && !isGetMethodNeedTraditional){
            tra = false;
        }
        $.ajax({
            url: dataUrl,
            data: jsonData,
            type: type,
            traditional: tra,
            xhrFields:{ withCredentials:true},
            dataType: "json",
            async: isAsync,        //默认为ture表示异步，false同步--ajax的回调方法中弱还需要掉用其他ajax方法 必须false
            success: function (result) {
                var errCode = result.errorCode;
                ibcpLayer.Close(loadIndex);
                if (errCode == 0) {
                    callBack(result);
                }
                else{
                    if(errCode == -1){
                        //重置页面
                        window.top.location.href = serverHead + "/login.html";
                    }
                    else {
                        if(errCode == "240027497" || errCode == "225094649" || errCode == "219220413" || errCode == "242371535"){
                            showSignErrInfo(result.data,errCode);
                            return;
                        }

                        ShowErrInfo(errCode);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if(status == 404 || status == 405 || status == 500){
                    AjaxServerErr[status](XMLHttpRequest.responseText);
                }else {
                    console.log(status + ": " + dataUrl);
                    ibcpLayer.ShowMsg('['+status+']'+'通讯异常!请尝试重新登录!');
                }
                ibcpLayer.Close(loadIndex);
            }
        });
    };

    //ajax异常
    var AjaxServerErr = new Object({
        404 : function(){
            ibcpLayer.ShowMsg("[404]路径未找到!");
        },
        405 : function(){
            ibcpLayer.ShowMsg("[405]请求方式错误!");
        },
        500 : function(responseText){
            var i = responseText.indexOf('NoAuthorityException');
            //var errMes1 = responseText.match(/\<h1\>(.*)\<\/h1\>/)[1].split(":")[1];
            // var index = errMes.indexOf('NoAuthorityException');
            if(i >= 0){
                ibcpLayer.ShowMsg('当前用户无此操作权限!');
            }else {
                ibcpLayer.ShowMsg("[500]发生未知错误!");
            }
        }
    });

    function ShowErrInfo(errCode){
        var dataUrl = serverPath + 'errorCode/findErrorCode';
        var jsonData = {'code':errCode};
        $.ajax({
            url: dataUrl,
            data: jsonData,
            type: 'get',
            traditional: true,
            xhrFields:{ withCredentials:true},
            dataType: "json",
            contentType:'application/json; charset=utf-8',
            async: true,        //默认为ture表示异步，false同步--ajax的回调方法中弱还需要掉用其他ajax方法 必须false
            success: function (result) {
                var eCode = result.errorCode;
                if (eCode == 0) {
                    if(result.data == null){
                        ibcpLayer.ShowMsg('['+ errCode +']：未找到该代码错误描述');
                    }
                    else {
                        ibcpLayer.ShowMsg('['+ errCode +']：' + result.data.description);
                    }
                }
                else{
                    ibcpLayer.ShowMsg('网络异常或服务器故障,请联系管理员');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //ibcpLayer.Close(index);
                ibcpLayer.ShowMsg('通讯异常!请尝试重新登录!');
            }
        });
    }

    /**
     *@description:显示签名密码错误信息
     *@author:tudecai
     */
    function showSignErrInfo(data,errCode) {
        var times = data.number,
            user = data.user;
        var errMsg = "用户:" + user + "</br>" + "密码输入错误:" + times + "次";
        if(errCode == "242371535"){
            errMsg = "用户:" + user + "</br>" + "旧密码输入错误:" + times + "次";
        }
        ibcpLayer.ShowMsg(errMsg);
    }

    return {
        Select : ibcpSelect,
        Insert : ibcpInsert,
        Update : ibcpUpdate,
        Delete : ibcpDelete,
        Ajax : CallAjax
    };
})();




