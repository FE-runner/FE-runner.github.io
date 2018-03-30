/**
 * Created by ijiajia on 2016/7/19.
 */
// 大炮尺寸
var CANNON_SIZE=[
    null,
    {w: 74, h: 74},
    {w: 74, h: 76},
    {w: 74, h: 76},
    {w: 74, h: 83},
    {w: 74, h: 85},
    {w: 74, h: 90},
    {w: 74, h: 94}
];
//对象
function Cannon(type){
    //属性
    this.x=431;//大炮位置//固定
    this.y=570;
    this.rotate=0;//大炮旋转//不古代
    this.cur=0;//计数器
    this.type=type;//大炮类型//参数,由外界传入
}
//对象方法
//绘制大炮图像
Cannon.prototype.draw=function(gd){
    var w=CANNON_SIZE[this.type].w;//获取每大炮一一对应的宽高
    var h=CANNON_SIZE[this.type].h;
    gd.save();
    gd.translate(this.x, this.y);//将画布起始原点平移到大炮中心点
    gd.rotate(d2a(this.rotate));//画布旋转
    gd.drawImage(JSON['cannon'+this.type],//绘制大炮图像在画布上
        0,this.cur*h,w,h,
        -w/2,-h/2,w,h
    );
    gd.restore();
};
//改变大炮图像,制造开炮动画效果
Cannon.prototype.emit=function(){//大炮开炮动画
    var _this=this;
    clearInterval(this.timer);
    this.timer=setInterval(function(){
        _this.cur++;
        if(_this.cur>=5){
            _this.cur=0;
            clearInterval(_this.timer);
        }
    }, 30);
};