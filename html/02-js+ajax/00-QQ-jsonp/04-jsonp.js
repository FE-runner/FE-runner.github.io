/**
 * @authors LianyForWeb
 * @date    2016-06-18 10:11:13
 */

/**
 * [jsonp description]
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */
//本质是函数调用和函数定义
function jsonp(json) { //json可以写的参数有:url,date,success//cbName是函数的接口,cbValue是函数名
  // 默认值设定
  var json = json || {};
  if (!json.url) return;
  json.data = json.data || {};
  
  //后台数据请求接口的设置//注意用户数据请求接口在jsonp调用时必设
  json.cbName = json.cbName || 'cb'; //这个必须和后台一致,是获取函数(数据是函数的参数)的关键//接口=函数名(函数的参数)>>>>>>>>>>>>>>>>cb=show(参数)
  var cbValue = 'jsonp_' + Math.random(); // 使函数名随机,这样调用时可以避免函数名相同导致的函数方法的覆盖//这个不重要,他是函数的名字,函数里面的参数是回调函数所需要的 //
                                          // 函数名不能出现小数点,替换cvValue里面的小数点
  cbValue = cbValue.replace('.', '');
  
  //数据格式化
  json.data[json.cbName] = cbValue;
  var arr = [];
  for (var name in json.data) {
    arr.push(name + '=' + json.data[name]);
  }
  var dateStr = arr.join('&');
  
  //后台数据请求接口的数据返回设置和回调函数接口
  window[cbValue] = function (ajson) { //ajson为cbValue的参数
    json.success && json.success(ajson); //虽然在函数内但是会执行,执行的时候有cbValue的参数这个变量
    oHead.removeChild(oS); //在函数同时多次调用时会报错???
  };
  
  var oHead = document.getElementsByTagName('head')[0];
  var oS = document.createElement('script');
  oS.src = json.url + '?' + dateStr;
  oHead.appendChild(oS);
  
}
