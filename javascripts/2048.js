var Game = function() {
  this._score = 0
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');

      var c0 = $(tile).data('col', 'c0')
      var c1 = $(tile).data('col', 'c1')
      var c2 = $(tile).data('col', 'c2')
      var c3 = $(tile).data('col', 'c3')

      if (c0.length !== 4) {
        $.each(c0, function(index, value) {
          if ($(value).data('row') !== 'r0') {
            // now it does equal that
            // increment iterator up
          }
        })
      }
      
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
