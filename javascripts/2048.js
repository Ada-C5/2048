var Game = function() {
  this.board = {
    "r0c0": null,
    "r1c0": null,
    "r2c0": null,
    "r3c0": null,
    "r0c1": null,
    "r1c1": null,
    "r2c1": null,
    "r3c1": null,
    "r0c2": null,
    "r1c2": null,
    "r2c2": null,
    "r3c2": null,
    "r0c3": null,
    "r1c3": null,
    "r2c3": null,
    "r3c3": null
  }
  this.unoccupied = function() {
    var unoccupied = []
      for (var space in this.board) {
      if (this.board[space] === null) {
        unoccupied.push(space)
      }
    }
    return unoccupied
  }

  this.occupied = function() {
    var occupied = []
    for (var space in this.board) {
      if (this.board[space] != null) {
        occupied.push(space)
      }
    }
    return occupied
  }

  this.score = 0
};

Game.prototype.collideAllRight = function(tiles) {
  tiles = tiles.sort().reverse()
  for (var i = 0; i < tiles.length; i++) {

    var row = /.{2}/.exec(tiles[i])[0]
    var col = /.{2}$/.exec(tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.collideRight(row, col, val)

  }
}

Game.prototype.collideAllDown = function(tiles) {
  tiles = tiles.sort().reverse()
  for (var i = 0; i < tiles.length; i++) {

    var row = /.{2}/.exec(tiles[i])[0]
    var col = /.{2}$/.exec(tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.collideDown(row, col, val)
  }
}

Game.prototype.collideAllUp = function(tiles) {
  console.log('collide up')
  tiles = tiles.sort()
  for (var i = 0; i < tiles.length; i++) {
    var row = /.{2}/.exec(tiles[i])[0]
    var col = /.{2}$/.exec(tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.collideUp(row, col, val)
  }
}

Game.prototype.collideAllLeft = function(tiles) {
  tiles = tiles.sort()
  for (var i = 0; i < tiles.length; i++) {

    var row = /.{2}/.exec(tiles[i])[0]
    var col = /.{2}$/.exec(tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.collideLeft(row, col, val)
  }
}

Game.prototype.moveTilesRight = function(tiles) {
  var sorted_tiles = tiles.sort().reverse()
  for (var i = 0; i < sorted_tiles.length; i++) {
    var row = /.{2}/.exec(sorted_tiles[i])[0]
    var col = /.{2}$/.exec(sorted_tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.moveSingleTileRight(row, col, val)
  }
}

Game.prototype.moveTilesLeft = function(tiles) {
  var sorted_tiles = tiles.sort()
  for (var i = 0; i < sorted_tiles.length; i++) {
    var row = /.{2}/.exec(sorted_tiles[i])[0]
    var col = /.{2}$/.exec(sorted_tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.moveSingleTileLeft(row, col, val)
  }
}


Game.prototype.moveTilesDown = function(tiles) {
  var sorted_tiles = tiles.sort().reverse()
  for (var i = 0; i < sorted_tiles.length; i++) {
    var row = /.{2}/.exec(sorted_tiles[i])[0]
    var col = /.{2}$/.exec(sorted_tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.moveSingleTileDown(row, col, val)
  }
}


Game.prototype.moveTilesUp = function(tiles) {
  var sorted_tiles = tiles.sort()
  for (var i = 0; i < sorted_tiles.length; i++) {
    var row = /.{2}/.exec(sorted_tiles[i])[0]
    var col = /.{2}$/.exec(sorted_tiles[i])[0]
    var position = row + col
    var val = this.board[position]
    g.moveSingleTileUp(row, col, val)
  }
}

Game.prototype.moveSingleTileLeft = function(row, col, val) {
  if (col === 'c1') {
    if (!this.board[row + 'c0']) {
      this.board[row + 'c0'] = val
      this.board[row + col] = null
    }
  } else if (col === 'c2') {
    if (!this.board[row + 'c1']) {
      if (!this.board[row + 'c0']) {
        this.board[row + 'c0'] = val
        this.board[row + col ] = null
      } else {
      this.board[row + 'c1'] = val
      this.board[row + col] = null
      }
    }
  }  else if (col === 'c3') {
      if (!this.board[row + 'c2']) {
        if (!this.board[row + 'c1']) {
          if (!this.board[row + 'c0']) {
            this.board[row + 'c0'] = val
            this.board[row + col ] = null
          } else {
            this.board[row + 'c1'] = val
            this.board[row + col] = null
          }
        } else {
        this.board[row + 'c2'] = val
        this.board[row + col] = null
        }
      }
    }
}

Game.prototype.moveSingleTileRight = function(row, col, val) {
  if (col === 'c2') {
    if (!this.board[row + 'c3']) {
      this.board[row + 'c3'] = val
      this.board[row + col] = null
    }
  } else if (col === 'c1') {
    if (!this.board[row + 'c2']) {
      if (!this.board[row + 'c3']) {
        this.board[row + 'c3'] = val
        this.board[row + col ] = null
      } else {
      this.board[row + 'c2'] = val
      this.board[row + col] = null
      }
    }
  }  else if (col === 'c0') {
      if (!this.board[row + 'c1']) {
        if (!this.board[row + 'c2']) {
          if (!this.board[row + 'c3']) {
            this.board[row + 'c3'] = val
            this.board[row + col ] = null
          } else {
            this.board[row + 'c2'] = val
            this.board[row + col] = null
          }
        } else {
        this.board[row + 'c1'] = val
        this.board[row + col] = null
        }
      }
    }
}

Game.prototype.moveSingleTileDown = function(row, col, val) {

  if (row === 'r2') {
    if (!this.board['r3' + col]) {
      this.board['r3' + col] = val
      this.board[row + col] = null
    }
  } else if (row === 'r1') {
    if (!this.board['r2' + col]) {
      if (!this.board['r3' + col]) {
        this.board['r3' + col]  = val
        this.board[row + col] = null
      } else {
      this.board['r2' + col] = val
      this.board[row + col] = null
      }
    }
  } else if (row === 'r0') {
      if (!this.board['r1' + col]) {
        if (!this.board['r2' + col]) {
          if (!this.board['r3' + col]) {
            this.board['r3' + col] = val
            this.board[row + col] = null
          } else {
            this.board['r2' + col] = val
            this.board[row + col] = null
          }
        } else {
        this.board['r1' + col] = val
        this.board[row + col] = null
      }
    }
  }
}

Game.prototype.moveSingleTileUp = function(row, col, val) {

  if (row === 'r1') {
    if (!this.board['r0' + col]) {
      this.board['r0' + col] = val
      this.board[row + col] = null
    }

  } else if (row === 'r2') {
    if (!this.board['r1' + col]) {
      if (!this.board['r0' + col]) {
        this.board['r0' + col]  = val
        this.board[row + col] = null
      } else {
      this.board['r1' + col] = val
      this.board[row + col] = null
      }
    }
  } else if (row === 'r3') {
      if (!this.board['r2' + col]) {
        if (!this.board['r1' + col]) {
          if (!this.board['r0' + col]) {
            this.board['r0' + col] = val
            this.board[row + col] = null
          } else {
            this.board['r1' + col] = val
            this.board[row = col] = null
          }
        } else {
        this.board['r2' + col] = val
        this.board[row + col] = null
      }
    }
  }
}



Game.prototype.collideRight = function(row, col, val) {
  if (col === 'c2') {
    var rightier_col = 'c3'
    if (this.board[row + rightier_col] === this.board[row + col]) {
      this.board[row + rightier_col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  } else if (col === 'c1') {
    var rightier_col = 'c2'
    if (this.board[row + rightier_col] === this.board[row + col]) {
      this.board[row + rightier_col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  }  else if (col === 'c0') {
      var rightier_col = 'c1'
      if (this.board[row + rightier_col] === this.board[row + col]) {
        this.board[row + rightier_col] = String(Number(val) * 2)
        this.board[row + col] = null
        this.score += Number(val)*2
      }
    }

    $('.score').text(this.score)
    this.display()
}

Game.prototype.collideLeft = function(row, col, val) {
  if (col === 'c1') {
    var leftier_col = 'c0'
    if (this.board[row + leftier_col] === this.board[row + col]) {
      this.board[row + leftier_col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  } else if (col === 'c2') {
    var leftier_col = 'c1'
    if (this.board[row + leftier_col] === this.board[row + col]) {
      this.board[row + leftier_col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  }  else if (col === 'c3') {
      var leftier_col = 'c2'
      if (this.board[row + leftier_col] === this.board[row + col]) {
        this.board[row + leftier_col] = String(Number(val) * 2)
        this.board[row + col] = null
        this.score += Number(val)*2
      }
    }
    $('.score').text(this.score)
    this.display()
}

Game.prototype.collideDown = function(row, col, val) {
  if (row === 'r2') {
    var lower_row = 'r3'
    if (this.board[lower_row + col] === this.board[row + col]) {
      this.board[lower_row + col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  } else if (row === 'r1') {
    var lower_row = 'r2'
    if (this.board[lower_row + col] === this.board[row + col]) {
      this.board[lower_row + col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  }  else if (row === 'r0') {
      var lower_col = 'c1'
      if (this.board[lower_row + col] === this.board[row + col]) {
        this.board[lower_row + col] = String(Number(val) * 2)
        this.board[row + col] = null
        this.score += Number(val)*2
      }
    }
    $('.score').text(this.score)
    this.display()
}

Game.prototype.collideUp = function(row, col, val) {
  if (row === 'r1') {
    var lower_row = 'r0'
    if (this.board[lower_row + col] === this.board[row + col]) {
      this.board[lower_row + col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  } else if (row === 'r2') {
    var lower_row = 'r1'
    if (this.board[lower_row + col] === this.board[row + col]) {
      this.board[lower_row + col] = String(Number(val) * 2)
      this.board[row + col] = null
      this.score += Number(val)*2
    }
  }  else if (row === 'r3') {
      var lower_col = 'r2'
      if (this.board[lower_row + col] === this.board[row + col]) {
        this.board[lower_row + col] = String(Number(val) * 2)
        this.board[row + col] = null
        this.score += Number(val)*2
      }
    }
    $('.score').text(this.score)
    this.display()
}

Game.prototype.display = function() {
  g = this
  for (var tile in this.board) {
    var row = /.{2}/.exec(tile)[0]
    var col = /.{2}$/.exec(tile)[0]
    var position = row + col
    if (this.board[tile] != null) {
      var val = this.board[tile]
      var currentTile = $('.tile[data-row="' + row + '"][data-col="' + col + '"]')

      if (currentTile.length != 0) {
        currentTile.attr({'data-row': row})
        currentTile.attr({'data-col': col})
        currentTile.attr({'data-val': this.board[position]})
        currentTile.text(this.board[position])
      } else {
        var newTileDiv = "<div class='tile' data-row=" + row + " data-col=" + col + " data-val=" + this.board[position] + ">" + this.board[position] + "</div>"
        var newTile = $("#gameboard").append(newTileDiv);
      }
    } else {
      var currentTile = $('.tile[data-row="' + row + '"][data-col="' + col + '"]')
      currentTile.remove()
    }
  }
}

Game.prototype.moveTile = function(tiles, direction) {
  g = this;
  // Game method here
  switch(direction) {
    case 38: //up
    this.moveTilesUp(this.occupied())
    this.collideAllUp(this.occupied())
    this.moveTilesUp(this.occupied())
    break;

    case 40: //down
    this.moveTilesDown(this.occupied())
    this.collideAllDown(this.occupied())
    this.moveTilesDown(this.occupied())
      console.log('down');
      break;

    case 37: //left
      console.log('left');
    this.moveTilesLeft(this.occupied())
    this.collideAllLeft(this.occupied())
    this.moveTilesLeft(this.occupied())
      break;

    case 39: //right
      console.log('right');
    this.moveTilesRight(this.occupied())
    this.collideAllRight(this.occupied())
    this.moveTilesRight(this.occupied())
      break;
  }
};

Game.prototype.newTile = function() {
  if (this.unoccupied().length === 0) {
    console.log('game over')
    //game over
  } else {
      var availableSpace = this.unoccupied()[Math.floor(Math.random() * this.unoccupied().length)]
      var row = /.{2}/.exec(availableSpace)[0]
      var column = /.{2}$/.exec(availableSpace)[0]

      var rand = ['2','4']
      var newTileValue = rand[Math.floor(Math.random() * rand.length)] //returns string 2 or 4
      var property = row + column
      this.board[property] = newTileValue

      var newTileDiv = "<div class='tile' data-row=" + row + " data-col=" + column + " data-val=" + this.board[property] + ">" + this.board[property] + "</div>"
      var newTile = $("#gameboard").append(newTileDiv);
  }
}

// Game.prototype.hasWon = function(){
//   if (this.score == 2048) {
//
//   })
// }


$(document).ready(function() {
  console.log("ready to go!");

  var game = new Game();
  game.display()
  console.log(game.board)
  game.newTile()
  game.newTile()

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
        var tiles = $('.tile');
       game.moveTile(tiles, event.which);
    }
    game.display()
    console.log(game.board)
    game.newTile()
  });
});
