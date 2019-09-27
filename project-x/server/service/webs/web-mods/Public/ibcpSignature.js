/**
 * Created by Oswald on 2017/5/25.
 */

/**
 *@description:签名模块
 *@author:tudecai
 */
var ibcpSign = (function(){
    var _sigDefine = {
            "type" : 0, //签名类型 0单人 1双人
            "signSelf" : 0, //0可以不是本人 1本人签名
            "remark" : 0, //签名备注 1必填 0不必
            "keyboard" : false //是否需要软键盘
        },
        _userGp1 = [], //用户组1成员数组
        _ug1Users = {}, //用户组1信息
        _userGp2 = [], //用户组2成员数组
        _ug2Users = {}; //用户组2成员信息

    var _authId = 0;

    var callbackFun = undefined,
        divIndex = -1;

    /**
     *@description:获取签名数据
     *@author:tudecai
     */
    function GetSignatureDatas(auId){
        var url = serverPath + 'signature/querySignatureDefinition',
            param = {"aid":auId};
        ibcpAjax.Select(url,param,true,function(result){
            //缓存用户
            CacheUsers(result);
            //显示
            ShowSignPage();
        });

    };

    /**
     *@description:缓存用户
     *@author:tudecai
     */
    function CacheUsers(data) {
        _sigDefine.type = data.type;
        _sigDefine.signSelf = data.signself;
        _sigDefine.remark = data.remark;
        _sigDefine.keyboard = data.keyboard;
        $.extend(_sigDefine,data.sign);

        //用户组1
        var userGroup1 = data.userGroup1;
        _userGp1.length = 0;//先清空数据,防止重复添加
        $.each(userGroup1,function(i,ug){
            var ugObj = {};
            ugObj.id = ug.id;
            ugObj.name = ug.name;
            ugObj.code = ug.code;
            _userGp1.push(ugObj);


            var users = ug.users.map(function (user) {
                user.ugId = ug.id;
                return user;
            });
            //用户组成员 用户组id(key)---成员数组users(value)
            _ug1Users[ug.id] = users;
        })

        //用户组2
        var userGroup2 = data.userGroup2;
        _userGp2.length = 0;//先清空数据,防止重复添加
        $.each(userGroup2,function(i,ug){
            var ugObj = {};
            ugObj.id = ug.id;
            ugObj.name = ug.name;
            ugObj.code = ug.code;
            _userGp2.push(ugObj);

            //用户组成员 用户组id(key)---成员数组users(value)
            var users = ug.users;
            _ug2Users[ug.id] = users;
        })

    }

    /**
     *@description:判断单双人签名 显示画面
     *@author:tudecai
     */
    function ShowSignPage() {
        var type = _sigDefine.type;
        var title = _sigDefine.name;
        var keyboard = _sigDefine.keyboard;

        //单人签名
        if(type == 0){
            var html = 'Sign.html',
                width = '360px',
                height = '370px';

            if(keyboard){
                width = '770px';
                height = '470px';
                html = 'signature-with-keyboard.html';
            }

            html = getRootPath() + '/WebUI/Public/' + html;

            divIndex = ibcpLayer.ShowDiv(html,title,width,height,function(){
                ShowSingleSignData();
                defaultShowCurrentUser();
                //绑定按钮事件
                BindBtnEvents();

                if(keyboard){
                    initKeyBoard();
                }
                $("#inputPWD1").focus();
            });
        }
        //双人签名
        else if(type == 1){
            var html = 'DoubleSignature.html',
                width = '700px',
                height = '405px';

            if(keyboard){
                width = '770px';
                height = '625px';
                html = 'signature-with-keyboard-double.html';
            }

            html = getRootPath() + '/WebUI/Public/' + html;
            divIndex = ibcpLayer.ShowDiv(html,title, width, height,function () {
                ShowSingleSignData();
                ShowDoubleSignData();
                defaultShowCurrentUser();

                //绑定签名一按钮事件
                BindFirstSignBtnEvents();

                //绑定按钮事件
                BindBtnEvents();

                if(keyboard){
                    initKeyBoard();
                }
                $("#inputPWD1").focus();
            });
        }
        else{
            ibcpLayer.ShowMsg("未找到签名信息，请检查对应权限的签名配置！");
        }

    }

    /**
     *@description:绑定按钮事件
     *@author:tudecai
     */
    function BindBtnEvents(){
        //确认按钮事件
        $("#btnSignOk").click(function(){
            var param = GetSignDatasFromPage();//判断必填，获取数据

            //如果需要判断重复签名人
            //判断签名人是否已经签过名
            //用于执行页面，多个签名按钮
            if(isCheckSigned){
                var isRepeat = isRepeatSignature(param);
                if(isRepeat){
                    return;
                }
            }

            if(param){
                SignatureServer(param);
            }
        });

        //取消按钮事件
        $("#btnSignCancel").click(function(){
            Close();
        });
    };

    /**
     *@description:绑定按钮事件
     *@author:tudecai
     */
    function BindFirstSignBtnEvents(){
        //签名一 按钮事件
        $("#btnSignFirst").click(function(){
            //验证签名人一账号密码
            var user1 = getFirstUserDataFromPage();
            if(user1){
                validateFirstUser(user1,function () {
                    $("#btnSignFirst").attr('disabled',true);
                    $("#btnSignFirstReset").attr('disabled',false);
                    $("#btnSignOk").attr('disabled',false);

                    $("#selectUG1").attr("disabled",true);
                    $("#selectUsers1").attr("disabled",true);
                    $("#inputPWD1").attr("readonly",true);
                    $("#inputComment1").attr("readonly",true);
                })
            }
        });

        //签名一 重置按钮事件
        $("#btnSignFirstReset").click(function(){
            $("#btnSignFirst").attr('disabled',false);
            $("#btnSignFirstReset").attr('disabled',true);
            $("#btnSignOk").attr('disabled',true);
            $("#inputPWD2").val("");

            $("#selectUG1").attr("disabled",false);
            $("#selectUsers1").attr("disabled",false);
            $("#inputPWD1").attr("readonly",false);
            $("#inputComment1").attr("readonly",false);
        });
    };

    /**
     *@description:验证用户1账号密码
     *@author:tudecai
     */
    function validateFirstUser(user,callback){
        var url = serverPath + 'users/checkUser';
        ibcpAjax.Select(url,user,true,function (result) {
            ibcpLayer.ShowOK("签名一成功!");
            if(typeof callback === 'function'){
                callback();
            }
        })
    };

    /**
     *@description:显示单人签名数据
     *@author:tudecai
     */
    function ShowSingleSignData(){
        var meaning = _sigDefine.meaning;
        //签名含义
        $("#inputSigMeaning").val(meaning);
        //签名组1
        InitUserGroupSelect(_userGp1,$("#selectUG1"));
        //签名人
        UpdateUsersDataOne();

        //改变签名组事件
        $("#selectUG1").change(function(){
            //更新签名人
            UpdateUsersDataOne();

            //如果是双人签名 保证签名人2不显示签名人1
            if(_sigDefine.type == 1){
                UpdateUsersDataTwo();//重新加载签名人二
            }

        })

        //默认显示当前登录人
        // defaultShowCurrentUser();

        //备注是否必填
        var remark = _sigDefine.remark;
        if(remark == 1){
            $("#inputComment1").attr("placeholder","必填");
        }

    };

    /**
     *@description:默认显示当前登录人
     *@author:tudecai
     */
    function defaultShowCurrentUser(){
        var account = getCookie("account");
        for(var ugId in _ug1Users){
            var userArr = _ug1Users[ugId];
            userArr.forEach(function (user) {
                if(user.account == account){
                    $("#selectUG1").val(ugId);
                    $("#selectUG1").change();
                    $("#selectUsers1").val(account);
                    return;
                }
            })
        }

    };
    
    /**
     *@description:显示双人签名数据
     *@author:tudecai
     */
    function ShowDoubleSignData(){
        var meaning2 = _sigDefine.meaning2;
        //签名含义
        $("#inputSigMeaning2").val(meaning2);
        //签名组1
        InitUserGroupSelect(_userGp2,$("#selectUG2"));
        //签名人
        UpdateUsersDataTwo();

        //改变签名组事件
        $("#selectUG2").change(function(){
            //更新签名人
            UpdateUsersDataTwo();
        })

        //改变签名人1事件 保证签名人2不显示签名人1
        $("#selectUsers1").change(function(){
            //更新签名人
            UpdateUsersDataTwo();
        })

        //备注是否必填
        var remark = _sigDefine.remark;
        if(remark == 1){
            $("#inputComment2").attr("placeholder","必填");
        }
    };

    /**
     *@description:初始化用户组下拉框方法
     *@author:tudecai
     */
    function InitUserGroupSelect(ugData,$select){
        $select.empty()
        var ugs = ""
        $.each(ugData,function(i,ug){
            var ugId = ug.id,
                ugName = ug.name;
            ugs += "<option value='" + ugId + "'>" + ugName + "</option>";
        })
        $select.append(ugs);
    };

    /**
     *@description:初始化用户下拉框方法
     *@author:tudecai
     */
    function InitUsersSelect(usersData,$select){
        $select.empty();
        var users = "";
        $.each(usersData,function(i,user){
            var account = user.account,
                name = user.name;
            users += "<option value='" + account + "'>" + name + "(" + account + ")</option>";
        })

        $select.append(users);
    };

    /**
     *@description:改变用户1数据
     *@author:tudecai
     */
    function UpdateUsersDataOne(){
        //签名人
        var ugId = $("#selectUG1").val();
        var users = _ug1Users[ugId];
        InitUsersSelect(users,$("#selectUsers1"));
        $("#inputPWD1").val("");
    };

    /**
     *@description:改变用户2数据
     *@author:tudecai
     */
    function UpdateUsersDataTwo(){
        //签名人
        var ugId = $("#selectUG2").val(),
            users = _ug2Users[ugId],
            user1 =$("#selectUsers1").val();

        //过滤掉签名人一
        var users2 = users.filter(function (userObj) {
            if(userObj.account != user1){
                return true;
            };
        });

        //渲染下拉框
        InitUsersSelect(users2,$("#selectUsers2"));
        $("#inputPWD2").val("");
    };

    /**
     *@description:获取签名一页面数据
     *@author:tudecai
     */
    function getFirstUserDataFromPage(){
        var account = $("#selectUsers1").val(),name = $("#selectUsers1").find("option:selected").text(),
            pwd = $("#inputPWD1").val(),
            comment = $("#inputComment1").val();
        if(account == null || account == undefined){
            ibcpLayer.ShowTips("请选择用户!",$("#selectUsers1"));
            return false;
        }

        if(pwd == ""){
            ibcpLayer.ShowTips("请输入密码!",$("#inputPWD1"));
            return false;
        }

        if(comment == "" && _sigDefine.remark == 1){
            ibcpLayer.ShowTips("请输入备注!",$("#inputComment1"));
            return false;
        }

        return {
            "account" : account,
            "password" : pwd,
            "comment" : comment
        }
    };

    /**
     *@description:获取签名页面数据
     *@author:tudecai
     */
    function GetSignDatasFromPage(){
        //获取用户一账号密码
        var userOne = getFirstUserDataFromPage();
        if(!userOne){
            return false;
        }

        var ugId = $("#selectUG1").val(),
            name = $("#selectUsers1").find("option:selected").text();

        var user1 = $.extend(true,userOne,{
            "name" : name,
            "ugId" : ugId
        })

        //如果是双人签名
        var user2 =  {};
        if(_sigDefine.type == 1){

            var ugId2 = $("#selectUG2").val(),
                account2 = $("#selectUsers2").val(),
                name = $("#selectUsers2").find("option:selected").text(),
                pwd2 = $("#inputPWD2").val(),
                comment2 = $("#inputComment2").val();

            if(account2 == null || account2 == undefined){
                ibcpLayer.ShowTips("请选择用户!",$("#selectUsers2"));
                return false;
            }
            if(pwd2 == ""){
                ibcpLayer.ShowTips("请输入密码!",$("#inputPWD2"));
                return false;
            }

            if(comment2 == "" && _sigDefine.remark == 1){
                ibcpLayer.ShowTips("请输入备注!",$("#inputComment2"));
                return false;
            }

            user2 = {
                "account" : account2,
                "name" : name,
                "password" : pwd2,
                "comment" : comment2,
                "ugId" : ugId2
            }
        }

        return {
            "sid" : _sigDefine.id,
            "user1" : user1,
            "user2" : user2
        }
    };
    
    /**
     *@description:判断是否必须由本人签名
     *@author:tudecai
     */
    function MustLoggedUserSig(){
        if(_sigDefine.signSelf == 1){
            //从cookie获取当前登录用户
            var user = getCookie("account");
            var sUer = $("#selectUsers1").val();
            var msg = _sigDefine.type == 0 ? "必须由当前登录人签名!" : "第一签名必须由当前登录人签名";
            if(user != sUer){
                ibcpLayer.ShowMsg(msg)
                return false;
            }
            return true;
        }
        return true;

    };

    /**
     *@description:确认签名调用服务
     *@author:tudecai
     */
    function SignatureServer(params){
        var url = serverPath + 'signature/confirms';
        ibcpAjax.Select(url, params, true, function(result){
            Close();
            var rId = result.data.id;
            callbackFun(rId);
        });
    };

    /**
     *@description:关闭签名窗
     *@author:tudecai
     */
    function Close(){
        ibcpLayer.Close(divIndex);
        _userGp1.length = 0;
        _userGp2.length = 0;
        _ug1Users = {};
        _ug2Users = {};;
        isCheckSigned = false;
        _authId = 0;
    };

    //已签名的用户id数组
    var signedAcountArr = [];

    //是否需要判断签名人不重复
    var isCheckSigned = false;

    /**
     *@description:判断是否有重复签名
     *@param:uers
     *@author:tudecai
     */
    function isRepeatSignature(users){
        var acount1 = users.user1.account,
            name1 = users.user1.name;

        //如果是单人签名
        if(_sigDefine.type == 0){
            var isRe = isRepeat(acount1,name1);
            return isRe;
        }

        //如果是双人签名
        if(_sigDefine.type == 1){
            var acount2 = users.user2.account,
                name2 = users.user2.name;

            if(isRepeat(acount1,name1) || isRepeat(acount2,name2)){
                return true;
            }
            else {
                return false;
            }
        }
    };

    /**
     *@description:判断是否重复方法
     *@param:acount 当前选中的用户账号
     *@param:acount 当前选中的用户名
     *@author:tudecai
     */
    function isRepeat(acount,name){
        var boolean = false;
        for (var i = 0; i < signedAcountArr.length; i++){
            var uAcount = signedAcountArr[i];
            if(acount == uAcount){
                var msg = "用户: " + name + " 已签过名!";
                ibcpLayer.ShowMsg(msg);
                boolean = true;
                return boolean;
            }
        }
    };

    /**
     *@description:pv多人签名入口 作用：pv中一个块多个签名按钮时，判断签名人不能重复
     *@param:signed 已签名的用户id
     *@param:authId 权限id
     *@param:callback 回调函数
     *@author:tudecai
     */
    function signatureForPV(signed,authId,callback){
        signedAcountArr = signed;
        isCheckSigned = true;
        callbackFun = callback;
        _authId = authId;
        GetSignatureDatas(authId,callback);
    }

    /**
     *@description:普通签名入口
     *@param:authId 权限id
     *@param:callback 回调函数
     *@author:tudecai
     */
    function signatureForNormal(authId,callback){
        isCheckSigned = false;
        callbackFun = callback;
        _authId = authId;
        GetSignatureDatas(authId,callback);
    }

    /**
     *@description:软键盘输入初始化
     *@author:tudecai
     */
    function initKeyBoard() {
        $('.need-keyboard').focus(function () {
            $('.keyboard-target').removeClass('keyboard-target');
            $(this).addClass('keyboard-target');
        })

        var shift = false,
            capslock = false;

        $('#keyboard-ins li').click(function(){
            var target = $(".keyboard-target");
            if(target.length == 0){
                return;
            }

            var $this = $(this),
                character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

            // Shift keys
            if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
                $('.letter').toggleClass('uppercase');
                $('.symbol span').toggle();

                shift = (shift === true) ? false : true;
                capslock = false;
                return false;
            }

            // Caps lock
            if ($this.hasClass('capslock')) {
                $('.letter').toggleClass('uppercase');
                capslock = true;
                return false;
            }

            // Delete
            if ($this.hasClass('backspace')) {
                var targetVal = target.val();

                target.val(targetVal.substr(0, targetVal.length - 1));
                target.focus();
                return false;
            }

            // Special characters
            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('tab')) character = "\t";
            if ($this.hasClass('return')) character = "\n";

            // Uppercase letter
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Remove shift once a key is clicked.
            if (shift === true) {
                $('.symbol span').toggle();
                if (capslock === false) $('.letter').toggleClass('uppercase');

                shift = false;
            }

            target.val(target.val() + character);

            target.focus();
        });
    }

    return{
        CallSign : signatureForNormal,
        callPVSign : signatureForPV
    }

})();