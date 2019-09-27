/**
 * Created by WangGuoyan on 2017/2/10.
 */
/** JavaScript Document */

var getServerTimePath = serverPath + "time/getTime";

//格式化时间
var ibcpDateFormat = function(){
    //获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    //将月、日转为两位数字表示
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    //获取当前时间
    this.FormatDate = function(format, source){
        var fomArr = format.split(" ");
        var monthFomSym = format.indexOf("yyyy") == 0 ? format.charAt(4) : null;
        var dateFomSym = format.indexOf("yyyy") == 0 && format.indexOf("MM") > -1 ? format.charAt(7) : null;
        if(source){

        }else{
            return year + monthFomSym + month + dateFomSym + strDate;
        }
    };

    //获取服务器时间
    this.getServerDate = function(format,callback) {
        var datas = {"str": format};
        ibcpAjax.Select(getServerTimePath, datas, true, function(result){
            dateGet = result.data;
            callback(dateGet);
        });
    };

    //计算时间差
    this.getTimeDifferencen = function(sTm, eTm, format){
        var $sTm = new Date(sTm);
        var $eTm = new Date(eTm);
        var difference = ($eTm - $sTm) / 1000;
        var s = parseInt(difference % 60);
        var m = parseInt(difference / 60 % 60);
        var h = parseInt(difference /(60 * 60) % 24);
        var result = h + ':' + m + ':' + s;
        return result;
    }
};