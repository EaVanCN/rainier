/*--------------------------------------------------------------------------------------------------------
                                    floatAd.js V1.0 	2016-11-25
    适用于页面浮动广告的插件
--------------------------------------------------------------------------------------------------------*/
//引入js自动生成DOM，配置参数插入内容


//3种方式，1是图片模式，2是文字模式,捕获方式：将页面上的某一部分当做悬浮内容进行飘动
//其他可配置参数包括：大小，漂浮的速度，是否可关闭，链接内容（如果不填就无链接），背景图片，"文字方式"的文字内容,"图片方式的图片"，捕获元素的获取
(function($){
	var raFloatAd = function(options){
		this.interval = null;
		this.options = options;
		this.init(options);		//创建dom对象并插入文档中；
		this.bindFn();		//为创建的对象绑定各种行为；
		this.start();		//将创建的对象运动起来；
	}
	raFloatAd.prototype.init = function(options){
		var deg = options.dir;
		//this.Xdir = Math.sin(deg*0.017453293);
		//this.Ydir = -(Math.cos(deg*0.017453293));
		this.Xdir = 1;
		this.Ydir = 1;
		var adWidth = options.size[0] || options.width;
		var adHeight = options.size[1] || options.height;
		var adLeft = options.startPos[0];
		var adTop = options.startPos[1];
		var adDOM = this.adDOM = document.createElement("div");
		adDOM.setAttribute("class","ra-float");
		adDOM.style.width = adWidth + "px";
		adDOM.style.height = adHeight + "px";
		adDOM.style.left = adLeft + "px";
		adDOM.style.top = adTop + "px";
		var contentDOM = this.contentDOM = document.createElement("div");		//用于悬浮框内层的容器
		contentDOM.setAttribute("class","ra-float-con");
		if(options.closeBtn){
			var closeDOM = this.closeDOM = document.createElement("div");			//悬浮框关闭按钮
			var closeIMG = this.closeIMG = document.createElement("img");
			closeIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKxSURBVDiNpZO9T5NhFMXP87wfz9uPKG1tC9gPEKltpCYYBw2BmMjEwoSKI6ADERcQJWJqsaVV/wEWZjAkRhwYDHEj4ghC0GBCH0mwBpqWvi21n6+TFUUXvePNvb+c5JxDNE3D/4z4+6K5uZnpTaZ+kUq9VpvNToh2PJVMbgB0tiILc+8WFxOH78lhBa0X27ot5pqpy+3ttaebmiBJEgghKJVKiHGOt8vLiWw20/16YWHpCOBSR0eb0+l6c9brlYuFAhpPNYJSCkIpCCGIbW1BlmVs8Vghvvv16qu5F/MAQAGgs7PTYrPa5hucTvnC+VbcujmA96ur2E+noaoqVldWcK2nB+daWlBnr5WtFutU150uVgVQxnrcbpcle5CF3++Hy+XCyPAwPm1u4sPGBgb6+uD1euH3+6GqaTjr62vtB/b+KkBvMPRKkgi9XofHoRC2t7fhcDhwf3QUtwcH4fP5wDlHNBqFyWyGxCQYjMYbVYAkUE88HkdaVaHodQgEH1UhP55D4RBqLCYcZDPY292FKAjmqo2KjiUpobWFQh6lUhG53AEymUzVHQ0aiqUicrksBCpAkkRQQk1VBUxmCYUxKIwhn8shGAjC5/MhxmPgnKPB3YBgIIhMOgOZyWCMgSns40+AwmaYwvAtl8NEcAIejwecc4TDIYQnQ+Ccw+12Y/zBQ6j7KhQmQydLs1WAUCHTCpN3FIVhfX0dnHNMRidR76jDSWc9njyNgn/mWFtbg06vQBTFPU0T534JUiAw3k0F+jyV2mflUhn2OhtEUYQgCCiXy/iyE4fMZFgs5nwF5MrY3bGlI1GOPIu0UWgvCSEnDAYjjEYj9Do9stkMUvsp5PP5HRBt8N7Ig/k/dgEAIpGIhQiVHhBynRJyBiBJDZUEqWgzOt2x6aGhofxfy/Qv8x0ORAqF5EmwnQAAAABJRU5ErkJggg==");
			closeDOM.setAttribute("class","ra-float-btn");
			closeDOM.appendChild(closeIMG);
			contentDOM.appendChild(closeDOM);
		}

		if(options.type == "img"){
			var adIMG = this.adIMG = document.createElement("img");
			adIMG.setAttribute("src",options.src);
			adIMG.setAttribute("class","ra-float-img");
			contentDOM.appendChild(adIMG);
		}
		adDOM.appendChild(contentDOM);
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(adDOM);
	}
	raFloatAd.prototype.bindFn = function(){	//绑定鼠标移入移出，关闭按钮关闭等事件
		var self = this;
		EventUtil.addHandler(this.adDOM,"mouseover",function(){
			clearInterval(self.interval);
		});
		EventUtil.addHandler(this.adDOM,"mouseout",function(){
			self.start();
		});
		if(this.closeDOM){												//如果有关闭按钮才会绑定事件
			EventUtil.addHandler(this.closeDOM,"click",function(){
				clearInterval(self.interval);
				self.adDOM.parentNode.removeChild(self.adDOM);
			});
		}
	}	
	raFloatAd.prototype.start = function(){		//设置定时器，开始运动
		var self = this;
		function adMove(){
			var step = 1;

			var adLeft = parseInt(utils.getStyle(self.adDOM,"left"));	//元素当前所处的位置
			var adTop = parseInt(utils.getStyle(self.adDOM,"top"));
			var adWidth = parseInt(utils.getStyle(self.adDOM,"width"));
			var adHeight = parseInt(utils.getStyle(self.adDOM,"height"));
			//获取所需的各种宽高
			var scrollLeft = utils.getScrollLeft();
			var scrolltop = utils.getScrollTop();
			var clientWidth = utils.getClientWidth();
			var clientHeight = utils.getClientHeight();
			console.log(scrollLeft +"---"+scrolltop+"---"+clientWidth+"---"+clientHeight);

			var leftDev = self.Xdir * step;		//水平方向偏移量
			var topDev = self.Ydir * step;		//垂直方向偏移量

			if(adTop <= scrolltop){					//以下四个判断用于在用户屏幕滚动后，将悬浮广告修正到正确位置
				adTop = scrolltop;
				self.adDOM.style.top = adTop + "px";
			};
			if(adTop + adHeight >= scrolltop + clientHeight){
				adTop = scrolltop + clientHeight - adHeight;
				self.adDOM.style.top = adTop + "px";
			};
			if(adLeft <= scrollLeft){
				adLeft = scrollLeft;
				self.adDOM.style.left = adLeft + "px";
			};
			if(adLeft + adWidth >= scrollLeft + clientWidth){
				adLeft = scrollLeft + clientWidth - adWidth;
				self.adDOM.style.left = adLeft + "px";
			};


			if(adLeft + adWidth + leftDev >= clientWidth + scrollLeft || adLeft+leftDev <= scrollLeft){		//以下两个判断用于在要出屏幕后进行方向的修正
				self.Xdir = -(self.Xdir);
			}
			if(adTop + adHeight + topDev >= clientHeight + scrolltop || adTop+topDev <= scrolltop){
				self.Ydir = -(self.Ydir);
			}
			var left = parseInt(utils.getStyle(self.adDOM,"left")) + (self.Xdir * step);
			var top = parseInt(utils.getStyle(self.adDOM,"top")) + (self.Ydir * step);
			self.adDOM.style.left = left + "px";
			self.adDOM.style.top = top + "px";
		}
		this.interval = setInterval(adMove, 10);
	}

	var utils = (function(){
		function getStyle(node,attr){                         //获取计算后的样式
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
		function getScrollTop(){
			var scrollTop = 0;
			if(document.documentElement && document.documentElement.scrollTop){
				scrollTop=document.documentElement.scrollTop;
			}else if(document.body){
				scrollTop=document.body.scrollTop;
			}
			return scrollTop;
		}
		function getScrollLeft(){
			var scrollLeft = 0;
			if(document.documentElement && document.documentElement.scrollLeft){
				scrollLeft=document.documentElement.scrollLeft;
			}else if(document.body){
				scrollLeft=document.body.scrollLeft;
			}
			return scrollLeft;
		}
		function getClientHeight(){			// 取窗口可视范围的高度 
			var clientHeight=0;
			if(document.body.clientHeight&&document.documentElement.clientHeight){
				var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
			}else{
				var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
			}
			return clientHeight;
		}
		function getClientWidth(){			// 取窗口可视范围的宽度 
			var clientWidth=0;
			if(document.body.clientWidth&&document.documentElement.clientWidth){
				var clientWidth = (document.body.clientWidth<document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;        
			}else{
				var clientWidth = (document.body.clientWidth>document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;    
			}
			return clientWidth;
		}
		return {
			getStyle : getStyle,
			getScrollTop : getScrollTop,
			getClientHeight : getClientHeight,
			getScrollLeft : getScrollLeft,
			getClientWidth : getClientWidth,
		}
	})();
	
	var EventUtil = {
		addHandler : function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		},
		removeHandler : function(element, type, handler){
			if(element.removeEventListener){
				element.removeEventListener(type, handler, false);
			}else if(element.detachEvent){
				element.detachEvent("on" + type, handler);
			}else{
				element["on" + type] = null;
			}
		},
		getEvent : function(event){
			return event ? event : window.event;
		},
		getTarget : function(event){
			return event.target || event.srcElement;
		},
		preventDefault : function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		stopPropagation : function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		}
	}
	$.extend({
		"floatAd":function(options){
			options = $.extend({
                width : 318,
				height: 128,
				startPos: [10,10],
				size: [,],
				speed: 1,			//行进速度，暂未使用
				dir : 135,			//dir表示角度，暂未完成
				closeBtn : true		//是否有closeBtn
			},options);
			new raFloatAd(options);
		}
	})
})(jQuery)