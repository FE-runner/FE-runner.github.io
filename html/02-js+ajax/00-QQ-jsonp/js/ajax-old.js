/**
 * @authors LianyForWeb
 * @date    2016-06-17 09:34:47
 */

function json2url(dataJson) { //date是一个json,需要转化为一个以=替换:的&连接的字符串
  dataJson.t = Math.random(); //数据的随机因子
  var arr = [];
  for (var name in dataJson) {
    arr.push(name + '=' + dataJson[name]);
  }
  return arr.join('&');
}

function ajax(json) { //json可以写的参数有:url,date,success,error,type,time
  //0.参数的默认值设定
  json = json || {};
  if (!json.url) return; //判断根目录是否为空,空则终止函数
  json.data = json.data || {};
  json.type = json.type || 'get';
  json.time = json.time || 3000;
  //1.创建ajax的对象XHR
  var XHR;
  if (window.XMLHttpRequest) { //如果存在这个属性
    XHR = new XMLHttpRequest(); //new出来的是对象
  } else {
    XHR = new ActiveXObject('Microsoft.XMLHTTP');
  }
  //2.建立与后台的连接
  //3.发送请求(数据)至后台(请求就是open里的url//或者是open里的url和send里的数据)
  switch (json.type.toLowerCase()) {
    case 'get':
      XHR.open('GET', json.url + '?' + json2url(json.data), true);
      XHR.send();
      break;
    case 'post':
      XHR.open('POST', json.url, true);
      XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      XHR.send(json2url(json.data));
      break;
  }
  // 4.接收后台返回的数据并可以执行回调函数
  XHR.onreadystatechange = function() { // 存储函数(函数名),readyState 属性改变时会调用该函数。
    if (XHR.readyState == 4) { //前台到后台请求已完成，且响应已就绪//存有XHR的状态
      if ((XHR.status >= 200 && XHR.status < 300) || XHR.status == 304) {
        // 后台返回的状态消息 // 通信成功
        json.success && json.success(XHR.responseText); //如有其参数,则可以执行带有一个参数的回调函数,该参数为后台返回的字符串
      } else { // 后台返回的状态消息//通信不成功
        json.error && json.error(XHR.status); //如有其参数,则可以执行带有一个参数的回调函数,该参数为后台返回的状态消息
      }
      clearTimeout(timer);
    }
  };

  var timer = setTimeout(function() { //网络超时
    alert('网络超时');
    XHR.onreadystatechange = null; //网络超时就不接收后台返回的数据
  }, json.time); //超时时间可以由ajax设置
}

/*
ajax({
  url: '根URL',//与data组成XHR.open的参数url
  data: { 'URL ? 后的数据' },
  success: function(str) {

  },
  error: function() {

  },
  type:'get',
  time:5000
});
 */
