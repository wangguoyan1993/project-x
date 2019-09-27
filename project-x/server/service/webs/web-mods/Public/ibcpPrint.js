/**
 *Create by:Decai Tu
 *Create Time:2017-08-21 09:34
 *Decription:用于打印
 */

//打印标签或者历史
var ibcpPrintLabel =  (function () {

    //显示 打印 历史
    var ShowHistory = function(barcodeId){

        var html = getRootPath() + "/WebUI/Material/MT_TU_PrintHistory.html";
        var index = ibcpLayer.ShowDiv(html, '标签打印历史', '800px', '520px',function() {
            $('#printList').bootstrapTable();
            var url = serverPath + 'lableHistory/findLabelHistory';
            var params = {
                'barcodeId' : barcodeId
            }
            ibcpAjax.Select(url,params,true,function(result){
                console.log(result.data);
                var pData = result.data;
                $('#printList').bootstrapTable('load',pData);
            });

            $('#btnPHClose').click(function(){
                ibcpLayer.Close(index);
            });
        });
    };

    //打印物料标签
    function printTULabel(tuId) {
        var PrintLabelPath = serverPath + "materialPackages/findLabeledData";
        var datas = {
            "id" : tuId,
            "sid" : 0
        };
        ibcpAjax.Select(PrintLabelPath, datas, true, function(result){
            var printData = result.data;
            var labId = printData.labId;
            // alert('数据：' + JSON.stringify(printData));
            //签名
            ibcpSign.CallSign(20,function (sid) {
                //插入 打印历史
                var phUrl = serverPath + "lableHistory/addLabelHistory";
                var phParams = {
                    // "id" : labId,
                    "barcodeId" : labId,
                    "sid" : sid
                };
                ibcpAjax.Insert(phUrl, phParams, true, function (resultInsert){
                    printData.user = resultInsert.data.user;
                    printData.printTime = resultInsert.data.signTime;
                    try {
                        //打印
                        JsEvent.printMatLabel(JSON.stringify(printData));
                    }catch (e) {
                        console.log('打印物料件异常！');
                    }
                });
            })
        });
    };
    //打印物料标签
    function printLabelOfTu(tuId,sid){
        //判断 类型 typeId
        var PrintLabelPath = serverPath + "materialPackages/findLabeledData";
        var datas = {
            "id" : tuId,
            "sid" : 0
        };
        ibcpAjax.Select(PrintLabelPath, datas, true, function(result) {
            var printData = result.data;
            var labId = printData.labId;

            //插入 打印历史
            var phUrl = serverPath + "lableHistory/addLabelHistory";
            var phParams = {
                // "id" : labId,
                "barcodeId": labId,
                "sid": sid
            };
            ibcpAjax.Insert(phUrl, phParams, true, function (resultInsert) {
                printData.user = resultInsert.data.user;
                printData.printTime = resultInsert.data.signTime;
                try {
                    //打印
                    JsEvent.printMatLabel(JSON.stringify(printData));
                } catch (e) {
                    console.log('打印物料件异常！');
                }
            });
        });
    }
    //打印称量标签 noTareFlag 是否打印出皮毛
    function printWHLabel(resultId, sigId, noTareFlag) {
        var noTare = 0;
        if(noTareFlag && noTareFlag == 1){
            noTare = 1;
        }

        if(sigId){
            printWHLabelServer(resultId, sigId, noTare);
        }
        else {
            ibcpSign.CallSign(62, function (sid) {
                printWHLabelServer(resultId, sid, noTare);
            });
        }
    }

    //打印称量标签服务
    function printWHLabelServer(resultId, sid, noTare) {
        var PrintLabelPath = serverPath + "weighing/weighingTag",
            param = {id:resultId,sid:sid};
        ibcpAjax.Select(PrintLabelPath, param, true, function (result) {
            //插入 打印历史
            var phUrl = serverPath + "lableHistory/addLabelHistory";
            var phParams = {
                // "id" : labId,
                "barcodeId" : result.data.barcodeId,
                "sid" : sid
            };
            ibcpAjax.Insert(phUrl, phParams, true, function (resultInsert) {
                result.data.noTare = noTare;
                try {
                    JsEvent.printWeighLabel(JSON.stringify(result.data));
                } catch (e) {
                    console.log('打印称量件异常！');
                }
            });
        });
    }
    
    //打印设备标签
    function printEMLabel(emId) {
        ibcpSign.CallSign(62, function (sid) {
            var PrintLabelPath = serverPath + "eQMInstance/printEQMInstanceBarcode";
            var datas = {
                "EQMId": emId,
                "sid": sid
            };
            ibcpAjax.Insert(PrintLabelPath, datas, true, function (result) {
                try {
                  console.log(result.data);
                    JsEvent.printEMLable(JSON.stringify(result.data));
                } catch (e) {
                    console.log('打印设备标签异常！');
                }
            });
        });
    }

    return {
        history : ShowHistory,
        material : printTULabel,
        printLabelOfTu:printLabelOfTu,
        weighing : printWHLabel,
        equipment : printEMLabel
    }
})();

/**
 * 通过调用标签编辑器资源打印标签方法
 * @author Mr.Wang
 * @type {{pop}}
 */
var ibcpLabelPrint = function(){
    'use strict';
    var pageIndex = null;

    //显示打印预览界面方法
    var execute = function(param){
        //整理参数
        var _id = param.id;                 //关键id（物料id、设备id、称量结果id）
        var title = param.title;            //弹出框名称
        var w = param.width || '500px';     //宽度
        var h = param.height || '500px';    //高度
        var labelType = param.type;         //标签类型
        var sCode = param.sCode;            //签名权限

        //签名后直接调用加载数据以及打印方法
        ibcpSign.CallSign(sCode,function(sid){
            //整理参数和地址
            var dataParam = {
                'typeId' : labelType,
                'id' : _id,
                'sid' : sid
            };
            var dataUrl = serverPath + 'label/findLabelTypeById';

            //调用统一获取标签打印接口获取标签宏元素数据
            ibcpAjax.Select(dataUrl,dataParam,true,function(result){
                var datas = result.data;
                //如果结果为字符串，则转换为json对象
                if(typeof(datas) === 'string'){
                    datas = JSON.parse(datas);
                }
                var divUrl = "../Editor/LabelEditor/Html/LabelEditorIndex.html?id=" + _id + "&showType=2&type=" + labelType + "&datas=" + datas;

                //显示标签编辑（打印预览）页面
                pageIndex = ibcpLayer.ShowIframe(divUrl,title,w,h,false,function(){

                });
            });
        });
    };

    var closePage = function(){
        ibcpLayer.Close(pageIndex);
    };

    return {
        close : closePage,
        execute : execute
    };
}();

