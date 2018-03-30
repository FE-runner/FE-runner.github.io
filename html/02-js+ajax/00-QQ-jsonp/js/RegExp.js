/**
 * @authors LianyForWeb
 * @date    2016-06-21 19:09:21
 */
// getByClass
// addClass
// hasClass
// removeClass


//返回某一父集内特定某一class名的元素数组
function getByClass(oParent, sClass) {
  if (oParent.getElementsByClassName) {
    return oParent.getElementsByClassName(sClass);
  } else {
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];
    var reg = new RegExp('\\b' + sClass + '\\b');
    for (var i = 0; i < aEle.length; i++) {
      if (reg.test(aEle[i].className)) {
        arr.push(aEle[i]);
      }
    }
    return arr;
  }
}

//判断某一元素是否拥有某一class名
function hasClass(obj, sClass) {
  var reg = new RegExp('\\b' + sClass + '\\b');
  return reg.test(obj.className);
}

//向某一元素添加一个class名
function addClass(obj, sClass) {
  var reg = new RegExp('\\b' + sClass + '\\b');
  if (!reg.test(obj.className)) {
    obj.className += ' ' + sClass;
  }
}

//将某一元素的某一class名移除
function removeClass(obj, sClass) {
  var reg = new RegExp('\\b' + sClass + '\\b', 'g'); //g防止重复class名导致删除不干净
  if (reg.test(obj.className)) {
    obj.className = obj.className.replace(reg, '').replace(/^\s+|\s$/g, '').replace(/\s+/g, ' ');
  }
}
