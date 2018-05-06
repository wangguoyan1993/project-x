/**
 * Created by Mr.Wang on 2017/4/11.
 */
/**
 * 权限类模块
 */
var ibcpAuthority = (function(){
    /**
     * 显示权限列表页面
     * @param options
     * @param callback
     */
    var showPage = function(callback){
        var url = getRootPath() + "/WebUI/Public/ibcpAuthority.html";
        var page = ibcpLayer.ShowDiv(url, '权限查询', '800px', '500px',function () {
            var aDatas = null;
            //
            $("#btnVFASave").attr("disabled",true);
            //初始化表格
            // $('#VFFTAuthorityTable').bootstrapTable();
            //表格数据加载
            // _loadVFCAuthority();
            initPagination();

            //初始化查询权限按钮事件
            // _searchAuthority();
            $("#btnVFASearch").on("click",function() {
                $('#VFFTAuthorityTable').bootstrapTable('refresh', {url: serverPath + "authorities/findAuthorityDetail"});
            });

            // 数据加载成功之后
            $("#VFFTAuthorityTable").on("load-success.bs.table",function() {
                $("#VFFTAuthorityTable").tableHideCheckbox();
                // $("#VFFTAuthorityTable").bootstrapTable("check",0);
            });

            //表格点击事件
            $('#VFFTAuthorityTable').on('check.bs.table', function (e, row) {
                aDatas = {
                    'id' : row['id'],
                    'name' : row['name'],
                    'description' : row['description']
                };

                $("#btnVFASave").attr("disabled",false);
            });

            //确定选择权限按钮事件
            $('#btnVFASave').on('click', function(){
                ibcpLayer.Close(page);
                if(callback){
                    callback(aDatas);
                }
            });

            //取消选择权限按钮事件
            $('#btnVFACancel').on('click', function(){
                ibcpLayer.Close(page);
            });
        });
    };

    /**
     * 加载所有的权限列表
     * @param str
     * @private
     */
    var _loadVFCAuthority = function(str){
        if(!str){
            str = '';
        }

        var url = serverPath + 'authorities/findAuthorityDetail';
        var datas ={
            'str':str
        };
        ibcpAjax.Select(url,datas,true,function(result){
            //列出所有的对象类型
            var data = result.data;
            $("#VFFTAuthorityTable").bootstrapTable("load",data);
        });
    };

    /**
     * @author:liyuanquan
     * @description:pagination
     */
    function initPagination() {
        $('#VFFTAuthorityTable').bootstrapTable({
            method: 'get',
            contentType: "application/x-www-form-urlencoded",//一种编码。好像在post请求的时候需要用到。这里用的get请求，注释掉这句话也能拿到数据
            url: serverPath + "authorities/findAuthorityDetail",//要请求数据的文件路径
            striped: true, //是否显示行间隔色
            dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里只有前后端约定好就行
            pageNumber: 1, //初始化加载第一页，默认第一页
            pagination:true,//是否分页
            queryParams:queryParams,//请求服务器时所传的参数
            sidePagination:'server',//指定服务器端分页
            pageSize:10,//单页记录数
            pageList:[10,20,30,40],//分页步进值
            columns:[{
                field : "state",
                radio : true
            },{
                field : "id",
                title : "",
                visible : false
            },{
                field : "name",
                title : "权限名称",
                align:'left',
                halign:'center'
            },{
                field : "description",
                title : "权限描述",
                align:'left',
                halign:'center'
            }],
            responseHandler:responseHandler
        });
    };

    function queryParams(params) {
        var condition = GetQueryCriteria();
        condition.pageSize = params.limit;//每页行数
        condition.pageIndex = params.offset/params.limit + 1;//当前页码
        return condition;
    };

    function responseHandler(result) {
        var errcode = result.errorCode;
        if(errcode != 0){
            $('#VFFTAuthorityTable').bootstrapTable('removeAll');
        }else {
            $("#btnVFASave").attr("disabled",true);
        }
        return {
            total : result.total,
            data : result.data
        };
    };

    function GetQueryCriteria() {
        var searchInfo = $("#txtVFACondition").val();

        return{
            str : searchInfo
        }
    };

    /**
     * 查询权限按钮事件
     * @private
     */
    var _searchAuthority = function(){
        $('#btnVFASearch').on('click', function(){
            var url = serverPath + 'authorities/findAuthorityDetail';
            var datas ={
                'str': $('#txtVFACondition').val()
            };
            ibcpAjax.Select(url,datas,true,function(result){
                //列出所有的对象类型
                var data = result.data;
                $("#VFFTAuthorityTable").bootstrapTable("load",data);
            });
        });
    };

    return{
        show : showPage
    };
})();

