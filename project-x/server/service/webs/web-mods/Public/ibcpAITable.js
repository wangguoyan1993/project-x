/**
 * Created by Mr.Wang on 2017/3/30.
 */

(function($){
    "use strict";
    $.fn.ibcpTable = function(cmd, options, callback){
        var $this = $(this);
        if(!$this.is('table')) {
            throw('调用错误:当前元素类型与方法不符！');
        }else{
            ibcpTableMethods[cmd]($this, options, callback);
        }
    };

    /**
     * 表格方法集合
     * @type {{init, loadData, revise}}
     */
    var ibcpTableMethods = (function(){

        /**
         * 初始化表格
         * @param obj       当前表格对象
         * @param options   配置参数
         * @param callback  回调函数
         */
        var initTable = function(obj, options, callback){
            //操作配置
            var option = {
                dataUrl : options.dataUrl,
                datas : options.selectDatas,
                isAsync : options.isAsync
            };

            //数据key集合
            var dataKeys = [];

            //将所有数据的key按顺序存储
            obj.find('th').each(function(){
                var $this = $(this);
                var $key = $this.attr('ibcp-data-key');
                dataKeys.push($key);
            });

            ibcpAjax.Select(option.dataUrl,option.datas,true,function(result){
                var data = result.data;
                for(var i in data){
                    var $tr = $('<tr></tr>');
                }
            });
        };

        //加载数据
        var loadData = function(obj, options, callback){

        };

        //修改表格数据
        var reviseTable = function(obj, options, callback){

        };

        return {
            'init' : initTable,
            'loadData' : loadData,
            'revise' : reviseTable
        };
    })();
})(jQuery);
