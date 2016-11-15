$(function(){
	$("[data-toggle='tooltip']").hover(function(){
		$(this).css('box-sizing','border-box');
		this.myTitle = this.title;
        this.title = "";

        var X = $(this).offset().top;
		var Y = $(this).offset().left;
		var W = parseInt($(this).css('width'));
		var H = parseInt($(this).css('height'));

		var tooltip = $("<div id='tooltip'>"+this.myTitle+"</div>");

		var direction;
		switch ($(this).data('direction')){
			case "top" :
				direction = 1;
				tooltip.addClass('tooltip-top');
				break;
			case "right" :
				direction = 2;
				tooltip.addClass('tooltip-right');
				break;
			case "bottom" :
				direction = 3;
				tooltip.addClass('tooltip-bottom');
				break;
			case "left" : 
				direction = 4;
				tooltip.addClass('tooltip-left');
				break;
			default:
				direction = 2;
				tooltip.addClass('tooltip-right');
				break;
		}

        tooltip.append("<div class='tooltip-arrow'></div>");
        $("body").append(tooltip);
        var width = parseInt($("#tooltip").css('width'));					//包括左右的两个padding 4，和边框 1 和三角形的6
        var height = parseInt($("#tooltip").css('height'));					//包括上下的两个padding 1，和边框 1

        switch (direction){
        	case 1 :
				$("#tooltip").css({"top": (X-height-6) + "px","left":(Y+(W-width)/2) + "px"}).show();
        		break;
        	case 2 : 	//右侧
        		$("#tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y+W+6) + "px"}).show();
        		break;
        	case 3 :
        		$("#tooltip").css({"top": (X+H+6) + "px","left":(Y+(W-width)/2) + "px"}).show();
        		break;
        	case 4 :
        		$("#tooltip").css({"top": (X+(H-height)/2) + "px","left":(Y-width-6) + "px"}).show();
        		break;
        }
	},function(){
		this.title = this.myTitle;
        $("#tooltip").remove();
	})
})