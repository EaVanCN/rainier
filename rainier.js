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
		"tooltip":function(options){
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

				$("[data-toggle='tooltip']").on("blur",function(){
					$("[data-toggle='tooltip']").each(function(){
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
			        var tooltip = "<div id='tooltip'>"+this.myTitle+"</div>";
			        $("body").append(tooltip);
			        $("#tooltip").addClass('tip').css({"top":(e.pageY+y) + "px","left":(e.pageX+x) + "px"}).show("fast");
			    }).mouseout(function(){
			        this.title = this.myTitle;
			        $("#tooltip").remove();
			    }).mousemove(function(e){
			         $("#tooltip").css({"top":(e.pageY+y) + "px","left":(e.pageX+x) + "px"});
			     });
			}

			function showTipByClick(){
				if($(this).data('showed')) {
			    	$(this).data('showed',0);
					this.title = this.myTitle;
			    	$("#tooltip").remove();
				}else{
					$("[data-toggle='tooltip']").each(function(){
						$(this).data('showed',0);
						if(this.myTitle) this.title = this.myTitle;
					})
					$(this).data('showed',1);
					$('#tooltip').remove();
					$(this).css('box-sizing','border-box');
					this.myTitle = this.title;
				    this.title = "";

					var tooltip = $("<div id='tooltip'>"+this.myTitle+"</div>");

				    var X = $(this).offset().top;
					var Y = $(this).offset().left;
					var W = parseInt($(this).css('width'));
					var H = parseInt($(this).css('height'));

				    tooltip.append("<div class='tooltip-arrow'></div>");
				    $("body").append(tooltip);
				    var width = parseInt($("#tooltip").css('width'));					//包括左右的两个padding 4，和边框 1 还应该包括三角形的6，在下面的计算中给出
				    var height = parseInt($("#tooltip").css('height'));					//包括上下的两个padding 1，和边框 1

					if(options.effect = "normal"){
					    switch (setDirection($(this))){
					    	case 1 :
					    		tooltip.addClass('tooltip-top');
								$("#tooltip").css({"top": (X-height-6) + "px","left":(Y+(W-width)/2) + "px"}).show();
					    		break;
					    	case 2 : 	//右侧
					    		tooltip.addClass('tooltip-right');
					    		$("#tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y+W+6) + "px"}).show();
					    		break;
					    	case 3 :
					    		tooltip.addClass('tooltip-bottom');
					    		$("#tooltip").css({"top": (X+H+6) + "px","left":(Y+(W-width)/2) + "px"}).show();
					    		break;
					    	case 4 :
					    		tooltip.addClass('tooltip-left');
					    		$("#tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y-width-6) + "px"}).show();
					    		break;
					    }
					}
				}
			}

			function showTipByHover(){
				$('#tooltip').remove();
				$(this).css('box-sizing','border-box');
				this.myTitle = this.title;
			    this.title = "";

				var tooltip = $("<div id='tooltip'>"+this.myTitle+"</div>");

			    var X = $(this).offset().top;
				var Y = $(this).offset().left;
				var W = parseInt($(this).css('width'));
				var H = parseInt($(this).css('height'));

			    tooltip.append("<div class='tooltip-arrow'></div>");
			    $("body").append(tooltip);
			    var width = parseInt($("#tooltip").css('width'));					//包括左右的两个padding 4，和边框 1 还应该包括三角形的6，在下面的计算中给出
			    var height = parseInt($("#tooltip").css('height'));					//包括上下的两个padding 1，和边框 1

				if(options.effect = "normal"){
				    switch (setDirection($(this))){
				    	case 1 :
				    		tooltip.addClass('tooltip-top');
							$("#tooltip").css({"top": (X-height-6) + "px","left":(Y+(W-width)/2) + "px"}).show();
				    		break;
				    	case 2 : 	//右侧
				    		tooltip.addClass('tooltip-right');
				    		$("#tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y+W+6) + "px"}).show();
				    		break;
				    	case 3 :
				    		tooltip.addClass('tooltip-bottom');
				    		$("#tooltip").css({"top": (X+H+6) + "px","left":(Y+(W-width)/2) + "px"}).show();
				    		break;
				    	case 4 :
				    		tooltip.addClass('tooltip-left');
				    		$("#tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y-width-6) + "px"}).show();
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
			    $("#tooltip").remove();
			}
		}
	})
})(jQuery)