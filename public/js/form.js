$(window).ready(readyHandler);
function readyHandler(){
    // 手机端的适配
    var w = document.documentElement.clientWidth;
    var html = $("html");
    var fontSize = w/640*36;
    if(w<640){
        html.css("font-size",fontSize+"px");
    }


    /**
     * 扩展jq的方法：一直向上找指定class的父级
     */
    $.fn.extend({
        _parent:function(selector){
            var p = null;
            if(!selector){
                p = $(this).parent();
            }
            else{
                var that = this;
                findParent($(that));
                function findParent(ele){
                    if(ele.parent().attr('class')&&ele.parent().attr('class').indexOf(selector)!=-1){
                        p = ele.parent();
                    }
                    else{
                        findParent(ele.parent());
                    }
                }
            }

            return p;
        }
    });
    var red = $(".red");
    red.each(function(){
        $(this).html("*");
    });

    var birth = $(".birth");
    var month = birth.children().eq(0);
    var day = birth.children().eq(1);
    var year = birth.children().eq(2);
    var arr = [];
    var arr2 = [];
    var arr3 = [];
    for(var j=1;j<32;j++){
        if(j<10){
            j = '0'+j;
        }
        arr.push(j);
    }
    for(var i=1950;i<2017;i++)
    {
        arr2.push(i);
    }

    for(var k=1;k<13;k++){
        if(k<10){
            k = '0'+k;
        }
        arr3.push(k);
    }
    /**
     * 创建组件select
     * @type {*}
     */
    var month_select = createSelect(".select1",".select_ipt1",arr3);
    var day_select = createSelect(".select2",".select_ipt2",arr);
    var year_select = createSelect(".select3",".select_ipt3",arr2);










    /**
     * 表单提交前的验证
     */
    var need = $(".need").find('input');
    var applyForm = $("#apply_form");
    applyForm.submit(submitHandler);
    function submitHandler(){
        return check();
        function check(){
            var f = true;
            need.each(function(){
                if(!$(this).val()||$(this).hasClass('placeholder')){
                    f= false;
                    $(this)._parent('need').find('.info').text('Please type the '+$(this).attr('placeholder'));
                }
            });
            if(!f){
                alert("Please fill in the required content");
            }
            return f;
        }
    }
    need.each(function() {
        $(this).blur(function(){
            var that = $(this);
            setTimeout(function () {
                if(that.val()){
                    that._parent('need').find('.info').text('');
                }
            },500)
        });
    });

    var other = $("#Other");
    var otherDegree = $("#Other_degree");
    var degree = $("input[name='Degree']");
    degree.each(function(i){
        degree.eq(i).click(function () {
            if(i!=degree.length-1) {
                otherDegree.attr('disabled', 'disabled');
                otherDegree.val('');
            }
            else{
                otherDegree.removeAttr('disabled');
            }
        })
    });



}














































