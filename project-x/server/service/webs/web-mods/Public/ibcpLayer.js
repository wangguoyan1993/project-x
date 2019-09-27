/**
 * Created by qijialin on 2017/02/27.
 */


/**
 * 自定义 ibcpLayer 类
 * @type {{}}
 */
var ibcpLayer = (function(){
    //自定义索引器
    var ibcpLayerIndex = 29891014;
    //公开 原生的layer 采用 自定义索引器 ibcpLayerIndex
    //options 参见
    var myLayer = function(options){
        layer.zIndex = ibcpLayerIndex + 10;
        layer.open(options);
        //options.zIndex = zIndex
    };

    /**
     * 弹出 Div Html 层 此方法动态创建 div 自动销毁
     * @param divHtmlUrl       div元素 对应的 html Url
     * @param loadFunction  加载div或Html时执行的方法
     * @param title         标题
     * @param width         宽度
     * @param height        高度
     * @returns {*}         返回弹出层的index
     * @constructor
     */
    var ShowDiv = function (divHtmlUrl, title, width, height, loadFunction, maxmin) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        var mMaxMin = false;
        if(maxmin == true){
            mMaxMin = true;
        }
        var divIndex = layer.open({
            //layer提供了5种层类型。可传入的值有：0（信息框，默认）；1（页面层）；2（iframe层）；3（加载层）；4（tips层）。
            // 若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）
            type: 1,
            //动画
            anim: 5,
            //title ：String
            //title: ['文本', 'font-size:18px;']
            //title: false 不显示标题栏
            title: [title, 'font-size:18px;font-weight:bold;'],
            //是否固定弹出
            fix: false,
            //最大小化按钮
            maxmin: mMaxMin,
            //控制点击弹层外区域关闭
            shadeClose: false,
            //窗口大小 area: ['400px', '500px'] or auto 自适应大小
            area: [width, height],
            //area: '350px',
            //iframe层的url
            //content: 'http://www.baidu.com',
            //content: "",
            //是否允许拉伸
            resize: false,
            //浏览器滚动条
            scrollbar: false,
            zIndex: ibcpLayerIndex, //重点1
            //成功弹出      layero:当前layer层对象；index 当前layer层对象索引
            success: function(layero, index){
                //找出当前layer弹出层的div对象 作为 容器
                var div = layero.find(".layui-layer-content");
                div.attr("layerIndex",index);
                div.css("overflow",'hidden');
                div.load(divHtmlUrl,function () {
                    //取消父页面的焦点
                    var aaa = layero.find(".layui-layer-setwin").find('a');
                    aaa.focus();    //先设置弹出页的焦点
                    aaa.blur();     //再取消焦点

                    //给包含class 'input-with-clear' 的input添加清除按钮
                    //add by tudecai 2017-09-18 10:40
                    layero.find('.input-with-clear').inputWithClear();

                    //回调
                    if(loadFunction){
                        loadFunction();
                    }
                });
            },
            resizing: function(layero){
                console.log(layero);
            }
        });
        return divIndex;
    };

    /**
     * 提供报表预览功能
     * @description : 只提供报表预览功能，确定按钮和取消按钮功能通过回调方法实现
     * @param iframeUrl
     * @param title
     * @param w
     * @param h
     * @param hasMinMax
     * @param confirmMethod
     * @param cancelMethod
     * @constructor
     */
    var ReportMother = function(iframeUrl, title, w, h, hasMinMax, confirmMethod, cancelMethod){
        ibcpLayerIndex = ibcpLayerIndex + 10;
        var divIndex = layer.open({
            //layer提供了5种层类型。可传入的值有：0（信息框，默认）；1（页面层）；2（iframe层）；3（加载层）；4（tips层）。
            // 若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）
            type: 2,
            //动画
            anim: 5,
            //title ：String
            //title: ['文本', 'font-size:18px;']
            //title: false 不显示标题栏
            title: [title, 'font-size:18px;font-weight:bold;'],
            //是否固定弹出
            fix: false,
            //最大小化按钮
            maxmin: hasMinMax,
            //控制点击弹层外区域关闭
            shadeClose: false,
            //窗口大小 area: ['400px', '500px'] or auto 自适应大小
            area: [w, h],
            //area: '350px',
            //iframe层的url
            //content: 'http://www.baidu.com',
            content: iframeUrl,
            btn: ['保存', '关闭'],
            btn1: function(index, layero){
                if(typeof(confirmMethod) === 'function'){
                    confirmMethod(divIndex);
                }
            },
            btn2: function(index, layero){
                //按钮【按钮二】的回调
                layer.close(index);
            },
            //是否允许拉伸
            resize: false,
            //浏览器滚动条
            scrollbar: false,
            zIndex: ibcpLayerIndex, //重点1
            cancel: cancelMethod,
            end: function(){}
        });
        //alert('return');
        return divIndex;
    };

    /**
     * 弹出 iframe 层
     * @param iframeUrl    div元素
     * @param title         标题
     * @param width         宽度
     * @param height        高度
     * @param hasMinMax     是否显示最大化最小化按钮
     * @param cancelFunction   层
     * @returns {*}         返回弹出层的index
     * @constructor
     */
    var ShowReport = function (iframeUrl, title, width, height, hasMinMax, cancelFunction) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        var divIndex = layer.open({
            //layer提供了5种层类型。可传入的值有：0（信息框，默认）；1（页面层）；2（iframe层）；3（加载层）；4（tips层）。
            // 若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）
            type: 2,
            //动画
            anim: 5,
            //title ：String
            //title: ['文本', 'font-size:18px;']
            //title: false 不显示标题栏
            title: [title, 'font-size:18px;font-weight:bold;'],
            //是否固定弹出
            fix: false,
            //最大小化按钮
            maxmin: hasMinMax,
            //控制点击弹层外区域关闭
            shadeClose: false,
            //窗口大小 area: ['400px', '500px'] or auto 自适应大小
            area: [width, height],
            //area: '350px',
            //iframe层的url
            //content: 'http://www.baidu.com',
            content: iframeUrl,
            btn: ['打印', '关闭'],
            btn1: function(index, layero){
                //小心跨域
                //找到iframe
                var pt = layero.find("iframe")[0];
                //打印
                pt.contentWindow.print();
            },
            btn2: function(index, layero){
                //按钮【按钮二】的回调
                layer.close(index);
            },
            //是否允许拉伸
            resize: false,
            //浏览器滚动条
            scrollbar: false,
            zIndex: ibcpLayerIndex, //重点1
            cancel: cancelFunction,
            end: function(){}
        });
        //alert('return');
        return divIndex;
    };

    /**
     * 弹出 iframe 层
     * @param iframeUrl    div元素
     * @param title         标题
     * @param width         宽度
     * @param height        高度
     * @param hasMinMax     是否显示最大化最小化按钮
     * @param cancelFunction   层
     * @returns {*}         返回弹出层的index
     * @constructor
     */

    var ShowIframe = function (iframeUrl, title, width, height, hasMinMax, cancelFunction, manualClose, successFunction) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        var divIndex = layer.open({
            //layer提供了5种层类型。可传入的值有：0（信息框，默认）；1（页面层）；2（iframe层）；3（加载层）；4（tips层）。
            // 若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）
            type: 2,
            //动画
            anim: 5,
            //title ：String
            //title: ['文本', 'font-size:18px;']
            //title: false 不显示标题栏
            title: [title, 'font-size:18px;font-weight:bold;'],
            //是否固定弹出
            fix: false,
            //最大小化按钮
            maxmin: hasMinMax,
            //控制点击弹层外区域关闭
            shadeClose: false,
            //窗口大小 area: ['400px', '500px'] or auto 自适应大小
            area: [width, height],
            //area: '350px',
            //iframe层的url
            //content: 'http://www.baidu.com',
            content: iframeUrl,
            //是否允许拉伸
            resize: false,
            //浏览器滚动条
            scrollbar: false,
            zIndex: ibcpLayerIndex, //重点1
            success : function(layero, index){
                if(typeof(successFunction) === 'function'){
                    successFunction(layero, index);
                }
            },
            cancel: function(){
                if(typeof cancelFunction === 'function'){
                    cancelFunction();
                }
                //手动关闭弹层
                if(manualClose){
                    return false;
                }
            },
            end: function(){},
            full:function (layero) {
                layerResetIframeHeight(layero);
            },
            restore : function (layero) {
                layerResetIframeHeight(layero);
            }
        });
        //alert('return');
        return divIndex;
    };

    /**
     * 重置iframe层内iframe的高度。保证最大化或者还原操作后，iframe高度自适应
     * @param layero 弹出层对象
     * @author TuDecai
     */
    function layerResetIframeHeight(layero) {
        var titleH = layero.find('.layui-layer-title').outerHeight(),
            totalH = layero.height();
        layero.find('iframe').height(totalH - titleH);
    }

    /**
     * 弹出 操作提示 消息层
     * @param msg           提示信息
     * @param OkCallBack    确认的回调方法 取消为关闭提示信息放弃操作
     * @constructor
     */
    var ShowConfirm = function (msg, OkCallBack) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.confirm(msg, {
            title: '提示',
            zIndex: ibcpLayerIndex,
            btn: ['确认', '取消'],
            closeBtn: 0,
            yes: function (index) {
                if (OkCallBack) {
                    OkCallBack();
                }
                layer.close(index);
            }
        });
    };

    /**
     * 弹出 操作提示 消息层
     * @param msg           提示信息
     * @param OkCallBack    确认的回调方法 取消为关闭提示信息放弃操作
     * @constructor
     */
    var ShowConfirmOkCancel = function (msg, OkCallBack, CancelCallBack, btnOkName, btnCancelName) {
        var btn1Name = '确认';
        var btn2Name = '取消';
        if(btnOkName){
            btn1Name = btnOkName;
        }
        if(btnCancelName){
            btn2Name = btnCancelName;
        }

        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.confirm(msg, {
            title: '提示',
            zIndex: ibcpLayerIndex,
            btn: [btn1Name, btn2Name],
            yes: function (index) {
                if (OkCallBack) {
                    OkCallBack();
                }
                layer.close(index);
            },
            btn2: function(index){
                if (CancelCallBack) {
                    CancelCallBack();
                }
                layer.close(index);
            }
        });
    };

    /**
     * 弹出 操作提示 消息层
     * @param msg           提示信息
     * @param yesBack    点是的回调方法
     * @param noBack    点否的回调方法
     * @constructor
     */
    var ShowPromptYesOrNo = function (msg, yesBack, noBack) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.confirm(msg, {
            title: '提示',
            zIndex: ibcpLayerIndex,
            btn: ['是', '否'],
            closeBtn: 0,
            yes: function (index) {
                if (yesBack) {
                    yesBack();
                }
                layer.close(index);
            },
            btn2: function(index){
                if (noBack) {
                    noBack();
                }
                layer.close(index);
            }
        });
    };

    /**
     * 弹出 操作提示 消息层
     * @author Zeng laiting
     * @param msg           提示信息
     * @param callback1    点是的回调方法
     * @param callback2    点否的回调方法
     * @constructor
     */
    var ShowChoose= function (msg, btn1,btn2,btn3 ,callback1, callback2, callback3) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.confirm(msg, {
            title: '提示',
            zIndex: ibcpLayerIndex,
            btn: [btn1,btn2,btn3],
            closeBtn: 0,
            yes: function (index) {
                if (callback1) {
                    callback1();
                }
                layer.close(index);
            },
            btn2: function(index){
                if (callback2) {
                    callback2();
                }
                layer.close(index);
            },
            btn3: function(index){
                if (callback3) {
                    callback3();
                }
                layer.close(index);
            }
        });
    };

    /**
     * 弹出 消息层  需要点击关闭
     * @param msg       提示信息
     * @constructor
     */
    var ShowMsg = function (msg) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.open({
            type: 0,
            anim: 5,
            title : '提示',
            fix: false,
            maxmin: false,
            content: msg,
            resize: false,
            scrollbar: false,
            zIndex: ibcpLayerIndex,
            success : function(layero, index){
                var aaa = layero.find(".layui-layer-setwin").find('a');
                aaa.focus();    //先设置弹出页的焦点
                aaa.blur();     //再取消焦点
            }
        });
        //layer.alert(msg, {
        //    skin: 'layui-layer-lan',
        //    closeBtn: 0,
        //    zIndex: ibcpLayerIndex,
        //    anim: 5 //动画类型
        //});
    };

    /**
     * 弹出 消息层  需要点击关闭
     * @param msg       提示信息
     * @constructor
     */
    var ShowMsgCB = function (msg, callBack) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.confirm(msg, {
            title: '提示',
            zIndex: ibcpLayerIndex,
            btn: ['确认'],
            closeBtn: 0,
            yes: function (index) {
                if (typeof callBack === 'function') {
                    callBack();
                }
                layer.close(index);
            }
        });
    };

    /**
     * 为 某个html元素 显示tips 消息提示
     * @param msg           消息提示
     * @param element       html元素
     * @param option  其他配置信息
     * @constructor
     */
    var ShowTips = function (msg, element,option) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.tips(msg, element, $.extend(true,{
            tipsMore: true,
            zIndex: ibcpLayerIndex
        },option));
    };

    /**
     * Created by WangGuoyan on 2017/3/15
     * @param msg             消息提示
     * @param e               event
     * @param options       配置参数
     * @param options.obj   目标元素（可选）若有此参数，tip存在于目标元素的第一父元素body中，若没有参数，则默认存在于当前代码执行dom的body中（注：这里规定只允许传入（$）对象，此方法依赖于jQuery）
     * @param options.lastTime  tip显示时间（秒）
     */
    var ShowMoTips = function (msg,e,options){
        'use strict';
        var opt = {
            'obj' : options.obj,
            'lastTime' : options.lastTime        //tip显示时间
        };
        var $outTmr,$chgTmr;
        var obj = opt.obj;
        var $tip = $('<div ibcplayerType="mo_tips" style="border:0.5px red solid;background-color:#FFD06C;font-size:12px;color:black;z-index:9999999999999999999;position:absolute;width:auto;height:auto;padding:3px;"></div>');
        $tip.append(msg);
        var ev = e || event;
        $tip.css('left',ev.pageX + 5);
        $tip.css('top',ev.pageY + 10);
        var top = window.top.document.body;
        var $body = $('body');
        if(obj){
            $body = obj.parents('body');
            obj.on('mouseout mouseup',function(){
                $tip.remove();
                window.clearTimeout($outTmr);
                window.clearTimeout($chgTmr);
            });
        }
        $body.append($tip);

        if(opt.lastTime){
            $outTmr = setTimeout(function(){
                $chgTmr = setInterval(function(){
                    $tip.css('opacity',$tip.css('opacity') * 1 - 0.1);
                    if($tip.css('opacity') <= 0){
                        $tip.remove();
                        clearInterval($chgTmr);
                        clearTimeout($outTmr);
                    }
                },50);
            },opt.lastTime*1000);
        }
    };

    /**
     * 提示成功 1秒自动消失的 消息层
     * @param msg   提示信息
     * @constructor
     */
    var ShowOK = function (msg) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.msg(msg, {
            icon: 1,
            time: 1000, //1秒关闭（如果不配置，默认是3秒）
            zIndex: ibcpLayerIndex //重点1
        });
    };

    var Msg = function (msg, icon, time) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        var _icon = icon || 1;
        var _time = time || 1000;
        layer.msg(msg, {
            icon: _icon,
            time: _time, //1秒关闭（如果不配置，默认是1秒）
            zIndex: ibcpLayerIndex
        });
    };

    //Loadig 加载动画效果 转圈
    function Load(icon){
        ibcpLayerIndex = ibcpLayerIndex + 10;
        return layer.load(icon,{zIndex: ibcpLayerIndex});
    }

    //Loading 加载动画带提示信息
    function loadWithMsg(msg) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        var m = '<i class="layui-layer-ico layui-layer-ico16"></i>' + msg;
        var index = layer.msg(m, {
            time:0
            ,shade: 0.01
            ,anim:-1
            ,type:1
            ,zIndex: ibcpLayerIndex
            ,success:function (layero,index) {
                $(layero).attr('class','layui-layer layui-layer-dialog layui-layer-border layui-layer-msg layer-anim').find(".layui-layer-content").addClass('layui-layer-padding');
            }
        });
        return index;
    }

    /**
     * 关闭层
     * @param index   层索引
     * @constructor
     */
    var Close = function (index) {
        layer.close(index);
    };

    //给外部的接口
    return {
        //myLayer : myLayer,
        ibcpLayerIndex : ibcpLayerIndex,
        ShowDiv : ShowDiv,
        ShowIframe : ShowIframe,
        ShowConfirm : ShowConfirm,
        ShowConfirmOkCancel : ShowConfirmOkCancel,
        ShowMsg : ShowMsg,
        ShowMsgCB : ShowMsgCB,
        ShowTips : ShowTips,
        ShowOK : ShowOK,
        Msg : Msg,
        Load : Load,
        Close : Close,
        ShowMoTips : ShowMoTips,
        ShowReport : ShowReport,
        PromptYesOrNo : ShowPromptYesOrNo,
        ReportMother : ReportMother,
        ShowChoose:ShowChoose,
        LoadWithMsg : loadWithMsg
    };
})();
