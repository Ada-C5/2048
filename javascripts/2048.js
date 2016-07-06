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
      "data-val": '8',
    })
    // tile.text('boo')
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
  // var rows = ["r0", "r1", "r2", 'r3']
  // var columns = ['c0', 'c1', 'c2', 'c3']
  // var row = rows[Math.floor(Math.random() * rows.length)]
  // var column = columns[Math.floor(Math.random() * columns.length)]
  // var space = row + column
  // while (this.board[space] != null) {
  //   var rows = ["r0", "r1", "r2", 'r3']
  //   var columns = ['c0', 'c1', 'c2', 'c3']
  //   var row = rows[Math.floor(Math.random() * rows.length)]
  //   var column = columns[Math.floor(Math.random() * columns.length)]
  //   var space = row + column
  //   console.log('hi')
  // }
  // var checkSpace = $('#gameboard').find("[data-col='" + column + "'][data-row='" + row + "']").length

  


  // console.log(checkSpace)

  var rand = ['2','4']
  var newTileValue = rand[Math.floor(Math.random() * rand.length)]
  // console.log(newTileValue)

  var damn = "<div class='tile' data-row=" + row + " data-col=" + column + " data-val=" + newTileValue + ">" + newTileValue + "</div>"
  var newTile = $("#gameboard").append(damn);
  var property = row + column
  this.board[property] = newTileValue
  console.log(this.board)
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
