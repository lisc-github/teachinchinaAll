/**
 * Created by admin on 2017/3/24.
 */
    (function(window,$){
        function Select(){

            var config = {};
            this.get = function(v){
                return config[v];
            };
            this.set = function(k,v){
                config[k] = v;
            };
        }
        Select.prototype = {
            init:function(class1,class2,option){
                var box = $(class1);
                var input = $(class2);
                this.set('box',box);
                this.set('input',input);
                this.set('option',option);
                var opt = this.createOption();
                this.get('box').append(opt);
                this.bindEvent(this.get('input'),opt);
            },
            createOption:function(){
                var arr = this.get('option');
                var box = $("<div></div>");
                var _height = this.get('box').outerHeight();
                box.css({'display':'none','z-index':'9999','height':'200px','overflow-y':'scroll','border':"1px solid #ccc",'borderTop':'none','position':'absolute','right':'0','left':'0','top':_height+'px','z-indent':'12px'});
                box.attr("class","option");
                var ul = $("<ul></ul>");
                ul.css({'margin':0,'padding':'0','z-index':'9999','background':'#fff'});
                for(var i=0;i<arr.length;i++){
                    var li = $("<li></li>");
                    li.text(arr[i]);
                    li.css({'list-style':'none','background':'#fff','padding':'0 0 0 12px',fontSize:"14px"});
                    li.addClass('opt');
                    ul.append(li);
                }
                box.append(ul);
                return box;
            },
            bindEvent:function(input,opt){
                var flag = false;
                var li = opt.children(0).children();
                input.click(function(){
                    console.log(1)
                    if(!flag){
                        opt.css('display','block');
                        flag = true;
                    }
                    else{
                        opt.css('display','none');
                        flag = false;
                    }
                });
                li.each(function(){
                    $(this).click(function(){
                        input.val($(this).text());
                        input.removeClass("placeholder");
                        opt.css('display','none');
                        flag = false;
                    })
                });
                input.bind('blur',blurHandler);
                function blurHandler(){
                    opt.css('display','none');
                    flag = false;
                }
                opt.mouseover(function(){
                    input.unbind('blur',blurHandler);
                });
                opt.mouseout(function(){
                    input.bind('blur',blurHandler);

                });

            }
        };
        var o = new Select();

        window.createSelect = function(class1,class2,option){
            return o.init.call(o,class1,class2,option);
        }
    })(window,jQuery);
