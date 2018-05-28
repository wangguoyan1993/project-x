/*
	@Author: MaCanglian
	@Time: 2018-05
	@Tittle: reservation
	@Description: 预约实验室
*/

//加载页面时运行
$(function () {
    reservationMods.init();
});

//窗口自适应
$(window).resize(function(){
    reservationMods.pageSize();
});

//实验室列表显示区域功能
let reservationMods = function () {
    //加载数据
    let _initData = () => {
        // //测试数据
        // let data = [
        //     {
        //         id : 1,
        //         code : 'B1400401',
        //         name : '惠斯通电桥实验室',
        //         college : '物理科学与技术学院',
        //         place : '崇理楼401',
        //         schedule : '周二，1-3节；周三，5-7节'
        //     },{
        //         id : 2,
        //         code : 'B1400322',
        //         name : '材料化学实验室',
        //         college : '环境工程与化学学院',
        //         place : '化明楼322',
        //         schedule : '周三，1-3节；周五，1-3节'
        //     },{
        //         id : 3,
        //         code : 'B1400208',
        //         name : '微生物实验室',
        //         college : '生命科学与技术学院',
        //         place : '生命学院208',
        //         schedule : '周三，1-3节；周五，1-3节'
        //     }
        // ];
        // $('#laboratory_table').bootstrapTable('load',data);
        // //默认选中第一行
        // $('#laboratory_table').bootstrapTable('check',0);

        //正常数据：调用接口搜索数据加载表格
        let param = {};
        let url = serverPath + 'labs/queryAllLabs';
        ibcpAjax.Select(url,param,true,function (result) {
            console.log(result);
            if(result.data){
                $('#laboratory_table').bootstrapTable('load',result.data);
                //默认选中第一行
                $('#laboratory_table').bootstrapTable('check',0);
            }
        })

    };
    //加载页面尺寸
    let initPageSize =  () => {
        //表格区域高度
        $('#table').height($(window).height() - $('#search_area').height() - 40);
        // //表格高度
        // $('#laboratory_table').height($('#table').height() - $('.panel-heading').height() - 30);
    };

    //注册事件
    let _initEvent = () => {
        //搜索按钮
        $('#search').on('click',function(){
            _loadData();
        })

        //预约按钮
        $('#reservation_btn').on('click',function(){
            _reservationEvent();
        });

    };

    //搜索事件
    let _loadData = () => {
        //搜索条件
        let param = {};
        param.code = $('#laboratory_code').val();
        param.name = $('#laboratory_name').val();
        param.college = $('#laboratory_college').val();
        //调用接口搜索加载表格

        //模拟搜索事件
        //模拟搜索事件
        if(param.code === '107'){
            let simulationData =  [
                {
                    id : 1,
                    code : 'B1400107',
                    name : '物理实验A1',
                    college : '物理科学与技术学院',
                    place : '崇理楼410',
                    schedule : ''
                }];
            $('#laboratory_table').bootstrapTable('load',simulationData);
            $('#laboratory_table').bootstrapTable('check',0);
        }else if (param.code === '203'){
            let simulationData =  [
                {
                    id : 2,
                    code : 'B1400203',
                    name : '化学实验A1',
                    college : '环境工程与化学学院',
                    place : '环化楼320',
                    schedule : ''
                }];
            $('#laboratory_table').bootstrapTable('load',simulationData);
            $('#laboratory_table').bootstrapTable('check',0);
        }else if (param.code === '019'){
            let simulationData =  [
                {
                    id : 3,
                    code : 'B1400019',
                    name : '普通生物学实验A',
                    college : '生命科学与技术',
                    place : '生命学院204',
                    schedule : ''
                }];
            $('#laboratory_table').bootstrapTable('load',simulationData);
            $('#laboratory_table').bootstrapTable('check',0);
        }else if (param.code === ''){
            let data = [
                {
                    id : 1,
                    code : 'B1400107',
                    name : '物理实验A1',
                    college : '物理科学与技术学院',
                    place : '崇理楼410',
                    schedule : ''
                },{
                    id : 2,
                    code : 'B1400203',
                    name : '化学实验A1',
                    college : '环境工程与化学学院',
                    place : '环化楼320',
                    schedule : ''
                },{
                    id : 3,
                    code : 'B1400019',
                    name : '普通生物学实验A',
                    college : '生命科学与技术',
                    place : '生命学院204',
                    schedule : ''
                }
            ];
            $('#laboratory_table').bootstrapTable('load',data);
            $('#laboratory_table').bootstrapTable('check',0);
        }else{
            ibcpLayer.ShowMsg('没有匹配的数据！')
        }
    };

    //预约按钮事件
    let _reservationEvent = () => {
        let selectData = $('#laboratory_table').bootstrapTable('getSelections')[0];
        let index = ibcpLayer.ShowDiv('reservations-page.html','预约实验室', '400px', '380px',function(){
            //加载所选数据信息
            $('#code').val(selectData.code);
            $('#name').val(selectData.name);
            $('#collage').val(selectData.collage);
            $('#place').val(selectData.place);

            //确认按钮
            $('#confirm').on('click',function(){
                let uid = window.top.user.id;
                let labId = selectData.id;
                let startTime = $('#sTime').val();
                let endTime = $('#eTime').val();
                let reason = $('#reason').val();
                let param = {
                    uid : uid,
                    labId : labId,
                    startTime : startTime,
                    endTime : endTime,
                    reason : reason
                };
                let url = serverPath + 'labs/queryAllLabs';
                ibcpAjax.Select(url,param,true,function (result) {
                    console.log(result);
                    if(result.data){
                        $('#laboratory_table').bootstrapTable('load',result.data);
                        //默认选中第一行
                        $('#laboratory_table').bootstrapTable('check',0);
                    }
                })
                ibcpLayer.Close(index);
                ibcpLayer.ShowMsg('预约申请已提交！');
                //更新信息（预约信息实验室可在个人信息中看到）
            });

            //取消按钮
            $('#cancel').on('click',function(){
                ibcpLayer.Close(index);
            })
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