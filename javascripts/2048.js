
var Game = function() {
  var self = this; 

   this.container = {
    1:  {},
    2:  {},
    3:  {},
    4:  {},
    5:  {},
    6:  {},
    7:  {},
    8:  {},
    9:  {},
    10: {},
    11: {},
    12: {},
    13: {},
    14: {},
    15: {},
    16: {}
  }

  this.generateBoard = function() {
    // logic to make the board 
    // that will be compared with the container
  }

  this.newTile = function() {
    // loop through cells in the gameboard container 
    for (var space in self.container) {
      if (self.container[space].col === undefined) {
        var randoTile = $('#' + space)
    
        //logic to handle if something is already in that space? 
        // if val !== "0"
        // do another rando 

        // get random col and row 
        var randoCol = Math.floor((Math.random() * 4) + 0);
        var randoRow = Math.floor((Math.random() * 4) + 0);
      

        var newVal = [2, 4];
        var randoVal = newtile[Math.floor(Math.random() * newVal.length)]
         
        // update object
        self.container[space].col = randoCol;
        self.container[space].row = randoRow;
        self.container[space].val = randoVal;

        // update div info
        randoTile.attr('data-row', "r" + randoRow);
        randoTile.attr('data-col', "c" + randoCol);
        randoTile.attr('data-val', randoVal);
        randoTile.text(val);
      } 
    };
  }
 
 this.moveTile = function(tile, direction) {

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
  }
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
  });
});

// this gets the column position of the tile
// var tileC0 = $('.tile')[0]
// tileC0.setAttribute('data-col', 'c0')
// var tileC1 = $('.tile')[1]

// var allTiles = $('div.tile')
// for (var i = 0; i < allTiles.length; i++) {
//   console.log(allTiles[i])
// }


// logic for c1 collapsing into C0 

// check to see if c0 is empty 
// if empty, move all the way to c0 from c1 
// if not empty, check and see if value is the same as c1
  // if the same, they gotta merge
    // merging happens first, then they move all the way across the board 
      // c1 tile gets removed completely
      // c0 tile gets new value of 4 (for right now)
  // if not the same, nobody moves 
