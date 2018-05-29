/*
	@Author: MaCanglian
	@Time: 2018-05
	@Tittle: video
	@Description: 物理实验视频
*/

//加载页面时运行
$(function () {
    videoMods.init();
});

//窗口自适应
$(window).resize(function(){
    videoMods.pageSize();
});

//实验室列表显示区域功能
let videoMods = function () {
    //加载数据
    let _initData = () => {
        //测试数据
        let data = [
            {
                id : 1,
                code : 'B1400708',
                name : '霍尔效应实验',
                source : '爱奇艺',
                describe : '详细介绍霍尔效应实验仪器，实验原理及实验过程'
            },{
                id : 1,
                code : 'B1400708',
                name : '麦克斯干涉实验',
                source : '爱奇艺',
                describe : '详细介绍霍尔效应实验仪器，实验原理及实验过程'
            }
        ];
        $('#video_table').bootstrapTable('load',data);
        //默认选中第一行
        $('#video_table').bootstrapTable('check',0);

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
        let index = ibcpLayer.ShowDiv('detail-video.html','视频详情', '800px', '800px',function(){

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