/**
 * Created by WangGuoyan on 2017/2/20.
 */
var childPath = "/WebUI/Public/NumberKeyBoard.html";

$(function(){
    'use strict';
    $(".Call-NumKeyBoard").each(function(){
        var $this = $(this);
        $this.focus(function(){
            ibcpNumberKeyBoard.Pop($this);
        });
    });
});

var ibcpNumberKeyBoard = (function(){
    'use strict';
    //弹出键盘
    function showNumKeyBoard(input,param,callback){
        var keyBoardIndex = ibcpLayer.ShowDiv(getRootPath() + childPath, "数字键盘", "230px", "350px", function(){
            initKeyBoard();
            //确认按钮
            $('#Num-KeyBoard-Confirm').on('click', function(){
                var $_numInput = $('[numType="input"]');
                var value = $_numInput.val() * 1;

                //验证输入合法性
                value *= 1;
                if(isNaN(value)){
                    ibcpLayer.ShowTips('内容非法！',$_numInput);
                    return false;
                }

                // //获取配置的精度信息
                // var precision = input.parents('span').attr('precision') * 1;        //精度值
                //
                // //如果当前传入元素配置有精度信息，则将输入的数字转为对应的精度结果
                // if(precision){
                //     var precisionType = input.parents('span').attr('precisionType') * 1;      //精度类型
                //
                //     //判断精度类型
                //     //四舍五入
                //     if(precisionType === 1){
                //         value = value.toRound(precision);
                //     }
                //     //去尾
                //     else if(precisionType === 2){
                //         value = value.toFloor(precision);
                //     }
                //     //逢一进十
                //     else if(precisionType === 3){
                //         value = value.toCeil(precision);
                //     }
                //     //为尾数为0的数字添加0占位（字符串类型返回）
                //     value = value.supplyZeros(precision);
                // }


                //如果传入的第二参数为函数类型，则直接执行函数
                if(typeof(param) === 'function'){
                    param(value);
                }
                //如果传入的第二参数为数字类型，则为限制的长度值，需要经过检查方法后才能继续执行
                else if(typeof(param) === 'number' && param > 0){
                    if(value.getSignificantDigitLength() > param){
                        ibcpLayer.ShowTips('最大有效数字长度为' + param + '，请重新输入！',$_numInput);
                        return;
                    }
                }
                //如果传入的第二参数为对象，则根据对象中的不同配置进行检查和限定
                else if(typeof(param) === 'object'){
                    var _maxLength = param.max;                          //最大长度
                    var _precision = param.precision;                   //精度
                    var _precisionType = param.precisionType;           //精度计算类型

                    //根据配置的精度信息判断
                    if(_precision >= 0){
                        //判断精度类型
                        //四舍五入
                        if(_precisionType === 1){
                            value = value.toRound(_precision);
                        }
                        //去尾
                        else if(_precisionType === 2){
                            value = value.toFloor(_precision);
                        }
                        //逢一进十
                        else if(_precisionType === 3){
                            value = value.toCeil(_precision);
                        }
                        // 四舍六入五成双
                        else if(_precisionType === 4){
                            value = value.roundFixed(_precision);
                        }
                        //为尾数为0的数字添加0占位（字符串类型返回）
                        value = value.supplyZeros(_precision);
                    }

                    //最大长度超限检查
                    if(_maxLength){
                        if(value.getSignificantDigitLength() > _maxLength){
                            ibcpLayer.ShowTips('最大有效数字长度为' + _maxLength + '，请重新输入！',$_numInput);
                            return;
                        }
                    }
                }

                //此时检查第三参数，如果为函数类型，则直接执行函数
                if(typeof(callback) === 'function'){
                    callback(value);
                }
                //给传入的Input元素赋值
                input.val(value);
                ibcpLayer.Close(keyBoardIndex);
            });

            //取消按钮
            $('#Num-KeyBoard-Cancel').on('click', function(){
                ibcpLayer.Close(keyBoardIndex);
            });
        });
    }

    //初始化键盘
    function initKeyBoard(){
        var $input = $('[numType="input"]');
        //键盘样式设置
        $(".NumBtn").addClass('btn btn-custom');

        //数字键盘功能
        $('.NumBtn').each(function(){
            var $this = $(this);
            //退格功能
            if($this.attr("num") == "BKS"){
                $(this).on('click', function(){
                    $input.val($input.val().substr(0,$input.val().length - 1));
                });
            }
            //小数点
            else if($this.attr("num") == "POT"){
                $(this).on('click', function(){
                    if($input.val().indexOf(".") == -1){
                        $input.val(($input.val() + "."));
                    }
                });
            }
            //数字功能
            else{
                $this.on('click', function(){
                    $input.val($input.val() + $this.attr("num"));
                });
            }
        });
    }

    return {
        Pop : showNumKeyBoard
    };
})();

