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

Game.prototype.getTile = function(row, col) {
    return '.tile[data-row="' + row + '"][data-col="' + col + '"]'
}

Game.prototype.moveTilesUp = function(tiles) {
  g = this
  tiles.each(function(){
    var tile = $(this)[0]
    var row = tile.dataset['row']
    var col = tile.dataset['col']
    var val = tile.dataset['val']
    g.moveSingleTileUp(tile, row, col, val)
  })
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


  console.log("board", this.board)
  // console.log('display', this.display())
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
        console.log("current tile" , currentTile)

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
    var col1 = [this.board['r0c0'], this.board['r1c0'], this.board['r2c0'], this.board['r3c0']]
    // console.log("col1", col1)
    var colProps = ['r0c0', 'r1c0', 'r2c0', 'r3c0']
    // console.log("colProps", colProps)

      console.log('up');
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
      console.log(this.board)
  }
}


$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');

      game.moveTile(tiles, event.which);
      game.display()
    }
    game.newTile()
  });
});


// function separateMovementFunction(type, operand) {
//   tile.each(function() {
//     let num = parseInt(this.dataset[type][3])
//     console.log(num)
//     if (operand === "+")  {
//       num += 1
//     }
//   })
// }








// for(var i = 1; i < 4; i++) {
//   if (col1[i] != null) { //start with the second tile in the column, make sure something is there
//     if (col1[i-1] === null) { // if there's nothing before it
//       this.board[colProps[i-1]] = col1[i]  // replace upper tile with current tile
//       this.board[colProps[i]] = null // replace current tile with null
//       var row = /.{2}/.exec(colProps[i - 1])[0]
//       console.log('row', row)
//       var col = /.{2}$/.exec(colProps[i - 1])[0]
//       var tileDiv = "<div class='tile' data-row=" + row + " data-col=" + col + " data-val=" + this.board[colProps[i-1]] + ">" + this.board[colProps[i-1]] + "</div>"
//       var newTileyay = $("#gameboard").append(tileDiv);
//       console.log("newTIle" , newTileyay)
//       newTileyay.attr({
//         // "data-val": "2048",
//         "data-row": row    //make it show up on page
//       })
//     } else if (col1[i-1] === this.board[colProps[i]]) { // if tile before it is the same as current
//       var value = Number(this.board[colProps[i]]) //collect value of tiles
//       var newValue = String(value * 2) //double it and make it a string again
//       this.board[colProps[i-1]] = newValue // assign it
//       this.board[colProps[i]] = null // null out old one
//       var row = /.{2}/.exec(colProps[i - 1])[0]
//       var col = /.{2}$/.exec(colProps[i - 1])[0]
//       var newTile = $(g.getTile(row, col))[0]
//
//       newTile.attr({
//         "data-row": row,  //make it show up on page
//         "data-val": newValue
//       })
//       newTile.text(newValue)
//     }
//   }
