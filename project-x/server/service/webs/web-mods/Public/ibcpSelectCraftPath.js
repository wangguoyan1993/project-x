/**
 * Created by Oswald on 2017/7/17.
 */
;var ibcpSelectCraftPath = (function () {

    //显示选择页面
    function showCraftPathList(callback) {
        var url = getRootPath() + "/WebUI/Recipe/Recipe_Select_CraftPath.html";
        var index = ibcpLayer.ShowDiv(url,"选择工艺路径","650px","455px",function() {
            $("#selectCraftResult").bootstrapTable();
            // 加载工艺路径
            FindPath();
            // 搜索按钮 事件
            $("#searchCraftBtn").on("click",function() {
                FindPath();
            });
            //确认按钮事件
            $("#selectCraftconfirmBtn").on('click', function () {
                var Path = $("#selectCraftResult").bootstrapTable("getSelections")[0];
                callback(Path);
                ibcpLayer.Close(index);
            });
            // 选择执行路径 取消按钮 事件
            $("#selectCraftCancelBtn").click(function() {
                ibcpLayer.Close(index);
            });
        });
    }

    // 加载工艺路径
    function FindPath() {
        var url = serverPath + "RecipePath/findRecipePathValid";
        var datas = {'str':$("#searchCraftTxt").val()};
        ibcpAjax.Select(url,datas,true,function(result){
            var data = result.data;
            $('#selectCraftResult').bootstrapTable();
            $('#selectCraftResult').bootstrapTable('load', data);
            $('#selectCraftResult').tableHideCheckbox();
            if(data.length >0) {
                //设置选中行
                $('#selectCraftResult').bootstrapTable('check', 0);
            }
        });
    };

    return{
        show : showCraftPathList
    }
})();