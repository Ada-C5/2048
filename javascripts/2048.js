var Game = function() {
  // Game logic and initialization here

};


gameBoard = [
"r0 c0",
 "r0 c1",
 "r0 c2",
 "r0 c3",
 "r1 c0",
 "r1 c1",
 "r1 c2",
 "r1 c3",
 "r2 c0",
 "r2 c1",
 "r2 c2",
 "r2 c3",
 "r3 c0",
 "r3 c1",
 "r3 c2",
 "r3 c4"]

 tiles = [

 ]





Game.prototype.newTile = function(newTile){

return $('#gameboard').append("<div class='tile' data-row='r" + ( Math.floor(Math.random() * 1) + 0) + "', data-col='c" + ( Math.floor(Math.random() * 1) + 0) + "' data-val='2'>2</div>")
}



Game.prototype.spotAlreadytaken = function(tile){



}



Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
        $('.tile').attr("data-row", "r0")

      break;
    case 40: //down
      console.log('down');
        $('.tile').attr("data-row", "r3")
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
      var tile = $('.tile');

      game.moveTile(tile, event.which);// event.which means which key
    }
  });
    $('body').keyup(function(event){
      game.newTile()
    })

});
