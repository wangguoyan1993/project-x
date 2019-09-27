/**
 * Created by Oswald on 2016/11/30.
 */

var path = getRootPath();

document.write('<link href="' + path + '/webjar/bootstrap/3.3.7-1/css/bootstrap.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/bootstrap-table/bootstrap-table.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/bootstrap-table/bootstrap-editable.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/bootstrap-select/css/bootstrap-select.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/css/mystyle.css" rel="stylesheet">');
document.write('<link href="' + path + '/web-mods/Public/ibcp.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" rel="stylesheet">');
document.write('<script type="text/javascript" src="' + path + '/webjar/jquery/3.1.1/jquery.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap/3.3.7-1/js/bootstrap.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/bootstrap-table.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/bootstrap-editable.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/bootstrap-table-editable.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/bootstrap-table-zh-CN.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/extension/bootstrap-table-row-number.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-select/js/bootstrap-select.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-select/js/i18n/defaults-zh_CN.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-tree/bootstrap-treeview.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/layer/layer.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/plugins/layDate-v5.0.3/laydate/laydateall.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/plugins/layui/layui.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>');


document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpNumberHandle.js" charset=UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpLayerToolBar.js" charset="UTF-8"></script>');

document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/sha256.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ServerPath.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcp-log.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/cookie_util.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpLayer.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpAjax.js" charset="UTF-8"></script>');
// document.write('<script type="text/javascript" src="' + path +  '/WebUI/Public/ibcpSign.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path +  '/web-mods/Public/ibcpSignature.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpPlugin.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/DateFormat.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpValidate.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/NumberKeyBoard.js"></script>');
// document.write('<script type="text/javascript" src="' + path + '/WebUI/PV/Chart/highcharts.js" charset="UTF-8"></script>');
// document.write('<script type="text/javascript" src="' + path + '/WebUI/PV/Chart/exporting.js" charset="UTF-8"></script>');
// document.write('<script type="text/javascript" src="' + path + '/WebUI/PV/Chart/highcharts-zh_CN.js" charset="UTF-8"></script>')
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpAreaResize.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpAuthority.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpDate.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpSelect.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpCheck.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/web-mods/Public/ibcpAfter.js"></script>');
function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPath = curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    var localhostTotalPath = localhostPath; //服务器用
    // localhostTotalPath = (localhostPath + projectName);  //webStorm调试用
    return localhostTotalPath;
}

