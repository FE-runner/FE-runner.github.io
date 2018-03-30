var getFlashVersion= function(){
var hasFlash=0;��������//�Ƿ�װ��flash
var flashVersion=[0];����//flash�汾
if(document.all){var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); if(swf) {hasFlash=1;var VSwf=swf.GetVariable("$version");flashVersion=VSwf.split(" ")[1].split(",");}}
else{if (navigator.plugins && navigator.plugins.length > 0){var swf=navigator.plugins["Shockwave Flash"];if (swf){hasFlash=1; var words = swf.description.split(" "); for (var i = 0; i < words.length; ++i){  if (isNaN(parseInt(words[i]))) continue; flashVersion=words[i].split(".")}	}}}
return {f:hasFlash,v:flashVersion};
}
var swfIDDic={}
var getSwfObj= function(id){
	 return document[swfIDDic[id]];
};

var needHSwfId
var needHmin
var needHmax
var setHeight=function(){
	var height=document.documentElement.clientHeight||window.innerHeight;
if(needHmin&&height<needhmin){height=needhmin} if(needhmax&&height="">needHmax){height=needHmax}
	document.getElementById(needHSwfId) && (document.getElementById(needHSwfId).style.height=height-42+"px");
}

function setSWFHeight(id,min,max){
needHSwfId=id;
needHmin=min;
needHmax=max;
window.onresize=setHeight;
if(navigator.userAgent.indexOf('MSIE 6')!=-1){
	window.attachEvent("onresize",setHeight);
}
setHeight();

}
function hackSwfHide(able){if(able){document.body.style.overflowX="hidden";}else{document.body.style.overflowX="auto";}}
var getSwfStr=function(swfid,url,width,height,flashvars,params){
		var v='', fv='';
		for(var i in flashvars){fv +="&"+i+"="+flashvars[i];}
		this.opt={'base':'','wmode':'transparent','allowfullscreen':'true','allowScriptAccess':'always','quality':'high'}//Window Opaque Transparent
		for(var i in params){this.opt[i] = params[i];}
		this.opt["flashvars"]=fv;
		v+='<object id="'+swfid+'" name="'+swfid+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'">';
		v+='<param name="movie" value="'+url+'">';
		for(var i in opt){v+='<param name="'+i+'" value="'+this.opt[i]+'">';}
		v+='<embed id="'+swfid+'_embed" name="'+swfid+'_embed" src="'+url+'" width="'+ width +'" height="'+ height +'" ';="" for(var="" i="" in="" opt){="" v+="i+'="'+this.opt[i]+'"" }="" ;="" alert(v)="" return="" v;="" function="" insertswfv2(elm,url,width,height,flashvars,params,version){="" if(!document.getelementbyid(elm))return;="" var="" swfid="elm+"_swf";" if(document.getelementbyid(swfid))swfid+="("_"+Math.random());" swfiddic[elm]="navigator.appName.indexOf("Microsoft")" !="-1?swfid:swfid+"_embed";" fver="getFlashVersion();" ver="[10];" if(version){ver="version.split(".")};" isver="fver.f" if(isver){="" if(parseint(fver.v[i])<parseint(ver[i])){isver="false;break}" if(isver)="" {="" document.getelementbyid(elm).innerhtml="getSwfStr(swfid,url,width,height,flashvars,params);" }else{="" +version+';�����������µ�flash���--=""><a href="http://get.adobe.com/flashplayer/" target="_blank" title="�������µ�Flash���"><img src="http://ossweb-img.qq.com/images/xy/web200907/images/flashLogo.gif" align="absmiddle" target="_blank">�������</a><p></p> '
	}
}
/*  |xGv00|8d07ce163156e7f49a96f853e77c20f1 */</object></needhmin){height=needhmin}>