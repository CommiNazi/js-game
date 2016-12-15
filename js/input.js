function approach(g, c, d) {
  d = Math.abs(d);
  var x = g-c;
  return x>d?(c+d):x<-d?(c-d):g
}
dotProduct = (a,b)=>a.x*b.x + a.y*b.y

function getArrow() {
  var arrowBits = 0;  // the value to hold the bits
  const KEY_BITS = [4,1,8,2]; // left up right down
  const KEY_MASKS = [0b1011,0b1110,0b0111,0b1101]; // left up right down
  document.onkeydown = document.onkeyup = function (e) {
    e = e || window.event;
    if(e.keyCode >= 37 && e.keyCode <41){
      e.preventDefault();
      window.cancelAnimationFrame(autoTimer);
      if(e.type === "keydown"){
            arrowBits |= KEY_BITS[e.keyCode - 37];
        }else{
            arrowBits &= KEY_MASKS[e.keyCode - 37];
        }
    } else if([65,87,68,83].includes(e.keyCode)) { //wads support; lurd==awds
      e.preventDefault();
      window.cancelAnimationFrame(autoTimer);
      var t = e.keyCode==65?0:e.keyCode==87?1:e.keyCode==68?2:3
        if(e.type === "keydown"){
            arrowBits |= KEY_BITS[t];
        }else{
            arrowBits &= KEY_MASKS[t];
        }
    }
    const KEY_U = 1;
    const KEY_D = 2;
    const KEY_L = 4;
    const KEY_R = 8;
    const KEY_UL = KEY_U + KEY_L;
    const KEY_UR = KEY_U + KEY_R;
    const KEY_DL = KEY_D + KEY_L;
    const KEY_DR = KEY_D + KEY_R;
    move = function() {
      if ((arrowBits & KEY_UL) === KEY_UL) {
        player1.velocity = new Vector(
          approach(-player1.speed, player1.velocity.x, dt),
          approach(-player1.speed, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_UR) === KEY_UR) {
        player1.velocity = new Vector(
          approach(player1.speed, player1.velocity.x, dt),
          approach(-player1.speed, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_U) === KEY_U) {
        player1.velocity = new Vector(
          approach(-player1.speed, player1.velocity.x, dt),
          approach(0, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_DL) === KEY_DL) {
        player1.velocity = new Vector(
          approach(-player1.speed, player1.velocity.x, dt),
          approach(player1.speed, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_DR) === KEY_DR) {
        player1.velocity = new Vector(
          approach(player1.speed, player1.velocity.x, dt),
          approach(player1.speed, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_D) === KEY_D) {
        player1.velocity = new Vector(
          approach(0, player1.velocity.x, dt),
          approach(player1.speed, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_L) === KEY_L) {
        player1.velocity = new Vector(
          approach(-player1.speed, player1.velocity.x, dt),
          approach(0, player1.velocity.y, dt)
        )
      } else if ((arrowBits & KEY_R) === KEY_R) {
        player1.velocity = new Vector(
          approach(player1.speed, player1.velocity.x, dt),
          approach(0, player1.velocity.y, dt)
        )
      }
      player1.update()
    }
  }
}
function goToDoubleClick() {
  pos = (c, e)=>{
    var r = c.getBoundingClientRect();
    return {
      x: (e.clientX-r.left)/(r.right-r.left)*c.width,
      y: (e.clientY-r.top)/(r.bottom-r.top)*c.height
    };
  }
  myGameArea.canvas.ondblclick = function(evt) {
    var mouse = pos(myGameArea.canvas, evt);
    var move = () => {
      var a = Math.abs(mouse.x - player1.x),
          b = Math.abs(mouse.y - player1.y),
          dist = Math.floor(Math.sqrt( a*a + b*b ));
      if(dist<=0) {
        return;
      } else {
        var xSpeed = player1.speed>a?a:player1.speed;
        var ySpeed = player1.speed>b?b:player1.speed;
        if(xSpeed>0&&ySpeed>0) {xSpeed=xSpeed*.75;ySpeed=ySpeed*.75;}
        player1.x = (mouse.x-player1.x)==0?player1.x:(mouse.x-player1.x)>0?player1.x+xSpeed:player1.x-xSpeed;
        player1.y = (mouse.y-player1.y)==0?player1.y:(mouse.y-player1.y)>0?player1.y+ySpeed:player1.y-ySpeed;
      }
    }
  };
}
