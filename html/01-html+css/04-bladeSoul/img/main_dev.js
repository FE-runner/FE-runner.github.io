/*
 * Author: TGIDEAS
 * User: troykang
 * Remark: BNS Official Site Javascript Library
 */

var bns = {}
bns.Base = {
    id:function(id){
        return document.getElementById(id);
    },tag:function(p, o) {
        return p.getElementsByTagName(o)
    },gclass:function(fdomid,tagname,classname){
        var father = (typeof fdomid == "string") ? bns.Base.id(fdomid) : fdomid,
            elems = father.getElementsByTagName(tagname),
            domArr = [];
        for(var i = 0; i < elems.length; i++){
            var elemClass = typeof elems[i].className === 'string' ? elems[i].className : elems[i].getAttribute('class');
            if(elemClass.indexOf(classname) !== -1){
                domArr.push(elems[i]);
            }
        }
        return domArr;
    },bind:function(ele, type, listener, useCapture) {
        useCapture = useCapture || false;
        if (window.addEventListener) {
            ele.addEventListener(type, listener, useCapture);
        } else {
            ele.attachEvent('on' + type, listener);
        }
    },unbind:function(ele, type, listener) {
        if (window.removeEventListener) {
            ele.removeEventListener(type, listener, false);
        } else {
            ele.detachEvent("on" + type, listener);
        }
    },css:function(el, style, value) {
        if (arguments.length < 2) {
            return true;
        }
        if (arguments.length == 2) {
            if (document.defaultView) {
                return document.defaultView.getComputedStyle(el, null).getPropertyValue(style);
            } else {
                if (bns.Base.browser.msie && style == 'opacity') {
                    var op = 1;
                    if (el.filters.alpha) {
                        op = el.filters.alpha.opacity;
                    } else if (el.filters["DXImageTransform.Microsoft.Alpha"]) {
                        op = el.filters["DXImageTransform.Microsoft.Alpha"].opacity
                    }
                    return (op);
                }
                style = style.replace(/\-(\w)/g,
                    function($, $1) {
                        return $1.toUpperCase();
                    });
                return el.currentStyle[style];
            }
        } else {
            if (bns.Base.browser.msie && style == 'opacity') {
                if (!el.currentStyle.hasLayout) {
                    el.style.zoom = 1;
                }
                if (el.filters.alpha) {
                    el.filters.alpha.opacity = value * 100;
                } else {
                    el.style.filter = "alpha(opacity=" + value * 100 + ")";
                }
                return el;
            }
            style = style.replace(/\-(\w)/g,
                function($, $1) {
                    return $1.toUpperCase();
                });
            el.style[style] = value;
        }
    },browser:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        var b = {
            msie: /msie/.test(window.navigator.userAgent.toLowerCase()) && !/opera/.test(ua),
            opera: /opera/.test(ua),
            safari: /webkit/.test(ua) && !/chrome/.test(ua),
            firefox: /firefox/.test(ua),
            chrome: /chrome/.test(ua)
        };
        var vMark = "";
        for (var i in b) {
            if (b[i]) {
                vMark = "safari" == i ? "version": i;
                break;
            }
        }
        b.version = vMark && new RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1: "0";
        return b;
    }(),each:function(arr, callback) {
        var i = 0;
        for (var k in arr) {
            if (!arr.hasOwnProperty || arr.hasOwnProperty(k)) {
                callback.call(arr, i, arr[k]);
                i++;
            }
        }
    },attr:function(elem, attrbute, value) {
        if (!elem || !attrbute) {
            return null;
        }
        if (!value) {
            return elem.getAttribute(attrbute);
        }
        elem.setAttribute(attrbute, value);
    }
};

bns.Script = {
    script:function(u) {
        var o = document.createElement("script");
        o.src = u;
        o.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(o);
        return o;
    },chkload:function(u, s, v) {
        var e = this.script(u);
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            e.onreadystatechange = function() {
                if (this.readyState && this.readyState == "loading") {
                    return false;
                } else {
                    s(v);
                }
            };
        } else {
            e.onload = function() {
                s(v);
            };
        }
    },tabHandler:function(aDom,bDom,e,classOrig,classAdd){
        var eventDom = aDom,
            targetDom = bDom,
            k = 0;

        if(eventDom.length && targetDom.length){
            for(k in eventDom){
                (function(num){
                    bns.Base.bind(eventDom[num],e,function(){
                        bns.Base.each(targetDom,function(i,item){
                            bns.Base.css(item,'display','none');
                        });
                        bns.Base.each(eventDom,function(i,item){
                            item.className = classOrig;
                        });
                        if(bns.Base.css(targetDom[num],'display') !== 'none'){
                            bns.Base.css(targetDom[num],'display','none');
                        } else{
                            bns.Base.css(targetDom[num],'display','block');
                        }
                        eventDom[num].className = classOrig + ' ' + classAdd;
                    })
                }(k))
            }
        } else{
            bns.Base.bind(eventDom,e,function(){
                if(bns.Base.css(targetDom,'display') !== 'none'){
                    bns.Base.css(targetDom,'display','none');
                } else{
                    bns.Base.css(targetDom,'display','block');
                }
            });
        }
    },corp: function() {
        var corp = bns.Base.id("coopmedia"),corp_list = corp.getElementsByTagName("ul")[0];
        corp.onmouseover = corp_list.onmouseover = function() {
            corp_list.style.display = "block";
        };
        corp.onmouseout = corp_list.onmouseout = function() {
            corp_list.style.display = "none";
        };
    },setTopNew:function(){
        var newList = bns.Base.gclass('news','ul','news-list'),
            topNewOpt = bns.Base.tag(newList[0],'li');

        topNewOpt.length && (topNewOpt[0].className = 'news-hot');
    },navHoverEvent:function(){
        var nav = bns.Base.id('nav');
        nav.onmouseover = function(){
            nav.className = 'nav nav-on';
        };
        nav.onmouseout = function(){
            nav.className = 'nav';
        };
    },versionScrollInit:function(){
        var verDom = bns.Base.id('version_box'),
            vlistDom = bns.Base.id('version_list'),
            wrapRange = parseInt(bns.Base.css(verDom,'width')),
            listRange = parseInt(bns.Base.css(vlistDom,'width')),
            clientW = document.documentElement.clientWidth || document.body.clientWidth;
        var mousePosition = function(e){
            var ev = e || window.event,ex = 0;
            if (ev.pageX) {
                ex = ev.pageX;
            } else{
                ex = ev.clientX + document.body.scrollLeft - document.body.clientLeft;
            }
            if(clientW >= 1660){
                return (ex - 400);
            } else if(clientW < 1660 && clientW > 1270){
                return (ex - 320);
            } else if(clientW < 1270 && clientW > 1030){
                return (ex - 208);
            } else{
                return (ex - 198);
            }
        };
        bns.Base.bind(window,'resize',function(){
            wrapRange = parseInt(bns.Base.css(verDom,'width'));
        });
        bns.Base.bind(verDom,'mousemove',function(e){

            var ev = e || window.event,
                mPosi = mousePosition(ev),
                d = -(mPosi/wrapRange*listRange - mPosi);
                vlistDom.style.left = d + 'px'
        })
    },videoInit:function (vid) {
            var video = document.getElementById('video_con');
            video.innerHTML = '<object width="400" height="304" align="middle" codebase="http:\/\/fpdownload.macromedia.com\/get\/flashplayer\/current\/swflash.cab#version=10,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="_playerswf"><param value="http:\/\/static.video.qq.com\/TencentPlayer.swf?vid=' + vid + '&amp;autoplay=1&amp;loadingswf=http:\/\/imgcache.qq.com\/minivideo_v1\/vd\/res\/skins\/web_small_loading.swf&amp;outhost=http:\/\/bns.qq.com\/&amp;pic=http:\/\/ossweb-img.qq.com\/images\/bns\/web201211\/ultra0620\/video.jpg" name="movie"><param value="opaque" name="wmode"><param value="always" name="allowscriptaccess"><param value="high" name="quality"><param value="true" name="allowfullscreen"><param value="all" name="allownetworking"><embed width="400" height="304" align="middle" wmode="opaque" src="http:\/\/static.video.qq.com\/TencentPlayer.swf?vid=' + vid + '&amp;autoplay=1&amp;loadingswf=http:\/\/imgcache.qq.com\/minivideo_v1\/vd\/res\/skins\/web_small_loading.swf&amp;pic=http:\/\/ossweb-img.qq.com\/images\/bns\/web201211\/ultra0620\/video.jpg" quality="high" name="_playerswf" id="_playerswf" allowscriptaccess="always" allowfullscreen="true" type="application\/x-shockwave-flash" pluginspage="http:\/\/www.macromedia.com\/go\/getflashplayer"><\ object="">';
    }
};

var slider = function(){
    function sliderClass(sliderDom,options){
        this.sliderDom = typeof sliderDom == 'string' ? bns.Base.id(sliderDom) : sliderDom;
        this.sliderCtrls = bns.Base.gclass(sliderDom,'span','switcher-btn');
        this.sliderBox = bns.Base.gclass(sliderDom,'div','slider-pic')[0];
        this.sliderPics = bns.Base.gclass(sliderDom,'a','pic-lnk');
        this.index = 0;
        this.length = this.sliderPics.length;
        this.options = {};
        this.index = 0;
        this.num = 0;
        for(var k in options) {
            this.options[k] = options[k];
        }
        this.init();
        this._run()
    }
    var Tween = {
        linear : function(pos) {
            return pos
        },easeInOutExpo: function(pos){
            if(pos==0) return 0;
            if(pos==1) return 1;
            if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
            return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
        }
    };
    return sliderClass.prototype = {
        init : function(){
            this.sliderBox.style.left = 0;
            this.ctrlsReset(0)
        },
        ctrlsReset : function(n){
            for(var i = 0; i < this.length; i++){
                this.sliderCtrls[i].className = 'switcher-btn allTrans spr';
            }
            this.sliderCtrls[n].className = 'switcher-btn allTrans switcher-on spr';
        },
        _transition : function(elem,opt){
            var options = arguments[1] || {},
                begin =  options.begin,
                change = options.change,
                duration = options.duration || 500,
                field = 'left',
                ftp = options.ftp || 60,
                ease = Tween.easeInOutExpo,
                end = begin + change,
                startTime = new Date().getTime(),
                onStart = options.onStart || function(){},
                onEnd = options.onEnd || function(){},
                self = this;
            onStart();
            function __run(){
                self.stimer = setTimeout(function(){
                    var newTime = new Date().getTime(),
                        timestamp = newTime - startTime,
                        delta = ease(timestamp / duration);
                    elem.style[field] = Math.ceil(begin + delta * change) + "px";
                    if(duration <= 3000="" timestamp){="" elem.style[field]="end" +="" "px";="" onend()="" }else{="" self.stimer="setTimeout(__run,1000/ftp);" }="" },1000="" ftp)="" __run();="" },="" _move="" :="" function(){="" var="" self="this;" cleartimeout(this.timer);="" cleartimeout(this.stimer);="" if(this.index="==" (this.length-1)){="" this.index="0;" this._transition(this.sliderbox,{="" begin="" -this.options.picwidth*(this.length-1),="" change="" this.options.picwidth*(this.length-1),="" duration="" 500,="" onstart="" self.ctrlsreset(0)="" });="" this._run()="" else="" {="" this.index++;="" -this.options.picwidth*(this.index-1),="" -this.options.picwidth,="" self.ctrlsreset(self.index)="" this._run();="" _handlestop="" for(var="" i="0;" <="" this.length;="" i++){="" (function(j){="" self.sliderctrls[j].onmouseover="function(){" cleartimeout(self.timer);="" cleartimeout(self.stimer);="" leftnow="parseInt(bns.Base.css(self.sliderBox,'left'));" self._transition(self.sliderbox,{="" leftnow,="" (-self.options.picwidth*j)="" -="" self.ctrlsreset(j);="" self.index="j;" })="" };="" self.sliderctrls[j].onmouseleave="function(){" self._run();="" })(i)="" _run="" this._handlestop();="" this.timer="setTimeout(function()" self._move();="" this.options.timeout);="" },sliderclass="" }();="" sliderinit="function(){" slider1="new" slider('ad_slider',{="" picwidth="" 400,="" timeout="" domarrange="function(wrapid,fgridtype,cgridtype,pwidth){" tempnodelist="[]," templinklist="[]," domwrap="document.getElementById(wrapid)," domall="domWrap.getElementsByTagName('div');" function="" createdomandinsert(tagname,dclass,targetdom){="" o="document.createElement(tagname);" bns.base.attr(o,'class',dclass);="" return="" targetdom.appendchild(o);="" �õ�����gridtype="num��grid" dom="" sortgridbytype(gridtype){="" typeattr="bns.Base.attr(domAll[i],'grid-type');" if(typeof="" 'string'="" &&="" gridtype){="" gridlink="domAll[i].getElementsByTagName('a')[0];" tempnodelist.push(domall[i]);="" templinklist.push(gridlink)="" ���ɲ���ʼ����׼���õĸ�grid="" dom,�������е�griddomlist="" creategridslider(fdom,gridarr,picwidth,timeout){="" fdom.innerhtml="" ;="" picwrap="createDomAndInsert('div','slider-pic" grid-slider="" pa',fdom),="" switcherwrap="createDomAndInsert('div','slider-switcher" pa',fdom);="" gridarr[i].parentnode.style.display="none" picwrap.appendchild(gridarr[i]);="" createdomandinsert('span','switcher-btn="" alltrans',switcherwrap);="" switcherwrap.getelementsbytagname('span')[0].classname="switcher-btn switcher-on allTrans" picwrap.style.display="block" switcherwrap.style.display="block" slidergrid="new" slider(fdom,{="" picwidth,="" sortgridbytype(cgridtype);="" ��gridtype="=0��grid" dom���²�������grid="" insertgridarrtodom(){="" temp="tempLinkList," tempnumsplit="temp.length/2," temparr1="[]," temparr2="[];" if(fgridtype!="='0'){" sortgridbytype(fgridtype);="" creategridslider(tempnodelist[0],temp,pwidth,4000)="" else{="" j="0;j<tempNumSplit;j++){" temparr1.push(temp[j])="" s="tempNumSplit;s<temp.length;s++){" temparr2.push(temp[s])="" sortgridbytype('0');="" topgrid="createDomAndInsert('div','grid1x1" inner-grid',tempnodelist[0]),="" secondgrid="createDomAndInsert('div','grid1x1" inner-grid',tempnodelist[0]);="" creategridslider(topgrid,temparr1,pwidth,2500)="" creategridslider(secondgrid,temparr2,pwidth,2000)="" tempnodelist[i].style.display="none" insertgridarrtodom();="" bns.init="function(){" newstabs="bns.Base.gclass('news','a','tab-lnk')," newscons="bns.Base.gclass('news','div','news-con')," vertabs="bns.Base.gclass('vertabs','i','version-tab')," verlnks="bns.Base.gclass('verlnks','a','version-lnk')," guidetabs="bns.Base.gclass('guide','div','guide-box')," guidelnks="bns.Base.gclass('guide','div','guide-content');" bns.script.tabhandler(newstabs,newscons,'mouseover','tab-lnk="" colortrans','tlink-on');="" bns.script.tabhandler(vertabs,verlnks,'mouseover','version-tab','version-tab-on');="" bns.script.tabhandler(guidetabs,guidelnks,'click','guide-box','gbox-on');="" bns.script.corp();="" bns.script.settopnew();="" bns.script.navhoverevent();="" bns.script.versionscrollinit()="" bns.script.chkload("http:="" ossweb-img.qq.com="" images="" js="" comm="" tgadshow.min.js",="" function()="" title.js",="" ostb_int()="" "")="" basic="" tgswfobj_s.js",="" insertswfv2("swfcontent",="" "http:="" bns="" web201506="" main="" flash="" main0813.swf?v=" + Math.random(), " 1046",="" "350",{},{},"10.0");="" window.gotopage="function(arg){" if(arg="=="1"){" window.open('http:="" bns.qq.com="" cp="" a20150810hbtj="" index.html')="" a20150804hbxt="" },""="" );="" tajs.qq.com="" stats?sid="22212170"," pingjs.qq.com="" ping_tcss_ied.js",="" if="" (typeof="" (pgvmain)="=" 'function')="" pgvmain();="" "");="" do_speed_report()="" imgsendtimepoint;="" array();="" addtestpoint(iid)="" curtime="new" date();="" s.push(iid="" "=" + (curTime - d0));
    }
    addTestPoint(1);
    var url = " http:="" isdspeed.qq.com="" cgi-bin="" r.cgi?flag1="7718&flag2=35&flag3=gaojiyundong-lunbotu&"" s.join("&");="" (math.random()="" 0.3)="" imgsendtimepoint="new" image();="" imgsendtimepoint.src="url;" window.onload="function(){" cw="document.documentElement.clientWidth" ||="" document.body.clientwidth;="" if(cw=""> 1440){
        domArrange('grid_wrap_1','0','1',192);
    } else if(cw <= 1440="" &&="" cw=""> 1352){
        domArrange('grid_wrap_1','0','1',192);
        domArrange('grid_wrap_1','3','4',192);
    } else if(cw <= 1352="" &&="" cw=""> 1008){
        domArrange('grid_wrap_1','0','1',192);
        domArrange('grid_wrap_1','3','4',192);
    } else if(cw </=></=></=></\></object>