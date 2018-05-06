/**
 * Created by Oswald on 2017/2/27.
 */
//选择物料
;var ibcpSelectMat = (function(){
    var proDivIndex = -1;
    //弹出单位选择框
    function ShowMat(CallBackFunc,multiCheck){
        var checkBox = multiCheck;
        var url = getRootPath() + '/WebUI/Public/SelectMaterial.html';

        proDivIndex = ibcpLayer.ShowDiv(url, '选择产品/物料', '600px', '460px',function () {
            //初始化表格
            initTable(checkBox);

            //获取产品代码和名称
            LoadMaterialCodeAndName(checkBox);

            //搜索按钮事件
            $("#searchMaterialBtn").on('click', function () {
                LoadMaterialCodeAndName(checkBox);
            });

            //单击行触发的事件
            $('#SelectMatTable').on('check.bs.table', function (e, row, element) {
                //有选中的行，按钮可用
                $("#selectEnsureBtn").attr("disabled", false);
            });

            //确认按钮事件
            $("#selectEnsureBtn").on('click', function () {
                var selectedData = $("#SelectMatTable").bootstrapTable('getSelections');
                if(selectedData.length == 0) return;
                checkBox ? CallBackFunc(selectedData) : CallBackFunc(selectedData[0]);//多选返回全部，单选返回一条
                Close();
            });

            $("#selectCancelBtn").on('click',function(){
                Close();
            })
        });
    }

    //初始化表格 判断是用单选还是多选
    function initTable(multiCheck) {
        var state = {
            radio : true
        };
        if(multiCheck){
            state = {
                checkbox : true
            }
        }

        $("#SelectMatTable").bootstrapTable({
            height : 300,
            striped: true,
            uniqueId : "id",
            clickToSelect : true,
            columns : [state,{
                field : "id",
                title : "",
                visible : false
            },{
                field : "code",
                title : "代码"
            },{
                field : "name",
                title : "名称"
            },{
                field : "typeName",
                title : "类型"
            },{
                field : "spec",
                title : "规格"
            },{
                field : "version",
                title : "版本"
            }]
        });
    }

    //获取物料代码和名称数据
    function LoadMaterialCodeAndName(checkBox){
        var condition = $("#materialSearchInput").val();
        // var param = {"str":condition,"valid":1,"typeId":1};//valid 1 生效 typeId 1 物料
        var param = {"str":condition,"valid":3};
        var url = serverPath + "materialCodes/findMaterialCodes";
        //设置确认按钮不可用
        if(!checkBox){
            $("#selectEnsureBtn").attr("disabled", true);
        }
        ibcpAjax.Select(url,param,true,function(result){
            console.info(result.data);
            $("#SelectMatTable").bootstrapTable('load',result.data);
            if(!checkBox) $("#SelectMatTable").tableHideCheckbox();
        });
    }

    function Close(){
        ibcpLayer.Close(proDivIndex);
    }

    //给外部的接口
    return {
        CallMat : ShowMat,
        Close : Close
    };

})();

//选择指定物料的物料批次
var ibcpSelectBatch = (function(){
    var divIndex = 0;

    var SelectForTU = function(matCode, CallBackFunc){
        var url = getRootPath() + '/WebUI/Material/MT_BA_Select.html';
        divIndex = ibcpLayer.ShowDiv(url, '选择批次', '1000px', '520px',function() {
            $('#BatchList').bootstrapTable();
            LoadBatch(matCode);

            $('#btnSelectBatchOK').click(function(){
                var selData = $('#BatchList').bootstrapTable('getSelections')[0];
                CallBackFunc(selData);
                ibcpLayer.Close(divIndex);
            });

            $("#btnSelectBatchCancel").click(function(){
                ibcpLayer.Close(divIndex);
            });

        });
    }

    function LoadBatch(matCode){
        var url = serverPath + 'materialsBatch/queryBatchByCodeId';
        var params = {
            'codeId' : matCode
        }
        ibcpAjax.Select(url,params,true,function(result){
            var oData = result.data;
            $('#BatchList').bootstrapTable('load',oData);
        });
    }

    return {
        ShowForTU : SelectForTU
    }
})();