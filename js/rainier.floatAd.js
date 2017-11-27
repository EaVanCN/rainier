/*--------------------------------------------------------------------------------------------------------
                                    floatAd.js V1.0 	2016-11-25
    适用于页面浮动广告的插件
--------------------------------------------------------------------------------------------------------*/
//引入js自动生成DOM，配置参数插入内容


//3种方式，1是图片模式，2是文字模式,捕获方式：将页面上的某一部分当做悬浮内容进行飘动
//其他可配置参数包括：大小，漂浮的速度，是否可关闭，链接内容（如果不填就无链接），背景图片，"文字方式"的文字内容,"图片方式的图片"，捕获元素的获取，
(function($){
	var raFloatAd = function(options){
		this.interval = null;
		this.options = options;
		this.init(options);		//创建dom对象并插入文档中；

		this.bindFn();		//为创建的对象绑定各种行为；
		this.start();		//将创建的对象运动起来；
	}
	raFloatAd.prototype.init = function(options){
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

		var body = document.getElementsByTagName("body")[0];
		body.appendChild(adDOM);
	}
	raFloatAd.prototype.bindFn = function(){
	
	}	
	raFloatAd.prototype.start = function(){		//设置定时器，开始运动
		var self = this;
		function adMove(){
			var step = 10;
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

			if(adLeft + adWidth + leftDev >= clientWidth + scrollLeft || adLeft+leftDev <= scrollLeft){
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
	
	$.extend({
		"floatAd":function(options){
			options = $.extend({
                width : 318,
				height: 128,
				startPos: [10,10],
				size: [,],
				speed: 1
			},options);
			new raFloatAd(options);
		}
	})
})(jQuery)

