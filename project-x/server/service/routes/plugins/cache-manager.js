/**
 * Title    : 共享缓存
 * Desc     : 提供全局共享缓存机制
 * version  : 1.0
 * History  : 2018/4/14 by Mr.Wang
 */

let printer = require('./print-log');

/**
 * 全局缓存管理模块儿
 * @type {{set, get}}
 */
let cacheManager = (function(){
    'use strict';
    let _cache = {};

    /**
     * 读取缓存内容
     * @param key
     * @returns {*}
     */
    let getCache = (key) => {
        let result = _cache['key'];
        if(result){
            return result;
        }else{
            printer.error(`缓存中不包含属性为 ${key} 的内容！`);
            return false;
        }
    };

    /**
     * 设置缓存内容
     */
    let setCache = (key, value) => {
        _cache[key] = value;
    };

    /**
     * 获取登录信息
     * @param account
     * @returns {*}
     */
    let getLoginUUID = (account) => {
        let result = _cache.login[account];
        if(result){
            return result;
        }else{
            printer.error(`缓存中无 ${account} 信息！`);
            return false;
        }
    };

    /**
     * 设置登录缓存
     * @param account
     * @param uuid
     */
    let setLoginUUID = (account, uuid) => {
        _cache.login[account] = uuid;
    };

    return {
        set : setCache,
        get : getCache,
        getLogin : getLoginUUID,
        setLogin : setLoginUUID
    };
})();

module.exports = cacheManager;