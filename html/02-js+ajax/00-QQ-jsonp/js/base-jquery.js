/**
 * @authors LianyForWeb
 * @date    2016-06-23 20:03:33
 */

// 拖拽
$.fn.darg$ = function() {
  var $this = this;
  $this.mousedown(function(ev) {
    var $disX = ev.pageX - $this.offset().left;
    var $disY = ev.pageY - $this.offset().top;

    function fnMove(ev) {
      $this.css({
        left: ev.pageX - $disX - $this.offsetParent().offset().left - $this.css('marginLeft').replace(/[a-z]+/g, '') - $this.offsetParent().css('borderLeftWidth').replace(/[a-z]+/g, ''),
        top: ev.pageY - $disY - $this.offsetParent().offset().top - $this.css('marginTop').replace(/[a-z]+/g, '') - $this.offsetParent().css('borderTopWidth').replace(/[a-z]+/g, ''),
      });
    }

    function fnUp() {
      $(document).unbind('mousemove', fnMove);
      $(document).unbind('mouseup', fnUp);
      $this.get(0).releaseCapture && $this.get(0).releaseCapture();
    }
    $(document).bind('mousemove', fnMove);
    $(document).bind('mouseup', fnUp);
    $this.get(0).setCapture && $this.get(0).setCapture(); //事件捕获,解决IE7及以下的侦听事件触发bug//Chrome不兼容
    return false; //阻止IE8及以上IE和其他浏览器的侦听事件,

  });
};

//
$.fn.slider = function() {
  this.each(function(index, element) {
    var aBtn = $(element).find('ol li');
    var oUl = $(element).find('ul');
    aBtn.click(function() {
      aBtn.removeClass('active');
      $(this).addClass('active');
      oUl.animate({ top: -150 * $(this).index() });
    });
  });
};
