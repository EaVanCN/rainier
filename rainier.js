var RainierFn = {
	//返回顶部执行函数
	backTopFun : function (){
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $('#ra-backtop').show(): $('#ra-backtop').hide();
		if(!window.XMLHttpRequest){
			$('#ra-backtop').css("top", st + winh - 166);
		}
	}
}
/*--------------------------------------------------------------------------------------------------------
									backtop V2.0 	2017-09-20

页面无需dom文档，只需引入jquery，另外执行$(function(){$(window).on("scroll",RainierFn.backTopFun);RainierFn.backTopFun();});
--------------------------------------------------------------------------------------------------------*/
$(function(){
	var $backTopEle = $('<div id="ra-backtop" class="ra-backtop"><div class="ra-back-top-arrow"></div></div>').appendTo($("body")).click(function(){
		$("html, body").animate({ scrollTop: 0 }, 200);
	});
})

/*--------------------------------------------------------------------------------------------------------
									dropdown V1.0 	2016-11-23

需要给dropdown一个容器，容器名称叫做ra-dropdown。
需要给一个触发按钮，按钮要有	ra-dropdown-toggle这个类名。
同时要有ra-dropdown-arrow-down,或者ra-dropdown-arrow-right,用以表示右侧的箭头指向下或者指向右。
下拉菜单ul中要有ra-dropdown-menu这个类名，希望菜单出现在右侧要有ra-dropdown-meen-right这个类名。

参考：
	<div class="ra-dropdown">
		<button class="btn btn-sml ra-dropdown-toggle" type="button">下拉菜单<span class="ra-dropdown-arrow-down"></span></button>
        <ul class="ra-dropdown-menu">
            <li><a href="#">下拉选项1</a></li>
            <li><a href="#">this is dropdown</a></li>
            <li><a href="#">一条测试数据</a></li>
            <li><a href="#">另一条测</a></li>
        </ul>
    </div>
--------------------------------------------------------------------------------------------------------*/
$(function(){
	if($(".ra-dropdown-toggle")){
		$(".ra-dropdown-toggle").click(function(){
		    if($(this).data('showing') == "true"){
		        $(this).next('.ra-dropdown-menu').hide();
		        $(this).data('showing','false');
		    }else{
		        $(this).next('.ra-dropdown-menu').show();
		        $(this).data('showing','true');
		    }
		})
	}
})
