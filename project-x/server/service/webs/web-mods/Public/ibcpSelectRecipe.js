/**
 * Created by Oswald on 2017/3/23.
 */
//选择配方模块
;var ibcpSelectRecipe = (function(){
    var severName = "",
        param = {},
        callback = undefined;

    function show(){
        var html = getRootPath() + '/WebUI/Public/SelectRecipe.html';
        var index = ibcpLayer.ShowDiv(html, '选择配方', '700px', '500px',function(){
            findRecipe();

            //确认按钮事件
            $('#Recipe_Info_Confirm').on('click',function(){
                var selectedRecipe = $('#Recipe_Select_Table').bootstrapTable('getSelections')[0];
                callback(selectedRecipe);
                param = {},
                ibcpLayer.Close(index);
            });

            //查找按钮事件
            $('#PSCSearch').on('click',function(){
                findRecipe();
            });

            //取消
            $("#Recipe_Info_Cancel").on('click',function(){
                ibcpLayer.Close(index);
            });
        });
    };

    //获取配方
    function findRecipe() {
        var keyStr = $('#txtPSCcontent').val();
        param.str = keyStr;
        var severUrl = serverPath + 'recipe/' + severName;
        ibcpAjax.Select(severUrl, param, true, function(result){
            var data = result.data;
            $('#Recipe_Select_Table').bootstrapTable();
            $('#Recipe_Select_Table').bootstrapTable('load', data);
            if(data.length >0) {
                //设置选中行
                $('#Recipe_Select_Table').bootstrapTable('check', 0);
            }
        });
    };

    //查询所有配方
    function selectAllRecipe(cb) {
        severName = "findValidRecipe";
        callback = cb;
        param = {};
        show();
    };

    //查询产品配方
    function selectRecipeByProduct(productId, cb) {
        severName = "findRecipeDetail";
        param = {matId:productId};
        callback = cb;
        show();
    };

    //查询产品对应类型配方 simulate(如果是模拟类型的批指令，传此参数)
    function selectRecipeByProductAndRpType(productId, typeId, cb, simulate) {
        if(simulate){
            severName = 'queryConfirmRecipe';
        }else {
            severName = "findRecipeByMatIdAndRecipeType";
        }
        param = {matId:productId,recipeTypeId:typeId};
        callback = cb;
        show();
    };

    return{
        all : selectAllRecipe,
        byProduct : selectRecipeByProduct,
        byProductAndType : selectRecipeByProductAndRpType
    };

})();