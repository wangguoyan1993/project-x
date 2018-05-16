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
                place : '崇理楼410',
                time : '周三下午7-8节',
                property : '必修课',
                teacher : '李云',
                credit : 3
            },{
                id : 2,
                code : 'B1400203',
                name : '化学实验A1',
                college : '环境工程与化学学院',
                place : '环化楼320',
                time : '周一7-8节；周四3-4节',
                property : '专业选修课',
                teacher : '王健',
                credit : 1
            },{
                id : 3,
                code : 'B1400019',
                name : '普通生物学实验A',
                college : '生命科学与技术',
                place : '生命学院204',
                time : '周二5-6节',
                property : '必修课',
                teacher : '吴松',
                credit : 2
            }
        ];
        $('#courses_table').bootstrapTable('load',data);

        //正常数据：调用接口搜索数据加载表格
    };
    //加载页面尺寸
    let initPageSize =  () => {
        //表格区域高度
        $('#table').height($(window).height() - $('#search_area').height() - 40);
        // //表格高度
        // $('#courses_table').height($('#table').height() - $('.panel-heading').height() - 30);
    };

    //注册事件
    let _initEvent = () => {
        //搜索按钮事件
        $('#search').on('click',function(){
            _loadData();
        })
    };

    //搜索事件
    let _loadData = () => {
        //搜索条件
        let param = {};
        param.code = $('#course_code').val();
        param.name = $('#course_name').val();
        param.college = $('#course_college').val();
        param.teacher = $('#course_teacher').val();
        //调用接口搜索加载表格

        //模拟搜索事件
        if(param.code === '107'){
            let simulationData =  [
                {
                    id : 1,
                    code : 'B1400107',
                    name : '物理实验A1',
                    college : '物理科学与技术学院',
                    place : '崇理楼410',
                    time : '周三下午7-8节',
                    property : '必修课',
                    teacher : '李云',
                    credit : 3
                }];
            $('#courses_table').bootstrapTable('load',simulationData);
        }else if (param.code === '203'){
            let simulationData =  [
                {
                    id : 2,
                    code : 'B1400203',
                    name : '化学实验A1',
                    college : '环境工程与化学学院',
                    place : '环化楼320',
                    time : '周一7-8节；周四3-4节',
                    property : '专业选修课',
                    teacher : '王健',
                    credit : 1
                }];
            $('#courses_table').bootstrapTable('load',simulationData);
        }else if (param.code === '019'){
            let simulationData =  [
                {
                    id : 3,
                    code : 'B1400019',
                    name : '普通生物学实验A',
                    college : '生命科学与技术',
                    place : '生命学院204',
                    time : '周二5-6节',
                    property : '必修课',
                    teacher : '吴松',
                    credit : 2
                }];
            $('#courses_table').bootstrapTable('load',simulationData);
        }else if (param.code === ''){
            let data = [
                {
                    id : 1,
                    code : 'B1400107',
                    name : '物理实验A1',
                    college : '物理科学与技术学院',
                    place : '崇理楼410',
                    time : '周三下午7-8节',
                    property : '必修课',
                    teacher : '李云',
                    credit : 3
                },{
                    id : 2,
                    code : 'B1400203',
                    name : '化学实验A1',
                    college : '环境工程与化学学院',
                    place : '环化楼320',
                    time : '周一7-8节；周四3-4节',
                    property : '专业选修课',
                    teacher : '王健',
                    credit : 1
                },{
                    id : 3,
                    code : 'B1400019',
                    name : '普通生物学实验A',
                    college : '生命科学与技术',
                    place : '生命学院204',
                    time : '周二5-6节',
                    property : '必修课',
                    teacher : '吴松',
                    credit : 2
                }
            ];
            $('#courses_table').bootstrapTable('load',data);

        }else{
            ibcpLayer.ShowMsg('没有匹配的数据！')
        }
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