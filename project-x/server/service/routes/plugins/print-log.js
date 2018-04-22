/**
 * Title    : 插件类
 * Desc     :
 * version  : 1.0
 * Histroy  : 2018/4/10 by Mr.Wang
 *
 */

let color = require('colors');

/**
 *  控制台打印类
 */
class Print {
    constructor(){

    };

    /**
     * 常规日志
     * @param msg
     */
    log(msg){
        console.log(msg.white);
    };

    /**
     * 标记
     * @param msg
     */
    notice(msg){
        console.log(msg.green);
    };

    /**
     * 警告
     * @param msg
     */
    warn(msg){
        console.log(msg.yellow);
    }

    /**
     * 报错
     * @param msg
     */
    error(msg){
        console.log(msg.red);
    };

    /**
     * 展示
     * @param msg
     */
    show(msg){
        console.log(msg.rainbow);
    };

    /**
     * 调试
     * @param msg
     */
    debug(msg){
        console.log(msg.gray);
    };
}

//输出
module.exports = new Print();