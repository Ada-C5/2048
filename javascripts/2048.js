var Game = function() {
  // Game logic and initialization here
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

Game.prototype.addTile = function() {

  var tile_div = "<div class='tile' data-row='r" + (Math.floor(Math.random() * 4) + 1) +  "' data-col='c" + (Math.floor(Math.random() * 4) + 1) + "' data-val='2'>2</div>"

  $('#gameboard').append(tile_div)
}

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });

  $('body').keyup(function(event){

    // var tile_div = "<div class='tile' data-row='r" + (Math.floor(Math.random() * 4) + 1) +  "' data-col='c" + (Math.floor(Math.random() * 4) + 1) + "' data-val='2'>2</div>"
    //
    // $('#gameboard').append(tile_div)

    game.addTile();

  });

});
