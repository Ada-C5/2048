var Game = function() {
  // Game logic and initialization here
  this.matrix = [
    {col:0, row: 0, val:0 },
    {col:1, row: 0, val:0 },
    {col:2, row: 0, val:0 },
    {col:3, row: 0, val:0 },
    {col:0, row: 1, val:0 },
    {col:1, row: 1, val:0 },
    {col:2, row: 1, val:0 },
    {col:3, row: 1, val:0 },
    {col:0, row: 2, val:0 },
    {col:1, row: 2, val:0 },
    {col:2, row: 2, val:0 },
    {col:3, row: 2, val:0 },
    {col:0, row: 3, val:0 },
    {col:1, row: 3, val:0 },
    {col:2, row: 3, val:0 },
    {col:3, row: 3, val:0 }
  ]
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
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
