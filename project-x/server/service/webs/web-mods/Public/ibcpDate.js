/**
 * Created by Oswald on 2017/4/27.
 */

var ibcpDate = (function(){

    //标准化日期，小于10的月份或者天，前面补0
    function StandardizationDate(date){
        var current = date || new Date();
        var year = current.getFullYear(),
            month = current.getMonth() + 1,
            day = current.getDate();
        month < 10 ? month = "0" + month : month;//小于10，前面加0.如02
        day < 10 ? day = "0" + day : day;//小于10，前面加0.如04
        return [year,month,day].join("-");//返回 2017-04-27
     }

    //标准化时间，小于10，前面补0
    function StandardizationTime(date){
        var current = date || new Date();
        var h = current.getHours(),
            m = current.getMinutes(),
            s = current.getSeconds();
        h < 10 ? h = "0" + h : h;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;
        return [h,m,s].join(":");
    }
    //日期减一，时间为 23:59:59
    function changeTime(strDate,dayi){
        var dt ;

        if(typeof(strDate)  == "string" ){
            dt= new Date(strDate.replace(/-/g,'\/'));
            dt.setDate(dt.getDate() + dayi);

        }else{
            dt = strDate;
            dt.date= dt.date-1;
            dt = new Date(dt);
        }
       var  current= format(dt);
        //时间 为23:59:59

       var day = [];
       day = current.split(" ");
       var time = [];
        time = day[1].split(":");
            time [0] = 23;
            time [1] = 59;
            time [2] = 59;
            day[1]= time.join(":");
        return day.join(" ");
    }

    //获取当前日期
    function GetCurrentDate(){
        return StandardizationDate();
    }

    /**
     * 将日期转成json对象
     * @param date Date()对象 如果未传入，默认为当前的日期时间
     * @returns {{year: number, month: number, date: number, hours: number, minutes: number, seconds: number}}
     * @author tudecai
     */
    function getDateObj(date) {
        var _date = date || new Date();

        var year = _date.getFullYear(),  //获取年--->2017
            month = _date.getMonth(),  //获取月--->9（月份是0~11）
            day = _date.getDate(),  //获取日--->22
            hours = _date.getHours(), //获取小时 ---> 18
            minutes = _date.getMinutes(), // 获取分钟 ---> 21
            seconds = _date.getSeconds(); //获取秒 --->9

        return{
            year : year,
            month : month,
            date : day,
            hours : hours,
            minutes : minutes,
            seconds : seconds
        }
    }

    //获取当前时间
    function GetCurrentTime() {
        return StandardizationTime();
    }

    //获取当前时间之前x天的日期,参数“天”
    function GetDateTimeBeforeCurrent(days) {
        var date = StandardizationDate(),
            daysInt = parseInt(days),
            time = " " + StandardizationTime();
        return AddSubtractDays(date,-daysInt) + time;
    }

    //获取当前日期相差x天的日期
    function GetDateDiffersCurrent(days) {
        var date = StandardizationDate(),
            daysInt = parseInt(days);
        return AddSubtractDays(date,daysInt);
    }

    //获取指定日期相差x天的日期
    function GetDateDiffersDate(date,day) {
        var daysInt = parseInt(day);
        return AddSubtractDays(date,daysInt);
    }

    //加减天数
    function AddSubtractDays(date,days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        return StandardizationDate(d);
    }

    //指定时间日期的后几天的时间日期
    function GetDateTimeAfterDays(dateTime,days) {
        var dateT = dateTime.split(" "),
            date = dateT[0],
            time = dateT[1];
        var newDate = AddSubtractDays(date,parseInt(days));
        return [newDate,time].join(" ");
    }

    //获取当前日期时间
    function GetCurrentDateTime() {
        var date = GetCurrentDate(),
            time = StandardizationTime();
        return date + " " + time;
    }

    //为指定时间加减小时 取决于 hour 的正负值
    function AddHours(strDate, hour) {
        var dt = new Date(strDate.replace(/-/g,'\/'));
        var diffMS = 1000*60*60*hour;
        dt.setTime(dt.getTime() + diffMS);
        return format(dt);
    }

    //为指定时间加减天数 取决于 day 的正负值
    function AddDays(strDate, day) {
        var dt = new Date(strDate.replace(/-/g,'\/'));
        dt.setDate(dt.getDate() + day);
        return format(dt);
    }

    //判断结束时间是否大于开始时间
    function Compare(strDateEnd, strDateStart) {
        var ret = false;
        var diff = DiffMS(strDateEnd, strDateStart);
        if(diff > 0){
            return true;
        }
        return ret;
    }

    //计算2个时间的毫秒差
    function DiffMS(strDateEnd, strDateStart) {
        var diff = 0;
        var start = new Date(strDateStart);
        var end = new Date(strDateEnd);
        diff = end - start;
        return diff;
    }

    //根据格式返回选择日期时间类型
    function getTypeByFormat(format) {
        var str = format,
            strArr = str.split(' ');

        //判断空格分隔后数组长度: 1(只是日期或者时间) 2（日期和时间）
        if(strArr.length == 2){
            return 'datetime';
        }
        
        //判断是否是时间: HH:mm:ss
        var isTime = judgeFormatIsTime(strArr[0]);
        if(isTime){
            return 'time';
        }

        var ymd = getYearMonthDayType(strArr[0]);
        return ymd;

    }
    
    //判断formate是否是时间
    function judgeFormatIsTime(format) {
        var timeStr = 'HH:mm:ss';
        var strI = timeStr.indexOf(format);
        if(strI >= 0){
            return true;
        }
        return false;
    }

    //判断年月日
    function getYearMonthDayType(format) {
        var formatStr = format,
            yy = 'yy',
            MM = 'MM',
            dd = 'dd';

        var indexY = formatStr.indexOf(yy),
            indexM = formatStr.indexOf(MM),
            indexD = formatStr.indexOf(dd);

        if(indexD >= 0){
            return 'date';
        }
        else if(indexY >= 0 && indexM < 0){
            return 'year';
        }
        else if(indexM >= 0){
            return 'month';
        }
        else {
            return 'date';
        }
    }

    //获取日期前后指定天数的日期 返回json对象和Date()和日期字符串 对象
    function getDateDifferSomeDay(dateTime,day) {
        if(dateTime == ''){
            return [{},new Date(),''];
        }

        var dt = new Date(dateTime.replace(/-/g,'\/'));
        dt.setDate(dt.getDate() + parseInt(day));

        var year = dt.getFullYear(),
            month = dt.getMonth(),
            date = dt.getDate(),
            hours = dt.getHours(),
            minutes = dt.getMinutes(),
            seconds = dt.getSeconds();

        var dateStr = [year,month+1,date].join('-') + ' ' + [hours,minutes,seconds].join(':');
        return [{
            year: year,
            month: month,
            date: date,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        },dt,dateStr]
    }

    //数字前置补零
    function digit(num, length, end) {
        var str = '';
        num = String(num);
        length = length || 2;
        for(var i = num.length; i < length; i++){
            str += '0';
        }
        return num < Math.pow(10, length) ? str + (num|0) : num;
    }

    /**
     * 格式化日期时间
     * @param date 需要格式化的日期时间
     * @param format 格式化格式
     * @returns {*}
     * @author tudecai
     */
    function format(date, format) {
        //将日期转为Date对象，如果转换失败，返回传入的date.
        //如果未传入date,默认取当前日期时间
        var _date = new Date(date) || new Date();
        if(String(_date) === 'Invalid Date'){
            return date;
        }

        //日期时间转成json对象
        var dateJson = getDateObj(_date);

        //y(年) M(月) d(日) H(小时) m(分) s(秒)
        var _format = format || 'yyyy-MM-dd HH:mm:ss',
            formatType = 'yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s';

        //将格式转成数组，重新组装‘yyyy-MM-dd HH:mm:ss’--->['yyyy','-','MM','-','dd',' ','HH',':','mm',':','ss'];
        var formatArr = _format.match(new RegExp(formatType + '|.', 'g'));
        formatArr.forEach(function (item,i) {
            if(/yyyy|y/.test(item)){ //年
                formatArr[i] = digit(dateJson.year, item.length);
            } else if(/MM|M/.test(item)){ //月
                formatArr[i] = digit(dateJson.month + 1, item.length);
            } else if(/dd|d/.test(item)){ //日
                formatArr[i] = digit(dateJson.date, item.length);
            } else if(/HH|H/.test(item)){ //时
                formatArr[i] = digit(dateJson.hours, item.length);
            } else if(/mm|m/.test(item)){ //分
                formatArr[i] = digit(dateJson.minutes, item.length);
            } else if(/ss|s/.test(item)){ //秒
                formatArr[i] = digit(dateJson.seconds, item.length);
            }
        })

        return formatArr.join('');
    }

    return{
        currentDate : GetCurrentDate,
        currentDateObj : getDateObj,
        currentTime : GetCurrentTime,
        currentDateTime : GetCurrentDateTime,
        dateTimeBeforeCurrent : GetDateTimeBeforeCurrent,
        dateTimeAfterDays : GetDateTimeAfterDays,
        dateDiffersCurrent : GetDateDiffersCurrent,
        dateDiffersDate : GetDateDiffersDate,
        AddHours : AddHours,
        AddDays : AddDays,
        DiffMS : DiffMS,
        Compare : Compare,
        changeTime:changeTime,
        getType : getTypeByFormat,
        dateDiffersDay : getDateDifferSomeDay,
        digit : digit,
        format : format
    };
})();