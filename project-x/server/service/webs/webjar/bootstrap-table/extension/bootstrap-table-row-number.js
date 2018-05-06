/**
 *Create by:Decai Tu
 *Create Time:2018-01-18 18:47
 *Decription:给表格扩展序号列
 */

(function ($) {
    //获取bootstraptable构造函数和两个方法
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initTable = BootstrapTable.prototype.initTable;

    /**
    * 表格初始化前，判断是否需要显示序号
    */
    BootstrapTable.prototype.init = function () {
        //如果要显示序号
        if(this.options.rowNumber){
            //重写initTable的方法
            rewriteInitTable();
            //重写getData的方法
            rewriteGetData();
        }

        //执行原来的init方法
        _init.apply(this,Array.prototype.slice.apply(arguments));
    }

    /**
     * 重写initTable的方法
     */
    var rewriteInitTable = function() {
        BootstrapTable.prototype.initTable = function () {
            //如果表格的表头是在html中定义的，操作dom，给第一个<tr>标签插入一个序号的<th>标签
            this.$header = this.$el.find('>thead');
            if (this.$header.length > 0){
                var len = this.$header.find('tr').length;
                var numberTH = getSerialColumnTHeadHtml(len);

                //判断是否已经有这个th标签了，防止重复添加
                var numberField = this.$header.find('tr:first').find('th:first').attr('data-field');
                if(numberField != numberTH[1].field){
                    this.$header.find('tr:first').prepend(numberTH);
                    this.options.numberField = numberTH[1].field;
                }

            }
            //如果是在js中定义的columns 在this.options.columns[0]中插入一个序号配置列
            else {
                if (!$.isArray(this.options.columns[0])) {
                    this.options.columns = [this.options.columns];
                }
                var columnsLen = this.options.columns.length;
                var numberCol = getSerialColumnObj(columnsLen);

                var firstCol = this.options.columns[0][0];
                if(firstCol.field != numberCol.field){
                    this.options.columns[0].unshift(numberCol);
                    this.options.numberField = numberCol.field;
                }
            }

            //执行原来的initTable方法
            _initTable.apply(this,Array.prototype.slice.apply(arguments));
        }
    }

    /**
     * 重写获取数据的方法 给当前页数据添加序号
     */
    var rewriteGetData = function() {

        BootstrapTable.prototype.getData = function (useCurrentPage) {
            //这部分代码从源码而来
            var data = [];
            if(this.searchText || !$.isEmptyObject(this.filterColumns) || !$.isEmptyObject(this.filterColumnsPartial)){
                data = useCurrentPage ? this.data.slice(this.pageFrom - 1, this.pageTo) : this.data;
            }
            else {
                data = useCurrentPage ? this.options.data.slice(this.pageFrom - 1, this.pageTo) : this.options.data;
            }

            /************以下功能是给当前页数据添加序号************/

            /**
             * 根据页面和每页显示数量，获取当页的最小序号和最大序号
             * 如果是前端分页，下标从minIndex开始，startNumber
             * 如果是后端分页，下标从0开始，序号从minIndex + 1开始
             */
            var maxIndex = data.length;
            if(this.options.pagination){
                maxIndex = this.options.pageNumber * this.options.pageSize;
            }

            var minIndex = (this.options.pageNumber - 1) * this.options.pageSize;
            var startNumber = 1;
            if(this.options.sidePagination === 'server'){
                startNumber = minIndex + 1;
                minIndex = 0;
            }


            /**
             * 循环，给当前页显示的数据加上序号参数
             * 如果是前端分页，data是所有的数据
             * 如果是后端分页，data是当前页的数据
             */
            for(var i = minIndex; i < maxIndex; i++){
                (data[i]) && (data[i][this.options.numberField] = startNumber + i);
            }
            return data;
        }
        
    }

    /**
     * 获取序号列的配置对象
     * @param rowspan 这个值默认为1. 当表头是复杂表头时，会根据表头的行数来改变。保证‘序号’单元格跨越表头总行数
     */
    var getSerialColumnObj = function(rowspan)  {
        //获取默认样式
        var defaultStyle = serialNumberColumnStyle();

        //把style的内容拼接到align后。内部实现会把它拼接到html标签的style后面（因为align就是放在html标签的style中）
        var style = defaultStyle.style || 'background-color:#F1F1F1;font-weight: bolder;',
            align = defaultStyle.align ? (defaultStyle.align + ';' + style) : style;

        //重新整理数据
        var arrangeStyle = {
            title : defaultStyle.title || '序号',
            field : defaultStyle.field || 'serial-number',
            width : defaultStyle.width || '45px',
            class : defaultStyle.class,
            align : align,
            rowspan : rowspan || 1
        }

        return arrangeStyle
    }

    /**
     * 获取序号列的配置th标签
     * @param rowspan
     * @returns {Array}
     */
    var getSerialColumnTHeadHtml = function(rowspan) {
        var obj = getSerialColumnObj(rowspan);
        var th = '<th data-field="'+ obj.field +'" data-align="'+ obj.align +'" rowspan="'+ obj.rowspan +'" data-width="'+ obj.width +'">'+ obj.title +'</th>';
        return [th,obj];
    }

    //设置默认配置为显示序号
    $.extend(true,$.fn.bootstrapTable.defaults,{rowNumber:true});

    /**
     * 序号列默认样式显示配置 (可修改)
     * @returns {{title: string, field: string, align: string, width: string, style: string, class: string}}
     */
    var serialNumberColumnStyle = function () {
        return {
            title : '序号',
            field : 'row-number',
            align : 'center',
            width : '43px',
            style : 'background-color:#F1F1F1;font-weight: bolder;',
            class : ''
        }
    }

})(jQuery);