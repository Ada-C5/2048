var Game = function() {
  this._board = [[null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]]
};

Game.prototype.collide = function (spaceOne, spaceTwo) {
  // spaces specified hold values
  if (spaceOne === spaceTwo) {
    spaceOne += spaceTwo
    spaceTwo = null
  } else {
    return false
  }

  return spaceOne
}

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

Game.prototype.updateBoard = function() {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      slot = "[" + i.toString() + "][" + j.toString() + "]"
      $(slot).contents() = this._board[i][j]
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

      game.moveTile(tile, event.which);
    }
  });
});
