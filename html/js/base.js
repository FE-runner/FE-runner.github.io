/* eslint-disable no-unused-vars,no-plusplus */
/**
 * @authors LianyForWeb
 * @date    2016-06-20 10:31:44
 */

// 返回某一个位数的双位数字符串形式的数字
function toDouble(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

// 加和连接,若所有实参类型为true/false或数字和true/false,true为1,false为-1
function sum(...args) {
  let res = 0;
  for (let i = 0; i < arguments.length; i++) {
    res += args[i];
  }
  return res;
}

// 判断某一值是否与某一数组的值相等,真返回真,假返回假
function findInArr(x, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (x === arr[i]) {
      return true;
    }
  }
  return false;
}

// 返回一个n到m(不包含m)的随机整数
function rand(n, m) {
  return window.parseInt((Math.random() * (m - n)) + n);
}

// 返回某一父集内特定某一class名的元素数组
function getEleByClass(oParent, sClass) {
  if (oParent.getElementsByClassName) {
    return oParent.getElementsByClassName(sClass); // like-Array
  }
  const aEle = oParent.getElementsByTagName('*');
  const arr = [];
  for (let i = 0; i < aEle.length; i += 1) {
    const arrTmp = aEle[i].className.split(' ');
    if (findInArr(sClass, arrTmp)) {
      arr.push(aEle[i]);
    }
  }
  return arr; // Array
}

// 返回某一元素的非行间样式属性值
function getStyle(obj, name) {
  return (obj.currentStyle || getComputedStyle(obj, false))[name];
}

// 某一元素获得某一样式//arguments写法,灵活实参,弱化形参//可以做选项卡封闭函数
function setStyle(...args) {
  const obj = args[0];
  if (args.length === 3) {
    const name1 = args[1]; // styleProperty
    const value = args[2]; // stylePropertyValue
    obj.style[name1] = value;
  } else if (args.length === 2) {
    const json = args[1];
    for (const name in json) {
      obj.style[name] = json[name]; // [name]:json的属性或变量名,json[name]:json的属性值或变量值
    }
  }
}

// 返回一个大数组中某一段(从start到结束)小数组中的最小值在大数组的位置
function findMinIndex(arr, start) {
  let iMin = arr[start];
  let iMinIndex = start;
  for (let i = start + 1; i < arr.length; i++) {
    if (iMin > arr[i]) {
      iMin = arr[i]; // 该位置的值
      iMinIndex = i; // 位置
    }
  }
  return iMinIndex;
}

// 返回一个大数组中某一段(从start到结束)小数组中的最小值
function findMin(arr, start) {
  let iMin = arr[start];
  let iMinIndex = start;
  for (let i = start + 1; i < arr.length; i++) {
    if (iMin > arr[i]) {
      iMin = arr[i]; // 该位置的值
      iMinIndex = i; // 位置
    }
  }
  return iMin;
}

// 返回一个大数组中某一段(从start到结束)小数组中的最大值在大数组的位置
function findMaxIndex(arr, start) {
  let iMax = arr[start];
  let iMaxIndex = start;
  for (let i = start + 1; i < arr.length; i++) {
    if (iMax < arr[i]) {
      iMax = arr[i]; // 该位置的值
      iMaxIndex = i; // 位置
    }
  }
  return iMaxIndex;
}

// 返回一个大数组中某一段(从start到结束)小数组中的最大值
function findMax(arr, start) {
  let iMax = arr[start];
  let iMaxIndex = start;
  for (let i = start + 1; i < arr.length; i++) {
    if (iMax < arr[i]) {
      iMax = arr[i]; // 该位置的值
      iMaxIndex = i; // 位置
    }
  }
  return iMax;
}

// 返回一个数组中某个唯一数在数组的位置
function findNumIndex(arr, Num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == Num) {
      return i; // 位置???
    }
  }
}

// 返回一个元素数组中目标className在元素数组的位置
function findClassIndex(aEle, tClass) {
  for (let i = 0; i < aEle.length; i++) {
    if (aEle[i].className == tClass) {
      return i; // 位置???
    }
  }
}

// 二维数组的创建
function arrMatrix(rows, cols, initial) {
  const arr1 = [];
  for (let i = 0; i < rows; i++) {
    const arr2 = [];
    for (let j = 0; i < cols; j++) {
      arr2[j] = initial;
    }
    arr1[i] = arr2;
  }
  return arr1;
}

// 根据年份得到的月日二维数组
function findByYear(year) {
  const arrMonth = [];
  for (let i = 0; i < 12; i++) {
    const oDate = new Date();
    oDate.setFullYear(year);
    oDate.setMonth(i + 1);
    oDate.setDate(0);
    const arrDate = [];
    for (let j = 0; j < oDate.getDate(); j++) {
      arrDate[j] = j + 1;
    }
    arrMonth[i] = arrDate;
  }
  return arrMonth;
}

// 获取元素绝对位置
function getPos(obj) {
  let l = 0;
  let t = 0;
  while (obj) { // obj存在作为条件,注意obj在循环中被不断引用成最近定位祖先元素
    l += obj.offsetLeft; // 当前obj距离最近定位祖先元素的距离
    t += obj.offsetTop;
    obj = obj.offsetParent; // obj引用为其最近定位祖先元素
  }
  return { // json
    left: l, // 可不写引号
    top: t,
  };
}

// 事件绑定
function addEvent(obj, sEv, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(sEv, fn, false); // sEv为事件变体无on//fn>>封装函数,禁匿名
  } else {
    obj.attachEvent(`on${sEv}`, fn);
  }
}

// 事件解绑
function removeEvent(obj, sEv, fn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(sEv, fn, false); // sEv为事件变体无on//fn>>封装函数,禁匿名
  } else {
    obj.detachEvent(`on${sEv}`, fn);
  }
}

// domReady
function domReady(fn) {
  if (document.addEventListener) { // 高级浏览器
    document.addEventListener('DOMContentLoaded', () => {
      fn && fn();
    }, false);
  } else { // 低级浏览器
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState == 'complete') {
        fn && fn();
      }
    });
  }
}

//只有同一定位父集的情况下
// 碰撞检测
function collTest(obj, obj2) { // (目标物,移动物)
  const l = obj.offsetLeft;
  const t = obj.offsetTop;
  const r = obj.offsetWidth + l;
  const b = obj.offsetHeight + t;
  const l2 = obj2.offsetLeft;
  const t2 = obj2.offsetTop;
  const r2 = obj2.offsetWidth + l2;
  const b2 = obj.offsetHeight + t2;
  return !(l > r2 || t > b2 || r < l2 || b < t2); // 如果碰撞 ,返回为真
}

// 同步式任意值均时任意式链式运动框架
function move(obj, json, options) {
  // 默认值设置
  options = options || {};
  options.duration = options.duration || 500;
  options.easing = options.easing || 'linear';
  // 初始值设置
  const start = {}; // 起始
  const dis = {}; // 距离
  let n = 0; // 计数器
  const count = Math.ceil(options.duration / 30); // Math.floor//根据运动时间和定时器时间比例求的计数终点
  // 各项的距离计算
  for (var name in json) {
    start[name] = parseFloat(getStyle(obj, name));
    dis[name] = json[name] - start[name];
  }
  // 运动前定时器清除
  clearInterval(obj.timer);
  // 定时器开启
  obj.timer = setInterval(() => {
    n++; // 计时
    // 各项运动的运动运算
    for (name in json) {
      var scale; // 当前运动程度
      var cur; // 当前运动结果
      // 运动方式
      switch (options.easing) {
        case 'linear': // 匀速
          scale = n / count;
          cur = start[name] + dis[name] * scale;
          break;
        case 'ease-in': // 加速
          scale = n / count;
          cur = start[name] + dis[name] * scale * scale * scale;
          break;
        case 'ease-out': // 减速
          scale = 1 - n / count;
          cur = start[name] + dis[name] * (1 - scale * scale * scale);
          break;
      }
      // 各项运动的终端接口
      if (name == 'opacity') {
        obj.style.opacity = cur;
        obj.style.filter = `alpha(opacity:${cur * 100})`;
      } else {
        obj.style[name] = `${cur}px`;
      }
    }
    // 定时器关闭和回调函数
    if (n == count) {
      clearInterval(obj.timer);
      options.complete && options.complete(); // 链式函数
    }
  }, 30);
}

// 同步式任意值均时任意式链式运动框架
function move2(obj, json, options) {
  // 默认值设置
  options = options || {};
  options.duration = options.duration || 500;
  options.easing = options.easing || 'linear';
  options.unit = options.unit || 'px';
  // 初始值设置
  const start = {}; // 起始
  const dis = {}; // 距离
  let n = 0; // 计数器
  const count = Math.ceil(options.duration / 30); // Math.floor//根据运动时间和定时器时间比例求的计数终点
  // 各项的距离计算
  for (var name in json) {
    start[name] = parseFloat(getStyle(obj, name));
    dis[name] = json[name] - start[name];
  }
  // 运动前定时器清除
  clearInterval(obj.timer);
  // 定时器开启
  obj.timer = setInterval(() => {
    n++; // 计时
    // 各项运动的运动运算
    for (name in json) {
      var scale; // 当前运动程度
      var cur; // 当前运动结果
      // 运动方式
      switch (options.easing) {
        case 'linear': // 匀速
          scale = n / count;
          cur = start[name] + dis[name] * scale;
          break;
        case 'ease-in': // 加速
          scale = n / count;
          cur = start[name] + dis[name] * scale * scale * scale;
          break;
        case 'ease-out': // 减速
          scale = 1 - n / count;
          cur = start[name] + dis[name] * (1 - scale * scale * scale);
          break;
      }
      // 各项运动的终端接口
      if (name == 'opacity') {
        obj.style.opacity = cur;
        obj.style.filter = `alpha(opacity:${cur * 100})`;
      } else {
        obj.style[name] = cur + options.unit;
      }
    }
    // 定时器关闭
    if (n == count) {
      clearInterval(obj.timer);
      options.complete && options.complete(); // 链式函数
    }
  }, 30);
}

// 滚轮事件
function addWheel(obj, fn) { // 回调函数的返回的参数为bFlag
  if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) { // 事件
    obj.addEventListener('DOMMouseScroll', wheel, false);
  } else {
    obj.onmousewheel = wheel;
  }

  // ////事件属性函数
  function wheel(ev) {
    const oEvent = ev || event;
    let bDown = true;
    if (oEvent.wheelDelta) {
      if (oEvent.wheelDelta > 0) {
        bDown = false;
      } else {
        bDown = true;
      }
    } else if (oEvent.detail < 0) {
      bDown = false;
    } else {
      bDown = true;
    }
    fn && fn(bDown); // 回调函数(callback)
    // 阻止默认事件
    oEvent.preventDefault && oEvent.preventDefault(); // 绑定事件的阻止
    return false;
  }
}

// 滚轮的滚动条事件,为回调函数内的函数
function scrollWheel(obj, obj2, speed) { // 滚动块,滚动的内容,滚动速度
  let t = obj.offsetTop;
  (t + speed) < 0 && (t = -speed);
  (t + speed) > obj.parentNode.offsetHeight - obj.offsetHeight && (t = obj.parentNode.offsetHeight - obj.offsetHeight - speed);
  obj.style.top = `${t + speed}px`;
  const scale = (obj.parentNode.offsetHeight - obj.offsetHeight) / (obj2.scrollHeight - obj2.parentNode.offsetHeight);
  obj2.style.top = `${(-t - speed) / scale}px`;
}

// 自定义滚动条
function scroll(obj, obj2, oEv) { // 滚动块,滚动的内容,滚动速度
  const disY = oEv.clientY - obj.offsetTop;
  document.onmousemove = function (ev) {
    const oEvent = ev || event;
    let t = oEvent.clientY - disY;
    t < 0 && (t = 0);
    t > obj.parentNode.offsetHeight - obj.offsetHeight && (t = obj.parentNode.offsetHeight - obj.offsetHeight);
    obj.style.top = `${t}px`;
    const scale = (obj.parentNode.offsetHeight - obj.offsetHeight) / (obj2.scrollHeight - obj2.parentNode.offsetHeight);
    obj2.style.top = `${-t / scale}px`;
  };
}

// 拖拽
function drag(obj) {
  obj.onmousedown = function (ev) {
    const oEvent = ev || event;
    const disX = oEvent.clientX - getPos(obj).left; // 鼠标距离obj左边缘的距离
    const disY = oEvent.clientY - getPos(obj).top;
    document.onmousemove = function (ev) {
      const oEvent = ev || event;
      let l = oEvent.clientX - disX; // obj距离视窗左侧的距离
      let t = oEvent.clientY - disY;
      // 限制判断
      const clientW = document.documentElement.clientWidth;
      const clientH = document.documentElement.clientHeight;
      const objW = obj.offsetWidth;
      const objH = obj.offsetHeight;
      (l <= 0)="" &&="" (l="0);">= clientW - objW) && (l = clientW - objW);
      (t <= 0)="" &&="" (t="0);">= clientH - objH) && (t = clientH - objH);
      // 终端接口
      obj.style.left = `${l}px`;
      obj.style.top = `${t}px`;
    };
    document.onmouseup = function () { // 必须写在里面.否则下次父集事件执行时该事件为null//必须使用document,因为在没有限制范围的时候,拖拽出去的话,函数无法执行
      document.onmousemove = null; // 不能是父集事件,父集不能被清
      document.onmouseup = null; // 清掉以优化性能
      obj.releaseCapture && obj.releaseCapture(); // 事件释放//Chrome不兼容//releaseCapture>属性//releaseCapture()>方法
    };
    obj.setCapture && obj.setCapture(); // 事件捕获,解决IE7及以下的侦听事件触发bug//Chrome不兼容
    return false; // 阻止IE8及以上IE和其他浏览器的侦听事件,
  };
}

// 获取所有元素相对位置//为包含json的arr
function getaPos(oParent) {
  const aChildren = oParent.children;
  const aPos = [];
  if (oParent.style.position === '' || oParent.style.position === 'static') {
    oParent.style.position = 'relative';
  }
  for (let i = 0; i < aChildren.length; i++) {
    aPos[i] = {
      left: aChildren[i].offsetLeft,
      top: aChildren[i].offsetTop,
    };
  }
  return aPos;
}

// 布局转换
function display(oParent) {
  const aChildren = oParent.children;
  const aPos = getaPos(oParent);
  for (let i = 0; i < aChildren.length; i++) {
    aChildren[i].style.position = 'absolute';
    aChildren[i].style.left = `${aPos[i].left}px`;
    aChildren[i].style.top = `${aPos[i].top}px`;
    aChildren[i].style.margin = 0;
  }
}

// 随机换位//数组随机换位
function randPos(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

// 求物体距离
function getDis(obj, obj2) {
  const l1 = getPos(obj).left + obj.offsetWidth / 2;
  const t1 = getPos(obj).top + obj.offsetHeight / 2;
  const l2 = getPos(obj2).left + obj2.offsetWidth / 2;
  const t2 = getPos(obj2).top + obj2.offsetHeight / 2;
  const a = l1 - l2;
  const b = t1 - t2;
  return Math.sqrt(a * a + b * b);
}

// 找最近的同级元素
function findNearest(obj) {
  let iMin = Number.MAX_VALUE;
  let iMinIndex = -1;
  const objs = obj.parentNode.children;
  const oParent = obj.parentNode;

  for (let i = 0; i < objs.length; i++) {
    if (obj == objs[i]) {
      continue; // 如果是自己就排除
    }
    if (collTest(obj, objs[i])) { // 如果发生碰撞
      const dis = getDis(obj, objs[i]); // 就求碰撞距离
      if (dis < iMin) { // 如果距离小于赋值为极大值的iMin
        iMin = dis; // 就让iMin赋值等于距离
        iMinIndex = i; // 同时索引iMinIndex等于本次循环索引i
      } // 循环结束,得到赋值最小的iMin和其索引iMinIndex
    }
  }
  if (iMinIndex == -1) {
    return null; // 没找到最近的,返回为空
  }
  return objs[iMinIndex]; // 索引有效,返回该最近元素
}

// 拖拽2
function drag2(obj, aPos) {
  const oParent = obj.parentNode;
  const objs = obj.parentNode.children;
  // var aPos = getaPos(oParent);
  obj.onmousedown = function (ev) {
    obj.style.zIndex = zIndex++; // 使用时需要定义全局变量zIndex
    clearInterval(obj.timer);
    const oEvent = ev || event;
    const disX = oEvent.clientX - obj.offsetLeft;
    const disY = oEvent.clientY - obj.offsetTop;
    document.onmousemove = function (ev) {
      const oEvent = ev || event;
      obj.style.left = `${oEvent.clientX - disX}px`;
      obj.style.top = `${oEvent.clientY - disY}px`;
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      const oNear = findNearest(obj);
      if (oNear) {
        move(oNear, aPos[obj.index]);
        move(obj, aPos[oNear.index]);
        let tmp;
        tmp = oNear.index;
        oNear.index = obj.index;
        obj.index = tmp;
      } else {
        move(obj, aPos[obj.index]);
      }
    };
    return false;
  };
}

// 圆的运动
function cirMove(obj, iTarget) {
  // 角度
  obj.a = obj.a || 0;
  const start = obj.a;
  const dis = iTarget - start;

  const count = Math.floor(1000 / 30);
  let n = 0;
  clearInterval(obj.timer);
  obj.timer = setInterval(() => {
    n++;

    const a = n / count;
    const cur = start + dis * a;
    // 更新角度
    obj.a = cur;
    const x = R + R * Math.sin(cur * Math.PI / 180);
    const y = R - R * Math.cos(cur * Math.PI / 180);
    obj.style.left = `${x}px`;
    obj.style.top = `${y}px`;
    if (n == count) {
      clearInterval(obj.timer);
    }
  }, 30);
}

// 拉勾网移入移出效果
function hoverDir(obj, ev) {
  const x = getPos(obj).left + obj.offsetWidth / 2 - ev.clientX; // 鼠标位置与obj中心的横轴距离
  const y = getPos(obj).top + obj.offsetHeight / 2 - ev.clientY; // 鼠标位置与obj中心的纵轴距离
  return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
  // Math.atan2(y,x),鼠标位置与中心连线与X轴的夹角弧度(-π到π)
  //* 180/Math.Pi 弧度转角度(-180到180)
  // +180,:范围是0-360了(0-360)
  //  0~360/90==0-4
  //  Math.round():向下取整为0,1,gaojiyundong-lunbotu,3,4
  //  (0,1,gaojiyundong-lunbotu,3,4)%4=0,1,gaojiyundong-lunbotu,3
  //  0:左边;1:上边;gaojiyundong-lunbotu:右边;3:下边
}

// ///////////////////////////////////////RegExp

// 返回某一父集内特定某一class名的元素数组
function getByClass(oParent, sClass) {
  if (oParent.getElementsByClassName) {
    return oParent.getElementsByClassName(sClass);
  }
  const aEle = oParent.getElementsByTagName('*');
  const arr = [];
  const reg = new RegExp(`\\b${sClass}\\b`);
  for (let i = 0; i < aEle.length; i++) {
    if (reg.test(aEle[i].className)) {
      arr.push(aEle[i]);
    }
  }
  return arr;
}

// 判断某一元素是否拥有某一class名
function hasClass(obj, sClass) {
  const reg = new RegExp(`\\b${sClass}\\b`);
  return reg.test(obj.className);
}

// 向某一元素添加一个class名
function addClass(obj, sClass) {
  if (obj.className) {
    const reg = new RegExp(`\\b${sClass}\\b`);
    if (!reg.test(obj.className)) {
      obj.className += ` ${sClass}`;
    }
  } else {
    obj.className = sClass;
  }
}

// 将某一元素的某一class名移除
function removeClass(obj, sClass) {
  const reg = new RegExp(`\\b${sClass}\\b`, 'g'); // g防止重复class名导致删除不干净
  if (reg.test(obj.className)) {
    obj.className = obj.className.replace(reg, '').replace(/^\s+|\s$/g, '').replace(/\s+/g, ' ');
  }
}

// ///////////////////////////////////////RegExp end

// 事件委托

// //////////////////////////////////////cookie
// 设置cookie
/**
 * [addCookie description]
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 * @param {[type]} iDay  [description]
 */
function addCookie(name, value, iDay) {
  if (iDay) {
    const oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = `${name}=${value}; path=/; expires=${oDate.toUTCString()}`;
  } else {
    document.cookie = `${name}=${value}; path=/`;
  }
}

// 获取cookie
/**
 * [getCookie description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getCookie(name) {
  const arr = document.cookie.split('; ');
  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
}

// 移除cookie
/**
 * [removeCookie description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function removeCookie(name) {
  addCookie(name, '', -100);
}

// ///////////////////////////////////cookie end

// ajax
/**
 * [ajax description]
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */
function ajax(json) { // json可以写的参数有:url,date,success,error,type,time
  // -1.参数的默认值设定
  var json = json || {};
  if (!json.url) return; // 判断根目录是否为空,空则终止函数
  json.type = json.type || 'get';
  json.time = json.time || 3000;
  json.data = json.data || {};

  // 0.数据格式化
  json.data.t = Math.random(); // 数据的随机因子
  const arr = [];
  for (const name in json.data) {
    arr.push(`${name}=${json.data[name]}`);
  }
  const dataStr = arr.join('&');

  // 1.创建ajax的对象XHR
  let XHR;
  if (window.XMLHttpRequest) { // 如果存在这个属性
    XHR = new XMLHttpRequest(); // new出来的是对象
  } else {
    XHR = new ActiveXObject('Microsoft.XMLHTTP');
  }
  // 2.建立与后台的连接
  // 3.发送请求(数据)至后台(请求就是open里的url//或者是open里的url和send里的数据)
  switch (json.type.toLowerCase()) {
    case 'get':
      XHR.open('GET', `${json.url}?${dataStr}`, true);
      XHR.send();
      break;
    case 'post':
      XHR.open('POST', json.url, true);
      XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      XHR.send(dataStr);
      break;
  }
  // 4.接收后台返回的数据并可以执行回调函数
  XHR.onreadystatechange = function () { // 存储函数(函数名),readyState 属性改变时会调用该函数。
    if (XHR.readyState == 4) { // 前台到后台请求已完成，且响应已就绪//存有XHR的状态
      if ((XHR.status >= 200 && XHR.status < 300) || XHR.status == 304) {
        // 后台返回的状态消息 // 通信成功
        json.success && json.success(XHR.responseText); // 如有其参数,则可以执行带有一个参数的回调函数,该参数为后台返回的字符串
      } else { // 后台返回的状态消息//通信不成功
        json.error && json.error(XHR.status); // 如有其参数,则可以执行带有一个参数的回调函数,该参数为后台返回的状态消息
      }
      clearTimeout(timer);
    }
  };

  var timer = setTimeout(() => { // 网络超时
    alert('网络超时');
    XHR.onreadystatechange = null; // 网络超时就不接收后台返回的数据
  }, json.time); // 超时时间可以由ajax设置
}

// jsonp//本质是函数调用和函数定义
function jsonp(json) { // json可以写的参数有:url,date,success//cbName是函数的接口,cbValue是函数名
  // 默认值设定
  var json = json || {};
  if (!json.url) return;
  json.data = json.data || {};

  // 后台数据请求接口的设置//注意用户数据请求接口在jsonp调用时必设
  json.cbName = json.cbName || 'cb'; // 这个必须和后台一致,是获取函数(数据是函数的参数)的关键//接口=函数名(函数的参数)>>>>>>>>>>>>>>>>cb=show(参数)
  let cbValue = `jsonp_${Math.random()}`; // 使函数名随机,这样调用时可以避免函数名相同导致的函数方法的覆盖//这个不重要,他是函数的名字,函数里面的参数是回调函数所需要的 //
  // 函数名不能出现小数点,替换cvValue里面的小数点
  cbValue = cbValue.replace('.', '');

  // 数据格式化
  json.data[json.cbName] = cbValue;
  const arr = [];
  for (const name in json.data) {
    arr.push(`${name}=${json.data[name]}`);
  }
  const dataStr = arr.join('&');

  // 后台数据请求接口的数据返回设置和回调函数接口
  window[cbValue] = function (ajson) { // ajson为cbValue的参数
    json.success && json.success(ajson); // 虽然在函数内但是会执行,执行的时候有cbValue的参数这个变量
    oHead.removeChild(oS); // 在函数同时多次调用时会报错???
  };

  var oHead = document.getElementsByTagName('head')[0];
  var oS = document.createElement('script');
  oS.src = `${json.url}?${dataStr}`;
  oHead.appendChild(oS);
}

// 划入划出//全遮照
function slideInOutFull(obj) {
  obj.onmouseenter = function (ev) {
    const oEvent = ev || event;
    const m = this.offsetWidth;
    const n = hoverDir(this, oEvent);
    const oSpan = this.children[1];
    switch (n) {
      case 0:
        oSpan.style.left = `${m}px`;
        oSpan.style.top = 0;
        break;
      case 1:
        oSpan.style.left = 0;
        oSpan.style.top = `${m}px`;
        break;
      case 2:
        oSpan.style.left = `${-m}px`;
        oSpan.style.top = 0;
        break;
      case 3:
        oSpan.style.left = 0;
        oSpan.style.top = `${-m}px`;
        break;
    }
    move(oSpan, {
      left: 0,
      top: m / 2,
    });
  };
  obj.onmouseleave = function (ev) {
    const oEvent = ev || event;
    oEvent.cancelBubble = true;
    const n = hoverDir(this, oEvent);
    const m = this.offsetWidth * 1.5;

    const oSpan = this.children[1];
    switch (n) {
      case 0:
        move(oSpan, {
          left: m,
          top: 0,
        });
        break;
      case 1:
        move(oSpan, {
          left: 0,
          top: m,
        });
        break;
      case 2:
        move(oSpan, {
          left: -m,
          top: 0,
        });
        break;
      case 3:
        move(oSpan, {
          left: 0,
          top: -m,
        });
        break;
    }
  };
}

// getStyle
function setStyle3(obj, name, value) {
  const w = name.charAt(0).toUpperCase() + name.substring(1);
  obj.style[`Webkit${w}`] = value;
  obj.style[`Moz${w}`] = value;
  obj.style[`ms${w}`] = value;
  obj.style[`O${w}`] = value;
  obj.style[name] = value;
}

// 角度转弧度
function d2a(n) {
  return n * Math.PI / 180;
}

// 弧度转角度
function a2d(n) {
  return n * 180 / Math.PI;
}
</=></=>