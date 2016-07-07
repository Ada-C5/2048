// thing at index[0] has its row or column attribute set to 0

var Game = function() {
  // Game logic and initialization here

  // an object with cell data

};

Game.prototype.restart = function() {

  // reset score

  // clear tiles

  this.newTile()
}

Game.prototype.newTile = function() {

  // var tile_div = "<div class='tile' data-row='r" + (Math.floor(Math.random() * 3) + 0) +  "' data-col='c" + (Math.floor(Math.random() * 3) + 0) + "' data-val='2'>2</div>"
  //
  // $('#gameboard').append(tile_div)
}

Game.prototype.moveTile = function(tiles, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');

      //filters from all the tiles
      var tilesc0 = tiles.filter('[data-col=c0]').toArray()

      //the anonymous function in sort compares between 2 elements (tiles in this case) in the array
      tilesc0 = tilesc0.sort(function (a, b) {
        var aRowNumber = parseInt($(a).attr('data-row').substring(1))
        var bRowNumber = parseInt($(b).attr('data-row').substring(1))
        return aRowNumber - bRowNumber //if a is a higher number, then it will be positive. sort function assumes that if it's a positive number, then it knows the 'a' number is the higher one.
        // if I was trying to move downward, then I need to do the opposite and return bRowNumber - aRowNumber, which would give me a reversed order (the highest number would be in the first index)
      })

      //because we need the index
      for (var i = 0; i < tilesc0.length; i++) {
        $(tilesc0[i]).attr('data-row', 'r' + i)
      }


      break;
    case 40: //down
      console.log('down');
      $('.tile').attr("data-row", "r3");
      break;
    case 37: //left
      console.log('left');
      $('.tile').attr("data-col", "c0");
      break;
    case 39: //right
      console.log('right');
      $('.tile').attr("data-col", "c3");
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  console.log(game)
  var restartButton = $('button')

  $('button').on('click', function () {
    game.restart()
  })

  $('body').keydown(function(event) {
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile')
      game.moveTile(tiles, event.which);
    }
  });

  $('body').keyup(function(event) {

    game.newTile()

  });

});
