var Game = function() {
  this._board = [[null, 2, 2, 2],
                [null, 2, 2, null],
                [2, 2, 2, null],
                [2, null, null, 2]]
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
      this.moveLeft()
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

Game.prototype.updateBoard = function() {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      slot = "\"[" + i.toString() + "][" + j.toString() + "]\""
      // console.log(slot)
      $('div[id='+ slot + ']').html(this._board[i][j])
    }
  }
}

Game.prototype.collide = function (spaceOne, spaceTwo) {
  // spaces specified hold values
  if (spaceOne === spaceTwo) {
    console.log("one === two")
    spaceOne += spaceTwo
  } else if (spaceOne === null || spaceOne === 0) {
    console.log("null move")
    spaceOne = spaceTwo
  } else {
    console.log("wut")
    return false
  }

  return spaceOne
}


Game.prototype.moveLeft = function () {
  for (let i = 0; i < 4; i ++) {
    for (let j = 0; j < 4; j ++) {
      for (let k = j; k >= 0; k --) {
        console.log("K")
        let newValue = this.collide(this._board[i][k], this._board[i][k+1])
        if (newValue !== false) {
          this._board[i][k] = newValue
          if (k < 3) { this._board[i][k+1] = null }
        } if (newValue === false) {
          console.log('FALSE!!!')
        }
      }
    }
  }
}

Game.prototype.moveUp = function () {
  for (let i = 3; i >= 0; i --) {
    for (let j = 3; j >= 0; j --) {
      this.collide(this._board[i][j], this._board[i+1][j])
    }
  }
}

Game.prototype.moveDown = function () {
  for (let i = 3; i > 0; i --) {
    for (let j = 3; j > 0; j --) {
      this.collide(this._board[i][j], this._board[i+1][j])
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
      console.log(game._board)
      game.updateBoard()
      game.moveTile(tile, event.which);
      game.updateBoard()
    }
  });
});
