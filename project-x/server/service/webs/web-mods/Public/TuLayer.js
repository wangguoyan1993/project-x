/**
 * Created by Oswald on 2017/1/12.
 */

var TuLayer = (function(){

    var ibcpLayerIndex = 19891014;

    //数组 存储打开的Div的index
    var indexArr = [];

    var currentIndex = -1;

    //layer弹出Div 传入网页地址，标题，宽高，回调函数
    var ShowDiv = function(url,title, width, height,callBack){
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.open({
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
            maxmin: false,
            //控制点击弹层外区域关闭
            shadeClose: false,
            //窗口大小 area: ['400px', '500px'] or auto 自适应大小
            area: [width, height],
            //area: '350px',
            //iframe层的url
            //content: 'http://www.baidu.com',
            content: "",
            //是否允许拉伸
            resize: false,
            //浏览器滚动条
            scrollbar: false,
            zIndex: ibcpLayerIndex, //重点1
            //成功弹出
            success: function(layero, index){
                var div = layero.find(".layui-layer-content");

                //把新建的layer的index存到数组中
                indexArr.push(index);

                //直接用layer-content的div去加载页面
                //改变div的id. 执行传进来的回调函数
                div.attr("layerIndex",index);
                div.load(url,function(){
                    callBack();
                    var btnClose = div.find('.close-layer');
                    btnClose.on('click',function(){
                        layer.close(index);
                    })
                });


            },
            //关闭弹出框
            cancel: function(index){
                //获取当前关闭的弹出框index 在数组中移除
                CloseAndRemoveIndex(index);
            }
        });
    };

    //关闭弹层  移除相应index
    var CloseAndRemoveIndex = function(index){
        for (var i = 0; i < indexArr.length; i++)
        {
            if(index == indexArr[i]){
                layer.close(index);
                indexArr.splice(i,1);
            }
        }
    }

    //关闭弹出层方法
    var Close = function(){
        //layer.close(currentIndex);
        //获取数组中的最后一个index元素(当前页面最上层的弹出框的index) 赋值给colsingIndex 调用关闭方法
        var len = indexArr.length;
        var i = indexArr[len-1];
       CloseAndRemoveIndex(i);
    };

    //关闭所有的弹出层
    var CloseAll = function(){
        var len = indexArr.length;
        for (var i = 0;i < len; i++){
            Close();
        }
    };

    //关闭指定的Div 传入div的顺序 从页面中最上一层弹出层开始(比如当前能拖动的div的顺序为1)
    var CloseByOrder = function(order){
        if (order <= 0 || order > indexArr.length){
            return;
        }
        var index = indexArr[indexArr.length-order];
        CloseAndRemoveIndex(index);
    };

    //需要关闭的个数 传入个数，从最上面一层开始（也可以通过多次调用TuLayer.Close()实现）
    var CloseAcount = function(acount){
        if (acount <= 0 || acount > indexArr.length){
            return;
        }

        for (var i=0; i<acount; i++){
            Close();
        }
    };

    var iLayer = {

        /**
         * 弹出 Div Html 层 此方法动态创建 div 自动销毁 目前有缺陷
         * @param divHtml       div元素 对应的 html Url
         * @param loadFunction  加载div或Html时执行的方法
         * @param title         标题
         * @param width         宽度
         * @param height        高度
         * @returns {*}         返回弹出层的index
         * @constructor
         */
        ShowDivHtml: function (title, width, height, divHtml, loadFunction) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            var myId = 'div' + guid();
            var newDiv = '<div id="'+ myId +'" hidden="true"></div>';
            var divElement = '#' + myId;
            $('body').append(newDiv);
            $(divElement).load(divHtml,loadFunction);

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
                maxmin: false,
                //控制点击弹层外区域关闭
                shadeClose: false,
                //窗口大小 area: ['400px', '500px'] or auto 自适应大小
                area: [width, height],
                //area: '350px',
                //iframe层的url
                //content: 'http://www.baidu.com',
                content: $(divElement),
                //是否允许拉伸
                resize: false,
                //浏览器滚动条
                scrollbar: false,
                zIndex: ibcpLayerIndex, //重点1
                end: function () {
                    $(divElement).remove();  //删除层
                }
            });
            //alert('return');
            return divIndex;
        },

        /**
         * 弹出 Div 层
         * @param divElement    div元素
         * @param title         标题
         * @param width         宽度
         * @param height        高度
         * @returns {*}         返回弹出层的index
         * @constructor
         */
        ShowDiv:ShowDiv,

        /**
         * 弹出 iframe 层
         * @param divElement    div元素
         * @param title         标题
         * @param width         宽度
         * @param height        高度
         * @param hasMinMax     是否显示最大化最小化按钮
         * @param cancelFunction   层
         * @returns {*}         返回弹出层的index
         * @constructor
         */
        ShowIframe: function (iframeUrl, title, width, height, hasMinMax, cancelFunction) {
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
                cancel: cancelFunction,
                end: function(){}
            });
            //alert('return');
            return divIndex;
        },


        /**
         * 弹出 操作提示 消息层
         * @param msg           提示信息
         * @param OkCallBack    确认的回调方法 取消为关闭提示信息放弃操作
         * @constructor
         */
        ShowConfirm: function (msg, OkCallBack) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            layer.confirm(msg, {
                title: '提示',
                zIndex: ibcpLayerIndex,
                btn: ['确认', '取消'],
                yes: function (index) {
                    if (OkCallBack) {
                        OkCallBack();
                    }
                    layer.close(index);
                }
            });
        },

        /**
         * 弹出 操作提示 消息层
         * @param msg           提示信息
         * @param OkCallBack    确认的回调方法 取消为关闭提示信息放弃操作
         * @constructor
         */
        ShowConfirmOkCancel: function (msg, OkCallBack, CancelCallBack) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            layer.confirm(msg, {
                title: '提示',
                zIndex: ibcpLayerIndex,
                btn: ['确认', '取消'],
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
        },

        /**
         * 弹出 消息层  需要点击关闭
         * @param msg       提示信息
         * @constructor
         */
        ShowMsg: function (msg) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            layer.open({
                type: 0,
                skin: 'layui-layer-lan',
                anim: 5,
                title : '提示',
                fix: false,
                maxmin: false,
                content: msg,
                resize: false,
                scrollbar: false,
                zIndex: ibcpLayerIndex,
                end: function(){}
            });
        },

        /**
         * 弹出 消息层  需要点击关闭
         * @param msg       提示信息
         * @constructor
         */
        ShowMsgCB: function (msg, callBack) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            layer.alert(msg, {
                skin: 'layui-layer-lan',
                closeBtn: 0,
                zIndex: ibcpLayerIndex,
                anim: 5 //动画类型
            }, function () {
                callBack
            });
        },

        /**
         * 为 某个html元素 显示tips 消息提示
         * @param msg           消息提示
         * @param element       html元素
         * @constructor
         */
        ShowTips: function (msg, element) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            layer.tips(msg, element, {
                tipsMore: true,
                zIndex: ibcpLayerIndex
            });
        },

        /**
         * 提示成功 1秒自动消失的 消息层
         * @param msg   提示信息
         * @constructor
         */
        ShowOK: function (msg) {
            ibcpLayerIndex = ibcpLayerIndex + 10;
            layer.msg(msg, {
                icon: 1,
                time: 1000, //1秒关闭（如果不配置，默认是3秒）
                zIndex: ibcpLayerIndex //重点1
            });
        },

        /**
         * 关闭层
         * @param index   层索引
         * @constructor
         */
        Close: Close,

        //关闭所有弹出层
        CloseAll : CloseAll,

        //按照指定的顺序位关闭弹层，从最上面一个开始数
        CloseByOrder:CloseByOrder,

        //按照指定个数关闭弹层，从最上面一个开始数
        CloseAcount:CloseAcount

    };

    return iLayer;

})()

//$(function(){
//    $('body').on('click','.close-layer',function(){
//        TuLayer.Close();
//    });
//});