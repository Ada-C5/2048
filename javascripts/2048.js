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
};

// Game.prototype.getTile = function(row, col) {
//     return '.tile[data-row="' + row + '"][data-col="' + col + '"]'
// }

Game.prototype.moveTilesUp = function(tiles) {
  g = this
  tiles.each(function(){
    var tile = $(this)[0]
    var row = tile.dataset['row']
    var col = tile.dataset['col']
    var val = tile.dataset['val']
    g.moveSingleTileUp(tile, row, col, val)
  })
  // this.display()
}

Game.prototype.moveSingleTileUp = function(tile, row, col, val) {
  if (row === 'r1') {
    var higher_row = 'r0'
    if (!this.board[higher_row + col]) {
      this.board[higher_row + col] = val
      this.board[row + col] = null
    }

  } else if (row === 'r2') {
    var higher_row = 'r1'
    if (!this.board[higher_row + col]) {
      this.board[higher_row + col] = val
      this.board[row + col] = null
    }

  }  else if (row === 'r3') {
      var higher_row = 'r2'
      if (!this.board[higher_row + col]) {
        this.board[higher_row + col] = val
        this.board[row + col] = null
      }
    }
}

Game.prototype.display = function() {
  g = this
  for (var tile in this.board) {
    var row = /.{2}/.exec(tile)[0]
    var col = /.{2}$/.exec(tile)[0]
    var position = row + col
    // console.log("tile", tile)
    if (this.board[tile] != null) {
      var val = this.board[tile]
      var currentTile = $('.tile[data-row="' + row + '"][data-col="' + col + '"]')

      if (currentTile.length != 0) {
        // console.log("current tile" , currentTile)

        currentTile.attr({'data-row': row})
        currentTile.attr({'data-col': col})
        currentTile.attr({'data-val': this.board["'" + position + "'"]})
        currentTile.text(this.board["'" + position + "'"])
      } else {
        var newTileDiv = "<div class='tile' data-row=" + row + " data-col=" + col + " data-val=" + this.board[position] + ">" + this.board[position] + "</div>"
        var newTile = $("#gameboard").append(newTileDiv);
        // newTile.text('ha')

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
     this.moveTilesUp(tiles)
    break;
    case 40: //down
      console.log('down');
      tile.attr({
        'data-row': 'r3'
      })
      break;
    case 37: //left
      console.log('left');
      tile.attr({
        'data-col': 'c0'
      })
      break;
    case 39: //right
      console.log('right');
      // tile.attr({
      //   'data-col': 'c3'
      // })
      // separateMovementFunction('col', "+")
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


$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      for (var i = 0; i < 3; i++) {
        var tiles = $('.tile');
       game.moveTile(tiles, event.which);
       game.display()
     }
    }
    game.newTile()
  });
});
