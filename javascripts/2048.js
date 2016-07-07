var Game = function() {
  this._board = [[null, null, 2, 2],
                [null, null, 2, null],
                [null, 2, 2, null],
                [2, 2, null, null]]

  this._availableSpaces = []
};

Game.prototype.moveTile = function(tile, direction, callback) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.moveUp()
      break;
    case 40: //down
      console.log('down');
      this.moveDown()
      break;
    case 37: //left
      console.log('left');
      this.moveLeft()
      break;
    case 39: //right
      console.log('right');
      this.moveRight()
      break;
  }
};

Game.prototype.updateBoard = function() {
  this._availableSpaces = []
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      slot = "\"[" + i.toString() + "][" + j.toString() + "]\""
      // console.log(slot)
      if (this._board[i][j] === null || this._board[i][j] === 0 || isNaN(this._board[i][j]) || typeof this._board[i][j] === 'undefined') {
        this._board[i][j] = 0
        $('div[id='+ slot + ']').html(0)
        this._board[i][j] = null
        this._availableSpaces.push([i, j])
      } else {
      $('div[id='+ slot + ']').html(this._board[i][j])
    }}
  }
}

Game.prototype.collide = function (spaceOne, spaceTwo) {
  // spaces specified hold values
  if (spaceOne === spaceTwo) {
    spaceOne += spaceTwo
  } else if (spaceOne === null || spaceOne === 0 || typeof spaceOne === 'undefined' || isNaN(spaceOne)) {
    spaceOne = spaceTwo
  } else {
    return false
  }

  return spaceOne
}

Game.prototype.moveLeft = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = j; k >= 0; k--) {
        console.log('K')
        let newValue = this.collide(this._board[i][k], this._board[i][k + 1])
        if (newValue !== false) {
          this._board[i][k] = newValue
          this._board[i][k + 1] = null
        } else if (newValue === false) {
          // does a thing ever happen here?
        }
      }
    }
  }
}

Game.prototype.moveRight = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j > 0; j--) {
      for (let k = j; k <= 3; k++) {
        console.log('K')
        let newValue = this.collide(this._board[i][k], this._board[i][k - 1])
        if (newValue !== false) {
          this._board[i][k] = newValue
          this._board[i][k - 1] = null
        } else if (newValue === false) {
          // does a thing ever happen here?
        }
      }
    }
  }
}

Game.prototype.moveDown = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 0; j--) {
      for (let k = j; k < 4; k++) {
        console.log('K')
        let newValue = this.collide(this._board[k][i], this._board[k - 1][i])
        if (newValue !== false) {
          this._board[k][i] = newValue
          this._board[k - 1][i] = null
        } else if (newValue === false) {
         // does a thing ever happen here?
        }
      }
    }
  }
}

Game.prototype.moveUp = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = j; k >= 0; k--) {
        console.log('K')
        let newValue = this.collide(this._board[k][i], this._board[k + 1][i])
        if (newValue !== false) {
          this._board[k][i] = newValue
          this._board[k + 1][i] = null
        } else if (newValue === false) {
          // does a thing ever happen here?
        }
      }
    }
  }
}

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  game.updateBoard()

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      console.log(game._board)
      console.log(game._availableSpaces)
      game.updateBoard()
      game.moveTile(tile, event.which);
      console.log(game._board)
      game.updateBoard()
    }
  });
});
