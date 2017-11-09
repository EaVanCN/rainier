var Rainier = function(option){
    if (this instanceof Rainier) {
        var ra = this.init(option);
        return ra;
    }else{
        return new Rainier(option);
    }
}
Rainier.prototype.init = function(option){
    this._ele = typeof option.el == "string" ? document.querySelectorAll(option.el) : option.el;    //被绑定（mounted）的DOM
    this._data = option.data || {};                                                                 //model
    this._methods = option.methods || {};                                                           //可以绑定的方法（暂不实现）
    this.reactData = {};                                                                            //用于viewmodel和DOM之间的映射（即viewmodel）；viewmodelname ： {value:值，ele:{node:节点，cmd:指令}}
    this.compiler();
}

Rainier.prototype.compiler = function(){            //将页面上指令进行提取,将{{}}转换为指令，并用span包裹。（预处理阶段），获取_data,DOM元素，指令的对应,(v-model在这个地方做对应？)
    var self = this;
    var textEle, vm_name, otherEles;                //textEle表示创建的文本节点，vm_name表示this._data中数据的名称;otherEles表示页面其他指令部分
    for (var i = 0, length = this._ele.length; i < length; i++){
        var ele = this._ele[i], html = ele.innerHTML;
        html = html.replace(/\{\{(.*?)\}\}/g, function(a, b){
            if(self._data.hasOwnProperty(b)){               //只有{{}}中是直接在vm对象中定义的属性，才会将其转变成文本节点，否则视为二级的属性或更低级属性(处理一下如果{{}}中是某个引用类型变量的属性)
                return '<span ra-textnode="'+ b +'"></span>';
            }else{
                return '{{'+ b +'}}'
            }
        });
        ele.innerHTML = html;
    };
    var eles = document.querySelectorAll("[ra-text],[ra-textnode],[ra-model],[ra-for]");
    for (var j = 0, l = eles.length; j < l; j++) {
        var curEle = eles[j];
        var curEleAttrs = curEle.attributes;            //获取所有属性
        for(var key in curEleAttrs){                    
            if(curEleAttrs[key].name && utils.checkPref(curEleAttrs[key].name,"ra")){               //属性中带有ra前缀的属性,都将进如映射流程
                cmdHandler.reactCmdWithNode.call(this,curEleAttrs[key].name,curEle);
            }
        }                                           
    }
}

Rainier.prototype.parser = function(){           //将页面上的{{}}和ra-text中的值绑定到对应的viewmodel中,除此之外，可能还要包含别的指令的初始化，包括数据绑定，一些view展示的处理

}

Rainier.prototype.observer = function(){         //监控viewmodel的变化，调用updater进行view的刷新

}


var updater = {                                  //指令不同的操作会调用不同的updater进行view的刷新
    updataTextContent: function(node,value){

    }
};

var utils = {                                    //可能使用到的工具
    trim : function(str){
        return str.replace(/(^\s*)|(\s*$)/g,"");
    },
    checkPref : function(str,pref){              //检测字符串是否有某个前缀
        return str.split("-")[0] === pref ? true : false;
    }
};

var cmdHandler = function(){
    var vm_name, textEle;          //textEle表示创建的文本节点，vm_name表示this._data中数据的名称;
    var Cmds = {
        "ra-text" : function(node){
            vm_name = node.getAttribute('ra-text');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            textEle = document.createTextNode(this._data[vm_name]);
            this.reactData[vm_name].push({node:node,cmd_key:"ra-text",cmd_val:vm_name});
            node.appendChild(textEle);
            node.removeAttribute('ra-text');
        },
        "ra-textnode" : function(node){
            vm_name = node.getAttribute('ra-textnode');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            textEle = document.createTextNode(this._data[vm_name]);
            this.reactData[vm_name].push({node:textEle,cmd_key:"ra-textnode",cmd_val:vm_name});
            node.parentNode.replaceChild(textEle,node);
        },
        "ra-model" : function(node){
            vm_name = node.getAttribute('ra-model');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-model",cmd_val:vm_name});
        },
        "ra-for" : function(node){
            var tempAttr = node.getAttribute('ra-for');
            vm_name = tempAttr.split(" ").pop();
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-for",cmd_val:tempAttr});
        }
    }
    function reactCmdWithNode(cmd,node){
        Cmds[cmd] && Cmds[cmd].call(this,node);
    }
    return {
        reactCmdWithNode : reactCmdWithNode
    }
}();