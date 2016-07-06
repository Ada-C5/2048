function Game() {
  var self = this; 

  this.gameOver = null;
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

  this.initialize = function() {
    self.newTile(); 
    //event listener 
    $('body').keydown(self.moveTile()); 
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
        var randoVal = newVal[Math.floor(Math.random() * newVal.length)]
         
        // update object
        self.container[space].col = randoCol;
        self.container[space].row = randoRow;
        self.container[space].val = randoVal;

        // update div info
        randoTile.attr('data-row', "r" + randoRow);
        randoTile.attr('data-col', "c" + randoCol);
        randoTile.attr('data-val', randoVal);
        randoTile.text(randoVal);
      } 
    };
  }

  this.buildGameBoard = function() {
    var array0 = [0, 0, 0, 0];
    var array1 = [0, 0, 0, 0];
    var array2 = [0, 0, 0, 0];
    var array3 = [0, 0, 0, 0];
    for (var tile in self.container) {
      if (self.container[tile].col === 0) {
        array0[self.container[tile].row] = [tile, self.container[tile].col, self.container[tile].row, self.container[tile].val]
      } else if (self.container[tile].col === 1) {
        array1[self.container[tile].row] = [tile, self.container[tile].col, self.container[tile].row, self.container[tile].val]
      } else if (self.container[tile].col === 2) {
        array2[self.container[tile].row] = [tile, self.container[tile].col, self.container[tile].row, self.container[tile].val]
      } else if (self.container[tile].col === 3) {
        array3[self.container[tile].row] = [tile, self.container[tile].col, self.container[tile].row, self.container[tile].val]
      }
    };
    console.log(array0);
    console.log(array1)
    console.log(array2)
    console.log(array3)
    
    self.newTile();
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


// $(document).ready(function() {
//   console.log("ready to go!");
//     $('.new-game').on('click', function(event) {
//     $('.tile').text('')
//     $('.tile').css('background', 'rgba(238, 228, 218, 0.35)')
//     var game = new Game(); 
//   })

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
