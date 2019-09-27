/**
 * Created by Oswald on 2017/7/20.
 */
/*************************************  模块--设备类操作 Select ***************************************/
var ibcpSelectFuntions = (function() {
    var divIndex = 0;
    var myCallBackFunc = null;

    /*------------------------------------ 显示选择界面 --------------------------------------*/
    var selectProc = function(callBackFunc) {
        myCallBackFunc = callBackFunc;
        var htmlUrl = getRootPath() + '/WebUI/Public/ibcpSelectFuntions.html';
        divIndex = ibcpLayer.ShowDiv(htmlUrl, '选择-操作', '850px', '410px', function() {
            $('#EM_SG_Method_Table').bootstrapTable();
            //监听事件
            ListenEvents();
            Search();
        });
    };

    /*------------------------------------ 方法 --------------------------------------*/
    function ListenEvents() {
        $('#EM_SG_Method_Confirm_Btn').on('click', function() {
            var opData = $('#EM_SG_Method_Table').bootstrapTable('getSelections')[0];
            if (myCallBackFunc) {
                myCallBackFunc(opData)
                ibcpLayer.Close(divIndex);
            }
        });

        $('#EM_SG_Method_Cancel_Btn').on('click', function() {
            ibcpLayer.Close(divIndex);
        });
    };

    function Search() {
        var str = $('#txtCondition').val;
        var url = serverPath + 'EQMGraph/findFuncs';
        var params = {};
        ibcpAjax.Select(url, params, true, function(result) {
            var opData = result.data;
            $('#EM_SG_Method_Table').bootstrapTable('load', opData);
            $('#EM_SG_Method_Table').tableHideCheckbox();
            if (opData.length > 0) {
                $('#EM_SG_Method_Table').bootstrapTable('check', 0);
            }
        });
    };

    return {
        Show: selectProc
    }
})();