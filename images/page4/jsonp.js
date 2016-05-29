// JavaScript Document


function jsonp(options){
	options = options||{};
	if(!options.url){
		return;
	}	
	options.data = options.data||{};
	options.cbName = options.cbName||'cb';
	options.timeout=options.timeout||0;
	var fnName = ('jsonp_'+Math.random()).replace('.','');
	options.data[options.cbName]=fnName;
	var arr = [];
	for(var name in options.data){
		arr.push(name+'='+encodeURIComponent(options.data[name]));	
	}
	str = arr.join('&');
	window[fnName] = function(json){
		options.success&&options.success(json);
		clearTimeout(timer);
		oHead.removeChild(oS);	
	}
	var oS = document.createElement('script');
	oS.src = options.url+'?'+str;
	var oHead = document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
	if(options.timeout){
		var timer = setTimeout(function(){
			window[fnName]=function(){};
			options.error&&options.error();	
		},options.timeout)	
	}
}