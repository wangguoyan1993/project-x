/**
 * Created by qijialin on 2017/02/27.
 */


/**
 * 自定义 ibcpLayer 类
 * @type {{}}
 */
var ibcpLayerNew = (function(){
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
     * 弹出 Div Html 层 此方法动态创建 div 自动销毁 目前有缺陷
     * @param divHtmlUrl       div元素 对应的 html Url
     * @param loadFunction  加载div或Html时执行的方法
     * @param title         标题
     * @param width         宽度
     * @param height        高度
     * @returns {*}         返回弹出层的index
     * @constructor
     */
    var ShowDiv = function (title, width, height, divHtmlUrl, loadFunction) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
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
                div.load(divHtmlUrl,loadFunction);
            }
        });
        return divIndex;
    };

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
    var ShowIframe = function (iframeUrl, title, width, height, hasMinMax, cancelFunction) {
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
    };

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
    var ShowConfirmOkCancel = function (msg, OkCallBack, CancelCallBack) {
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
        layer.alert(msg, {
            skin: 'layui-layer-lan',
            closeBtn: 0,
            zIndex: ibcpLayerIndex,
            anim: 5 //动画类型
        }, function () {
            callBack();
        });
    };

    /**
     * 为 某个html元素 显示tips 消息提示
     * @param msg           消息提示
     * @param element       html元素
     * @constructor
     */
    var ShowTips = function (msg, element) {
        ibcpLayerIndex = ibcpLayerIndex + 10;
        layer.tips(msg, element, {
            tipsMore: true,
            zIndex: ibcpLayerIndex
        });
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
        Close : Close
    };
})();
