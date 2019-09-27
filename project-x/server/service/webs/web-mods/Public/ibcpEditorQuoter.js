/**
 * Created by Mr.Wang on 2017/9/12.
 */
var path = getRootPath();

document.write('<link href="' + path + '/webjar/bootstrap/3.3.7-1/css/bootstrap.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/bootstrap-table/bootstrap-table.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/css/mystyle.css" rel="stylesheet">');
document.write('<link href="' + path + '/webjar/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" rel="stylesheet">');
document.write('<script type="text/javascript" src="' + path + '/webjar/jquery/3.1.1/jquery.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap/3.3.7-1/js/bootstrap.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/bootstrap-table.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-table/bootstrap-table-zh-CN.min.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-tree/bootstrap-treeview.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/layer/layer.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/plugins/layDate-v5.0.3/laydate/laydateall.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/plugins/layui/layui.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/webjar/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>');

document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/sha256.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ServerPath.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcp-log.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/cookie_util.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpLayer.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpAjax.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path +  '/WebUI/Public/ibcpSignature.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpPlugin.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Version/ibcpVS.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Uom/UomChose.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/DateFormat.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpValidate.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/NumberKeyBoard.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/PV/RevisePV.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/PV/PV_Edit/PV_DateTime_Edit.js" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpAreaResize.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpAuthority.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpDate.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpSelect.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpCheck.js"></script>');
document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpAfter.js"></script>');


document.write('<script type="text/javascript" src="' + path + '/WebUI/Public/ibcpKeyboard.js"></script>');
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
    //localhostTotalPath = (localhostPath + projectName);  //webStorm调试用
    return localhostTotalPath;
}
