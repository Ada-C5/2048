var Game = function() {
  // Game logic and initialization here
     this.container = {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
      10: {},
      11: {},
      12: {},
      13: {},
      14: {},
      15: {},
      16: {}
    }
  //   'row':
  //   'column': 
  //   'data':

}

Game.prototype.newTile = function () {
 for (var space in this.container) {
  if (this.container[space].col === undefined) {
    var tileQ = $('#' + space)
    // get random col and row 
    var rando_col = Math.floor((Math.random() * 4) + 0);
    var rando_row = Math.floor((Math.random() * 4) + 0);
    var val = 2;
    // update object
    this.container[space].col = rando_col;
    this.container[space].row = rando_row;
    this.container[space].val = val;

    // update div info
    tileQ.attr('data-row', "r" + rando_row);
    tileQ.attr('data-col', "c" + rando_col);
    tileQ.attr('data-val', val);
    tileQ.text(val);

    // need to check that something isn't already on this tile
    return
  } 
 };
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.buildUpArray();
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

Game.prototype.buildUpArray = function() {
  var array0 = [0, 0, 0, 0];
  var array1 = [0, 0, 0, 0];
  var array2 = [0, 0, 0, 0];
  var array3 = [0, 0, 0, 0];
  for (var tile in this.container) {
    if (this.container[tile].col === 0) {
      array0[this.container[tile].row] = [this.container[tile].col, this.container[tile].row, this.container[tile].val]
    } else if (this.container[tile].col === 1) {
      array1[this.container[tile].row] = [this.container[tile].col, this.container[tile].row, this.container[tile].val]
    } else if (this.container[tile].col === 2) {
      array2[this.container[tile].row] = [this.container[tile].col, this.container[tile].row, this.container[tile].val]
    } else if (this.container[tile].col === 3) {
      array3[this.container[tile].row] = [this.container[tile].col, this.container[tile].row, this.container[tile].val]
    }
  };
  console.log(array0);
  console.log(array1)
  console.log(array2)
  console.log(array3)
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('.new-game').on('click', function(event) {
    $('.tile').text('')
    $('.tile').css('background', 'rgba(238, 228, 218, 0.35)')
    game.newTile();
    game.newTile();
  })

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      
      game.moveTile(tile, event.which);
    }
  });


});
