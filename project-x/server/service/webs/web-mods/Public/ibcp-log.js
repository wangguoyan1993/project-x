/**
 * Title    : 日志处理
 * Desc     : 日志处理类,容器内运行本系统日志以文件形式输出,浏览器运行本系统日志以控制台形式输出
 * Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2018
 * version  : 1.0
 * Histroy  : 2018/01/01 by qijialin 创建
 *            2018/01/24 by tudecai  添加注释规范
 */



/**
 * 日志处理类
 * 支持 debug, info, warn, error 4种不级别的输出
 * @type {{debug, info, warn, error}}
 */
var IbcpLog = (function(){

    /**
     * debug 调试
     * @param str
     */
    var debug = function (str) {
        try{
            JsEvent.debug(str);
        }catch(e) {
            console.debug(str);
        }
    };

    /**
     * info 信息
     * @param str
     */
    var info = function (str) {
        try{
            JsEvent.info(str);
        }catch(e) {
            console.info(str);
        }
    };

    /**
     * warn 警告
     * @param str
     */
    var warn = function (str) {
        try{
            JsEvent.warn(str);
        }catch(e) {
            console.warn(str);
        }
    };

    /**
     * error 错误
     * @param str
     */
    var error = function (str) {
        try{
            JsEvent.error(str);
        }catch(e) {
            console.error(str);
        }
    };


    return {
        debug : debug,
        info : info,
        warn : warn,
        error : error
    }
})();