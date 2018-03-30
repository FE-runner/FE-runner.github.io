/**
* DD_belatedPNG: Adds IE6 support: PNG images for CSS background-image and HTML <img>.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_belatedPNG/
* Version: 0.0.7a
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_belatedPNG/#license
*
* Example usage:
* DD_belatedPNG.fix('.png_bg'); // argument is a CSS selector
* DD_belatedPNG.fixPng( someNode ); // argument is an HTMLDomElement
**/

/*
PLEASE READ:
Absolutely everything in this script is SILLY.  I know this.  IE's rendering of certain pixels doesn't make sense, so neither does this code!
*/

var DD_belatedPNG = {

	ns: 'DD_belatedPNG',
	imgSize: {},
	
	createVmlNameSpace: function() { /* enable VML */
		if (document.namespaces && !document.namespaces[this.ns]) {
		  document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
		}
		if (window.attachEvent) {
			window.attachEvent('onbeforeunload', function() {
				DD_belatedPNG = null;
			});
		}
	},
	
	createVmlStyleSheet: function() { /* style VML, enable behaviors */
		/*
			Just in case lots of other developers have added
			lots of other stylesheets using document.createStyleSheet
			and hit the 31-limit mark, let's not use that method!
			further reading: http://msdn.microsoft.com/en-us/library/ms531194(VS.85).aspx
		*/
		var style = document.createElement('style');
		document.documentElement.firstChild.insertBefore(style, document.documentElement.firstChild.firstChild);
		var styleSheet = style.styleSheet;
		styleSheet.addRule(this.ns + '\\:*', '{behavior:url(#default#VML)}');
		styleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
		styleSheet.addRule('img.' + this.ns + '_sizeFinder', 'behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;'); /* large negative top value for avoiding vertical scrollbars for large images, suggested by James O'Brien, http://www.thanatopsic.org/hendrik/ */
		this.styleSheet = styleSheet;
	},
	
	readPropertyChange: function() {
		var el = event.srcElement;
		if (event.propertyName.search('background') != -1 || event.propertyName.search('border') != -1) {
			DD_belatedPNG.applyVML(el);
		}
		if (event.propertyName == 'style.display') {
			var display = (el.currentStyle.display == 'none') ? 'none' : 'block';
			for (var v in el.vml) {
				el.vml[v].shape.style.display = display;
			}
		}
		if (event.propertyName.search('filter') != -1) {
			DD_belatedPNG.vmlOpacity(el);
		}
	},
	
	vmlOpacity: function(el) {
		if (el.currentStyle.filter.search('lpha') != -1) {
			var trans = el.currentStyle.filter;
			trans = parseInt(trans.substring(trans.lastIndexOf('=')+1, trans.lastIndexOf(')')), 10)/100;
			el.vml.color.shape.style.filter = el.currentStyle.filter; /* complete guesswork */
			el.vml.image.fill.opacity = trans; /* complete guesswork */
		}
	},
	
	handlePseudoHover: function(el) {
		setTimeout(function() { /* wouldn't work as intended without setTimeout */
			DD_belatedPNG.applyVML(el);
		}, 1);
	},
	
	/**
	* This is the method to use in a document.
	* @param {String} selector - REQUIRED - a CSS selector, such as '#doc .container'
	**/
	fix: function(selector) {
		var selectors = selector.split(','); /* multiple selectors supported, no need for multiple calls to this anymore */
		for (var i=0; i<selectors.length; 0="" 1="" i++)="" {="" this.stylesheet.addrule(selectors[i],="" 'behavior:expression(dd_belatedpng.fixpng(this))');="" *="" seems="" to="" execute="" the="" function="" without="" adding="" it="" stylesheet="" -="" interesting...="" }="" },="" applyvml:="" function(el)="" el.runtimestyle.csstext="" ;="" this.vmlfill(el);="" this.vmloffsets(el);="" this.vmlopacity(el);="" if="" (el.isimg)="" this.copyimageborders(el);="" attachhandlers:="" var="" self="this;" handlers="{resize:" 'vmloffsets',="" move:="" 'vmloffsets'};="" (el.nodename="=" 'a')="" moreforas="{mouseleave:" 'handlepseudohover',="" mouseenter:="" focus:="" blur:="" 'handlepseudohover'};="" for="" (var="" a="" in="" moreforas)="" handlers[a]="moreForAs[a];" h="" handlers)="" el.attachevent('on'="" +="" h,="" function()="" self[handlers[h]](el);="" });="" el.attachevent('onpropertychange',="" this.readpropertychange);="" givelayout:="" el.style.zoom="1;" (el.currentstyle.position="=" 'static')="" el.style.position="relative" copyimageborders:="" styles="{'borderStyle':true," 'borderwidth':true,="" 'bordercolor':true};="" s="" styles)="" el.vml.color.shape.style[s]="el.currentStyle[s];" vmlfill:="" (!el.currentstyle)="" return;="" else="" elstyle="el.currentStyle;" v="" el.vml)="" el.vml[v].shape.style.zindex="elStyle.zIndex;" el.runtimestyle.backgroundcolor="" el.runtimestyle.backgroundimage="" nocolor="(elStyle.backgroundColor" =="transparent" );="" noimg="true;" (elstyle.backgroundimage="" !="none" ||="" el.isimg)="" (!el.isimg)="" el.vmlbg="elStyle.backgroundImage;" el.vmlbg.lastindexof('")')-5);="" lib="this;" (!lib.imgsize[el.vmlbg])="" determine="" size="" of="" loaded="" image="" img="document.createElement('img');" lib.imgsize[el.vmlbg]="img;" img.classname="lib.ns" '_sizefinder';="" img.runtimestyle.csstext="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none;" make="" sure="" set="" behavior="" none="" prevent="" accidental="" matching="" helper="" elements!="" img.attachevent('onload',="" this.width="this.offsetWidth;" weird="" cache-busting="" requirement!="" this.height="this.offsetHeight;" lib.vmloffsets(el);="" img.src="el.vmlBg;" img.removeattribute('width');="" img.removeattribute('height');="" document.body.insertbefore(img,="" document.body.firstchild);="" el.vml.image.fill.src="el.vmlBg;" el.vml.image.fill.on="!noImg;" el.vml.image.fill.color="none" el.vml.color.shape.style.backgroundcolor="elStyle.backgroundColor;" ie="" can't="" figure="" out="" what="" do="" when="" offsetleft="" and="" clientleft="" add="" up="" 1,="" vml="" ends="" getting="" fuzzy...="" so="" we="" have="" push="" enlarge="" things="" by="" pixel="" then="" clip="" off="" excess="" vmloffsets:="" thisstyle="el.currentStyle;" 'h':el.clientheight+1,="" 'w':this.imgsize[el.vmlbg].width,="" 'h':this.imgsize[el.vmlbg].height,="" 'l':el.offsetleft,="" 't':el.offsettop,="" 'blw':el.clientleft,="" 'btw':el.clienttop};="" fudge="(size.L" size.blw="=" 1)="" ?="" :="" 0;="" shape,="" left,="" top,="" width,="" height,="" origin="" makevisible="function(vml," l,="" t,="" w,="" o)="" vml.coordsize="w+','+h;" vml.coordorigin="o+','+o;" vml.path="m0,0l" +w+',0l'+w+','+h+'l0,'+h+'="" xe';="" vml.style.width="w" 'px';="" vml.style.height="h" vml.style.left="l" vml.style.top="t" };="" makevisible(el.vml.color.shape,="" (size.l="" (el.isimg="" size.blw)),="" (size.t="" size.btw)),="" (size.w-1),="" (size.h-1),="" 0);="" makevisible(el.vml.image.shape,="" size.blw),="" size.btw),="" (size.w),="" (size.h),="" 1);="" bg="{'X':0," 'y':0};="" figurepercentage="function(axis," position)="" fraction="true;" switch(position)="" case="" 'left':="" 'top':="" bg[axis]="0;" break;="" 'center':="" 'right':="" 'bottom':="" default:="" (position.search('%')="" horz="(axis" (="" (size[horz?'w':="" 'h']="" bg[axis])="" )="" parseint(position));="" (bg[axis]="=" 0)="" bg[axis]++;="" b="" bg)="" figurepercentage(b,="" thisstyle['backgroundposition'+b]);="" el.vml.image.fill.position="(bg.X/size.W)" ','="" (bg.y="" size.h);="" bgr="thisStyle.backgroundRepeat;" dc="{'T':1," 'r':size.w+fudge,="" 'b':size.h,="" 'l':1+fudge};="" these="" are="" defaults="" repeat="" any="" kind="" altc="{" 'x':="" {'b1':="" 'l',="" 'b2':="" 'r',="" 'd':="" 'w'},="" 'y':="" 't',="" 'b',="" 'h'}="" (bgr="" c="{'T':(bg.Y)," 'r':(bg.x+size.w),="" 'b':(bg.y+size.h),="" 'l':(bg.x)};="" no-repeat="" clips="" down="" location="" (bgr.search('repeat-')="" now="" let's="" revert="" repeat-x="" or="" repeat-y="" c[altc[v].b1]="1;" c[altc[v].b2]="size[altC[v].d];" (c.b=""> size.H) {
				c.B = size.H;
			}
			el.vml.image.shape.style.clip = 'rect('+c.T+'px '+(c.R+fudge)+'px '+c.B+'px '+(c.L+fudge)+'px)';
		}
		else {
			el.vml.image.shape.style.clip = 'rect('+dC.T+'px '+dC.R+'px '+dC.B+'px '+dC.L+'px)';
		}
	},
	
	fixPng: function(el) {
		el.style.behavior = 'none';
		if (el.nodeName == 'BODY' || el.nodeName == 'TD' || el.nodeName == 'TR') { /* elements not supported yet */
			return;
		}
		el.isImg = false;
		if (el.nodeName == 'IMG') {
			if(el.src.toLowerCase().search(/\.png$/) != -1) {
				el.isImg = true;
				el.style.visibility = 'hidden';
			}
			else {
				return;
			}
		}
		else if (el.currentStyle.backgroundImage.toLowerCase().search('.png') == -1) {
			return;
		}
		var lib = DD_belatedPNG;
		el.vml = {color: {}, image: {}};
		var els = {shape: {}, fill: {}};
		for (var r in el.vml) {
			for (var e in els) {
				var nodeStr = lib.ns + ':' + e;
				el.vml[r][e] = document.createElement(nodeStr);
			}
			el.vml[r].shape.stroked = false;
			el.vml[r].shape.appendChild(el.vml[r].fill);
			el.parentNode.insertBefore(el.vml[r].shape, el);
		}
		el.vml.image.shape.fillcolor = 'none'; /* Don't show blank white shapeangle when waiting for image to load. */
		el.vml.image.fill.type = 'tile'; /* Ze magic!! Makes image show up. */
		el.vml.color.fill.on = false; /* Actually going to apply vml element's style.backgroundColor, so hide the whiteness. */
		
		lib.attachHandlers(el);
		
		lib.giveLayout(el);
		lib.giveLayout(el.offsetParent);
		
		/* set up element */
		lib.applyVML(el);
	}
	
};
try {
	document.execCommand("BackgroundImageCache", false, true); /* TredoSoft Multiple IE doesn't like this, so try{} it */
} catch(r) {}
DD_belatedPNG.createVmlNameSpace();
DD_belatedPNG.createVmlStyleSheet();</selectors.length;>