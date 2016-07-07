var Game = function() {
  // Game logic and initialization here

};





var board = {


}


Game.prototype.newTile = function(newTile){

//return $('#gameboard').append("<div class='tile' data-row='r" + ( Math.floor(Math.random() * 1) + 0) + "', data-col='c" + ( Math.floor(Math.random() * 1) + 0) + "' data-val='2'>2</div>")
}

Game.prototype.sortUpMoveTiles = function(tilesArray){

  tilesArray = tilesArray.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return aRowNumber - bRowNumber
  })


  for (var i = 0; i < tilesArray.length; i++) {

    $(tilesArray[i]).attr('data-row', 'r' + i)
  }
}



Game.prototype.sortDownMoveTiles = function(tilesArray){
  tilesArray = tilesArray.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return bRowNumber - aRowNumber
  })

  for (var i = 0; i < tilesArray.length; i++) {

    $(tilesArray[i]).attr('data-row', 'r' + (3 - i))
  }
}


Game.prototype.sortMoveLeftTiles = function(tilesArray){
  tilesArray = tilesArray.sort(function(a,b){
    var aColNumber = parseInt($(a).attr('data-col').substring(1))
    var bColNumber = parseInt($(b).attr('data-col').substring(1))
    return aColNumber - bColNumber
    var combineTiles = Number((tilesArray[i]).attr('data-val')) * Number((tilesArray[i]).attr('data-val'))
  })
  for (var i = 0; i < tilesArray.length; i++) {
    console.log(i)

    if($(tilesArray[i]).attr('data-val') === $(tilesArray[i + 1]).attr('data-val')){
      console.log('trying to remove', $(tilesArray[i + 1]))
        $(tilesArray[i + 1]).remove()
        $(tilesArray[i]).attr('data-val', Number($(tilesArray[i]).attr('data-val')) * 2)
        $(tilesArray[i]).text( Number($(tilesArray[i]).attr('data-val')))

        //$(selector).attr(attribute,value)

      }

    $(tilesArray[i]).attr('data-col', 'c' + i)
  }
}





Game.prototype.sortMoveRightTiles = function(tilesArray){
  tilesArray = tilesArray.sort(function(a,b){

  var aColNumber = parseInt($(a).attr('data-col').substring(1))
  var bColNumber = parseInt($(b).attr('data-col').substring(1))
  return aColNumber - bColNumber
  })
for (var i = 0; i < tilesArray.length; i++) {

  $(tilesArray[i]).attr('data-col', 'c' + (3 - i))
  }
}








Game.prototype.moveTile = function(tiles, direction) {
  var tilesc0 = tiles.filter('[data-col=c0]').toArray()
  var tilesc1 = tiles.filter('[data-col=c1]').toArray()
  var tilesc2 = tiles.filter('[data-col=c2]').toArray()
  var tilesc3 = tiles.filter('[data-col=c3]').toArray()
  // Game method here
  var tilesr0 = tiles.filter('[data-row=r0]').toArray()
  var tilesr1 = tiles.filter('[data-row=r1]').toArray()
  var tilesr2 = tiles.filter('[data-row=r2]').toArray()
  var tilesr3 = tiles.filter('[data-row=r3]').toArray()
  switch(direction) {
    case 38: //up

    this.sortUpMoveTiles(tilesc0)
    this.sortUpMoveTiles(tilesc1)
    this.sortUpMoveTiles(tilesc2)
    this.sortUpMoveTiles(tilesc3)





      break;
    case 40: //down
      console.log('down');
      this.sortDownMoveTiles(tilesc0)
      this.sortDownMoveTiles(tilesc1)
      this.sortDownMoveTiles(tilesc2)
      this.sortDownMoveTiles(tilesc3)



      break;
    case 37: //left
      console.log('left');
      this.sortMoveLeftTiles(tilesr0)
      this.sortMoveLeftTiles(tilesr1)
      this.sortMoveLeftTiles(tilesr2)
      this.sortMoveLeftTiles(tilesr3)
      break;
    case 39: //right
      console.log('right');
      this.sortMoveRightTiles(tilesr0)
      this.sortMoveRightTiles(tilesr1)
      this.sortMoveRightTiles(tilesr2)
      this.sortMoveRightTiles(tilesr3)


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
      var tiles = $('.tile');

      game.moveTile(tiles, event.which);// event.which means which key
    }
  });
    $('body').keyup(function(event){
      game.newTile()
    })

});
