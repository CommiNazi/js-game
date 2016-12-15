playerProps = (args)=>{
  if(!args) args={}
  pd = {
    position:args.position||new Vector(0,0),
    height:args.height||10,
    width:args.width||10,
    speed: args.speed||5,
    velocity: args.velocity||new Vector(0,0),
    name:args.name||"Player",
    magic: args.magic||{value: 10, cap: 10},
    health: args.health||{value: 25, cap: 25},
    stamina: args.stamina||{value: 25, cap: 25},
    color: args.color||"black"
  }
  return pd
}

function GamePiece (props) {
  Object.assign(this, props);
  this.update = function(){
    this.velocity = this.velocity.mult(dt)
    this.position = this.position.add(this.velocity)
    this.draw()
  }
  this.draw = ()=>{
    ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    autoTimer = window.requestAnimationFrame(this.draw);
  }
}

function Vector(x,y){
  if(!y) {
    if(!x) x = {x:0,y:0}
    this.x = x.x
    this.y = x.y
  } else {
    this.x = x
    this.y = y
  }
  this.add = function(a,b){
    var newVec = new Vector(this)
    if(a instanceof Vector) {
      newVec.x += a.x
      newVec.y += a.y
    } else {
      newVec.x += a
      newVec.y += b
    }
    return newVec
  }
  this.mult = function(c){
    var newVec = new Vector();
    newVec.x = this.x*c;
    newVec.y = this.y*c;
    return newVec
  }
  this.divide = function(d){
    var newVec = new Vector()
    newVec.x = this.x/d;
    newVec.y = this.y/d;
    return newVec
  }
  this.dist = function(){return Math.sqrt(this.x*this.x + this.y*this.y)}
  this.prox = function(){return this.x*this.x + this.y*this.y}
  this.normalized = function(){return new Vector(this.divide(this.dist()))}
}
