/*
	@Author: MaCanglian
	@Time: 2018-05
	@Tittle: physics-eqm
	@Description: 物理实验器材
*/

//加载页面时运行
$(function () {
    phyEqmMods.init();
});

//窗口自适应
$(window).resize(function(){
    phyEqmMods.pageSize();
});

//实验室列表显示区域功能
let phyEqmMods = function () {
    //加载数据
    let _initData = () => {
        //测试数据
        let data = [
            {
                id : 1,
                code : 'B1400401',
                name : '半导体激光器系列实验系统',
                version : 'WGL-5',
                quantity : 4 ,
                property : '专用'
            },{
                id : 2,
                code : 'B1400322',
                name : '高功率半导体激光器',
                version : '980nm/15-400W',
                quantity : 4 ,
                property : '专用'
            },{
                id : 3,
                code : 'B1400208',
                name : '半导体激光器',
                version : '660nm/22.0mW',
                quantity : 4 ,
                property : '专用'
            },{
                id : 4,
                code : 'B1400223',
                name : '双通道光功率计',
                version : 'KL-310',
                quantity : 4 ,
                property : '专用'
            }
        ];
        $('#equipment_table').bootstrapTable('load',data);
        //默认选中第一行
        $('#equipment_table').bootstrapTable('check',0);

        //正常数据：调用接口搜索数据加载表格

    };
    //加载页面尺寸
    let initPageSize =  () => {
        //表格区域高度
        $('#table').height($(window).height() -50);
        // //表格高度
        // $('#laboratory_table').height($('#table').height() - $('.panel-heading').height() - 30);
    };

    //注册事件
    let _initEvent = () => {
        //搜索按钮
        $('#detailed_btn').on('click',function(){
            _detailedData();
        })
    };

    //预约按钮事件
    let _detailedData = () => {
        let selectData = $('#laboratory_table').bootstrapTable('getSelections')[0];
        let index = ibcpLayer.ShowDiv('eqm-detailed.html','设备详情', '700px', '700px',function(){
            //确认按钮
            $('#close').on('click',function(){
                ibcpLayer.Close(index);
            });
        });
    };

    let init =  () => {
        initPageSize();
        _initData();
        _initEvent();
    };
    return{
        init : init,
        pageSize : initPageSize
    }
}();