/**
 * Created by ijiajia on 2016/7/19.
 */
window.onload = function () {
  var oC = document.querySelector('#c1');

  var gd = oC.getContext('2d');
  var out = 50;//画布边界扩展
  var frequency = 0.05;//鱼出现的概率
  // 加载资源
  loadImage(resource, function () {
    // 存炮弹
    var arrBullet = [];
    // 存鱼
    var arrFish = [];
    // 存金币
    var arrCoin = [];
    // 存死鱼
    var arrDieFish = [];
    // 存网
    var arrWeb = [];

    // 大炮对象
    var c = new Cannon(7);
    //定时器 生成鱼,鱼运动,生成金币,金币运动,生成网,网运动,炮弹运动
    setInterval(function () {
      gd.clearRect(0, 0, oC.width, oC.height);//清除画布
      // 生成鱼
      if (Math.random() < frequency) {
        var f1 = new Fish(rnd(1, 6));//随机鱼的类型

        f1.y = rnd(100, oC.height - 100);//固定鱼的Y轴出口
        if (Math.random() < 0.5) {//随机鱼的X轴出口
          f1.x = -out;
          f1.rotate = rnd(-45, 45);//随机鱼的运动方向
        } else {
          f1.x = oC.width + out;
          f1.rotate = rnd(135, 225);
        }
        arrFish.push(f1);//存鱼
      }
      // 画出运动的鱼
      for (var i = 0; i < arrFish.length; i++) {
        arrFish[i].draw(gd);
      }
      // 画出运动的子弹
      for (var i = 0; i < arrBullet.length; i++) {
        arrBullet[i].draw(gd);
      }
      // 画出运动的金币
      for (var i = 0; i < arrCoin.length; i++) {
        arrCoin[i].draw(gd);
      }
      // 画出运动的死鱼
      for (var i = 0; i < arrDieFish.length; i++) {
        arrDieFish[i].draw(gd);
      }
      // 画出运动的网
      for (var i = 0; i < arrWeb.length; i++) {
        arrWeb[i].draw(gd);
        //网的优化
        arrWeb[i].scale += 0.05;
        if (arrWeb[i].scale > 1.2) {
          arrWeb.splice(i, 1);
          i--;
        }
      }
      // 画炮台
      gd.drawImage(JSON['bottom'], 0, 0, 765, 72, 0, oC.height - 70, 765, 72);
      // 画运动的大炮
      c.draw(gd);
      // 判断子弹是否打中鱼
      for (var i = 0; i < arrFish.length; i++) {
        for (var j = 0; j < arrBullet.length; j++) {
          if (arrFish[i].isIn(arrBullet[j].x, arrBullet[j].y)) {
            var type = arrFish[i].type;
            var x = arrFish[i].x;
            var y = arrFish[i].y;
            var rotate = arrFish[i].rotate;
            // 鱼死
            arrFish.splice(i, 1);
            i--;
            // 子弹死
            arrBullet.splice(j, 1);
            j--;
            // 生成金币
            var coin = new Coin(type);
            coin.x = x;
            coin.y = y;
            coin.songPlay();
            arrCoin.push(coin);
            // 生成死鱼
            var dieFish = new DieFish(type);
            dieFish.x = x;
            dieFish.y = y;
            dieFish.rotate = rotate;
            arrDieFish.push(dieFish);
            // 生成网
            var web = new Web();
            web.x = x;
            web.y = y;
            arrWeb.push(web);

            setTimeout(function () {
              arrDieFish.splice(dieFish);
            }, 400);
          }
        }
      }

      // 优化，子弹超出画布死
      for (var i = 0; i < arrBullet.length; i++) {
        if (arrBullet[i].x < 0 || arrBullet[i].y < 0 || arrBullet[i].x > oC.width || arrBullet[i].y > oC.height) {
          arrBullet.splice(i, 1);
          i--;
        }
      }
      // 优化，鱼游出去，死
      for (var i = 0; i < arrFish.length; i++) {
        if (arrFish[i].x < -out || arrFish[i].y < -out || arrFish[i].x > oC.width + out || arrFish[i].y > oC.height + out) {
          arrFish.splice(i, 1);
          i--;
        }
      }
    }, 16);
    //发射事件
    oC.onclick = function (ev) {
      var y = c.y - ev.pageY;
      var x = ev.pageX - c.x - oC.offsetLeft;

      var d = 90 - a2d(Math.atan2(y, x));
      c.rotate = d;
      c.emit();
      // 发射炮弹
      var bullet = new Bullet(c.type);
      bullet.x = c.x;
      bullet.y = c.y;
      bullet.rotate = c.rotate;
      arrBullet.push(bullet);

      var oAudio = new Audio();
      oAudio.src = 'snd/cannon.mp3';
      oAudio.play();
    };
  });
};