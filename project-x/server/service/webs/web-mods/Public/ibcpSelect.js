/**
 * Created by qijialin on 2017/4/14.
 */

var ibcpSelect = (function () {
    var divIndex = 0;
    var dataHeigh = 280;
    var myOptions = {
        url: null,
        title: '选择',
        heigh: 400,
        width: 600,
        canSearch: false,
        cols: null,
        callBackFunc: null
    }

    var setter = function (key, value) {
        myOptions[key] = value;
    }

    var getter = function (key) {
        return myOptions[key];
    }
    
    
    /*------------------------------------ 显示选择界面 --------------------------------------*/
    //描述 高 宽 搜索 callback
    var selectShow = function (options) {
        for(var opkey in options){
            // myOptions[opkey] = options[opkey];
            setter(opkey, options[opkey]);
        }
        //可用extend方法
        // $.extend(myOptions, options);

        if(!myOptions.url){
            ibcpLayer.ShowMsg('未指定取数据的 Url');
            return;
        }

        if(!myOptions.cols){
            ibcpLayer.ShowMsg('未指定 需要显示的数据列');
            return;
        }

        if(myOptions.canSearch){
            $('#conditionDiv').removeAttr('hidden');
            dataHeigh = myOptions.heigh - 120;
        }else {
            $('#conditionDiv').attr('hidden','hidden');
            dataHeigh = myOptions.heigh - 70;
        }

        var hpx = myOptions.heigh + 'px'
        var wpx = myOptions.width + 'px'
        var htmlUrl = getRootPath() + '/WebUI/Public/ibcpSelect.html';
        divIndex = ibcpLayer.ShowDiv(htmlUrl, myOptions.title, wpx, hpx, function(){
            $('#dataTable').bootstrapTable({
                height : dataHeigh,
                columns : myOptions.cols,
                clickToSelect : true
            });
            //监听事件
            ListenEvents();
            Search();
        });
    }

    /*------------------------------------ 方法 --------------------------------------*/
    function ListenEvents(){
        $('#ibcpBtnSearch').on('click',function () {
            Search();
        });

        $('#btnOK').on('click',function () {
            var opData = $('#dataTable').bootstrapTable('getSelections')[0];
            if(myOptions.callBackFunc){
                myOptions.callBackFunc(opData);
                ibcpLayer.Close(divIndex);
            }
        });

        $('#btnCancel').on('click',function () {
            ibcpLayer.Close(divIndex);
        });
    };

    function Search() {
        var str = $('#ibcpCondition').val();
        var url = myOptions.url;
        var params = { 'str' : str};
        ibcpAjax.Select(url, params, true, function (result) {
            var selectData = result.data;
            $('#dataTable').bootstrapTable('load', selectData);
            if(selectData.length > 0){
                $('#dataTable').bootstrapTable('check', 0);
            }
            $('#dataTable').tableHideCheckbox();
        })
    }

    return {
        Show : selectShow
    }
})();