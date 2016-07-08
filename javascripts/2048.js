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

  //generate array of all possible coordinates
  var possibleCoordinates = [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [3, 0], [3, 1], [3, 2], [3, 3]
  ]

  //check if each coordinate is currently taken. if it is, remove from array.
  //iterating through an array backwards is good for when you're deleting elements from the array as you go
  for (var index = possibleCoordinates.length - 1; index >= 0; index--) {
    var coordinates = possibleCoordinates[index]

    if ($('.tile[data-row=r' + coordinates[0] + '][data-col=c' + coordinates[1] + ']').length > 0) {
      possibleCoordinates.splice(index, 1)
      //then you can't put a tile there, so
      //take it out of the array of possible coordinates
    }
  }

  // if there is at least one possible coordinate, pick a random one from the array and set that to tileLocation
  var tileLocation = possibleCoordinates[Math.floor(Math.random()*possibleCoordinates.length)]

  ////
  var tile_div = "<div class='tile' data-row='r" + tileLocation[0] +  "' data-col='c" + tileLocation[1] + "' data-val='2'>2</div>"

  $('#gameboard').append(tile_div)
}

Game.prototype.sortAndMoveUp = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return aRowNumber - bRowNumber
  })

  for (var i = 0; i < tiles.length; i++) {

    var sourceTile = $(tiles[i + 1])
    var destinationTile = $(tiles[i])

    if (sourceTile && sourceTile.attr('data-val') === destinationTile.attr('data-val')) {

      // this.mergeTiles(sourceTile, destinationTile)

      //replace value and text of destinationTile with sum of both tiles
      var sumOfValues = Number(sourceTile.attr('data-val')) + Number(destinationTile.attr('data-val'))
      destinationTile.attr('data-val', sumOfValues)
      destinationTile.text(sumOfValues)

      //delete sourceTile from the array
      tiles.splice(i + 1, 1)

      //remove it from the DOM using jQuery remove, after the CSS transition is complete
      var transitionEvents = "transitionend webkitTransitionEnd oTransitionEnd"
      sourceTile.on(transitionEvents, function(e) {
        $(this).remove()
        $(this).off(e);
      });

      sourceTile.attr('data-row', 'r' + i)
    }

    destinationTile.attr('data-row', 'r' + i)

  }
}

Game.prototype.sortAndMoveDown = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return bRowNumber - aRowNumber
  })

  for (var i = 0; i < tiles.length; i++) {

    var sourceTile = $(tiles[i + 1])
    var destinationTile = $(tiles[i])

    if (sourceTile && sourceTile.attr('data-val') === destinationTile.attr('data-val')) {

      //replace value and text of destinationTile with sum of both tiles
      var sumOfValues = Number(sourceTile.attr('data-val')) + Number(destinationTile.attr('data-val'))
      destinationTile.attr('data-val', sumOfValues)
      destinationTile.text(sumOfValues)

      //delete sourceTile from the array
      tiles.splice(i + 1, 1)

      //remove it from the DOM using jQuery remove, after the CSS transition is complete
      var transitionEvents = "transitionend webkitTransitionEnd oTransitionEnd"
      sourceTile.on(transitionEvents, function(e) {
        $(this).remove()
        $(this).off(e);
      });

      sourceTile.attr('data-row', 'r' + (3 - i))
    }

    destinationTile.attr('data-row', 'r' + (3 - i))

  }
}

Game.prototype.sortAndMoveLeft = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aColNumber = parseInt($(a).attr('data-col').substring(1))
    var bColNumber = parseInt($(b).attr('data-col').substring(1))
    return aColNumber - bColNumber
  })

  for (var i = 0; i < tiles.length; i++) {

    var sourceTile = $(tiles[i + 1])
    var destinationTile = $(tiles[i])

    if (sourceTile && sourceTile.attr('data-val') === destinationTile.attr('data-val')) {

      //replace value and text of destinationTile with sum of both tiles
      var sumOfValues = Number(sourceTile.attr('data-val')) + Number(destinationTile.attr('data-val'))
      destinationTile.attr('data-val', sumOfValues)
      destinationTile.text(sumOfValues)

      //delete sourceTile from the array
      tiles.splice(i + 1, 1)

      //remove it from the DOM using jQuery remove, after the CSS transition is complete
      var transitionEvents = "transitionend webkitTransitionEnd oTransitionEnd"
      sourceTile.on(transitionEvents, function(e) {
        $(this).remove()
        $(this).off(e);
      });

      sourceTile.attr('data-col', 'c' + i)
    }

    destinationTile.attr('data-col', 'c' + i)
  }
}

Game.prototype.sortAndMoveRight = function(tiles) {
  tiles = tiles.sort(function (a, b) {
    var aColNumber = parseInt($(a).attr('data-col').substring(1))
    var bColNumber = parseInt($(b).attr('data-col').substring(1))
    return bColNumber - aColNumber
  })

  for (var i = 0; i < tiles.length; i++) {
    var sourceTile = $(tiles[i + 1])
    var destinationTile = $(tiles[i])

    if (sourceTile && sourceTile.attr('data-val') === destinationTile.attr('data-val')) {

      //replace value and text of destinationTile with sum of both tiles
      var sumOfValues = Number(sourceTile.attr('data-val')) + Number(destinationTile.attr('data-val'))
      destinationTile.attr('data-val', sumOfValues)
      destinationTile.text(sumOfValues)

      //delete sourceTile from the array
      tiles.splice(i + 1, 1)

      //remove it from the DOM using jQuery remove, after the CSS transition is complete
      var transitionEvents = "transitionend webkitTransitionEnd oTransitionEnd"
      sourceTile.on(transitionEvents, function(e) {
        $(this).remove()
        $(this).off(e);
      });

      sourceTile.attr('data-col', 'c' + (3 - i))
    }

    destinationTile.attr('data-col', 'c' + (3 - i))
  }
}

Game.prototype.combineSame = function() {

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
  //
    game.newTile()
  //
  });

});
