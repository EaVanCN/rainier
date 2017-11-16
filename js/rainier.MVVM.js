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
            if(b.indexOf(".") > 0){
                return '<span ra-deep="true" ra-textnode="'+ b +'"></span>';
            }else{
                return '<span ra-textnode="'+ b +'"></span>';
            }
           
        });
        ele.innerHTML = html;
    };
    var eles = document.querySelectorAll("[ra-text],[ra-textnode],[ra-model],[ra-for],[ra-if],[ra-on],[ra-show]");
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
                return self.reactData[key][0].val;
            },
            set : function(newVal) {
                if(newVal !== self._data[key]) {
                    self.reactData[key].forEach(function(){
                        this.val = newVal; 
                    })         
                    for(var i = 0,l = self.reactData[key].length; i<l; i++){    //self表示该vm对象，key表示数据的名称，最后一个参数表示对应的映射对象
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
            var key_val =  _vm._data[key];
            if(reactObj.cmd_val.split(".").length > 0){             //如果是一个引用类型的变量，且取值取的不是第一级值
                var tempArr = reactObj.cmd_val.split(".");
                var temp = _vm._data[tempArr[0]];
                for(var i = 1,l = tempArr.length; i < l; i++){
                    temp = temp[tempArr[i]];
                }
                key_val = temp;
            }
            reactObj.node.nodeValue = key_val;
        },
        "ra-text" : function(_vm, key, reactObj){
            var key_val =  _vm._data[key];
            if(reactObj.cmd_val.split(".").length > 0){             //如果是一个引用类型的变量，且取值取的不是第一级值
                var tempArr = reactObj.cmd_val.split(".");
                var temp = _vm._data[tempArr[0]];
                for(var i = 1,l = tempArr.length; i < l; i++){
                    temp = temp[tempArr[i]];
                }
                key_val = temp;
            }
            reactObj.node.nodeValue = key_val;
        },
        "ra-model" : function(_vm, key, reactObj){
            _vm.watcher(reactObj);
        },
        "ra-for" : function(_vm, key, reactObj){
            reactObj.node.style = reactObj
        },
        "ra-if" : function(_vm, key, reactObj){
            if(_vm._data[reactObj.cmd_val]){
                 if(reactObj.node._nextSibling){
                    reactObj.node._parent.insertBefore(reactObj.node,reactObj.node._nextSibling);
                 }else{
                    reactObj.node._parent.appendChild(reactObj.node);
                }
            }else{
                reactObj.node._nextSibling = reactObj.node.nextSibling;         //暂存其父节点和其下一个兄弟节点，然后再插入的时候如果有下一个兄弟，就直接插兄弟后面，如果没有，就在父节点中插入
                reactObj.node._parent = reactObj.node.parentNode;     
                reactObj.node.parentNode.removeChild(reactObj.node);
            }
        },
        "ra-show" : function(_vm, key, reactObj){
            if(!reactObj.node._displayMark){
                reactObj.node._displayMark = "mark";
                if(reactObj.node.style.display === "none"){
                    reactObj.node._displayType = "unset";
                }else{
                    reactObj.node._displayType = utils.getStyle(reactObj.node, "display");
                }
            }
            if(_vm._data[reactObj.cmd_val]){
                reactObj.node.style.display = reactObj.node._displayType || reactObj.node.style.display;
            }else{
                reactObj.node.style.display = "none";
            }
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
    var vm_name, textEle;                       //textEle表示创建的文本节点，vm_name表示this._data中数据的名称;
    var Cmds = {
        "ra-text" : function(node){
            var vm_temp_val,tempArr;
            vm_name = node.getAttribute('ra-text');
            vm_temp_val = this._data[vm_name];
           
            tempArr = vm_name.split(".");
            if(tempArr.length > 0){   //表示该变量是一个对象，且是其深节点层次的值
                var tempArr = vm_name.split(".");
                var temp = this._data[tempArr[0]];
                for(var i = 1,l = tempArr.length; i < l; i++){
                    temp = temp[tempArr[i]];
                }
                vm_temp_val = temp;
            }
            if(!this.reactData[tempArr[0]]) {
                this.reactData[tempArr[0]] = [];
            }
            textEle = document.createTextNode(" ");
            this.reactData[tempArr[0]].push({node:textEle,cmd_key:"ra-text",cmd_val:vm_name,val:this._data[tempArr[0]]});
            node.appendChild(textEle);
            node.removeAttribute('ra-text');
        },
        "ra-textnode" : function(node){
            var vm_temp_val,tempArr;
            vm_name = node.getAttribute('ra-textnode');
            vm_temp_val = this._data[vm_name];

            tempArr = vm_name.split(".");
            if(node.getAttribute("ra-deep")){   //表示该变量是一个对象，且是其深节点层次的值
                var temp = this._data[tempArr[0]];
                for(var i = 1,l = tempArr.length; i < l; i++){
                    temp = temp[tempArr[i]];
                }
                vm_temp_val = temp;
            }
            if(!this.reactData[tempArr[0]]) {
                this.reactData[tempArr[0]] = [];
            }
            textEle = document.createTextNode(" ");
            this.reactData[tempArr[0]].push({node:textEle,cmd_key:"ra-textnode",cmd_val:vm_name,val:this._data[tempArr[0]]});
            node.parentNode.replaceChild(textEle,node);
        },
        "ra-model" : function(node){
            vm_name = node.getAttribute('ra-model');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-model",cmd_val:vm_name,val:this._data[vm_name]});
            node.removeAttribute('ra-model');
        },
        "ra-for" : function(node){
            var tempAttr = node.getAttribute('ra-for');
            vm_name = tempAttr.split(" ").pop();
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-for",cmd_val:tempAttr,val:this._data[vm_name]});
            node.removeAttribute('ra-for');
        },
        "ra-if" : function(node){
            vm_name = node.getAttribute('ra-if');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-if",cmd_val:vm_name,val:this._data[vm_name]});
            node.removeAttribute('ra-if');
        },
        "ra-on" : function(node){
            vm_name = node.getAttribute('ra-on');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-on",cmd_val:vm_name,val:this._data[vm_name]});
            node.removeAttribute('ra-on');
        },
        "ra-show" : function(node){
            vm_name = node.getAttribute('ra-show');
            if(!this.reactData[vm_name]) {
                this.reactData[vm_name] = [];
            }
            this.reactData[vm_name].push({node:node,cmd_key:"ra-show",cmd_val:vm_name,val:this._data[vm_name]});
            node.removeAttribute('ra-show');
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
    },
    getStyle : function(node,attr){                         //获取计算后的样式
        if(typeof getComputedStyle != 'undefined'){
            var value = getComputedStyle(node,null).getPropertyValue(attr);
            return attr == 'opacity' ? value * 100 : value; //兼容不透明度，如果是不透明度，则返回整数方便计算
        }else if(typeof node.currentStyle != 'undefined'){
            if(attr == 'opacity'){ //兼容不透明度
                return Number(node.currentStyle.getAttribute('filter').match(/(?:opacity[=:])(\d+)/)[1]);
            }else{
                return node.currentStyle.getAttribute(attr);
            }
        }
    }
};