/** jQuery Easing */
jQuery.easing = {
    easein: function(x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeinout: function(x, t, b, c, d) {
        if (t < d / 2) return 2 * c * t * t / (d * d) + b;
        var a = t - d / 2;
        return - 2 * c * a * a / (d * d) + 2 * c * a / d + c / 2 + b
    },
    easeout: function(x, t, b, c, d) {
        return - c * t * t / (d * d) + 2 * c * t / d + b
    },
    expoin: function(x, t, b, c, d) {
        var a = 1;
        if (c < 0) {
            a *= -1;
            c *= -1
        }
        return a * (Math.exp(Math.log(c) / d * t)) + b
    },
    expoout: function(x, t, b, c, d) {
        var a = 1;
        if (c < 0) {
            a *= -1;
            c *= -1
        }
        return a * ( - Math.exp( - Math.log(c) / d * (t - d)) + c + 1) + b
    },
    expoinout: function(x, t, b, c, d) {
        var a = 1;
        if (c < 0) {
            a *= -1;
            c *= -1
        }
        if (t < d / 2) return a * (Math.exp(Math.log(c / 2) / (d / 2) * t)) + b;
        return a * ( - Math.exp( - 2 * Math.log(c / 2) / d * (t - d)) + c + 1) + b
    },
    bouncein: function(x, t, b, c, d) {
        return c - jQuery.easing['bounceout'](x, d - t, 0, c, d) + b
    },
    bounceout: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
        }
    },
    bounceinout: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing['bouncein'](x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing['bounceout'](x, t * 2 - d, 0, c, d) * .5 + c * .5 + b
    },
    elasin: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },
    elasout: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
    },
    elasinout: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
    },
    backin: function(x, t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    backout: function(x, t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    backinout: function(x, t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
    },
    linear: function(x, t, b, c, d) {
        return c * t / d + b
    }
};
/*--------------------------------------------------------------------------------------------------------
									tooltip V1.0 	2016-11-16

	必须要在dom内加上data-toggle="tooltip"，该元素使用tooltip插件才能各种正常

	eventname 可选择触发方式：	click --- 点击触发
								mouserover --- 悬浮触发
								mousedown --- 点击触发，松开消失(暂有问题，不推荐使用)
	effect 可选择呈现形式：	normal --- 在元素中指定data-direction，将在指定方向出tip
							follow --- 在元素中不指定方向，会在鼠标下面进行跟随
	direction: 	用于指定出现的位置。dom中的data-direction具有更高的效力，否则按照插件列表中的direction参
				数走，如果二者都没有设置，则tip会出现在右侧
--------------------------------------------------------------------------------------------------------*/
(function($){
	$.fn.extend({
		"raTooltip":function(options){
			options = $.extend({
				eventname:"click",
				effect:"normal",
				direction:"right"
			},options);

			if(options.effect == "normal" ) {
				if(options.eventname == "mouseover"){
					$(this).on('mouseover',showTipByHover);
					$(this).on('mouseout',removeTip);
				}
				if(options.eventname == "mousedown"){
					$(this).on('mousedown',showTipByHover);
					$(this).on('mouseup',removeTip);
				}
				if(options.eventname == "click"){
					$(this).on('click',showTipByClick);
				}

				$("[data-toggle='ra-tooltip']").on("blur",function(){
					$("[data-toggle='ra-tooltip']").each(function(){
						$(this).data('showed',0);
						if(this.myTitle) this.title = this.myTitle;
					})
					$("#tooltip").remove();
				})
			}
			if(options.effect == "follow") {
				var x = 10;
			    var y = 20;
			    $(this).mouseover(function(e){
			        this.myTitle = this.title;
			        this.title = "";
			        var tooltip = "<div id='ra-tooltip'>"+this.myTitle+"</div>";
			        $("body").append(tooltip);
			        $("#ra-tooltip").addClass('tip').css({"top":(e.pageY+y) + "px","left":(e.pageX+x) + "px"}).show("fast");
			    }).mouseout(function(){
			        this.title = this.myTitle;
			        $("#ra-tooltip").remove();
			    }).mousemove(function(e){
			         $("#ra-tooltip").css({"top":(e.pageY+y) + "px","left":(e.pageX+x) + "px"});
			     });
			}

			function showTipByClick(){
				if($(this).data('showed')) {
			    	$(this).data('showed',0);
					this.title = this.myTitle;
			    	$("#ra-tooltip").remove();
				}else{
					$("[data-toggle='ra-tooltip']").each(function(){
						$(this).data('showed',0);
						if(this.myTitle) this.title = this.myTitle;
					})
					$(this).data('showed',1);
					$('#ra-tooltip').remove();
					$(this).css('box-sizing','border-box');
					this.myTitle = this.title;
				    this.title = "";

					var tooltip = $("<div id='ra-tooltip'>"+this.myTitle+"</div>");

				    var X = $(this).offset().top;
					var Y = $(this).offset().left;
					var W = parseInt($(this).css('width'));
					var H = parseInt($(this).css('height'));

				    tooltip.append("<div class='ra-tooltip-arrow'></div>");
				    $("body").append(tooltip);
				    var width = parseInt($("#ra-tooltip").css('width'));					//包括左右的两个padding 4，和边框 1 还应该包括三角形的6，在下面的计算中给出
				    var height = parseInt($("#ra-tooltip").css('height'));					//包括上下的两个padding 1，和边框 1

					if(options.effect = "normal"){
					    switch (setDirection($(this))){
					    	case 1 :
					    		tooltip.addClass('ra-tooltip-top');
								$("#ra-tooltip").css({"top": (X-height-6) + "px","left":(Y+(W-width)/2) + "px"}).show();
					    		break;
					    	case 2 : 	//右侧
					    		tooltip.addClass('ra-tooltip-right');
					    		$("#ra-tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y+W+6) + "px"}).show();
					    		break;
					    	case 3 :
					    		tooltip.addClass('ra-tooltip-bottom');
					    		$("#ra-tooltip").css({"top": (X+H+6) + "px","left":(Y+(W-width)/2) + "px"}).show();
					    		break;
					    	case 4 :
					    		tooltip.addClass('ra-tooltip-left');
					    		$("#ra-tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y-width-6) + "px"}).show();
					    		break;
					    }
					}
				}
			}

			function showTipByHover(){
				$('#ra-tooltip').remove();
				$(this).css('box-sizing','border-box');
				this.myTitle = this.title;
			    this.title = "";

				var tooltip = $("<div id='ra-tooltip'>"+this.myTitle+"</div>");

			    var X = $(this).offset().top;
				var Y = $(this).offset().left;
				var W = parseInt($(this).css('width'));
				var H = parseInt($(this).css('height'));

			    tooltip.append("<div class='ra-tooltip-arrow'></div>");
			    $("body").append(tooltip);
			    var width = parseInt($("#ra-tooltip").css('width'));					//包括左右的两个padding 4，和边框 1 还应该包括三角形的6，在下面的计算中给出
			    var height = parseInt($("#ra-tooltip").css('height'));					//包括上下的两个padding 1，和边框 1

				if(options.effect = "normal"){
				    switch (setDirection($(this))){
				    	case 1 :
				    		tooltip.addClass('ra-tooltip-top');
							$("#ra-tooltip").css({"top": (X-height-6) + "px","left":(Y+(W-width)/2) + "px"}).show();
				    		break;
				    	case 2 : 	//右侧
				    		tooltip.addClass('ra-tooltip-right');
				    		$("#ra-tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y+W+6) + "px"}).show();
				    		break;
				    	case 3 :
				    		tooltip.addClass('ra-tooltip-bottom');
				    		$("#ra-tooltip").css({"top": (X+H+6) + "px","left":(Y+(W-width)/2) + "px"}).show();
				    		break;
				    	case 4 :
				    		tooltip.addClass('ra-tooltip-left');
				    		$("#ra-tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y-width-6) + "px"}).show();
				    		break;
				    }
				}
			}

			function setDirection($this){
				var direction ;
					switch ($this.data('direction') ? $this.data('direction') : options.direction){
						case "top" :
							direction = 1;
							break;
						case "right" :
							direction = 2;
							break;
						case "bottom" :
							direction = 3;
							break;
						case "left" : 
							direction = 4;
							break;
						default:
							direction = 2;
							break;
					}
				return direction;
			}

			function removeTip(){
				this.title = this.myTitle;
			    $("#ra-tooltip").remove();
			}
		}
	})
})(jQuery)
/*--------------------------------------------------------------------------------------------------------
									lavaLamp V1.0 	2017-09-16
	跑马灯效果的导航插件，使用cookie进行点击记录，跳转显示。
	可选参数有fx:动画效果，speed：速度。
	直接在包含li的容器上调用插件
--------------------------------------------------------------------------------------------------------*/
(function($) {
    $.fn.lavaLamp = function(o) {
        o = $.extend({
            fx: "linear",
            speed: 500,
            click: function() {}
        },
        o || {});
        return this.each(function() {
        	$(this).addClass('lavaLamp');
        	var i = 0;
        	$(this).children().each(function(){
        		$(this).data("number",(i++)+"");
        		$(this).addClass('lavaLi');
        	})
        	
            var b = $(this),
            	$back = $('<li class="back"><div class="left"></div><div class="arrow"><span class="icon"></span></div></li>').appendTo(b),
            	$li = $("li", this);
            var liCount = $(".lavaLamp li").size();
            var curLiNum = parseInt($.cookie('cookie-currentLi'));
            
            if(curLiNum<liCount){
            	curr = $($li[curLiNum]).addClass("current")[0]; 
            }else{
            	curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0];
            }
            
            setCurr(curr);
            
            $li.not(".back").hover(function() {
            		move(this);
	            },function(){
	            	move(curr);
	            }
            );
            
            $li.click(function(e) {
                $.cookie('cookie-currentLi',$($(this)).data("number"));
                return o.click.apply(this, [e, this])
            });
            

            function setCurr(a) {
                $back.css({
                    "left": a.offsetLeft + "px",
                    "width": a.offsetWidth + "px"
                });
                curr = a
            };
            function move(a) {
                $back.each(function() {
                    $.dequeue(this, "fx")
                }).animate({
                    width: a.offsetWidth,
                    left: a.offsetLeft
                },
                o.speed, o.fx)
            }
        })
    }
})(jQuery);