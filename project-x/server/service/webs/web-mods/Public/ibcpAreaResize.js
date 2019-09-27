/**
 * Created by Mr.Wang on 2017/3/29.
 */

/**
 * jQuery可缩放插件
 */
(function($){
    "use strict";
    $.fn.ibcpAreaResizable = function(options,callback){
        /**
         * 设置参数
         * 拖动范围限制是根据当前元素所在的父元素百分比进行设置
         * @type {{maxWidth, minWidth}}
         */
        var option = {
            'maxWidth' : options.maxWidth,
            'minWidth' : options.minWidth
        };

        var $area = $(this);
        var $width = $area.width();
        var dgInFlg = false;            //鼠标在拖动区域上信标
        var dgIngFlg = false;           //缩放进行信标
        var $smx;                       //拖动前按下时鼠标坐标
        var dgb = {
            'left': $area.position().left + $area.width() - 3,
            'right' : $area.position().left + $area.width() + 3
        };

        //鼠标在当前对象移动时，当在拖动边界上时，改变鼠标样式
        $area.on('mousemove', function(e){
            if(e.clientX >= dgb.left && e.clientX <= dgb.right){
                $area.css('cursor','e-resize');
                dgInFlg = true;
            }else{
                $area.css('cursor','default');
                dgInFlg = false;
            }
        });

        //鼠标离开当前拖动对象，将不可通过点击获取拖动开始事件
        $area.on('mouseout', function(){
            dgInFlg = false;
        });

        //鼠标在区域中按下时
        $(window).on('mousedown',function(e){
            if(dgInFlg) {
                dgIngFlg = true;
                $smx = e.clientX;
            }
        });

        //鼠标拖动过程
        $(window).on('mousemove', function(e){
            if(dgIngFlg){
                var $mx = e.clientX;
                var $dis = ($mx - $smx) * 1;
                var $pWidth = $area.parent().width();

                //检查限制
                if(checkLimit($dis)){
                    //执行缩放事件
                    $area.width($width + $dis);
                }

                //执行回调函数
                if(callback){
                    callback($area.width());
                }
            }
        });

        //鼠标松开事件
        $(window).on('mouseup', function(e){
            if(dgIngFlg){
                var $mx = e.clientX;
                var $dis = ($mx - $smx) * 1;

                //检查限制
                if(checkLimit($dis)){
                    //执行缩放事件
                    $area.width($width + $dis);
                }

                reload();

                //执行回调函数
                if(callback){
                    callback($area.width());
                }
            }
            dgIngFlg = false;
        });

        //重置拖动边框
        var reload = function(){
            dgb = {
                'left': $area.position().left + $area.width() - 3,
                'right' : $area.position().left + $area.width() + 3
            };
            $smx = '';
            $width = $area.width();
        };

        //检查是否超过限制
        var checkLimit = function($dis){
            var $pWidth = $area.parent().width();
            var checkResult = true;
            //如果有限制，进行限制判断
            if(option.minWidth){
                var pec = option.minWidth / 100;
                if(($area.width()/$pWidth) <= pec){
                    if($dis > 0){
                        checkResult = true;
                    }else{
                        $area.width($pWidth * pec);
                        checkResult = false;
                    }
                }
            }
            if(option.maxWidth){
                var pec = option.maxWidth / 100;
                if(($area.width()/$pWidth) >= pec){
                    if($dis < 0){
                        checkResult = true;
                    }else{
                        $area.width($pWidth * pec);
                        checkResult = false;
                    }
                }
            }
            return (checkResult);
        };
    };

    /**
     * 根据bootstrap布局进行div元素的缩放调整方法
     * @param options
     * @param callback
     */
    $.fn.ibcpBSTAreaResizeable = function(options, callback){
        var $this = $(this);
        var sm = 'col-sm-',
            xs = 'col-xs-',
            md = 'col-md-';
        var colClass = '';
        var $deputyArea = ibcpAreaResize.getDepatyArea($this.attr('id'));

        //设置最大最小限制（只针对缩放主体）
        var _option = {
            'maxWidth' : options.maxWidth ? options.maxWidth : 11,
            'minWidth' : options.minWidth ? options.minWidth : 1
        };

        var dgInFlg = false;            //鼠标在拖动区域上信标
        var dgIngFlg = false;           //缩放进行信标

        //鼠标在元素边界可执行缩放区域
        var dgb = getSide($this);

        //鼠标在当前对象移动时，当在拖动边界上时，改变鼠标样式
        $this.on('mousemove', function(e){
            if(e.clientX >= dgb.left && e.clientX <= dgb.right){
                showBar($this);
                $this.css('cursor','e-resize');
                dgInFlg = true;
            }else{
                $this.css('cursor','default');
                dgInFlg = false;
                hideBar();
            }
        });

        // //鼠标离开当前拖动对象，将不可通过点击获取拖动开始事件
        // $this.on('mouseout', function(){
        //     dgInFlg = false;
        //     hideBar();
        // });

        //鼠标在区域中按下时
        $(window).on('mousedown',function(e){
            if(dgInFlg) {
                dgIngFlg = true;
                $this.parents('body').addClass('ibcp-no-select');
            }
        });

        //鼠标拖动事件
        $(window).on('mousemove', function(e){
            //鼠标在移动时，如果坐标超出拖动区域，则隐藏拖动手柄
            if(dgInFlg && !dgIngFlg){
                if(e.clientX >= dgb.right){
                    dgInFlg = false;
                    hideBar();
                }
            }

            if(dgIngFlg){
                var mx = e.clientX;
                var width = $(window).width() - $this.position().left;
                var relMx = mx - $this.position().left;
                var perLength = Math.round(width / 12);
                var count = Math.round(relMx / perLength);
                if(count >= _option.maxWidth){
                    count = _option.maxWidth;
                }
                if(count <= _option.minWidth){
                    count = _option.minWidth;
                }

                //循环判断存在哪一种bootstrap块布局类，并将当前类去掉，缓存当前类主体
                for(var i = 1; i <= 12;i++){
                    if($this.hasClass(sm + i)){
                        colClass = sm;
                        $this.removeClass(sm + i);
                        $this.addClass(sm + count);
                        $deputyArea.removeClass(sm + (12-i));
                        $deputyArea.addClass(sm + (12-count));
                        break;
                    }else if($this.hasClass(xs + i)){
                        colClass = xs;
                        $this.removeClass(xs + i);
                        $this.addClass(xs + count);
                        $deputyArea.removeClass(xs + (12-i));
                        $deputyArea.addClass(xs + (12-count));
                        break;
                    }else if($this.hasClass(md + i)){
                        colClass = md;
                        $this.removeClass(md + i);
                        $this.addClass(md + count);
                        $deputyArea.removeClass(md + (12-i));
                        $deputyArea.addClass(md + (12-count));
                        break;
                    }
                }
                showBar($this);

                //执行回调函数
                if(callback){
                    callback();
                }
            }
        });

        $(window).on('mouseup', function(e){
            //执行回调函数
            if(callback){
                callback();
            }
            dgIngFlg = false;
            hideBar();
            dgb = getSide($this);
            $this.parents('body').removeClass('ibcp-no-select');
        });

        $(window).resize(function(){
            dgb = getSide($this);
        });
    };

    /**
     * 获取dom对象右边可拖拽坐标
     * @param $this
     * @returns {{left: number, right: *}}
     */
    var getSide = function($this){
        return {
            'left': $this.position().left + $this.width() - 10,
            'right' : $this.position().left + $this.width() + 3
        };
    };

    /**
     * 显示缩放操作手柄
     * @param obj
     */
    var showBar = function(obj){
        var resizeBar = null;
        var $resizeBar = obj.find('#ibcp_resize_bar');
        //如果找到已存在的元素，则将已存在的元素作为手柄，未找到则创建手柄元素
        if($resizeBar.length > 0){
            resizeBar = $resizeBar;
        }else{
            resizeBar = $('<div id="ibcp_resize_bar" style="width:6px;background-color:#AAA;border-radius:4px 1px 1px 4px;opacity:0.6;position:fixed;z-index:9999999;"></div>');
        }
        var $btn = $('<div style="width:15px;height:40px;border-radius:2px;background:repeating-linear-gradient(90deg,#CCC,#000 3px);z-index:9999999999;position:fixed;"></div>');
        resizeBar.css('height',obj.height() - 10);
        obj.append(resizeBar);
        var position = getSide(obj);
        resizeBar.css('left',position.right - 10);
        resizeBar.css('top',obj.position().top + 5);
        resizeBar.append($btn);
        $btn.css('left',resizeBar.position().left - 5);
        $btn.css('top',(resizeBar.height() / 2) - 7);
    };

    /**
     * 隐藏操作手柄
     */
    var hideBar = function(){
        $('#ibcp_resize_bar').remove();
    };
})(jQuery);



/**
 * 项目中关联区域
 */
$(function(){
    "use strict";
    ibcpAreaResize.init();
});

function doNothing(){
    window.event.returnValue=false;
    return false;
}

/**
 * ibcp缩放关联区域
 * @type {{init}}
 */
var ibcpAreaResize = (function(){
    "use strict";
    var resizeFlg = false;          //缩放事件启动标志
    var $smx;                       //鼠标拖动起始横坐标

        //初始化可缩放区域
    var initArea = function(){
        //可缩放div区块（主体）
        $('.ibcp-area-main').each(function(){
            var $this = $(this);
            var max = $this.attr('maxwidth');
            var min = $this.attr('minwidth');
            var $width = $this.width();
            var $deputyArea = getDepatyArea($this.attr('id'));
            $this.ibcpAreaResizable({
                'maxWidth': max === null ? 50 : max,
                'minWidth' : min === null ? 20 : min
            },function(width){
                $deputyArea.width($this.parent().width() - width - 10);
            });
        });

        //bootstrap布局区块可缩放
        $('.ibcp-btsarea-main').each(function(){
            var $this = $(this);
            var max = $this.attr('maxnum') * 1;
            var min = $this.attr('minnum') * 1;
            $this.ibcpBSTAreaResizeable({
                'maxWidth' : max,
                'minWidth' : min
            },function(){
                $this.parents('body').find('.bootstrap-table').each(function(){
                    var $table = $(this);
                    var $id = $table.attr('id');
                    if($id){
                        $('#'+$id).tableHideCheckbox();
                        $('#'+$id).bootstrapTable('resetWidth');
                    }
                });
            });
        });
    };

    //获取当前id区域关联缩放附属区域对象
    var getDepatyArea = function(id){
        var obj;
        $('.ibcp-area-deputy').each(function(){
            var $this = $(this);
            if($this.attr('for') == id){
                obj = $this;
            }
        });
        return(obj);
    };

    return {
        init : initArea,
        getDepatyArea : getDepatyArea
    };
})();
