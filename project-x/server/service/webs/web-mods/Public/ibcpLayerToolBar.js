/**
 *Create by:Decai Tu
 *Create Time:2017-10-29 14:44
 *Decription:
 */

/**
 *@description:用showTips制作的一个按钮工具栏（用于修改pv,添加备注，添加偏差等）
 *@author:tudecai
 */
;var LayerToolBar = (function () {

    var ToolBar = function (elem,options,evType) {
        this.elem = elem;
        if(options){
            this.btnsNumbers(options.btns);
        }
        this.showToolBar(evType);
    }

    //基本配置
    ToolBar.prototype.btns = ['edit','dev','remark'];

    //确定按钮显示
    ToolBar.prototype.btnsNumbers = function (btns) {
        var _this = this;
        if(btns && btns.length > 0){
            _this.btns = btns;
        }
    }

    //创建按钮
    ToolBar.prototype.createButton = function(color,title,marginLeft,fun) {
        var _color = color || "white",
            _paddingLeft = marginLeft || "0px",
            _title = title ? 'title="' + title + '"' : "",
            btnId = 'toolBarBtn_' + fun;

        var btnStr = '<button id="' + btnId + '"' + _title + ' style="color:' + _color + ';margin-left:' + _paddingLeft + ';background-color:white;font-size:18px;width: 25px;height: 25px;border-radius: 25%;border: 0;line-height: normal">';
        return btnStr;
    }

    //按钮集合
    ToolBar.prototype.buttons = {
        edit : function(instance){
            return instance.createButton('blue','修改','','edit') + '<span class="fa fa-pencil"></span>'
        },
        dev : function(instance){
            return instance.createButton('red','偏差','8px','deviation') + '<span class="fa fa-exclamation"></span></button>'
        },
        remark : function(instance){
            return instance.createButton('blue','备注','8px','remark') + '<span class="fa fa-info"></span></button>'
        }
    }

    //创建工具栏
    ToolBar.prototype.createToolBar = function() {
        var _this = this,
            btns = _this.btns,
            btnStr = '';

        $.each(btns,function (i, btnName) {
            var btn = _this.buttons[btnName](_this);
            btnStr += btn;
        })
        return btnStr;
    }

    //添加事件
    ToolBar.prototype.bindEvent = function (layerDom) {
        var _this = this;
        var btns = layerDom.find('button');
        $.each(btns,function (i, btn) {
            var _btn = btn;
            var btnId = $(_btn).attr('id'),
                funName = btnId.split('_')[1];

            $(_btn).click(function () {
                _this[funName]();
            })

        })
    }

    //显示
    ToolBar.prototype.showToolBar = function (evType) {
        var _this = this,
            _elem = _this.elem,
            toolBar = _this.createToolBar();

        var type = evType || 'click'

        _elem[type](function (e) {
            _this.index = ibcpLayer.ShowTips(toolBar,_elem,{
                tipsMore: false,
                tips: [2, '#00958D'],
                time:0,
                success:function (layero,index) {
                    //改一下内容div的padding
                    var content = $(layero).find('.layui-layer-content');
                    content.css('padding-left','8px').css('padding-right','8px').css('padding-top','4px').css('padding-bottom','4px');
                    //改一下内容div的top
                    var top = content.css('top');
                    top = top.split('p')[0] - 10;
                    content.css('top',top + 'px');
                    //添加一个识别类
                    $(layero).addClass('ibcp-layer-toolbar');

                    _this.bindEvent(layero);
                }
            })
            e.stopPropagation();
        });
    };

    //编辑按钮事件
    ToolBar.prototype.edit = function() {
        var _elem = this.elem;
        var pvType= _elem.attr('ibcppv');
        if(pvType == 'PV-Event'){
            ReviseEventPV.show(_elem);
        }
        else {
            ibcpPVReviseCenter.pop(_elem);
        }
    }

    //备注按钮事件
    ToolBar.prototype.remark = function() {
        var _elem = this.elem;
        PVRemark.show(_elem);
    }

    //偏差按钮事件
    ToolBar.prototype.deviation = function() {
        var _elem = this.elem,
            pvPracticeId = _elem.attr('pvPracticeId');
        DeviationOperate.clientAdd(stepPracId,function () {
            //为当前PV添加偏差样式类
            _elem.removeClass('error-pv-0').addClass('error-pv-2');
            //获取当前对象之前的日志标志
            var log = _elem.attr('logflag') * 1;
            //如果没有日志标志，则添加日志标志和显示日志灯泡
            if(log === 0){
                _elem.attr('logflag',1);
                //当前PV显示日志灯泡按钮标志
                _elem.showIbcpLamp(function($lamp){
                    $lamp.on('click',function(){
                        ibcpPVShowLogs.show(pvPracticeId);
                    });
                });
            }
        },pvPracticeId);

    };


    //显示
    var show = function($elem,options,evType) {
        return new ToolBar($elem,options,evType);
    }

    $(document).click(function () {
        var tips = $(".ibcp-layer-toolbar");
        $.each(tips,function (i,tip) {
            var id = $(tip).attr('id'),
                index = id.split('layer')[1];
            ibcpLayer.Close(index);
        })
    })

    return{
        show : show
    };

})();

/**
 *@description:给pv添加备注对象
 *@author:tudecai
 */
;var PVRemark = (function () {
    //弹出
    function showPVRemark(pvElem) {
        var html = getRootPath() + '/WebUI/PV/PVRemark.html';
        var index = ibcpLayer.ShowDiv(html,'添加备注','400px','315px',function () {
            getPVInformation(pvElem);

            //确定按钮事件
            $("#btnRemark").click(function () {
                var data = assembleData(pvElem);
                if(data){
                    serverForPVAddRemark(data,function () {
                        //获取日志标志
                        var log = pvElem.attr('logflag') * 1;
                        //如果没有日志，则为当前PV添加日志标志（显示灯泡以及背景色）
                        if(log === 0){
                            pvElem.attr('logflag',1);
                            var pvPracticeId = pvElem.attr('pvpracticeid');
                            //显示灯泡方法
                            pvElem.showIbcpLamp(function($lamp){
                                $lamp.on('click',function(){
                                    ibcpPVShowLogs.show(pvPracticeId);
                                });
                            });
                        }
                        ibcpLayer.Close(index);
                    });
                }
            });

            //取消按钮事件
            $("#btnRemarkCancel").click(function () {
                ibcpLayer.Close(index);
            });
        });
    }

    //获取pv信息
    function getPVInformation(pvElem) {
        var pvPracticeId = pvElem.attr('pvPracticeId');
        var param = {pvPracId:pvPracticeId},
            url = serverPath + 'pv/findPvPracticeId';
        ibcpAjax.Select(url,param,true,function (result) {
            var data = result.data;
            $("#inputPVCode").val(data.pvCode);
            $("#inputPVName").val(data.pvName);
            $("#inputPVDesc").val(data.description);
        })
    }

    //获取页面数据
    function assembleData(pvElem) {
        var remark = $("#inputPVRemark").val();
        if(remark == ''){
            ibcpLayer.ShowTips('请输入备注信息!',$("#inputPVRemark"))
            return false;
        }

        var pvPracticeId = pvElem.attr('pvPracticeId'),
            prop = pvElem.attr('prop');

        return{
            pvPracId : pvPracticeId,
            prop : prop,
            typeId : 2,
            data : remark
        }
    }

    //添加备注后端服务
    function serverForPVAddRemark(data,callback) {
        ibcpSign.CallSign(71,function (sid) {
            var param = $.extend({},{sid:sid},data),
                url = serverPath + 'log/addLogMessage';
            ibcpAjax.Insert(url,param,true,function () {
                ibcpLayer.ShowOK('操作成功!');
                callback();
            })
        })
    }

    return{
        show : showPVRemark
    }
})();

/**
 * 修改PV事件定义中心
 * @author : Mr.Wang
 * @type {{inputString}}
 */
var ibcpReviseCmd = function(){
    'use strict';

    //新值变量,当前操作的pv对象
    var _pvNewVal = 'N/A',
        _pvOldVal = 'N/A',
        _pvPracticeId = 0,
        _pvProp = '',
        afterSaveFun = function () {};

    /**
     * 输入数字类型PV修改方法
     * @param $pv
     * @param pvInfo
     * @param next
     */
    var inputNumRevise = function($pv,pvInfo, next){
        //获取pv信息
        _pvPracticeId = pvInfo.pvPracticeId;
        _pvOldVal = $pv.attr('pvval');
        _pvNewVal = _pvOldVal;
        _pvProp = $pv.attr('prop');
        var max = $pv.attr('len') * 1;
        var precision = $pv.attr('precision') * 1;
        var precisionType = $pv.attr('precisionType') * 1;

        //为修改输入框复刻精度相关属性
        $('#input_num_val').attr('precision',precision).attr('precisionType',precisionType);

        //为修改输入框添加事件
        $('#input_num_val').on('click', function(){
            var $this = $(this);
            ibcpNumberKeyBoard.Pop($(this),{
                max : max,
                precision : precision,
                precisionType : precisionType
            }, function (inputVal) {
                _pvNewVal = inputVal;
            });
        });

        //将旧值填写到当前修改框中
        $('#input_num_val').val(_pvOldVal);

        //保存成功后续操作
        afterSaveFun = function () {
            //预留
        }
    };

    /**
     * 修改输入字符串
     * @author : Mr.Wang
     * @param $pv
     * @private
     */
    var inputStringRevise = function($pv,pvInfo, next){
        //获取pv信息
        _pvPracticeId = pvInfo.pvPracticeId;
        _pvOldVal = $pv.attr('pvval');
        _pvNewVal = _pvOldVal;
        _pvProp = $pv.attr('prop');
        var length = $pv.attr('len') * 1;
        if(length > 0){
            $('#input_str_val').attr('maxlength',length);
        }

        //将旧值填写到当前修改框中
        $('#input_str_val').val(_pvOldVal);

        $("#input_str_val").blur(function(){
            _pvNewVal = $('#input_str_val').val();
        });

        afterSaveFun = function () {
            //预留
        };

    };

    /**
     * 布尔输入类型PV修改
     * @author : Mr.Wang
     * @param $pv
     * @param next
     */
    var inputBoolRevise = function($pv,pvInfo, next){
        //获取pv信息
        _pvPracticeId = pvInfo.pvPracticeId;
        _pvOldVal = $pv.attr('pvval');
        _pvNewVal = _pvOldVal;
        _pvProp = $pv.attr('prop');
        //缓存PV中对应的两个checkbox
        var $pvTrue = $pv.find('span[value="true"]');
        var $pvFalse = $pv.find('span[value="false"]');

        //缓存修改控件盒子
        var $box = $('#input_bool_box');
        $box.joinGroup();

        //根据旧PV值勾选对应的修改项
        if(_pvOldVal.toString() === 'true'){
            $('#input_bool_true').find('input').click();
        }else if(_pvOldVal.toString() === 'false'){
            $('#input_bool_false').find('input').click();
        }

        //监听值改变事件
        $box.on('valuechange',function (event,newVal) {
            _pvNewVal = newVal;
        })

        //保存成功后续操作
        afterSaveFun = function () {
            //预留
        }
    };

    /**
     * 下拉选项输入类型PV修改
     * @author : Mr.Wang
     * @param $pv
     * @param pvInfo
     */
    var inputSelectRevise = function($pv, pvInfo, next){
        //获取pv信息
        _pvPracticeId = pvInfo.pvPracticeId;
        _pvOldVal = $pv.attr('pvval');
        _pvProp = $pv.attr('prop');

        //取出PV参数中下拉选选项信息
        var params = JSON.parse(pvInfo.param);
        var options = params.options;

        //整理成数组形式
        options = options.split(',');

        //将选项添加到当前修改控件中
        for(var i = 0; i < options.length; i++){
            //过滤旧值
            if(options[i] !== _pvOldVal){
                var $option = $('<option>'+ options[i] +'</option>');
                $('#input_select').append($option);
            }
        };
        _pvNewVal = $('#input_select').val();

        //监听值改变事件
        $('#input_select').on('change',function () {
            _pvNewVal = $(this).val();
        });

        //保存成功后续操作
        afterSaveFun = function () {
            //预留
        };

    };

    /**
     * 时间输入类型PV修改
     * @author : Mr.Wang
     * @param $pv
     * @param pvInfo
     */
    var inputTimeRevise = function($pv, pvInfo){
        //获取pv信息
        _pvPracticeId = pvInfo.pvPracticeId;
        _pvOldVal = $pv.attr('pvval');
        _pvNewVal = _pvOldVal;
        _pvProp = $pv.attr('prop');

        var oldShowVal = $pv.find('[ibcppvval="spanDateTime"]').html();
        var formate = $pv.attr('format');
        var this_input = document.getElementById('input_time');
        var limit = $pv.attr('limit'); //是否限制最大选择时间为当前 0否 1是

        $('#pv_val').text(oldShowVal);

        //初始化修改时间类型控件点击事件
        //弹出选择控件
        var type = ibcpDate.getType(formate);
        var options = {
            elem: this_input,
            format: formate,
            type: type,
            done: function (value, date) {
                var pvVal = "N/A";
                if (value === "") {
                    $(this_input).val("N/A");
                } else {
                    var year = date.year,
                        month = _formatNumber(date.month),
                        day = _formatNumber(date.date),
                        hours = _formatNumber(date.hours),
                        minutes = _formatNumber(date.minutes),
                        seconds = _formatNumber(date.seconds);

                    pvVal = [year, "-", month, "-", day, " ", hours, ":", minutes, ":", seconds].join("");
                }
                _pvNewVal = pvVal;
            }
        }

        //如果限制最大选择时间  每次渲染前，改变max值
        if(limit == 1){
            options.beforeRender = function (_option) {
                _option.max = ibcpDate.currentDateObj();
            }
        }

        laydate.render(options);

        afterSaveFun = function () {
            //预留
        }
    };

    /**
     * 时间段输入类型PV修改
     * @author : Mr.Wang
     * @param $pv
     * @param pvInfo
     */
    var inputTimeAreaRevise = function($pv, pvInfo){
        //获取pv信息
        _pvPracticeId = pvInfo.pvPracticeId;
        _pvOldVal = $pv.attr('pvval');
        _pvNewVal = _pvOldVal;
        _pvProp = $pv.attr('prop');

        //获取原始PV信息
        var lastFormat = $pv.attr('lastformat');
        var limit = $pv.attr('limit'); //是否限制最大选择日期是今天  0否 1是

        //获取修改控件对象
        var $timeAreaBox = $('[revisename="PV-InputTimeArea"]');
        var $startime = $timeAreaBox.find('[ibcppvval="inputDateTimeStart"]');          // 开始时间输入框
        var $endtime = $timeAreaBox.find('[ibcppvval="inputDateTimeEnd"]');             // 结束时间输入框
        var $interval = $timeAreaBox.find('[ibcppvval="inputDateTimeInterval"]');       //持续时间

        //显示旧值（默认N/A）
        try {
            var valObj = JSON.parse(_pvOldVal);
            $startime.val(valObj.startVal);
            $endtime.val(valObj.endVal);
            $interval.val(valObj.timeInterval);
        }catch (e){}

        //开始时间配置
        var startOptions = {
            elem: $startime[0],
            type: 'datetime',
            btns: ['now', 'confirm'],
            done: function (value, date) {
                var endtime = $endtime.val();
                // 计算持续时间
                GetInterval(value, endtime, lastFormat,$interval,$timeAreaBox);
            }
        };

        //结束时间配置
        var endOptions = {
            elem: $endtime[0],
            type: 'datetime',
            btns: ['now', 'confirm'],
            ready: function(){
                var st = $startime.val();
                if(st == 'N/A'){
                    startTimeInst.close();
                    ibcpLayer.ShowMsg("请先选择开始时间！");
                    endTimeInst.close();
                }
            },
            done: function (value, date) {
                var startime = $startime.val();
                // 计算持续时间
                GetInterval(startime, value, lastFormat,$interval,$timeAreaBox);
            }
        };

        //是否限制最大时间
        if(limit == 1){
            startOptions.beforeRender = function (_options) {
                _options.max = ibcpDate.currentDateObj();
            }

            endOptions.beforeRender = function (_options) {
                _options.max = ibcpDate.currentDateObj();
            }
        }

        //开始时间
        var startTimeInst = laydate.render(startOptions);

        //结束时间
        var endTimeInst = laydate.render(endOptions);

        //保存成功后续方法
        afterSaveFun = function () {
            //预留
        }

    };

    // 持续时间回调
    function GetInterval(ST, ET, Format, $interval,$timeAreaBox) {
        var param = {
            "startVal": ST,
            "endVal": ET,
            "lastFormat": Format
        };

        if (ST == "" || ST == "N/A" || ET == "N/A" || ET == "") {
            var pVal = {
                "startVal": ST,
                "endVal": ET,
                "timeInterval": "N/A"
            };
            // 填写持续时间
            $interval.val(pVal.timeInterval);

            _pvNewVal =  JSON.stringify(pVal);
            return;
        }

        //获取持续时间
        _CalculateDuration(param, function (interval) {
            var pVal = {
                "startVal": param.startVal,
                "endVal": param.endVal,
                "timeInterval": interval
            };

            // 填写持续时间
            $interval.val(pVal.timeInterval);

            _pvNewVal =  JSON.stringify(pVal);
        });
    }

    //计算持续时间
    var _CalculateDuration = function(params, callback) {
        var url = serverPath + "pv/calculateTimeInterval";
        ibcpAjax.Select(url, params, true, function (result) {
            var data = result.data;
            callback(data);
        });
    };

    //把小于10的数，前面补0返回
    var _formatNumber = function(number){
        return number < 10 ? "0" + number : number;
    };

    //修改确认验证内容
    var _pvReviseCheck = function(){

       if(_pvNewVal == _pvOldVal){
           ibcpLayer.ShowMsg('新值不能与旧值相等!');
           return false;
       }
       var reason = $('#revise_reason').val();
       if(!reason){
           ibcpLayer.ShowTips('请输入修改原因',$('#revise_reason'));
           return false;
       }
       return reason;
    };

    /**
     * 保存修改后pv值的方法。先检查是否有偏差，有偏差就提示录入。没有就通过，保存。
     * @author tudecai
     */
    var savePVNewValue = function (callback) {
        //验证是否输入了原因
        var reason = _pvReviseCheck();
        if(!reason) {
            return;
        }

        //检查是否有偏差
        checkPVAndAddDeviation(_pvPracticeId,_pvProp,_pvNewVal,function () {
            //组装参数结果，调修改接口
            var param = {
                'pvPracticeId' : _pvPracticeId,
                'reason' : reason,
                'data' : JSON.stringify({
                    'old' : _pvOldVal,
                    'new' : _pvNewVal
                })
            }

            //调接口保存值
            serverForSavePVNewVal(param,function (data) {
                //关闭修改页面
                ibcpPVReviseCenter.close();


                //走后续方法
                if(IbcpType.isFunction(afterSaveFun)){
                    afterSaveFun();
                }

                //走回调
                if(IbcpType.isFunction(callback)){
                    callback(data,_pvPracticeId);
                }

                //重置新值
                _pvNewVal = 'N/A';
            });

        })

    }

    /**
     * 调接口保存修改后的pv值
     * @param param 整理好的参数
     * @param callback 回调
     * @author tudecai
     */
    var serverForSavePVNewVal = function (param,callback) {
        ibcpSign.CallSign(71,function (sid) {
            param['sid'] = sid;
            var url = serverPath + 'pv/saveInputData';
            ibcpAjax.Update(url,param,true,function(result){
                var data = result.data;
                if(IbcpType.isFunction(callback)){
                    callback(data);
                }
            });
        })
    }

    return {
        saveNewVal : savePVNewValue,                                //保存新值
        inputTimeArea : inputTimeAreaRevise,                        //输入时间段类型PV
        inputTime : inputTimeRevise,                                //输入时间类型PV
        inputSelect : inputSelectRevise,                            //输入下拉选类型PV
        inputBool : inputBoolRevise,                                //输入布尔类型PV
        inputNum : inputNumRevise,                                  //输入数字类型PV
        inputString : inputStringRevise                             //输入字符串类型PV
    };
}();

/**
 * PV修改事件注册中心
 * @author : Mr.Wang
 */
var ibcpPVReviseCenter = function(){
    'use strict';
    var _index;

    /**
     * 修改方法映射集合
     * @private
     */
    var _config = {
        'PV-Constant': '',                                  //常量
        //数字类型
        'PV-InputNumber': {
            'method' : ibcpReviseCmd.inputNum,
            'w' : '500px',
            'h' : '360px',
            'page' : path + '/WebUI/PV/PV_Revise_Collection.html'
        },
        //输入 字符串
        'PV-InputString': {
            'method' : ibcpReviseCmd.inputString,
            'w' : '500px',
            'h' : '360px',
            'page' : path + '/WebUI/PV/PV_Revise_Collection.html'
        },
        //输入 下拉选
        'PV-InputSelect': {
            'method' : ibcpReviseCmd.inputSelect,
            'w' : '500px',
            'h' : '360px',
            'page' : path + '/WebUI/PV/PV_Revise_Collection.html'
        },
        //bool
        'PV-Bool': {
            'method' : ibcpReviseCmd.inputBool,
            'w' : '500px',
            'h' : '360px',
            'page' : path + '/WebUI/PV/PV_Revise_Collection.html'
        },
        //时间
        'PV-InputDateTime': {
            'method' : ibcpReviseCmd.inputTime,
            'w' : '500px',
            'h' : '360px',
            'page' : path + '/WebUI/PV/PV_Revise_Collection.html'
        },
        //过程时间
        'PV-InputTimeArea': {
            'method' : ibcpReviseCmd.inputTimeArea,
            'w' : '500px',
            'h' : '490px',
            'page' : path + '/WebUI/PV/PV_Revise_Collection.html'
        },
        'PV-Calculation': '',                               //计算公式
        'PV-EMReference': '',                               //设备引用
        'PV-EMProperty': '',                                //设备属性
        'PV-DPV': '',                                       // 设备操作过程变量
        'PV-EMStatusGraph': '',                             //设备状态
        'PV-EMStage': '',                                   //设备阶段
        'PV-EMTag': '',                                     //设备tag
        'PV-EMFunc': '',                                    //设备操作 方法
        'PV-Chart': '',                                     //曲线
        'PV-MaterialSend': '',                              //物料发放
        'PV-MaterialWeigh': '',                             //物料称量
        'PV-WeighCheck': '',                                //称量复核
        'PV-MaterialFeed': '',                              //物料投放
        'PV-MatSuppFeed': '',                               //补料
        'PV-NoneOrderWeigh': '',                            //无指令称量
        'PV-Bottle': '',                                    //理瓶
        'PV-Sign': '',                                      //签名
        'PV-SingleCheck': '',                               //单选按钮组
        'PV-WeighResult': '',                               //称量结果集
        'PV-Event': '',                                     //事件
        'PV-EventSignal': '',                               //信号触发
        'PV-DeviationResult' : ''                           //偏差结果集
    };

    /**
     * 入口方法
     * @param $pv
     */
    var show = function($pv){
        var _name = $pv.attr('ibcppv');
        var pvPracId = $pv.attr('pvpracticeid');
        var curConfig = _config[_name];
        var pvVal = $pv.attr('pvval');
        var rLog = $pv.attr('logflag');         //日志标志

        //显示修改PV页面
        _index = ibcpLayer.ShowDiv(curConfig.page,'修改PV',curConfig.w,curConfig.h,function(){
            var queryUrl = serverPath + 'pvPractice/findPvByPvPracId';
            var queryParam = {
                'pvPracId' : pvPracId
            };

            //调用接口查询PV基本信息
            ibcpAjax.Select(queryUrl,queryParam,true,function(result){
                var datas = result.data;

                //遍历基本信息区域中的label，将对应配置的属性值填写到当前label中显示
                $('#pv_Info').find('label.ibcp-log-content').each(function(){
                    var $this = $(this);
                    var _key = $this.attr('data-key');
                    if(datas[_key]) {
                        $this.html(datas[_key]);
                    }
                    //设置PV旧值
                    if(pvVal){
                        $('#pv_val').html(pvVal);
                    }
                });

                //将当前对应的PV修改控件显示出来
                $('[revisename="'+_name+'"]').removeAttr('hidden');

                //调用对应的修改PV初始化方法
                curConfig.method($pv,datas, function(){
                    //如果当前没有日志，则将日志标志设置为1，且显示日志标志
                    if(rLog == 0){
                        $pv.attr('logflag',1);
                        $pv.showIbcpLamp(function($lamp){
                            $lamp.on('click',function(){
                                ibcpPVShowLogs.show(pvPracId);
                            });
                        });
                    }
                });
            });

            //确定按钮事件
            $('#pv_revise_confirm').click(function () {
                ibcpReviseCmd.saveNewVal(function (data,pvPracticeId) {
                    //刷新pv和相关pv
                    if(IbcpType.isArray(data)){
                        data.push(pvPracticeId);
                    }
                    else {
                        data = [pvPracticeId];
                    }
                    refreshPVDOMAfterRevise(data);
                });
            })

            //取消按钮事件
            $('#pv_revise_cancel').on('click', function(){
                ibcpLayer.Close(_index);
            });
        });
    };

    /**
     * 关闭修改PV值页面方法
     * @private
     */
    var closePage = function(){
        if(_index){
            ibcpLayer.Close(_index);
        }
    };

    return {
        pop : show,
        close : closePage
    };
}();

/**
 *修改事件pv 对象
 *@author:tudecai
 */
var ReviseEventPV = (function(){
    'use strict';
    var ReviseEvent = function ($dom) {
        this.element = $dom;
        this.pvPracticeId = this.element.attr('pvPracticeId');
        this.status = this.element.attr("status");
        this.newValObj = {};
        this.showEventPVRevise();
    }

    //显示页面
    ReviseEvent.prototype.showEventPVRevise = function () {
        var _this = this;

        var html = path + '/WebUI/PV/RevisePages/EventPVRevise.html',
            height = '400px';
        if(_this.status > 3){
            height = '445px';
        }
        _this.index = ibcpLayer.ShowDiv(html,'修改事件','590px',height,function () {
            //状态3，不显示原因输入框
            if(_this.status == 3){
                $("#divEventReason").hide();
            }

            //显示事件pv信息
            _this.getEventPVInfo();

            //确定按钮
            $("#btnReviseEventEnsure").click(function () {
                if(!_this.getSelectedEventVal()) return;

                //获取新值
                var param = _this.getSelectedEventVal();

                if(_this.status == 3){
                    param['sid'] = 0;
                    _this.saveEventVal(param);
                }else {
                    //检查pv新值 通过后保存新值
                    checkPVAndAddDeviation(_this.pvPracticeId,'TimeSpan',JSON.stringify(param),function () {

                        ibcpSign.CallSign(71,function (sid) {
                            param['sid'] = sid;
                            _this.saveEventVal(param);
                        })

                    })
                }
            })

            //取消按钮
            $("#btnReviseEventCancel").click(function () {
                ibcpLayer.Close(_this.index);
            })
        })
    }

    //获取pv相关数据
    ReviseEvent.prototype.getEventPVInfo = function() {
        var _this = this;

        var url = serverPath + 'tagValue/queryEventPvInfo',
            param = {pvPracticeId : _this.pvPracticeId};
        ibcpAjax.Select(url,param,true,function (result) {
            var data = result.data;
            _this.showEventPVInfo(data);
        })
    }

    //显示数据
    ReviseEvent.prototype.showEventPVInfo = function(data) {
        var _this = this;

        $('#inputEventCode').val(data.PVCode);
        $('#inputEventName').val(data.PVName);
        $('#inputEventDesc').val(data.PVDesc);

        var oldVal = data.OldValue;
        if(oldVal != 'N/A'){
            oldVal = JSON.parse(oldVal);
            $('#inputEventOldVal').val(oldVal['Process']);
        }

        var modeId = data.modeId,
            modeName = '当前事件';
        if(modeId == 2){
            modeName = '全部事件';
        }else if(modeId == 3){
            modeName = '最后事件';
        }
        $('#inputEventMode').val(modeName);



        //显示并且缓存每个事件开始结束时间
        var eventInfoList = data.eventInfoList;

        if(eventInfoList != 'N/A' && Object.prototype.toString.call(eventInfoList) === '[object Array]'){
            eventInfoList.forEach(function (item,i) {
                var id = item['id'],
                    startTime = item['startTime'],
                    endTime = item['endTime'];
                _this.newValObj[id] = {startTime:startTime,endTime:endTime};

                _this.renderSelect(id,startTime,endTime);
            })
            //添加一个N/A选项
            var optionNA ="<option value='N/A'>N/A</option>";
            $("#selectEventNewVal").append(optionNA);
            _this.newValObj['N/A'] = {startTime:'N/A',endTime:'N/A'};
        }

        //根据事件模式，设置下拉框
        if(modeId != 2){
            $('#selectEventNewVal').removeClass('selectpicker').removeClass('dropup');
            $('#selectEventNewVal').removeAttr('multiple').removeAttr('data-max-options').removeAttr('data-dropup-auto');
        }
        else {
            $('#selectEventNewVal').selectpicker('refresh');
            $('#selectEventNewVal').selectpicker('render');

            //设置选择后的容器两行显示
            var showContainer = $("[data-id='selectEventNewVal']");
            showContainer.height(45);
            var css = {
                "word-wrap": "break-word",
                "word-break": "normal",
                "white-space": "pre-wrap",
            };
            showContainer.find('span').css(css);

            if(_this.status == 3){
                $("#divReviseEventBtnBar").css('margin-top','30px');
            }else {
                $("#divEventReason").css('margin-top','30px');
            }
        }

    }

    //渲染下拉列表
    ReviseEvent.prototype.renderSelect = function (id,startTime,endTime) {
        //计算过程时间，秒
        var differ = this.calculateDifferTime(startTime,endTime);
        var optionStr ="<option value='"+id+"'>"+startTime + " 至 " + endTime +" 持续时间："+differ+"</option>";
        $("#selectEventNewVal").append(optionStr);
    }

    //计算相差时间长(秒)
    ReviseEvent.prototype.calculateDifferTime = function (startTime,endTime) {
        var s = new Date(startTime),
            e = new Date(endTime);
        var differ = parseInt(e - s)/1000;

        //转换格式:(hh:mm:ss)
        var h = Math.floor(differ / 3600);//时
        var m = Math.floor((differ % 3600) / 60);//分
        var s = (differ % 3600) % 60; //秒

        //前置补0,返回指定格式
        var res = ibcpDate.digit(h) + ":" + ibcpDate.digit(m) + ":" + ibcpDate.digit(s);

        return res;
    }

    //获取修改值
    ReviseEvent.prototype.getSelectedEventVal = function () {
        var _this = this;

            //状态三之后的修改，需要输入修改理由
        var reason = $("#inputEventReason").val();
        if(_this.status > 3 && reason == ""){
            ibcpLayer.ShowTips('请输入修改理由',$("#inputEventReason"));
            return false;
        }

        var startTime = "",
            endTime = "";

        var selected = $("#selectEventNewVal").val();
        //如果全部事件，选择两个，取最小开始时间和最大结束时间
        if(selected instanceof Array){
            var key1 = selected[0],
                newVal1 = _this.newValObj[key1],
                start1 = newVal1['startTime'],
                end1 = newVal1['endTime'];

            //如果第一个不是N/A.判断第二个
            if(selected.length == 2 && key1 != 'N/A'){
                //获取选择的id
                var key2 = selected[1],
                    newVal2 = _this.newValObj[key2],
                    start2 = newVal2['startTime'],
                    end2 = newVal2['endTime'];

                //如果是选择的N/A 直接赋值为N/A
                if(key2 == 'N/A'){
                    startTime = start2;
                    endTime = end2;
                }
                else {
                    //比较开始时间大小
                    if(_this.calculateDifferTime(start1,start2) > 0){
                        startTime = start1;
                    }else {
                        startTime = start2;
                    }

                    //比较结束时间大小
                    if(_this.calculateDifferTime(end1,end2) > 0){
                        endTime = end2;
                    }else {
                        endTime = end1;
                    }
                }

            }
            else {
                startTime = start1;
                endTime = end1;
            }
        }
        //如果不是全部事件
        else {
            var startEnd = _this.newValObj[selected];
            startTime = startEnd['startTime'];
            endTime =  startEnd['endTime'];
        }

        return{
            pvPracticeId : _this.pvPracticeId,
            reason : reason,
            StartDateTime : startTime,
            EndDateTime : endTime
        }
    }

    //调接口保存修改值
       ReviseEvent.prototype.saveEventVal = function (param) {
        var _this = this;

        var url = serverPath + 'pv/saveEventPvData';
        ibcpAjax.Update(url,param,true,function (result) {
            ibcpLayer.Close(_this.index);

            //刷新当前pv和相关pv
            var data = result.data;
            if(IbcpType.isArray(data)){
                data.push(_this.pvPracticeId);
            }
            else {
                data = [_this.pvPracticeId];
            }
            refreshPVDOMAfterRevise(data);
        })
    }

    //new 一个修改事件pv对象
    function newReviseEventPV($dom) {
        return new ReviseEvent($dom);
    }

    return{
        show : newReviseEventPV
    }

})();

/**
 * 此方法用于在修改pv中。检查新值是否会产生偏差，有的话，需要先录入偏差才能通过
 * @param practiceId pv实际id
 * @param prop pv prop
 * @param newVal 修改的新值
 * @param callback 回调
 * @author tudecai
 */
var checkPVAndAddDeviation = function (practiceId,prop,newVal,callback) {
    'use strict';

    var param = [JSON.stringify({
        'pvPracticeId': practiceId,
        'propCode': prop,
        'value': newVal
    })];

    ibcpPVExecute.checkPVValue({check:param},function (retData) {
        var checkCode = retData.pvCheck * 1;
        if(checkCode >= 2){
            ibcpLayer.PromptYesOrNo(retData.msg + '<br/>是否录入偏差?',function () {
                //录入偏差
                DeviationOperate.clientAdd(stepPracId,function () {

                    if(IbcpType.isFunction(callback)){
                        callback();
                    }

                },practiceId);
            })
        }else {
          if(IbcpType.isFunction(callback)){
            callback();
          }
        }
    })
};

/**
 * 刷新修改PV值后影响到的PV
 * @param practiceIdArr 影响到的PV实际id数组
 * @author tudecai
 */
var refreshPVDOMAfterRevise = function (practiceIdArr) {
    //根据传入的pv实际id,拿到对应pv,调刷值接口
    if(IbcpType.isArray(practiceIdArr)){
        var $pvList = [];
        practiceIdArr.forEach(function (practiceId) {
            var $pvs = $('[pvpracticeid="'+ practiceId +'"]');
            $.each($pvs,function (i,pv) {
                $pvList.push($(pv));
            })
        })
        var url = 'pvPractice/findPvPracticeProp';
        refreshPVDOM($pvList,url);
    }
};
