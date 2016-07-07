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

Game.prototype.sortAndMoveUp = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return aRowNumber - bRowNumber
  })

  for (var i = 0; i < tiles.length; i++) {
    $(tiles[i]).attr('data-row', 'r' + i)
  }
}

Game.prototype.sortAndMoveDown = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return bRowNumber - aRowNumber
  })

  for (var i = 0; i < tiles.length; i++) {
    $(tiles[i]).attr('data-row', 'r' + (3 - i))
  }
}

Game.prototype.sortAndMoveLeft = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aColNumber = parseInt($(a).attr('data-col').substring(1))
    var bColNumber = parseInt($(b).attr('data-col').substring(1))
    return aColNumber - bColNumber
  })

  for (var i = 0; i < tiles.length; i++) {
    $(tiles[i]).attr('data-col', 'c' + i)
  }
}

Game.prototype.sortAndMoveRight = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aColNumber = parseInt($(a).attr('data-col').substring(1))
    var bColNumber = parseInt($(b).attr('data-col').substring(1))
    return bColNumber - aColNumber
  })

  for (var i = 0; i < tiles.length; i++) {
    $(tiles[i]).attr('data-col', 'c' + (3 - i))
  }
}

Game.prototype.moveTile = function(tiles, direction) {
  // Game method here
  //filters from all the tiles
  var tilesc0 = tiles.filter('[data-col=c0]').toArray()
  var tilesc1 = tiles.filter('[data-col=c1]').toArray()
  var tilesc2 = tiles.filter('[data-col=c2]').toArray()
  var tilesc3 = tiles.filter('[data-col=c3]').toArray()

  var tilesr0 = tiles.filter('[data-row=r0]').toArray()
  var tilesr1 = tiles.filter('[data-row=r1]').toArray()
  var tilesr2 = tiles.filter('[data-row=r2]').toArray()
  var tilesr3 = tiles.filter('[data-row=r3]').toArray()

  switch(direction) {
    case 38: //up
      console.log('up');

      // will DRY into separate method like this later...
      this.sortAndMoveUp(tilesc0)
      this.sortAndMoveUp(tilesc1)
      this.sortAndMoveUp(tilesc2)
      this.sortAndMoveUp(tilesc3)

      break;
    case 40: //down
      console.log('down');

      this.sortAndMoveDown(tilesc0)
      this.sortAndMoveDown(tilesc1)
      this.sortAndMoveDown(tilesc2)
      this.sortAndMoveDown(tilesc3)

      break;
    case 37: //left
      console.log('left');

      this.sortAndMoveLeft(tilesr0)
      this.sortAndMoveLeft(tilesr1)
      this.sortAndMoveLeft(tilesr2)
      this.sortAndMoveLeft(tilesr3)

      break;
    case 39: //right
      console.log('right');

      this.sortAndMoveRight(tilesr0)
      this.sortAndMoveRight(tilesr1)
      this.sortAndMoveRight(tilesr2)
      this.sortAndMoveRight(tilesr3)

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
