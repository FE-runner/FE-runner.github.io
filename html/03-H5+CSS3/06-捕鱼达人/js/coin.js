/**
 * Created by ijiajia on 2016/7/19.
 */
function Coin(type){
    this.x=0;
    this.y=0;
    this.cur=0;
    this.type=type;

    this.move();
}
Coin.prototype.draw=function(gd){
    gd.save();
    if(this.type