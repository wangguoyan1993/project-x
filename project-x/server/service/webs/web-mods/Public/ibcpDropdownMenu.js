/**
 * Created by Oswald on 2017/3/4.
 */
;(function ($, window, document, undefined){
    $.fn.ibcpDropdownMenu = function(option){
        var data = option.data;
        var selectMenu = option.selectMenu;
        return this.each(function (){
            var $this = $(this);

            JudgeElementType($this);

            InitMenu($this);

        })

        //判断元素类型
        function JudgeElementType($element){
            if($element.is('div') || $element.is('p')){
                $element.addClass("dropdown");
                var button = $('<button class="btn btn-default" type="button" data-toggle="dropdown"><span class="glyphicon glyphicon-plus"/></button>');
                $element.prepend(button);
            }
            if($element.is('button') || $element.is('a')){
                var parent = $element.parent();
                parent.addClass('dropdown');
                $element.attr('data-toggle','dropdown');
            }
        }

        //初始化
        function InitMenu($ele){

            if (data.length < 1) return;

            var ul = $('<ul class="dropdown-menu multi-level" role="menu">');
            $ele.after(ul);
            for (var i=0;i<data.length;i++){
                var liData = data[i];
                var text = liData.name;
                var children = liData.types;
                var li = $('<li class="dropdown-submenu" role="presentation"></li>');
                var mea = $('<a role="menuitem" tabindex="-1" href="#"></a>');
                mea.on('click',function(e){
                    var dro =  $(".dropdown-submenu .dropdown-menu");
                    dro.css('display','none');
                    $(this).next().css('display','block');
                    e.stopPropagation();
                })
                mea.text(text);
                li.append(mea);
                CreatSubMenu(li,children);
                ul.append(li);
            }
        }

        //创建子菜单
        function CreatSubMenu(pLi,subData){
            var suUl = $('<ul class="dropdown-menu" role="menu">');
            for(var i= 0;i<subData.length;i++){
                var cData = subData[i];
                var text = cData.name;
                var suLi = $('<li role="presentation"></li>');
                var sua = $('<a role="menuitem" tabindex="-1" href="#"></a>');
                sua.text(text);
                suLi.append(sua);

                suLi.data('data',cData);

                suLi.on('click',function(){
                    $(this).parent('ul').css('display','none');
                    var thisData = $(this).data('data')
                    selectMenu($(this),thisData);
                })

                suUl.append(suLi);
            }
            pLi.append(suUl);
        }

    }



})(jQuery, window, document);