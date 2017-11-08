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

Rainier.prototype.compiler = function(){         //将页面上指令进行提取,将{{}}转换为指令，并用span包裹。（预处理阶段），获取_data,DOM元素，指令的对应,(v-model在这个地方做对应？)
    var span, spans, textEle, vm_name, otherEles;           //spans表示ra-textNode选到的所有文本节点，span用于spans的循环；textEle表示创建的文本节点，vm_name表示this._data中数据的名称;otherEles表示页面其他指令部分
    for (var i = 0, length = this._ele.length; i < length; i++){
        var ele = this._ele[i], html = ele.innerHTML;
        html = html.replace(/\{\{(.*?)\}\}/g, function(a, b){
            return '<span ra-type="textNode" ra-textNode="'+ b +'"></span>';
        });
        ele.innerHTML = html;
    };
    //ra-text中的值和ra-textNode中需要创建新的文本节点，才能够获得节点、viewmodel的对应关系，所以直接在这里创建，并移除指令。
    spans = document.querySelectorAll("[ra-textNode],[ra-text]");
    for (var j = 0, l = spans.length; j < l; j++) {
        span = spans[j];
        vm_name = span.getAttribute('ra-textNode') || span.getAttribute('ra-text');
        if(!this.reactData[vm_name]) {
            this.reactData[vm_name] = {value: this._data[vm_name] || "", ele: []};
        }
        textEle = document.createTextNode(this._data[vm_name]);
        if(span.getAttribute("ra-type")){                                       //判断是新增的文本节点，还是通过ra-text指令产生的文本节点
            this.reactData[vm_name].ele.push({node:textEle,cmd:"ra-textNode"});
            span.parentNode.replaceChild(textEle,span);
        }else{
            this.reactData[vm_name].ele.push({node:span,cmd:"ra-text"});
            span.appendChild(textEle);
            span.removeAttribute('ra-text');
        }
    }
    otherEles = document.querySelectorAll("[ra-html],[ra-model],[ra-for],[ra-if]");     //选择其他指令
    for (var m = 0; m < otherEles.length; m++){

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

var utils = {                                //可能使用到的工具

}