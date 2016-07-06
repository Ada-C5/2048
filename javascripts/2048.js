var Game = function() {
  // Game logic and initialization here
  this._board = [
    [2,0,0,0],
    [2,0,0,0],
    [4,0,0,0],
    [4,0,0,0]
  ]
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up

      console.log('up');
      // for (let i = 0; i < tile.length; i++)
      tile.attr({ "data-row": "0" });
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

Game.prototype.moveAll = function() {
  var column = []
  for (let i=0; i<4; i++) {
    if (this._board[i][0] !== 0 ){
      column.push(this._board[i][0]);
    }
  }
  console.log(column)

  for (let i=0; i<column.length; i++) {
    if (column[i] == column[i+1]) {
      column[i] = column[i]*2;
      column.splice(i+1,1)
      console.log(column)
    }
  }
  // console.log("START", this._board)
  // for (let col = 0; col < 4; col++) {
  //   let pointer = 0;
  //   let queryStr = "";
  //   let tempAdd = 0;
  //   let tempAddRow = 0;
  //   let currentValue = 0;
  //
  //   for (let row = 0; row < 4; row++) {
  //     // '.tile[data-row=row]'
  //
  //     currentValue = this._board[row][col]
  //     // console.log("")
  //     console.log("CV: "+ currentValue + " Row: " + row + " TempAdd: " + tempAdd + " TempRow: " + tempAddRow)
  //     if (currentValue == 0 && row != 3) {
  //       // tempAdd
  //       console.log("skip")
  //       continue;
  //     }
  //
  //     if ((currentValue > 0 ) && (tempAdd != 0) && (currentValue == tempAdd)) {
  //       console.log("FIRST")
  //
  //       this._board[pointer][col] = currentValue*2 ;
  //       this._board[row][col] = 0;
  //       pointer++;
  //       tempAdd = 0;
  //       // tempAddRow = row;
  //       // jquery to delete currentValue div
  //     } else if (tempAdd != 0 && tempAddRow != 0) {
  //       if (row == 3) {
  //         console.log("SECOND")
  //         this._board[pointer][col] = tempAdd
  //         this._board[tempAddRow][col] = 0;
  //         pointer++
  //         this._board[pointer][col] = currentValue;
  //         this._board[row][col] = 0;
  //         // currentValue
  //         break;
  //       } else {
  //         console.log("THIRD")
  //         this._board[pointer][col] = tempAdd;
  //         this._board[tempAddRow][col] = 0;
  //         this._board[row][col] = 0;
  //         tempAdd = 0;
  //         // tempAddRow = row;
  //         pointer ++
  //       }
  //     }
  //
  //     if (row === 3 && tempAdd === 0) {
  //       console.log("FIFTH")
  //       this._board[pointer][col] = currentValue;
  //       this._board[row][col] = 0;
  //     }
  //
  //     if ((tempAdd != 0) && (currentValue != tempAdd)) {
  //       // tempAdd != 0 && tempAddRow === 0) {
  //       console.log("FIF SIX")
  //       this._board[pointer][col] = tempAdd;
  //       pointer++
  //       if (row === 3) {
  //       this._board[pointer][col] = tempAdd;
  //     }
  //       // this._board[]
  //
  //     }
  //     // } else if (row === 3 && tempAdd != 0)
  //
  //     if (currentValue > 0) {
  //       console.log("SIXTH")
  //       tempAdd = currentValue;
  //       tempAddRow = row;
  //       // console.log("TEMPADD: " + tempAdd + " tEMPROW: " + tempAddRow)
  //       // console.log(this._board)
  //     }
  //
  //
  //   }
  //   // console.log(col)
  // }
  // return this._board
}



      // .dataset
      // [0].dataset.row
      // if
      // pointer++
      // $('.tile[data-row=0]')

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
    console.log("START000000:", game._board)

  console.log(game.moveAll())

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      console.log(tile)
      game.moveTile(tile, event.which);
    }
  });
});
