var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tiles, direction) {
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
      this.moveLeft()
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

Game.prototype.moveLeft = function(){
  var tiles = $(".tile")
  console.log(tiles.data("row"))
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');
      // console.log(event.which)
      game.moveTile(tiles, event.which);
    }
  });
});
