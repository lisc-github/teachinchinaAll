/**
 * Created by admin on 2017/4/13.
 */
(function(){
    function RadioComp(){

    }
    RadioComp.prototype = {
        init:function(id,obj){
            var radioBox = document.getElementById(id);
            var input = this.createInput(obj);
            var pic = this.createPicBox(obj);
            radioBox.appendChild(input);
            radioBox.appendChild(pic);
            this.radioBox = radioBox;
            this.eventBind();
        },
        createInput:function(obj){
            var input = document.createElement("input");
            input.setAttribute("type","radio");
            input.style.margin = "0";
            for(var attr in obj){
                if(obj.hasOwnProperty(attr)){
                    input.setAttribute(attr,obj[attr]);
                }
            }
            return input;
        },
        createPicBox:function(obj){
            var picBox = document.createElement("span");
            var img = document.createElement("img");
            picBox.style.position = "relative";
            img.style.width = "100%";
            img.style.position = 'absolute';
            img.setAttribute("name","li-"+obj.name);
            img.setAttribute("src","components/radioIcon.jpg");
            picBox.appendChild(img);
            picBox.style.position = "absolute";
            picBox.style.height = "100%";
            picBox.style.width = "100%";
            picBox.style.left = 0;
            picBox.style.top = 0;
            if(obj.checked){
                img.style.top = 0;
            }
            else{
                img.style.bottom = 0;
            }
            this.img = img;
            this.picBox = picBox;
            return picBox;
        },
        eventBind:function(){
            var parent = this.radioBox.parentNode;
            parent.style.cursor = "pointer";
            var _this = this;
            parent.onclick = function(){
                var input = _this.findChild(parent,"input");
                var name = input.getAttribute("name");
                var imgs = _this.findAttrChild("img","name","li-"+name);
                for(var i=0;i<imgs.length;i++){
                    imgs[i].style.bottom = 0;
                    imgs[i].style.top = "";
                }
                this.getElementsByTagName("img")[0].style.top = 0;
                this.getElementsByTagName("input")[0].click();
            }
        },
        findChild:function(parent,ele){
            return parent.getElementsByTagName(ele)[0];
        },
        findAttrChild:function(ele,attrName,attrValue){
            var arr = [];
            var eles = document.getElementsByTagName(ele);
            for(var i=0;i<eles.length;i++){
                if(eles[i].getAttribute(attrName)==attrValue){
                    arr.push(eles[i]);
                }
            }
            return arr;
        }

    };
    var rc = new RadioComp();
    window.radioComp = function(id,obj){
        rc.init.call(rc,id,obj);
    }
})(window);

$(window).ready(function(){
    //使用radioComp组件
    radioComp("li-radioComp-male",{id:"male",name:"sex",checked:"checked",value:"male"});
    radioComp("li-radioComp-female",{id:"male",name:"sex",value:"male"});
    radioComp("li-radioComp-Associate",{id:"Associate",name:"Degree",checked:"checked",value:"Associate Degree"});
    radioComp("li-radioComp-BA",{id:"B.A",name:"Degree",value:"B.A (Bachelor of Arts)"});
    radioComp("li-radioComp-BS",{id:"B.S",name:"Degree",value:"B.S (Bachelor of Science )"});
    radioComp("li-radioComp-MS",{id:"M.S",name:"Degree",value:"M.S (Master of Science )"});
    radioComp("li-radioComp-MA",{id:"M.A",name:"Degree",value:"M.A (Master of Arts )"});
    radioComp("li-radioComp-Doctor",{id:"Doctor",name:"Degree",value:"Doctor's Degree"});
    radioComp("li-radioComp-Other",{id:"Other",name:"Degree",value:"Other Degree"});

    radioComp("li-radioComp-One_year",{id:"One_year",name:"Program_Choice",checked:"checked",value:"One year program"});
    radioComp("li-radioComp-Two_semesters",{id:"Two_semesters",name:"Program_Choice",value:"Two semesters program"});
    radioComp("li-radioComp-One_semester",{id:"One_semester",name:"Program_Choice",value:"One semester program"});
    radioComp("li-radioComp-Half_year",{id:"Half_year",name:"Program_Choice",value:"Half year program"});
    radioComp("li-radioComp-Weeks",{id:"Weeks",name:"Program_Choice",value:"Weeks program"});
    radioComp("li-radioComp-Flexible",{id:"Flexible",name:"Program_Choice",value:"Flexible program"});

    radioComp("li-radioComp-middle_schools",{id:"middle_schools",name:"School_Choice",checked:"checked",value:"at middle schools"});
    radioComp("li-radioComp-colleges",{id:"colleges",name:"School_Choice",value:"at colleges"});
    radioComp("li-radioComp-elementary_schools",{id:"elementary_schools",name:"School_Choice",value:"at elementary schools"});
    radioComp("li-radioComp-pre_schools",{id:"pre_schools",name:"School_Choice",value:"at pre-schools"});
    radioComp("li-radioComp-training_schools",{id:"training_schools",name:"School_Choice",value:"at english language training schools"});
    radioComp("li-radioComp-all",{id:"all",name:"School_Choice",value:"all"});

});