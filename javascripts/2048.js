function Game() {
  var self = this; 

  this.gameOver = null;
  this.container = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  this.initialize = function(selector) {
    self.newTile(); 
    $('body').keydown(function(event){
      var arrows = [37, 38, 39, 40]
      if (arrows.indexOf(event.which) > -1) {
        var tiles = $('.tile')
        self.moveTile(tiles, event.which)
      }
    }) 
  }

  // generates a new tile anywhere on the board 
  this.newTile = function() {
    // get random col and row 
    var randoCol = Math.floor((Math.random() * (4 - 0) + 0));
    var randoRow = Math.floor((Math.random() * (4 - 0) + 0));

    // get a random 2 or 4 
    var newVal = [2, 4];
    var randoVal = newVal[Math.floor(Math.random() * newVal.length)]

    if (self.container[randoRow][randoCol] === 0) {
      self.container[randoRow][randoCol] = randoVal
    } else {
      self.newTile()
    }
    // get div id

    // update div info
    var id = (randoRow * 4) + randoCol
    var randoTile = $('#' + id)
    randoTile.attr('data-row', "r" + randoRow);
    randoTile.attr('data-col', "c" + randoCol);
    randoTile.attr('data-val', randoVal);
    randoTile.text(randoVal); 
  }
 
 this.moveTile = function(tile, direction) {
  switch(direction) {
    case 38: //up
      console.log('up');
      self.newTile();
      // check tiles
      break;
    case 40: //down
      console.log('down');
      self.newTile();
      break;
    case 37: //left
      console.log('left');
      self.newTile();
      break;
    case 39: //right
      console.log('right');
      self.newTile();
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
