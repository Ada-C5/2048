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

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
    //check tile directly above to see if its empty
    //if that's empty, check next one
    // do that again if not at top yet
    //once next tile is not empty, check its value
    // if that value is the same, move up and collide, run score tile method
    tile.attr({
      "data-row": "r0",
    })
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
      tile.attr({
        'data-col': 'c3'
      })
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
      // console.log(this.unoccupied())
      // console.log(row)
      // console.log(column)

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
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
    game.newTile()
  });
});
