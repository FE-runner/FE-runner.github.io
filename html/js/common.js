/**
 * Created by Liany on 2016/6/30.
 */

domReady(function () {

    var oProject = document.getElementById('project');
    var aPro = getByClass(oProject, 'pro');
    var aWork = getByClass(oProject, 'work');
    var aEle = oProject.getElementsByTagName('*');

    //布局1
    for (var i = 0; i < aWork.length; i++) {
        (function (i) {
            aWork[i].parentNode.style.position = 'relative';
            setStyle3(aWork[i], 'transition', 'none');

            //aWork[i].style.transition = 'none';
            aWork[i].style.width = aWork[0].parentNode.offsetWidth + 'px';
            aWork[i].style.height = aWork[0].parentNode.offsetHeight + 'px';
            aWork[i].style.top = 0 + 'px';
            aWork[i].style.left = 0 + 'px';
            setStyle3(aWork[i], 'transform', 'scale(0,0)');
            //aWork[i].style.transform = 'scale(0,0)';
            setTimeout(function () {
                setStyle3(aWork[i], 'transition', '0.5s all ease');

                //aWork[i].style.transition = '0.5s all ease';
            }, 0)
        })(i);
    }

    //点击打开选项卡和点击关闭
    for (i = 0; i < aPro.length; i++) {
        (function (i) {
            var oTab = getByClass(aWork[i], 'tab')[0];
            var aWorkTab = getByClass(aWork[i], 'work-tab');

            var aTabList = getByClass(aWork[i], 'tab-list');
            //布局2
            for (var k = 0; k < aWorkTab.length; k++) {
                (function (k) {
                    aWorkTab[k].style.width = aWork[i].offsetWidth * 0.85 + 'px';
                    aWorkTab[k].style.height = aWork[i].offsetHeight * 0.85 + 'px';
                    if (aWorkTab[0].parentNode.offsetHeight < aWorkTab[0].parentNode.offsetWidth) {
                        aWorkTab[k].style.width = Math.round(aWorkTab[0].offsetHeight) + 'px';
                        aWorkTab[k].style.height = Math.round(aWorkTab[0].offsetHeight) + 'px';
                    } else {
                        aWorkTab[k].style.width = Math.round(aWorkTab[0].offsetWidth) + 'px';
                        aWorkTab[k].style.height = Math.round(aWorkTab[0].offsetWidth) + 'px';
                    }

                })(k);
            }
            oTab.style.width = aWorkTab[0].offsetWidth + 'px';
            oTab.style.paddingLeft = oTab.style.paddingRight = (aWork[i].offsetWidth - aWorkTab[0].offsetWidth) * 0.25 + 'px';

            oTab.style.paddingTop = oTab.style.paddingBottom = (aWork[i].offsetHeight - aWorkTab[0].offsetHeight) * 0.5 + 'px';
            oTab.style.height = aWorkTab[0].offsetHeight + 'px';
            //点击打开
            aPro[i].onclick = function (ev) {
                //画布
                aWork[i].style.transform = 'scale(1,1)';
                for (var j = 0; j < aTabList.length; j++) {
                    slideInOutHalf(aTabList[j]);
                }
                //Swiper
                var swiper = new Swiper('.swiper-container', {
                    //loop: true,                               // 无限循环
                    slidesPerView: 1,                         // 一页显示几张
                    preventClicks: true,
                    preventLinksPropagation: true,
                    slideToClickedSlide: true,
                    keyboardControl: true,
                    effect: 'coverflow',
                    coverflow: {
                        rotate: 30, stretch: 10, depth: 100, modifier: 2, slideShadows: true
                    }
                });

            };

            // 双击关闭
            aWork[i].ondblclick = function (ev) {
                var oEvent = ev || event;
                aWork[i].style.transform = 'scale(0,0)';
                oEvent.preventDefault();
                return false;
            };
            //滚动关闭
            addWheel(aWork[i], function () {
                aWork[i].style.transform = 'scale(0,0)';
            })
        })(i);
    }
    //about me
    var aAbout = getByClass(document.body, 'aboutme');
    var aMore = getByClass(document.body, 'morepic');
    for (var kk = 0; kk < aAbout.length; kk++) {
        aAbout[kk].index = kk;
        aAbout[kk].onmouseover = function () {
            for (var ki = 0; ki < aAbout.length; ki++) {
                setStyle3(aMore[ki], 'transition', 'none');
                setStyle3(aMore[ki], 'transform', 'scale(0)');
            }
            setStyle3(aMore[this.index], 'transition', '.5s all ease');
            setStyle3(aMore[this.index], 'transform', 'scale(1)');
        };
        aAbout[kk].onmouseout = function () {
            setStyle3(aMore[this.index], 'transition', 'none');
            setStyle3(aMore[this.index], 'transform', 'scale(0)');


        }

    }
});//划入划出//一半遮照
function slideInOutHalf(obj) {
    obj.onmouseenter = function () {
        var m = this.offsetWidth;
        var oSpan = this.children[1];
        move(oSpan, {left: 0, top: 1.5 * m}, {duration: 500});
    };
    obj.onmouseleave = function (ev) {
        var oEvent = ev || event;
        oEvent.cancelBubble = true;
        var n = hoverDir(this, oEvent);
        var m = this.offsetWidth;

        var oSpan = this.children[1];
        var l = oSpan.offsetHeight;

        switch (n) {
            case 0:
                oSpan.style.left = -m + 'px';
                oSpan.style.top = 0.4 * m + 'px';
                break;
            case 1:
                oSpan.style.left = 0;
                oSpan.style.top = -l + 'px';
                break;
            case 2:
                oSpan.style.left = m + 'px';
                oSpan.style.top = 0.4 * m + 'px';
                break;
            case 3:
                oSpan.style.left = 0;
                oSpan.style.top = m + 'px';
                break;
        }
        move(oSpan, {left: 0, top: m * 0.4});
    };
}