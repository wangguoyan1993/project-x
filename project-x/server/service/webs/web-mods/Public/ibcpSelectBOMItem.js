/**
 *Create by:Decai Tu
 *Create Time:2017-08-08 17:03
 *Decription:选择BOM物料项
 */

var ibcpSelectBOMItem = (function () {
    //弹出显示
    function showBOMItemSelectPage(bomId,callback) {
        var url = getRootPath() + "/WebUI/Public/SelectBOMItem.html";
        var index = ibcpLayer.ShowDiv(url,"选择BOM项","800px", "380px",function () {
            //加载数据
            getAndLoadBOMItem(bomId);

            //确认按钮
            $("#selectBOMMatEnsure").click(function () {
                var item = $("#tableBOMItemSelect").bootstrapTable("getSelections")[0];
                callback(item);
                ibcpLayer.Close(index);
            });

            //取消按钮
            $("#cancelBOMMatBtn").click(function () {
                ibcpLayer.Close(index);
            });
        });
    }

    //获取列表数据
    function getAndLoadBOMItem(bomId) {
        $("#tableBOMItemSelect").bootstrapTable();
        var param = {"bomId":bomId};
        var url = serverPath + "BomsDetail/findBomDetailById/";

        ibcpAjax.Select(url,param,true,function(result){
            $("#tableBOMItemSelect").bootstrapTable('load',result.data);
            $("#tableBOMItemSelect").bootstrapTable("check", 0);
        });
    }

    return{
        show : showBOMItemSelectPage
    }
})();