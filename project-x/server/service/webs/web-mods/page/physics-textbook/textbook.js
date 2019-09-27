/*
	@Author: MaCanglian
	@Time: 2018-05
	@Tittle: textbook
	@Description: 物理实验教材
*/

//加载页面时运行
$(function () {
    textbookMods.init();
});

//窗口自适应
$(window).resize(function(){
    textbookMods.pageSize();
});

//实验室列表显示区域功能
let textbookMods = function () {
    //加载数据
    let _initData = () => {
        //测试数据
        let data = [
            {
                id : 1,
                code : 'B1400708',
                name : '基础物理实验',
                author : '沈元华 陆申龙',
                press : '高等教育出版社',
                version : '2003年12月第一版',
            },{
                id : 2,
                code : 'B1400709',
                name : '大学物理实验',
                author : '张兆奎',
                press : '高等教育出版社',
                version : '第二版',
            },{
                id : 3,
                code : 'B1400700',
                name : '光电子技术基础实验',
                author : '周骏',
                press : '化学工业出版社',
                version : '2012版',
            }
        ];
        $('#textbook_table').bootstrapTable('load',data);
        //默认选中第一行
        $('#textbook_table').bootstrapTable('check',0);

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
        let index = ibcpLayer.ShowDiv('textPdf.html','教材详情', '800px', '800px',function(){

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