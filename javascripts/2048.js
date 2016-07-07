function Game() {
  var self = this; 

  this.gameOver = null;
  this.container = null; 

  this.initialize = function(selector) {
    self.container = $(selector);
    self.newTile(); 
    $('body').keydown(function(event){
      var arrows = [37, 38, 39, 40]
      if (arrows.indexOf(event.which) > -1) {
        var tile = $('.tile')
        self.moveTile(tile, event.which)
      }
    }) 
  }

  // generates a new tile anywhere on the board 
  this.newTile = function() {

    // get random col and row number 
    var randoCol = Math.floor((Math.random() * (4 - 0) + 0));
    var randoRow = Math.floor((Math.random() * (4 - 0) + 0));
    
    // get a random 2 or 4, 2s are more common than 4s  
    var newVal = [2, 2, 2, 2, 4];
    var randoVal = newVal[Math.floor(Math.random() * newVal.length)]

    var id = (randoRow * 4) + randoCol
    var randoTile = $('#' + id)
    var emptyList = $('div.tile[data-val=""]')

    // if id is in empty list, assign it to the board
    // this loop needs to happen AFTER emptyList gets assigned
    $.each(emptyList, function(index, value) {
      if ($(value).attr('#id') === $(randoTile).attr('#id')) {
        randoTile.attr('data-row', "r" + randoRow);
        randoTile.attr('data-col', "c" + randoCol);
        randoTile.attr('data-val', randoVal);
        randoTile.text(randoVal); 
        emptyList.splice(index, 1)
        return; 
      } 
    })
  }

  // Thinking in vectors 
  // R0, C0 is top left (start)
  // Up is 1, 0 
  // down is -1, 0 
  // left is 0, -1
  // right is 0, 1 
 
 this.moveTile = function(tile, direction) {
  var row = 0 
  var column = 0 
  switch(direction) {
    case 38: //up
      console.log('up');
      self.moveAll( {row: 1, column: 0} )
      self.newTile();
      break;
    case 40: //down
      console.log('down');
      self.moveAll( {row: -1, column: 0} )
      self.newTile();
      break;
    case 37: //left
      console.log('left');
      self.moveAll( {row: 0, column: -1} )
      self.newTile();
      break;
    case 39: //right
      console.log('right');
      self.moveAll( {row: 0, column: 1} )
      self.newTile();
      break;
    }
  }

  this.moveAll = function(row, column) {
    // get all of the tiles on the board
    allTiles = $('div.tile[data-val !=""]')

    $.each(allTiles, function(index, value) {
      console.log($(value).attr('data-col'))
      console.log($(value).attr('data-row'))
      // if up
        // check to see if the adjacent cell is empty or not
        // subtract off of the row, do nothing to the column 
        // worry about collisions later 
      // if down
        // check to see if the adjacent cell is empty or not
        // add to the row, do nothing to the column 
        // worry about collisions later 
      // if left
        // check to see if the adjacent cell is empty or not
        // do nothing to the row, subtract off of the column 
        // worry about collisions later 
      // if right 
        // check to see if the adjacent cell is empty or not
        // do nothing to the row, add to the column 
        // worry about collisions later 
    })
  }
}



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
