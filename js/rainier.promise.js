/*--------------------------------------------------------------------------------------------------------
									promise V1.0 	2017-11-2
--------------------------------------------------------------------------------------------------------*/
function Promise(fn) {
	var	state = "pending",
    	value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled,onRejected) {
    	return new Promise(function(resolve,reject){
    		handle({
    			onFulfilled: onFulfilled || null,
    			onRejected: onRejected || null,
    			resolve: resolve,
    			reject: reject
    		});
    	});
    };
    
    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        
        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
        	ret;
        if(cb === null){
        	cb = state === 'fulfilled' ? callback.resolve : callback.reject;
        	cb(value);
        	return;
        }
        try {
            ret = cb(value);
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e);
        }
    }
    
    function resolve(newValue) {
    	if(newValue &&(typeof newValue === 'object' || typeof newValue === 'function')){
    		var then = newValue.then;
    		if(typeof then === 'function'){
    			then.call(newValue, resolve);
    			return;
    		}
    	}
    	value= newValue;
    	state = "fulfilled";
    	execute();
    }
    function reject(reason){
    	state = 'rejected';
    	value = reason;
    	execute();
    }
    function execute() {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }
    fn(resolve,reject);
}

/*  使用promise风格去封装ajax */
var rainierAJAX = (function(){
	return {
		get : function(url, data){
			return new Promise(function(resolve,reject){
				$.ajax({
					type: "GET",
					url: url,
					data: data,
					success: function(json){
						resolve(json);
					},
					error: function(reason){
						reject(reason);
					}
				})
			})
		},
		post : function(url, data){
			return new Promise(function(resolve,reject){
				$.ajax({
					type: "POST",
					url: url,
					data: data,
					success: function(json){
						resolve(json);
					},
					error: function(reason){
						reject(reason);
					}
				})
			})
		}
	}
})()