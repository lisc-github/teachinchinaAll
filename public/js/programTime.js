$(window).ready(readyHandler);
function readyHandler(){
    var nav = $(".sub_nav li");
    var nav_a = $(".sub_nav li a");
    var line = $(".sub_nav .line");
    var wrapper = $(".wrapper");
    var program = wrapper.find(".time");
    var listIcon = $(".sub_nav .fa-list-ul");
    var subNav = $(".sub_nav .sub_box");
    var flag = true;
    line.css("width",nav_a.eq(0).css("width"));
    line.css("left",nav_a.eq(0).offset().left+'px');
    nav.each(function(i){
        $(this).on("mouseover",function(){
            var width = nav_a.eq(i).css("width");
            var left = nav_a.eq(i).offset().left + 'px';

            line.css({"width":width,'left':left});
        });
        $(this).on("mouseout",function(){
            var active = $(".active");
            var width = active.css("width");
            var left = active.offset().left;
            line.css({"width":width,'left':left});
        });
        $(window).resize(function(){
            var active = $(".active");
            var width = active.css("width");
            var left = active.offset().left;
            line.css({"width":width,'left':left});
            if(nav_a.eq(i).hasClass("active")){
                var tempLeft = program.eq(i).width();
                wrapper.css({"left":-tempLeft*i+"px"});
            }

        });
        $(this).on("click",function(event){
            nav_a.each(function(){
                $(this).removeClass("active");
            });
            nav_a.eq(i).addClass("active");
            var tempLeft = program.eq(i).width();
            wrapper.animate({"left":-tempLeft*i+"px"});
            show_hide();
            event.stopPropagation();
        });
    });

    // 点击图标显示隐藏下拉菜单
    listIcon.click(function(event){
        show_hide();
        event.stopPropagation();
    });
    if((window.innerWidth||document.documentElement.clientWidth)<=700){
        //点击body导航栏隐藏
        $("body").on("click",function(){
            if(!flag){
                subNav.removeClass("active_");
                flag = !flag;
            }

        });
        $("body").on("touchmove",function(){
            if(!flag){
                subNav.removeClass("active_");
                flag = !flag;
            }

        });
    }



    function show_hide(){
        if((window.innerWidth||document.documentElement.clientWidth)<=700){
            if(flag){
                subNav.addClass("active_");
                flag = !flag;
            }
            else{
                subNav.removeClass("active_");
                flag = !flag;
            }
        }

    }

}