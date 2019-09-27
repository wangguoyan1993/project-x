/**
 * Title    : 用户管理
 * Desc     :
 * version  : 0.1
 * History  : 2018/5/29 by Mr.Wang
 *
 */

/**
 * 用户类型表格翻译
 * @param value
 * @param row
 * @param index
 * @returns {*}
 */
window.userTypeFormatter = function(value, row, index){
    //用户类型反射
    let userTypes = {
        '1' : '管理员',
        '2' : '教师',
        '3' : '学生'
    };

    return userTypes[value];
};

/**
 * 用户管理总类
 * @type {{init}}
 */
let userManage = (function(){
    let $userTable = $('#user_table');                  //表格
    let $userAddBtn = $('#user_add_button');            //新增用户按钮
    let $userDeleteBtn = $('#user_delete_button');      //删除用户按钮

    /**
     * 显示表格
     */
    function showTable(){
        //查询用户数据接口地址
        let getUserPath = `${serverPath}users/queryUsers`;

        //调用接口查询用户信息数据
        ibcpAjax.Select(getUserPath, '', true, (result)=>{
            if(result){
                let data = result.data;
                if(typeof(data) === 'string'){
                    data = JSON.parse(data);
                }

                if(data.length > 0){
                    $userTable.bootstrapTable('load', data);
                }
            }
        });
    }

    /**
     * 新增用户方法
     * @private
     */
    function _addNewUser(){
        let index = ibcpLayer.ShowDiv('user-add.html','新增用户','400px','390px',()=>{
            let $name = $('#name');
            let $account = $('#account');
            let $password = $('#password');
            let $password1 = $('#password_again');
            let $type = $('#type');
            let $confirmBtn = $('#confirm_btn');
            let $cancelBtn = $('#cancel_btn');

            //确认按钮事件
            $confirmBtn.on('click', ()=>{
                let name = $name.val();
                let account = $account.val();
                let password = $password.val();
                let password1 = $password1.val();
                let type = $type.val();

                //检查所有必填项
                let $notNulls = $('.not-null');
                for(let i = 0; i < $notNulls.length; i++){
                    let $cur = $notNulls[i];
                    if(!$cur.value){
                        ibcpLayer.ShowTips('必填项！', $($cur));
                        return;
                    }
                }

                if(password === password1){
                    let addPath = `${serverPath}users/addUser`;
                    let param = {
                        userName : name,
                        number : account,
                        userType : type,
                        password : password
                    };
                    ibcpAjax.Insert(addPath, param, true, (result)=>{
                        if(result){
                            let tData = result.data;

                            ibcpLayer.ShowOK(tData);

                            ibcpLayer.Close(index);

                            //刷新页面
                            showTable();
                        }
                    })
                }else{
                    ibcpLayer.ShowTips('请核对密码！', $password1);
                }
            });

            //关闭页面
            $cancelBtn.on('click', ()=>{
                ibcpLayer.Close(index);
            });
        });
    }

    /**
     * 事件注册方法
     */
    function eventInit(){
        //新增用户
        $userAddBtn.on('click', ()=>{
            _addNewUser();
        });

        $userDeleteBtn.on('click', ()=>{
            let curData = $userTable.bootstrapTable('getSelections')[0];
            if(curData){
                ibcpLayer.ShowConfirm('是否删除当前数据？', ()=>{
                    let account = curData.number;
                    let delPath = `${serverPath}users/deleteUser`;
                    let param = {
                        account : account
                    };
                    //调用接口删除数据
                    ibcpAjax.Insert(delPath, param, true, (result)=>{
                        if(result){
                            let data = result.data;
                            ibcpLayer.ShowOK(data);
                            showTable();
                        }
                    });
                });
            }
        })
    }

    /**
     * 初始化方法
     */
    function init(){
        showTable();
        eventInit();
    }

    return {
        init : init
    }
})();

$(function(){
    userManage.init();
});