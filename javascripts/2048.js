var Board = function() {
  //first digit in name is row number, second digit is col number
  this.cell00 = {
    whichCell: $('.cell.r0.c1'),
    isTaken: true
  }
  this.cell01 = {
    whichCell: $('.cell.r0.c1'),
    isTaken: false
  }
  this.cell02 = {
    whichCell: $('.cell.r0.c2'),
    isTaken: false
  }
  this.cell03 = {
    whichCell: $('.cell.r0.c3'),
    isTaken: false
  }
  this.cell10 = {
    whichCell: $('.cell.r1.c0'),
    isTaken: false
  }
  this.cell11 = {
    whichCell: $('.cell.r1.c1'),
    isTaken: false
  }
  this.cell12 = {
    whichCell: $('.cell.r1.c2'),
    isTaken: false
  }
  this.cell13 = {
    whichCell: $('.cell.r1.c3'),
    isTaken: false
  }
  this.cell20 = {
    whichCell: $('.cell.r2.c0'),
    isTaken: false
  }
  this.cell21 = {
    whichCell: $('.cell.r2.c1'),
    isTaken: false
  }
  this.cell22 = {
    whichCell: $('.cell.r2.c2'),
    isTaken: false
  }
  this.cell23 = {
    whichCell: $('.cell.r2.c3'),
    isTaken: false
  }
  this.cell30 = {
    whichCell: $('.cell.r3.c0'),
    isTaken: false
  }
  this.cell31 = {
    whichCell: $('.cell.r3.c1'),
    isTaken: false
  }
  this.cell32 = {
    whichCell: $('.cell.r3.c2'),
    isTaken: false
  }
  this.cell33 = {
    whichCell: $('.cell.r3.c3'),
    isTaken: false
  }
}

var Game = function() {
  // Game logic and initialization here

  // an object with cell data
  this.board = new Board()

};

Game.prototype.restart = function() {

  // reset score

  // clear tiles

  this.newTile()
}

Game.prototype.newTile = function() {

  var tile_div = "<div class='tile' data-row='r" + (Math.floor(Math.random() * 3) + 0) +  "' data-col='c" + (Math.floor(Math.random() * 3) + 0) + "' data-val='2'>2</div>"

  $('#gameboard').append(tile_div)
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');

      // for (var tile of tiles)
      // why can't we use for loop? why do we need this weird jquery method?

      // i have access to current tile! get the cell that's in row0 above it
        if (tile.attr('data-col') === 'c0') {
          // if (this.board[cell00].isTaken === false) {
          //   tile.attr('data-row', 'r0')
          // }

        } else {
          console.log(tile)
          console.log(tile.attr('data-col'))
          tile.attr('data-row', 'r0')

        }



      // if (_CELL_IN_ROW0_AND_THIS_COL.isTaken === false) {
      //   $('.tile').attr("data-row", "r0");
      // }
      //
      //   for (var cell in this.board) {
      //
      //     // looking through every tile
      //     for (var tile of $('.tile')) {
      //       // if a cell contains the same row AND column as the tile, it's taken
      //       if (this.board[cell].whichCell.includes(tile.attr("data-row")) && this.board[cell].whichCell.includes(tile.attr("data-col"))) {
      //
      //         this.board[cell].isTaken = true
      //       }
            // that is to say, if there's a tile with the same row and column as the cell
            // change the cell's takenness to true now that it's taken up
          // }

          //

        // }

      // }


      break;
    case 40: //down
      console.log('down');
      $('.tile').attr("data-row", "r3");
      break;
    case 37: //left
      console.log('left');
      $('.tile').attr("data-col", "c0");
      break;
    case 39: //right
      console.log('right');
      $('.tile').attr("data-col", "c3");
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  console.log(game)
  var restartButton = $('button')

  $('button').on('click', function () {
    game.restart()
  })

  $('body').keydown(function(event) {
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {

      $('.tile').each(function() {
        game.moveTile($(this), event.which);
      })
    }
  });

  $('body').keyup(function(event) {

    game.newTile()

  });

});
