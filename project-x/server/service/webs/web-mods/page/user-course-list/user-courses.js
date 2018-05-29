/*
	@Author: MaCanglian
	@Time: 2018-05
	@Tittle: courses
	@Description: 实验课程浏览区
*/

//加载页面时运行
$(function () {
    coursesMods.init();
});

//窗口自适应
$(window).resize(function(){
    coursesMods.pageSize();
});

//实验课程显示区域功能
let coursesMods = function () {
    //加载数据
    let _initData = () => {
        //测试数据
        let data = [
            {
                id : 1,
                code : 'B1400107',
                name : '物理实验A1',
                college : '物理科学与技术学院',
                place : '崇理楼',
                time : '周二第1,2节{第2-16周|双周}',
                property : 1,
                teacher : '李云',
                credit : 3
            },{
                id : 2,
                code : 'B1400203',
                name : '物理实验A1',
                college : '物理科学与技术学院',
                place : '环化楼',
                time : '周三第1,2节{第1-17周}',
                property : 1,
                teacher : '王健',
                credit : 1
            }
        ];
        $('#courses_table').bootstrapTable('load',data);
        $('#courses_table').bootstrapTable('check',0);

        //正常数据：调用接口搜索数据加载表格
        let param = {};
        let url = serverPath + 'labs/queryLabOrder';
        ibcpAjax.Select(url,param,true,function (result) {
            console.log(result);
            if(result.data){
                $('#reservation_table').bootstrapTable('load',result.data);
                //默认选中第一行
                $('#reservation_table').bootstrapTable('check',0);
            }
        })
    };
    //加载页面尺寸
    let initPageSize =  () => {
        //表格区域高度
        $('#table2').height($(window).height() -  $('#table1').height() -40);
        // //表格高度
        // $('#box').height($('#table').height() - $('.panel-heading').height() - 30);
    };

    let init =  () => {
        _initData();
        initPageSize();
    };

    return{
        init : init,
        pageSize : initPageSize
    }
}();

function propertyChange (value,row,index){
    if(value === 1 ){
        return value = "必修课";
    }else if(value === 2){
        return value ="专业必修课";
    }else if(value === 3){
        return value = "公共选修课"
    }
}