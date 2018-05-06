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
    //加载页面尺寸
    let initPageSize =  () => {
        //表格区域高度
        $('#table').height($(window).height() - $('#search_area').height() - 40);
        //表格高度
        $('#courses_table').height($('#table').height() - $('.panel-heading').height() - 30);
    };

    let init =  () => {
        initPageSize();
    };
    return{
        init : init,
        pageSize : initPageSize
    }
}();