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
    this.parser();
    this.observer();
}

Rainier.prototype.compiler = function(){            //将页面上指令进行提取,将{{}}转换为指令，并用span包裹。（预处理阶段），获取_data,DOM元素，指令的对应,(v-model在这个地方做对应？)
    var self = this;
    var textEle, vm_name, otherEles;                //textEle表示创建的文本节点，vm_name表示this._data中数据的名称;otherEles表示页面其他指令部分
    for (var i = 0, length = this._ele.length; i < length; i++){
        var ele = this._ele[i], html = ele.innerHTML;
        html = html.replace(/\{\{(.*?)\}\}/g, function(a, b){       
            return '<span ra-textnode="'+ b +'"></span>';
        });
        ele.innerHTML = html;
    };
    var eles = document.querySelectorAll("[ra-text],[ra-textnode],[ra-model],[ra-for],[ra-if],[ra-on]");
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
    var self = this;
    for (var key in this.reactData){
        for(var i = 0 ,l = this.reactData[key].length; i< l; i++){
            updater.update(self, key, self.reactData[key][i]);
        }
    }
}

Rainier.prototype.watcher = function(reactObj){
    var self = this;
    reactObj.node.addEventListener('change',function(){
        dataModel = reactObj.cmd_val;
        self._data[dataModel] = this.value;
    })
    reactObj.node.addEventListener('keyup',function(e) {
        dataModel = reactObj.cmd_val;
        self._data[dataModel] = this.value;
    })

}

Rainier.prototype.observer = function(){         //监控viewmodel的变化，调用updater进行view的刷新
    var self = this;
    Object.keys(self.reactData).forEach(function(key){
        Object.defineProperty(self._data, key, {
            get : function(){
                return self.reactData[key].val;
            },
            set : function(newVal) {
                if(newVal != self._data[key]) {
                    self.reactData[key].val = newVal;          
                    for(var i = 0,l = self.reactData[key].length; i<l; i++){
                        updater.update(self, key, self.reactData[key][i]);
                    }
                }
            }
        })
    })
}
var updater = (function(){                                  //指令不同的操作会调用不同的updater进行view的刷新
    var updateFn = {
        "ra-textnode" : function(_vm, key, reactObj){       //_vm对象, key：数据的名称, reactObj：映射关系对象
            reactObj.node.nodeValue = _vm._data[key];
        },
        "ra-text" : function(_vm, key, reactObj){
            reactObj.node.nodeValue = _vm._data[key];
        },
        "ra-model" : function(_vm, key, reactObj){
            _vm.watcher(reactObj);
        }
    };
    function update(_vm, key, reactObj){
        updateFn[reactObj.cmd_key] && updateFn[reactObj.cmd_key].call(this, _vm, key, reactObj);
    }
    return {
        update : update
    }
})();

var cmdHandler = function(){
    var vm_name, textEle;          //textEle表示创建的文本节点，vm_name表示this._data中数据的名称;
    var Cmds = {
        "ra-text" : function(node){
            vm_name = node.getAttribute('ra-text');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            textEle = document.createTextNode(" ");
            this.reactData[vm_name].push({node:textEle,cmd_key:"ra-text",cmd_val:vm_name,val:this._data[vm_name]});
            node.appendChild(textEle);
            node.removeAttribute('ra-text');
        },
        "ra-textnode" : function(node){
            vm_name = node.getAttribute('ra-textnode');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            textEle = document.createTextNode(" ");
            this.reactData[vm_name].push({node:textEle,cmd_key:"ra-textnode",cmd_val:vm_name,val:this._data[vm_name]});
            node.parentNode.replaceChild(textEle,node);
        },
        "ra-model" : function(node){
            vm_name = node.getAttribute('ra-model');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-model",cmd_val:vm_name,val:this._data[vm_name]});
        },
        "ra-for" : function(node){
            var tempAttr = node.getAttribute('ra-for');
            vm_name = tempAttr.split(" ").pop();
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-for",cmd_val:tempAttr,val:this._data[vm_name]});
        },
        "ra-if" : function(node){
            vm_name = node.getAttribute('ra-if');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-if",cmd_val:vm_name,val:this._data[vm_name]});
        },
        "ra-on" : function(node){
            vm_name = node.getAttribute('ra-on');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-on",cmd_val:vm_name,val:this._data[vm_name]});
        }
    }
    function reactCmdWithNode(cmd,node){
        Cmds[cmd] && Cmds[cmd].call(this,node);
    }
    return {
        reactCmdWithNode : reactCmdWithNode
    }
}();

var utils = {                                    //可能使用到的工具
    trim : function(str){
        return str.replace(/(^\s*)|(\s*$)/g,"");
    },
    checkPref : function(str,pref){              //检测字符串是否有某个前缀
        return str.split("-")[0] === pref ? true : false;
    },
    typeOf : function(obj){                      //判断类型
        if (typeof obj === "number") return "number";
        if (typeof obj === "undefined") return "undefined";
        if (typeof obj === "boolen") return "boolen";
        if (typeof obj === "string") return "string";
        if (typeof obj === "function") return "function";
        if (typeof obj === "object"){
            if(!obj && typeof obj != "undefined" && obj != 0) return "null";
            if(Object.prototype.toString.call(obj) == "[object Array]") return "array";
            return "object";
        }
    }
};