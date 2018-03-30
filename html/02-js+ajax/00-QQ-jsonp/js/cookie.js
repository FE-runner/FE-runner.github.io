/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-06-14 17:43:25
 * @version $Id$
 */
//设置cookie
/**
 * [addCookie description]
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 * @param {[type]} iDay  [description]
 */
function addCookie(name, value, iDay) {
  if (iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + '; path=/; expires=' + oDate.toUTCString();
  } else {
    document.cookie = name + '=' + value + '; path=/';
  }
}
//获取cookie
/**
 * [getCookie description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getCookie(name) {
  var arr = document.cookie.split('; ');
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
}
//移除cookie
/**
 * [removeCookie description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function removeCookie(name) {
  addCookie(name, '', -100)
}
