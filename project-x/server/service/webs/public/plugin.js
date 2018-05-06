/**
 * Created by Oswald on 2016/12/27.
 * description:一些自己写的插件或者功能扩展
 */

;(function ($){
    /**
     * 隐藏table的checkbox
     * @author tudecai
     */
    $.fn.tableHideCheckbox = function(option){
        var $this = $(this);
        $this.css('border-left-width','0px')
        var th = $this.find('thead').find('.bs-checkbox');
        th.css('width','0px');

        var td = $this.find('tbody').find('.bs-checkbox');

        td.each(function(){
            $(this).css('width','0px');
            $(this).css("padding","0px");

            var ch =  $(this).find('input');
            ch.css('width','0px');

            /**
             * extended by WangGY
             */
            var $this = $(this);
            if(option){
                $this.on('click',function(){
                    ibcpLayer.ShowTips($this.html().$this);
                });
            }

        });
    }

    /**
     * 表格滚动到选中行
     * @author tudecai
     */
    $.fn.scrollToSelected = function () {
        var $this = $(this),
            thisH = $this.outerHeight();//table实际高度
        var pElemH = $this.parent().height() + 40;//父元素高度

        var scrollH = 0;
        //如果有滚动条
        if(thisH > pElemH){
            //获取被选中的行
            var selectedRow = $this.find(".selected");
            if(selectedRow.length == 0) return;

            var tTop = $this.offset().top,//表格距离浏览器顶部的距离
                rowTop = selectedRow.offset().top;//选中行距离浏览器顶部的距离
            var rowToTop = rowTop - tTop,//选中行距离表格 顶部 的高度
                rowToBottom = thisH - rowToTop;//选中行距离表格 底部 的高度

            //保证在允许范围内 滚动到可见区域 中间
            if(rowToTop > pElemH/2){
                rowToBottom > pElemH/2 ? scrollH = (rowToTop - pElemH/2) : scrollH = "bottom";
            }
        }
        $this.bootstrapTable('scrollTo', scrollH)
    };

    /**
     * 在光标处插入内容
     * @param newValue 要插入的内容
     * @author tudecai
     */
    $.fn.insertAtCaret = function (newValue) {
        var $this = $(this)[0];

        if(document.selection){
            //网上看到的代码，这一段不知道是干嘛。无论怎么测试都不进这个判断里。无奈。。。。
            $this.focus();
            var sel = document.selection.createRange();
            sel.text = newValue;
            $this.focus();

            console.log("终于进到这个判断了！")
        }
        else if($this.selectionStart || $this.selectionStart == '0'){
            var startPos = $this.selectionStart,
                endPos = $this.selectionEnd,
                scrollTop = $this.scrollTop;

            var startVal = $this.value.substring(0,startPos),
                endVal = $this.value.substring(endPos,$this.value.length);
            $this.value = startVal + newValue + endVal;

            $this.selectionStart = startPos + newValue.length;
            $this.selectionEnd = startPos + newValue.length;
            $this.scrollTop = scrollTop;
        }
        else {
            $this.value += newValue;
            $this.focus();
        }
    };

    /**
     * 合并为组（对于需要关联且合并的控件）
     */
    $.fn.joinGroup = function(){
        var $this = $(this);
        //获取配置类型
        var type = $this.attr('group_name').toLowerCase();
        $this.attr('group_val','N/A');
        //类型为checkbox组
        if(type === 'checkbox'){
            //找到当前组下面的对应两个checkbox
            var $true = $this.find('input[type="checkbox"][value="true"]');
            var $false = $this.find('input[type="checkbox"][value="false"]');
            //对应true的单击事件
            $true.on('click', function(){
                if($true.is(':checked')){
                    $false.prop('checked',false);
                    $this.attr('group_val','true');

                    //触发值改变的事件，返回新值
                    //add by tudecai
                    $this.triggerHandler('valuechange','true');
                    
                }else{
                    $this.attr('group_val','N/A');

                    //触发值改变的事件，返回新值
                    //add by tudecai
                    $this.triggerHandler('valuechange','N/A');
                }
            });
            //对应false的单击事件
            $false.on('click', function(){
                if($false.is(':checked')){
                    $true.prop('checked',false);
                    $this.attr('group_val','false');

                    //触发值改变的事件，返回新值
                    //add by tudecai
                    $this.triggerHandler('valuechange','false');
                }else{
                    $this.attr('group_val','N/A');

                    //触发值改变的事件，返回新值
                    //add by tudecai
                    $this.triggerHandler('valuechange','N/A');
                }
            });
        }
    };

    /**
     * 设置某个input元素回车键响应事件按钮
     * @param ele
     * @author :
     */
    $.fn.enterDo = function(ele){
        'use strict';
        var $this = $(this);
        var _id = $this.attr('id');
        var tagName = $this.get(0).tagName.toLowerCase();

        //验证载体DOM元素是否合法
        if(tagName != 'input'){
            console.error('【错误】#' + _id + '控件类型不适合enterDo方法，应将Input类型控件作为此方法的载体！');
            return false;
        }

        //获取关联的button，如果没有传入，则获取有dofor等于当前元素id的button元素
        var $coBtn = ele || $('button[dofor="'+ _id +'"]');

        //当前input回车事件
        $this.bind('keypress',function(e){
            var ev = e || event;
            // var focus = $this.attr('dofocus');
            if(ev.keyCode == '13' || ev.keyCode == '108'){
                $coBtn.click();
            }
        });
    };

    /**
     * 鼠标长按事件
     * @param time
     * @param callback
     * @author Mr.Wang
     */
    $.fn.mousePress = function(time,callback){
        var _this = this;
        var $this = $(_this);
        var keepSig = false;
        var _timeOut;

        //鼠标按下事件
        $this.on('mousedown', function(e){
            keepSig = true;
            var ev = e || event;
            //默认延时一秒执行
            var layOut = 1000;
            //传入按键延时
            if(typeof(time) === 'number'){
                layOut = time;
                //检测按下后延时执行回调
                var _timeOut = setTimeout(function(){
                    //如果鼠标还持续按下
                    if(keepSig){
                        callback(ev);
                    }
                    clearTimeout(_timeOut);
                },layOut);
            }
            //未传入按键延时
            else if(typeof(time) === 'function'){
                var timeOut = setTimeout(function(){
                    //如果鼠标还持续按下
                    if(keepSig){
                        time(ev);
                    }
                    clearTimeout(timeOut);
                },layOut);
            }
        });

        $this.on('mouseup', function(e){
            clearTimeout(_timeOut);
            keepSig = false;
        });
    };

    /**
     * 鼠标悬浮定时事件
     * @param time
     * @param callback
     * @author Mr.Wang
     */
    $.fn.mouseOverKeep = function(time,callback){
        var _this = this;
        var $this = $(_this);
        var keepSig = false;
        var _timeOut;

        //鼠标在当前元素之上时
        $this.on('mouseover', function(e){
            keepSig = true;
            var ev = e || event;
            //默认延时一秒执行
            var layOut = 1000;
            //传入按键延时
            if(typeof(time) === 'number'){
                layOut = time;
                //检测按下后延时执行回调
                _timeOut = setTimeout(function(){
                    //如果鼠标还悬浮于此对象之上
                    if(keepSig){
                        callback(ev);
                    }
                    clearTimeout(_timeOut);
                },layOut);
            }
            //未传入按键延时
            else if(typeof(time) === 'function'){
                var timeOut = setTimeout(function(){
                    //如果鼠标还悬浮于此对象之上
                    if(keepSig){
                        time(ev);
                    }
                    clearTimeout(timeOut);
                },layOut);
            }
        });

        $this.on('mouseout', function(e){
            clearTimeout(_timeOut);
            keepSig = false;
        });
    };

})(jQuery);

/**
 *@description:给表格加序号
 *@author:tudecai
 */
 window.tableOrderFormatter = function(value, row,index) {
     return index + 1;
 };

/**
 *@description:带清除按钮的输入框。在input加上类"input-with-clear"即可
 *@author:tudecai
 */
;(function ($){
    //带有清除按钮的输入框
    $.fn.inputWithClear = function(option){

        return this.each(function (){
            var thisInput = $(this);

            //添加此属性，输入框有值时，才显示清除按钮
            if(thisInput.attr("required") === undefined){
                thisInput.attr("required","required");
            }

            //设置padding-right
            thisInput.css("padding-right","17px");

            //如果右边没有其他元素，设置右边圆角
            if(thisInput.next().length == 0){
                thisInput.css("border-radius","0 4px 4px 0");
            }

            //计算高度，保证清除按钮垂直居中
            var inputH = thisInput.outerHeight();
            var clearTop = (inputH - 16) / 2;

            //设置z-index, 保证清除按钮可见
            var zIndex =thisInput.css("z-index");
            var clearIndex = 10;
            //如果zIndex是数值,就加10
            if(!isNaN(zIndex)){
                clearIndex += 10;
            }

            //创建清除按钮
            var clear = $("<span class='fa fa-times clear-for-input' style='display:none;position:absolute;width: 16px;height:16px;margin-left:-17px;margin-top: " + clearTop + "px;z-index:" + clearIndex + ";'></span>");
            thisInput.after(clear);

            //如果输入框是readonly的，一直显示清除按钮
            // if(thisInput.attr("readonly")){
            //     clear.css("display","inline");
            // }

            //键盘输入，值不为空时，显示清空按钮
            thisInput.keyup(function () {
                if(thisInput.val() != ''){
                    clear.css("display","inline");
                }
            })

            //鼠标经过输入框，值不为空时，显示清空按钮
            thisInput.mouseenter(function () {
                if(thisInput.val() != ''){
                    clear.css("display","inline");
                }
            })

            //鼠标经过清空按钮，值不为空时，显示清空按钮（添加此事件是为了防止闪动）
            clear.mouseenter(function () {
                thisInput.mouseenter();
            })

            //鼠标离开输入框和清空按钮时，隐藏清空按钮
            thisInput.mouseleave(function () {
                clear.css("display","none");
            })

            //给清除按钮绑定事件
            clear.click(function () {
                //触发输入框被清除前事件，此事件由外部实现
                thisInput.trigger("beforeClear");

                thisInput.val("");

                //触发输入框被清除后事件，此事件由外部实现
                thisInput.trigger("cleared");
            })

        })

    }

    //在<head>插入样式
    $(function () {
        // if($("#inputWithClearStyle").length == 0){
        //     var style = $("<style id='inputWithClearStyle'>" +
        //         ".clear-for-input{display: none;position: absolute;width: 16px;height: 16px;margin-left: -17px}" +
        //         ".input-with-clear:valid + .clear-for-input{display: inline !important;}" +
        //         "</style>");
        //     $("head").append(style);
        // }

        $(".input-with-clear").inputWithClear();
    });

})(jQuery);

/**
 * 判断变量类型的 工具类
 * isArray() 是否数组
 * isObject() 是否对象
 * isFunction() 是否函数
 * isString() 是否字符串
 * isNumber() 是否是数字
 * isBoolean() 是否布尔值
 * isDefined() 是否已定义
 * isNull() 是否已定义
 * @author tudecai
 */
var IbcpType = (function () {

    /**
     * 用 Object.prototype.toString.call()来判断变量的类型
     * @param variable 变量
     * @param type 类型
     * @returns {boolean}
     */
    function judgeVariableType(variable,type) {

        return Object.prototype.toString.call(variable) === '[object ' + type + ']';
    };

    /**
     * 判断是否是数组
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isArray = function (variable) {
        return judgeVariableType(variable,'Array');
    };

    /**
     * 判断是否是对象（json对象 或者 一个立即执行函数）
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isObject = function (variable) {
        return judgeVariableType(variable,'Object');
    };

    /**
     * 判断是否是一个函数
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isFunction= function (variable) {
        return judgeVariableType(variable,'Function');
    };

    /**
     * 判断是否是一个字符串
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isString= function (variable) {
        return judgeVariableType(variable,'String');
    };

    /**
     * 判断是否是一个数值
     * 注意:如果变量参数是NaN的话，第一个判断也是true。所以要加上isNaN的判断
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isNumber= function (variable) {
        return judgeVariableType(variable,'Number') && !isNaN(variable);
    };

    /**
     * 判断是否是布尔值
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isBoolean= function (variable) {
        return judgeVariableType(variable,'Boolean');
    };

    /**
     * 判断是否已经定义
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isDefined= function (variable) {
        return !(typeof (variable) === 'undefined');
    };

    /**
     * 判断是否为Null
     * @param variable 需要判断的数
     * @returns {boolean}
     */
    var isNull= function (variable) {
        return judgeVariableType(variable,'Null');
    };

    return{
        isArray : isArray,
        isObject : isObject,
        isFunction : isFunction,
        isString : isString,
        isNumber : isNumber,
        isBoolean : isBoolean,
        isDefined : isDefined,
        isNull : isNull
    }
    
})();