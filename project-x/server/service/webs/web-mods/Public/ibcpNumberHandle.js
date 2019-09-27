/**
 * Created by Mr.Wang on 2017/11/2.
 * @description : 此文件集合拓展数字类型的一般和特殊处理方法
 */

/**
 * 数字去尾方法
 * @author : Mr.Wang
 * @param num
 * @returns {number}
 */
Number.prototype.toFloor = function(num){
    'use strict';
    return Math.floor(this * Math.pow(10, num)) / Math.pow(10, num);
};

/**
 * 数字进一方法
 * @author : Mr.Wang
 * @param num
 * @returns {number}
 */
Number.prototype.toCeil = function(num){
    'use strict';
    return Math.ceil(this * Math.pow(10, num)) / Math.pow(10, num);
};

/**
 * 数字四舍五入
 * @author : Mr.Wang
 * @param num
 * @returns {number}
 */
Number.prototype.toRound = function(num){
    'use strict';
    return Math.round(this * Math.pow(10, num)) / Math.pow(10, num);
};

/**
 * 根据精度将数字后面补充0
 * @author : Mr.Wang
 * @param num
 * @description : 此方法用于给取舍位数后或者特殊情况下位数不满足精度需要的数字后面补充0占位
 */
Number.prototype.supplyZeros = function(num){
    'use strict';
    //获取字符串化的数字
    var curNum = this.toString();
    //获取当前数字小数点后的位数
    var length = curNum.indexOf('.') >= 0 ? curNum.split('.')[1].length : 0;
    //计算需要补充的0的位数
    var count = num - length;
    //生成指定位数的0字符串
    var tail = count === num && num !== 0 ? '.' : '';
    if(count > 0){
        for(var i = 0; i < count; i++){
            tail += '0';
        }
    }
    //返回
    return curNum + tail;
};

/**
 * 获取数字的有效数字长度
 * @author : Mr.Wang
 * @returns {Number}
 * @description : 此方法返回当前数字的有效数字长度，不计小数点符号
 */
Number.prototype.getSignificantDigitLength = function(){
    'use strict';
    var curNum = this.toString();
    if(curNum.indexOf('.') >= 0){
        var str = curNum.replace('.','');
        return str.length;
    }else{
        return curNum.length;
    }
};

/**
 * 获取字符串数字的有效数字长度
 * @author : Mr.Wang
 * @returns {Number}
 * @description : 此方法返回当前字符串数字的有效字符长度，不计小数点符号
 */
String.prototype.getSignificantDigitLength = function(){
    'use strict';
    var curNum = this.toString();
    if(curNum.indexOf('.') >= 0){
        var str = curNum.replace('.','');
        return str.length;
    }else{
        return curNum.length;
    }
};

/**
 * 数字四舍六入无成双
 * @author : ZhangLinxia
 * @param digit
 * @returns {number}
 */
Number.prototype.roundFixed = function(digit){
    'use strict';
    // 获取保留小数位数的幂次方
    var ratio = Math.pow(10, digit);
    // 将小数位数转化为整数部分
    var _num = this * ratio;
    // 获取转化后的整数的余数
    var mod = _num % 1;
    // 获取转化后的数据取下整
    var integer = Math.floor(_num);
    // 若余数>0.5,则进一；若余数<0.5,则舍去；若整数部分为偶，则舍去余数，若整数部分为奇，则进一
    if(mod > 0.5){
        return (integer + 1) / ratio;
    }else if(mod < 0.5){
        return integer / ratio;
    }else{
        return (integer % 2 === 0 ? integer : integer + 1) / ratio;
    }
};