var Game = function() {
  // Game logic and initialization here
this.score = 0


};


Game.prototype.won = function(tilesArray){
  if(tilesArray === 2048){

    $('p.won').text("You Won")
  }
}

Game.prototype.lost = function(){
  if (this.newTile() === false){

        $('p.lost').text("You Lost")

  }
}



Game.prototype.addScore = function(sumScore){
   this.score += sumScore
  $('p.score').text('Your Score is:' + this.score)
}


Game.prototype.newTile = function(){
  var coordinates = [
    [0,0],
    [0,1],
    [0,2],
    [0,3],
    [1,0],
    [1,1],
    [1,2],
    [1,3],
    [2,0],
    [2,1],
    [2,2],
    [2,3],
    [3,0],
    [3,1],
    [3,2],
    [3,3]
  ]

for(var index = coordinates.length -1; index >= 0; index --){
  var coordinatesIndividual = coordinates[index]

  if($('.tile[data-row=r' + coordinatesIndividual[0] + '][ data-col=c' + coordinatesIndividual[1] + ']').length > 0){
    coordinates.splice(index,1)
  }






  }
  if(coordinates.length > 0){

  var tileLocation = coordinates[Math.floor(Math.random()*coordinates.length)]
  $('#gameboard').append("<div class='tile' data-row='r" + tileLocation[0] + "' data-col='c" +  tileLocation[1] + "' data-val='2'>2</div>")


}


}




Game.prototype.sortUpMoveTiles = function(tilesArray){

  tilesArray = tilesArray.sort(function (a, b) {
    var aRowNumber = parseInt($(a).attr('data-row').substring(1))
    var bRowNumber = parseInt($(b).attr('data-row').substring(1))
    return aRowNumber - bRowNumber
  })


  for (var i = 0; i < tilesArray.length; i++) {
    if($(tilesArray[i]).attr('data-val') === $(tilesArray[i + 1]).attr('data-val')){
      console.log('trying to remove', $(tilesArray[i + 1]))
        $(tilesArray[i + 1]).remove()
        //coordinates.push(  [Number$(tilesArray[i + 1]).attr('data-row'), $(tilesArray[i + 1]).attr('data-col')])
        tilesArray.splice(i + 1, 1)
        $(tilesArray[i]).attr('data-val', Number($(tilesArray[i]).attr('data-val')) * 2)
        $(tilesArray[i]).text( Number($(tilesArray[i]).attr('data-val')))
        this.won(Number($(tilesArray[i]).attr('data-val')))
       this.addScore( Number($(tilesArray[i]).attr('data-val')) )
      }

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
    if($(tilesArray[i]).attr('data-val') === $(tilesArray[i + 1]).attr('data-val')){
      console.log('trying to remove', $(tilesArray[i + 1]))
        $(tilesArray[i + 1]).remove()
        tilesArray.splice(i + 1, 1)
        $(tilesArray[i]).attr('data-val', Number($(tilesArray[i]).attr('data-val')) * 2)
        $(tilesArray[i]).text( Number($(tilesArray[i]).attr('data-val')))
          this.won(Number($(tilesArray[i]).attr('data-val')))
         this.addScore( Number($(tilesArray[i]).attr('data-val')) )
      }

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


    if($(tilesArray[i]).attr('data-val') === $(tilesArray[i + 1]).attr('data-val')){
      console.log('trying to remove', $(tilesArray[i + 1]))
        $(tilesArray[i + 1]).remove()
        tilesArray.splice(i + 1, 1)
        $(tilesArray[i]).attr('data-val', Number($(tilesArray[i]).attr('data-val')) * 2)
        $(tilesArray[i]).text( Number($(tilesArray[i]).attr('data-val')))
          this.won(Number($(tilesArray[i]).attr('data-val')))
         this.addScore( Number($(tilesArray[i]).attr('data-val')) )
      }

    $(tilesArray[i]).attr('data-col', 'c' + i)
  }
}





Game.prototype.sortMoveRightTiles = function(tilesArray){
  tilesArray = tilesArray.sort(function(a,b){

  var aColNumber = parseInt($(a).attr('data-col').substring(1))
  var bColNumber = parseInt($(b).attr('data-col').substring(1))
  return aColNumber + bColNumber
  })
for (var i = 0; i < tilesArray.length; i++) {


      if($(tilesArray[i]).attr('data-val') === $(tilesArray[i + 1]).attr('data-val')){
        console.log('trying to remove', $(tilesArray[i + 1]))
          $(tilesArray[i + 1]).remove()
          tilesArray.splice(i + 1, 1)
          $(tilesArray[i]).attr('data-val', Number($(tilesArray[i]).attr('data-val')) * 2)
          $(tilesArray[i]).text( Number($(tilesArray[i]).attr('data-val')))
            this.won(Number($(tilesArray[i]).attr('data-val')))
           this.addScore( Number($(tilesArray[i]).attr('data-val')) )
        }

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
      setTimeout(function(){
        game.newTile()

      }, 100)
    }
  });
});
