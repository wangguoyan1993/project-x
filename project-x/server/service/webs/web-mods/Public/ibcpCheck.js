/**
 * Created by liyuanquan on 2017/4/22.
 */
var ibcpCheck = (function() {
    function CheckFormat(datas,callback) {
        var url = serverPath + "foramt/formatCheck";
        var params = {
            "valueList":JSON.stringify(datas)
        };

        ibcpAjax.Select(url,params,true,function(result) {
            var datas = result.data;
            if(datas.length>0) {
                for(var i=0;i<datas.length;i++) {
                    var CallBackParams = result.data[i];
                    var ErrorDesc = CallBackParams["errorDesc"];
                    var CallBackDOM = $("#" + CallBackParams["dom"]);

                    if(CallBackParams) {
                        ibcpLayer.ShowTips(ErrorDesc,CallBackDOM);
                        return;
                    }
                }
            }else if(callback){
                callback();
            }
        });
    }

    // 给外部接口
    return {
        Format : CheckFormat
    }
})();



/**
 *@description:检查必填对象
 *@author:tudecai
 */
 var MustInput = (function(){

     var validate = {
         //普通input
         commonInput : function(dom,eMsg){
            var value = dom.attr("pvVal"),
                ret = false;
            //如果是空，弹出提示信息，返回false,否则返回true
             checkMustInput(value,dom) ? showTips(eMsg,dom) : ret = true;
            return ret;
         },
         stageType : function(dom,eMsg){
             var valObj = JSON.parse(dom.attr("pvVal"));
             var ret = false;
             if(checkMustInput(valObj,dom)){
                 showTips(eMsg,dom);
             }
             else {
                 var procssTime = valObj.procssTime;
                 //如果是空，弹出提示信息，返回false,否则返回true
                 checkMustInput(procssTime,dom) ? showTips(eMsg,dom) : ret = true;
             }
             return ret;
         },
         timeInterval : function(dom,eMsg){
             var valObj = JSON.parse(dom.attr("pvVal"));
             var ret = false;
             if(checkMustInput(valObj,dom)){
                 showTips(eMsg,dom);
             }
             else {
                 var timeInterval = valObj.timeInterval;
                 //如果是空，弹出提示信息，返回false,否则返回true
                 checkMustInput(timeInterval,dom) ? showTips(eMsg,dom) : ret = true;
             }
             return ret;
         },
         Weighing : function(dom,eMsg){
             var value = dom.attr("pvVal"),
             ret = false;
             //如果是空，弹出提示信息，返回false,否则返回true
             if(value == 1){
                 ret = true;
             }else {
                 haveDeviation(dom) ? (ret = true) : showTips(eMsg,dom);
             }
             return ret;
         },
         matSend : function(dom,eMsg){
             var value = dom.attr("pvVal"),
                 ret = false;
             //如果是空，弹出提示信息，返回false,否则返回true
             if(value == 1){
                 ret = true;
             }else {
                 haveDeviation(dom) ? (ret = true) : showTips(eMsg,dom);
             }
             return ret;
         },
         matFeed : function(dom,eMsg){
             var value = dom.attr("pvVal"),
                 ret = false;
             //如果是空，弹出提示信息，返回false,否则返回true
             if(value == 1){
                 ret = true;
             }else {
                 haveDeviation(dom) ? (ret = true) : showTips(eMsg,dom);
             }
             return ret;
         },
         matSuppFeed:function (dom,eMsg) {
             var value = dom.attr("pvVal"),
                 ret = false;
             //如果是空，弹出提示信息，返回false,否则返回true
             if(value == 'N/A'){
                 ret = true;
             }else {
                 value = JSON.parse(value);
                 if(value['need'] && !value['success']){
                     haveDeviation(dom) ? (ret = true) : ibcpLayer.ShowMsg(eMsg);
                 }else {
                     ret = true;
                 }
             }
             return ret;
         },
         checkWeighing : function (dom,eMsg) {
             var value = dom.attr("pvVal"),
                 ret = false;
             //如果是空，弹出提示信息，返回false,否则返回true
             if(value == 2){
                 ret = true;
             }else {
                 haveDeviation(dom) ? (ret = true) : showTips(eMsg,dom);
             }
             return ret;
         },
         event : function (dom,eMsg) {
             var value = dom.attr("pvVal"),
                 ret = false;
             //如果是空，弹出提示信息，返回false,否则返回true
             if(value.indexOf("N/A") == -1){
                 ret = true;
             }else {
                 haveDeviation(dom) ? (ret = true) : showTips(eMsg,dom);
             }
             return ret;
         }
     }

     //检查非空
     var isNonEmpty = function(value){
         if(value === "" || value === null || value === "N/A" || value === undefined){
             return true;
         }
         return false;
     }


     /**
      *@description:检查是否已经录入偏差
      *@author:tudecai
      */
      function haveDeviation(dom){
         var pId = dom.attr('pvpracticeid');
         var param = {pvPracId:pId},
             url = serverPath + 'deviation/findDeviationId';
         var have = false;
         ibcpAjax.Select(url,param,false,function (result) {
            var data = result.data;
            if(data == 1){
                have = true;
            }
         },true);
         return have;
      };

    /**
     *@description:检查方法
     *@author:tudecai
     */
    function checkMustInput(value,dom){
        var isEmpty = isNonEmpty(value);
        var haveDev = haveDeviation(dom);
        return isEmpty && !haveDev;
    };

     /**
      *@description:提示框 带录入偏差按钮功能
      *@author:tudecai
      */
      var showTips = function(eMsg,dom,noneDev){
          var pvPracticeId = dom.attr('pvPracticeId');
          var msg = eMsg;

         scrollToVisibleArea(dom);

          //noneDev表示不需要录入偏差
          if(!noneDev){
              msg += '<span onclick="MustInput.addDevition('+ pvPracticeId +')" style="color: red;font-weight: bold;margin-left: 15px;cursor: pointer">点我录入偏差</span>';
          }
          ibcpLayer.ShowTips(msg,dom);
      };

      /**
       *滚动到可视区域
       *@author:tudecai
       */
       function scrollToVisibleArea(dom){
            var domTop = dom.offset().top,
                currentScroll =  $(document).scrollTop();

            if(currentScroll >= domTop){
                $('html, body').animate({
                    scrollTop:  (domTop - 100)
                }, 300);
            }
       };

     /**
      *@description:录入偏差
      *@author:tudecai
      */
      var addDeviatonForPV = function(pvPracticeId){

         DeviationOperate.clientAdd(stepPracId,function () {
         },pvPracticeId);
      };


     //缓存校验对象
    var cacheArr = [];

     //添加校验对象方法,传入类型，dom节点，错误提示信息
    var addValidateObj = function(dom,errMsg,type){
        if(type === "" || type === undefined || type === null){
            type = "commonInput";
        }

        //添加缓存
        var cacheFunction = function () {
            return validate[type].call(null,dom,errMsg);
        }
        cacheArr.push(cacheFunction);
    }

    //开始遍历校验
    var startValidate = function(){
        var isPass = true;
        $.each(cacheArr,function (i,validateFun) {
            //如果返回false,说明有空值
            var ret = validateFun();
            if(!ret){
                isPass = false;
                return false;
            }
        })
        return isPass;
    }

    //外部接口
    return{
        add : addValidateObj,
        start : startValidate,
        addDevition : addDeviatonForPV
    }
 })();
