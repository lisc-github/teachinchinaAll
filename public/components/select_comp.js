/**
 * Created by admin on 2017/3/24.
 */

(function(window){
    function Select(){
       var config = {};
       this.get = function(v){
           return config[v];
       };
       this.set = function(k,v){
           config[k] = v;
       }
    }
    Select.prototype = {
        init:function(obj){
            for(var k in obj){
                if(obj.hasOwnProperty(k)){
                    this.set(k,obj[k]);
                }

            }
            var box = this.createBox();
            var input = this.createEle();
            var option = this.createOption();
            box.appendChild(input);
            box.appendChild(option);
            this.bindEvent(input,option);

            return box;
        },
        createBox:function(){
            var box = document.createElement("div");
            box.style.position = 'relative';
            box.style.width = '100%';
            box.setAttribute("class",'select');
            return box;

        },
        createEle:function(){
            var height = this.get('h');
            var placeholder = this.get('placeholder');
            var name = this.get('name');
            var readonly = this.get('readonly');
            var selectBox = document.createElement("div");
            var select = document.createElement("input");
            select.setAttribute("class",'ipt');
            selectBox.style.height = height + 'px';
            selectBox.style.border = '1px solid #ccc';
            selectBox.style.backgroundColor = '#fff';
            select.style.border = 'none';
            select.style.padding = '0';
            select.style.backgroundColor = '#fff';
            select.style.textIndent = '12px';
            select.style.float = 'left';
            select.style.width = '99%';
            select.style.height = height + 'px';
            select.style.outline = 'none';
            select.style.cursor = 'pointer';
            if(placeholder){
                select.setAttribute("placeholder",placeholder);
            }
            if(name){
                select.setAttribute("name",name);
            }
            if(readonly){
                select.setAttribute("readonly",readonly);
            }
            selectBox.appendChild(select);
            return selectBox;

        },
        createOption:function(){
            var arr = this.get('option');
            var height = this.get('h');
            var box = document.createElement("div");
            box.style.border = "1px solid #ccc";
            box.style.borderTop = 'none';

            box.style.position = 'absolute';
            box.style.right = '0';
            box.style.left = '0';
            box.setAttribute("class","option");
            var ul = document.createElement("ul");
            ul.style.margin = 0;
            ul.style.padding= 0;
            for(var i=0;i<arr.length;i++){
                var li = document.createElement("li");
                li.innerText = arr[i];
                li.style.listStyle = 'none';
                li.style.padding = '0 0 0 12px';
                li.setAttribute("class",'opt');
                ul.appendChild(li);
            }
            box.appendChild(ul);
            box.style.display = 'none';
            return box;
        },
        bindEvent:function(input,option){
            var flag = false;
            var li = option.children[0].children;
            var ipt = input.children[0];
            input.onclick = function(){
                if(!flag){
                    option.style.display = 'block';
                    flag = true;
                }
                else{
                    option.style.display = 'none';
                    flag = false;
                }
            };
            for(var i=0;i<li.length;i++){

                li[i].onclick = function(){
                    var value = this.innerText;
                    ipt.setAttribute("value",value);
                    option.style.display = 'none';
                    flag = false;
                }
            }
            addEvent(ipt,'blur',blurHandler);
            function blurHandler(){
                option.style.display = 'none';
                flag = false;
            }
            option.onmouseover = function(){
                removeEvent(ipt,'blur',blurHandler);
            };
            option.onmouseout = function(){
                addEvent(ipt,'blur',blurHandler);
            };
            function addEvent(target,type,handler){
                if(target.addEventListener){
                    target.addEventListener(type,handler,false);
                }
                else{
                    target.attachEvent('on'+type,handler);
                }
            }
            function removeEvent(target,type,handler){
                if(target.removeEventListener){
                    target.removeEventListener(type,handler,false);
                }
                else{
                    target.detachEvent('on'+type,handler);
                }
            }
        }
    };
    var o = new Select();
    window.createSelect = function(obj){
        return o.init.call(o,obj);
    }
})(window);
