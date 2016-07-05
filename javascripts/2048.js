var Game = function() {
  // Game logic and initialization here
  this._board = [
    [2,0,0,0],
    [0,2,0,0],
    [0,0,2,0],
    [0,0,0,2]
  ]
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up

      console.log('up');
      break;

    case 40: //down
      console.log('down');
      break;

    case 37: //left
      console.log('left');
      break;

    case 39: //right
      console.log('right');
      break;
  }
};

Game.prototype.moveAll = function(tile, direction) {
  tile.each(function (key,val) {
    console.log(key)
  })
  for (let col = 0; col < 4; col++){
    let pointer = 0
    for (let row = 0; row < 4; col++) {

      // if
      // pointer++
      // if
    }
  }
}
$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      console.log(tile)
      game.moveTile(tile, event.which);
    }
  });
});
