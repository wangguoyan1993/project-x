/**
 * Title    : 测试页面
 * Desc     :
 * version  : 1.0
 * Histroy  : 2018/4/10 by Mr.Wang
 *
 */

//按钮点击事件
$('#test_get').on('click', function(){
    let url = 'http://localhost:8080/api/v1/queryUsers/queryAll';
    $.ajax({
        url : url,
        type : 'GET',
        async : true,
        data : {},
        dataType : 'json',
        success : function(data, textStatus){
            showData(JSON.stringify(data));
        },
        error : function(req, textStatus, errorThrown){
            console.log(textStatus);
        }
    })
});

let showData = (data) => {
    $('#show_data').html(data);
};