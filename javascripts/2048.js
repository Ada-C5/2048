var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tiles, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.moves("data-row", "r0")
      // this.moveUp()
      break;
    case 40: //down
      console.log('down');
      this.moves("data-row", "r3")
      // this.moveDown()
      break;
    case 37: //left
      console.log('left');
      this.moves("data-col", "c0")
      break;
    case 39: //right
      console.log('right');
      this.moves("data-col", "c3")
      break;
  }
};

Game.prototype.moves = function (data, space) {
  $(".tile").attr(data, space)
}

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');
      // console.log(tiles)
      game.moveTile(tiles, event.which);
    }
  });
});
