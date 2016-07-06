var Game = function() {
  this.board = {
    "row0col0": null,
    "row1col0": null,
    "row2col0": null,
    "row3col0": null,
    "row0col1": null,
    "row1col1": null,
    "row2col1": null,
    "row3col1": null,
    "row0col2": null,
    "row1col2": null,
    "row2col2": null,
    "row3col2": null,
    "row0col3": null,
    "row1col3": null,
    "row2col3": null,
    "row3col3": null
  }
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
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
  var rows = ["r0", "r1", "r2", 'r3']
  var columns = ['c0', 'c1', 'c2', 'c3']
  var row = rows[Math.floor(Math.random() * rows.length)]
  var column = columns[Math.floor(Math.random() * columns.length)]
  // checks randomized tile locale
  var checkSpace = $('#gameboard').find("[data-col='" + column + "'][data-row='" + row + "']").length
  console.log(column, row, checkSpace)

  var rand = ['2','4']
  var newTileValue = rand[Math.floor(Math.random() * rand.length)]
  // console.log(newTileValue)

  var damn = "<div class='tile' data-row=" + row + " data-col=" + column + " data-val=" + newTileValue + ">" + newTileValue + "</div>"
  var newTile = $("#gameboard").append(damn);

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
