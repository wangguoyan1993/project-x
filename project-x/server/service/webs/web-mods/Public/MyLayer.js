/**
 * Created by Oswald on 2016/12/23.
 */
var MyLayer = (function () {
    'use strict';

    var comfirmCallBack = null;

    var thisModal = null;

    //弹出层被调用
    function Show(url,title,width,callback){


         var modalId = url.split(".")[0];

        comfirmCallBack = callback;
        PopModal(modalId,url,title,width);

    }



    //弹出
    function PopModal(modalId,url,title,width){

        var myDiv = CreateDiv().format(modalId,width,title);

        $("body").append(myDiv);
        thisModal = $("#"+modalId);


        thisModal.draggable({
            cursor:"move",
            handle:".modal-header"

        });

        thisModal.modal('show');

        $("#"+modalId+" .modal-body").children("div").load(url,comfirmCallBack);

    }

    //创建弹出层的DIV
    function CreateDiv() {

        return[
            '<div id={0} class="modal fade modal-layer"tabindex="-1" role="dialog" aria-labelledby="sigModalLabel" aria-hidden="true" data-backdrop="static">'+
            '<div class="modal-dialog">'+
            '<div class="modal-content" style="width: {1}">'+
            '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span></button>'+
            '<h4 class="modal-title" style="font-weight: bold">{2}</h4>'+
            '</div>'+
            '<div class="modal-body"><div></div></div>'+
            '</div>'+
            '</div>'+
            '</div>'
        ].join('');
    }

    // it only does '%s', and return '' when arguments are undefined
    var sprintf= function (str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };

    //字符串方法 format
    String.prototype.format = function () {
        if (arguments.length == 0) return this;
        for (var s = this, i = 0; i < arguments.length; i++)
            s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return s;
    }

    //画面绑定的事件
    $(function(){
        $("body").on("show.bs.modal","#myModal",function(){

            //var winWidth = $(window).width();
            //var left = (winWidth - 600)/2;
            //var winHeight = $(window).height();
            //var top = winHeight/3;
            //
            //$('#myModal').css("left",left);
            //$('#myModal').css("top",top);

        });

        $("body").on("shown.bs.modal","#myModal",function(){
            //var h = $('#myModal .modal-dialog').outerHeight(true);
            //
            //var w = $('#myModal .modal-dialog .modal-content').outerWidth(true);
            //
            //$('#myModal').css("height",h);
            ////$('#myModal').css("width",w);
            //$('#myModal .modal-dialog').css("width",w);

        });



         $("body").on("click",".close-layer",function(){
            var mo = $(this).parents(".modal");
            mo.modal("hide");
            mo.on('hidden.bs.modal', function () {
                mo.remove();
            })
        });

        //签名框隐藏之后，从body移除
        //$("body").on("hidden.bs.modal",thisModal,function(){
        //    thisModal.remove();
        //});

    });

    function Close(){
        var thisModal = $(".modal-layer").last();
        thisModal.modal("hide");
        thisModal.on('hidden.bs.modal', function () {
            thisModal.remove();
        })
    };

    //弹出层接口
    var MyLayerAPI = {
        Show : Show,
        Close: Close
    };

    return MyLayerAPI;

})()
