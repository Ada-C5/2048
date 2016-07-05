var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
    tile.attr({
      "data-row": "r0",
      "data-val": '8',
    })
    tile.text('boo')
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

Game.prototype.newTile = function() {
  var rows = ["r0", "r1", "r2", 'r3']
  var columns = ['c0', 'c1', 'c2', 'c3']
  var row = rows[Math.floor(Math.random() * rows.length)]
  var column = columns[Math.floor(Math.random() * columns.length)]

  var rand = ['2','4']
  var newTileValue = rand[Math.floor(Math.random() * rand.length)]
  console.log(newTileValue)
  // var tile = $('#gameboard');
  var damn = "<div class='tile' data-row=" + row + " data-col=" + column + " data-val=" + newTileValue + ">" + newTileValue + "</div>"
  var newTile = $("#gameboard").append(damn);


  // hi.attr({
  //   "data-row": "r3",
  //   "data-col": "c1",
  //   "data-val": '16'
  // })
  // hi.text(16)

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
