/** index.js Update By qijialin */

var myTab ={};

layui.config({

	base: 'webjar/plugins/js/'
}).use(['element', 'layer', 'navbar', 'tab'], function() {
	var element = layui.element(),
		$ = layui.jquery,
		layer = layui.layer,
		navbar = layui.navbar(),
		tab = layui.tab({
			elem: '.admin-nav-card' //设置选项卡容器
		});
	//iframe自适应
	$(window).on('resize', function() {
		var $content = $('.admin-nav-card .layui-tab-content');
		$content.height($(this).height() - 128);
		$content.find('iframe').each(function() {
			$(this).height($content.height());
		});
	}).resize();
    myTab = tab;

    //根据权限从后台获取菜单栏数据
    getNavDatasByAuth(function (navDatas) {
        //设置navbar
        navbar.set({
            elem: '#admin-navbar-side',
            data: navDatas
            //url: 'datas/nav.json'
        });
        //渲染navbar
        navbar.render();
        //监听点击事件
        navbar.on('click(side)', function(data) {
            tab.tabAdd(data.field);
        });

        //判断权限是否可以显示批指令
        showBatchOrderByAuth(navDatas);
    });


	$('.admin-side-toggle').on('click', function() {
		var sideWidth = $('#admin-side').width();
		sideWidth = Math.round(sideWidth);
		if(sideWidth === 250) {
			$('#admin-body').animate({
				left: '0'
			}); //admin-footer
			$('#admin-footer').animate({
				left: '0'
			});
			$('#admin-side').animate({
				width: '0'
			});
		} else {
			$('#admin-body').animate({
				left: '250px'
			});
			$('#admin-footer').animate({
				left: '250px'
			});
			$('#admin-side').animate({
				width: '250px'
			});
		}
	});

	//logo点击相应左侧导航栏
    $('#user_Logo').on('click', function() {
        var sideWidth = $('#admin-side').width();
        sideWidth = Math.round(sideWidth);
        if(sideWidth === 250) {
            $('#admin-body').animate({
                left: '0'
            }); //admin-footer
            $('#admin-footer').animate({
                left: '0'
            });
            $('#admin-side').animate({
                width: '0'
            });
        } else {
            $('#admin-body').animate({
                left: '250px'
            });
            $('#admin-footer').animate({
                left: '250px'
            });
            $('#admin-side').animate({
                width: '250px'
            });
        }

        /**
         *@description:调用窗口改变事件，为了触发表格宽度自适应事件
         *@author:tudecai
         */
        $(window).resize();
    });

	//手机设备的简单适配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade');
	treeMobile.on('click', function() {
		$('body').addClass('site-mobile');
	});
	shadeMobile.on('click', function() {
		$('body').removeClass('site-mobile');
	});

    // ActiveTab('WebUI/Order/BatchOrder.html','fa-stop-circle','批指令');
});

/**
 *@description:获取左边菜单栏数据
 *@author:tudecai
 */
function getNavDatasByAuth(callback){
    var uid = getCookie("uid");
    var serverUrl = serverPath + "mainMenu/getMainMenuResource/";
    ibcpAjax.Select(serverUrl,{'uid':uid},true,function(result){
		callback(result.data);
    });
};

/**
 *@description:判断权限是否可以显示批指令
 *@author:tudecai
 */
function showBatchOrderByAuth(navsData){
	if(navsData.length == 0) return;

	var navStr = JSON.stringify(navsData);
	var isHaveBatch = navStr.search(/批指令/);
	if(isHaveBatch != -1){
        ActiveTab('WebUI/Order/BatchOrder.html','fa-stop-circle','批指令');
	}
};

/**
 * 激活tab页
 * 没有的打开新的tab页
 * 已打开的切换到tab页
 * 重置url 刷新数据
 * @param url
 * @param icon
 * @param title
 * @constructor
 */
function ActiveTab(url, icon, title){
	//打开或切换到tab
	var tabData = {href: url, icon: icon, title: title};
	myTab.tabAdd(tabData);

	//找tab
	$("cite").each(function(){
		if($(this).text() == title){
			//取tab对应的id
			var tabId = $(this).next("i").attr("data-id");
			//重置对应的html url 刷新
			$("iframe[data-id= '"+tabId+"']").attr("src",url);
		}
	});
}