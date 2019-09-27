/**
 * Created by qijialin on 2017/2/24.
 */

//必须基于 Publicjs.js

//选择产品模块
var ibcpSelectProduct = (function(){
    var proDivIndex = -1;
    //弹出单位选择框
    function ShowProduct(CallBackFunc){
        var url = getRootPath() + '/WebUI/Public/SelectProduct.html';

        proDivIndex = ibcpLayer.ShowDiv(url, '选择产品', '550px', '500px',function () {
            
            $("#SelectProductTable").bootstrapTable();
            LoadProductCodeAndName();

            //搜索按钮事件
            $("#btnProSearch").on('click', function () {
                LoadProductCodeAndName();
            });

            //确认按钮事件
            $("#btnProSelectOK").on('click', function () {
                var selectedData = $("#SelectProductTable").bootstrapTable('getSelections')[0];
                CallBackFunc(selectedData);
                ibcpLayer.Close(proDivIndex);
            });

            //取消按钮事件
            $("#btnProSelectCancel").on('click', function () {
                Close();
            });
        });
    }

    //获取产品代码和名称数据
    function LoadProductCodeAndName(){
        var condition = $("#productSearchInput").val();
        var param = {"str":condition,"valid":1,"typeId":4};
        var url = serverPath + "materialCodes/findMaterialCodes";
        //设置确认按钮不可用
        $("#selectEnsureBtn").attr("disabled", true);

        ibcpAjax.Select(url,param,true,function(result){
            $("#SelectProductTable").bootstrapTable('load',result.data);

            if(result.data.length < 1){
                // 不能点击确定按钮
                $("#btnProSelectOK").attr("disabled",true);
            }else {
                $("#SelectProductTable").bootstrapTable("check",0);
                $("#btnProSelectOK").attr("disabled",false);
            }
        });
    }

    function Close(){
        ibcpLayer.Close(proDivIndex);
    }

    //给外部的接口
    return {
        CallProduct : ShowProduct,
        Close : Close
    };

})();