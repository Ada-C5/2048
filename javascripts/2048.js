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
    $(tilesArray[i]).attr('data-row', 'r' + (3-i))
  }
}





Game.prototype.moveTile = function(tiles, direction) {
  var tilesc0 = tiles.filter('[data-col=c0]').toArray()
  var tilesc1 = tiles.filter('[data-col=c1]').toArray()
  var tilesc2 = tiles.filter('[data-col=c2]').toArray()
  var tilesc3 = tiles.filter('[data-col=c3]').toArray()
  // Game method here
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
        $('.tile').attr("data-col", "c0")
      break;
    case 39: //right
      console.log('right');
        $('.tile').attr("data-col", "c3")
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
