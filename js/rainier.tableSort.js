/*--------------------------------------------------------------------------------------------------------
									tooltip V1.0 	2016-12-14

	index:表示根据某列进行排序，从零开始
--------------------------------------------------------------------------------------------------------*/
(function($){
	$.fn.extend({
		"raTableSort":function(options){
			options = $.extend({
				eventname:"click",
				index:[]
			},options);

			var flag=1;
			var $thisTable = $(this);
			if(options.index.length == 0){
				$('thead>tr>th',this).on(options.eventname,sortMain).addClass('sortable');
			}else{
				for(var i=0;i<options.index.length;i++){
					$('thead>tr>th:eq('+options.index[i]+')',this).on(options.eventname,sortMain).addClass('sortable');
				}
			}

    		function sortMain(){
    			var thIndex = $(this).index();
		        var aTdVal = tdValToArr(thIndex);
		        var aTdValSorted = flag==1?sortTdVal(aTdVal,flag--):sortTdVal(aTdVal,flag++);
		        sortTable(aTdValSorted); 
		    }

			function tdValToArr(thIndex){
			    var aTdVal = [];
			    $('tbody tr',$thisTable).each(function(){
			        var tdVal = $(this).children().eq(thIndex).text();
			        var index_val = $(this).index()+"_"+tdVal;
			        aTdVal.push(index_val);
			    })
			    return aTdVal;
			}

			function sortTdVal(aTdVal,way){             //why not sort()? will change to quicksort
			    var aVal = [];
			    var aTdValSorted = [];
			    for(var i=0;i<aTdVal.length;i++){
			        aVal.push(aTdVal[i]);
			    }
			    var temp = 0;
		        for(var i = 0 ; i < aVal.length - 1 ; i++){
		            for(var j = i + 1 ; j < aVal.length ; j++){
		                if(!((parseFloat(aVal[j].split('_')[1])<parseFloat(aVal[i].split('_')[1]))^way)){	//利用异或取反来模拟同或，达到减少代码的目的
		                    temp = aVal[i] ;
		                    aVal[i] = aVal[j] ;
		                    aVal[j] = temp ;
		                }
		            }
		        }
			    for(var k = 0;k<aVal.length;k++){
			        var newTdVal = aVal[k]+'_'+k;
			        aTdValSorted.push(newTdVal);
			    }
			    return aTdValSorted;
			}

			function sortTable(aTdValSorted){
			    var oldTr = [];
			    var tempTbody = $('<tbody style="display:none;"></tbody>')
			    for(var k = 0;k< aTdValSorted.length;k++){
			        oldTr[k] = parseInt(aTdValSorted[k].split('_')[0]);
			    }
			    for(var i = 0;i<oldTr.length;i++){
			        tempTbody.append($('tbody tr',$thisTable).eq(oldTr[i]).clone(true));
			    }
			    $('tbody',$thisTable).remove();
			    $thisTable.append(tempTbody);
			    $('tbody',$thisTable).show();
			}
			return this;
		}
	})
})(jQuery)

