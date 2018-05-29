
/*
	@Author: MaCanglian
	@Time: 2018-05
	@Tittle: changePwd
	@Description: 修改用户密码
*/

//加载页面时运行
$(function () {
    changePwdMods.init();
});


//实验室列表显示区域功能
let changePwdMods = function () {
    //加载数据
    let _initData = () => {
        //显示用户名称
        $('#name').val(window.top.user.name);
    };

    //注册事件
    let _initEvent = () => {
        //修改密码按钮
        $('#confirm').on('click',function(){
            _change();
        })

        $('#cancel').on('click',function(){
            $('#oldPwd').val('');
            $('#newPwd').val('');
        })
    };

    //修改事件
    let _change = () => {
        //搜索条件
        let account = window.top.user.account;
        let oldPassword = $('#oldPwd').val();
        let newPassword = $('#newPwd').val();
        let param = {
            account : account,
            oldPassword : oldPassword,
            newPassword : newPassword
        };

        console.log(param);

        let url = serverPath + 'login/updatePassword';
        ibcpAjax.Insert(url,param,true,function (result) {
            console.log(result);
            if(result){
                let str = result.data;
                alert(str);
            }
        })
    };

    let init =  () => {
        _initData();
        _initEvent();
    };
    return{
        init : init,
    }
}();