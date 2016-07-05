var Game = function() {
  // Game logic and initialization here
};

Game.prototype.restart = function() {

  // reset score

  // clear tiles

  this.newTile()
}

Game.prototype.newTile = function() {

  var tile_div = "<div class='tile' data-row='r" + (Math.floor(Math.random() * 4) + 1) +  "' data-col='c" + (Math.floor(Math.random() * 4) + 1) + "' data-val='2'>2</div>"

  $('#gameboard').append(tile_div)
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      // change data-row to uppermost one
      $('.tile').attr("data-row", "r0");
      break;
    case 40: //down
      console.log('down');
      $('.tile').attr("data-row", "r3");
      break;
    case 37: //left
      console.log('left');
      $('.tile').attr("data-col", "c0");
      break;
    case 39: //right
      console.log('right');
      $('.tile').attr("data-col", "c3");
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  var restartButton = $('button')

  $('button').on('click', function () {
    game.restart()
  })

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });

  $('body').keyup(function(event){

    game.newTile()

  });

});
