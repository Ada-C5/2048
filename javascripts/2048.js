var Game = function() {
  // Game logic and initialization here
  this._board = [
    [2,2,0,2],
    [2,0,2,2],
    [0,2,0,0],
    [2,0,0,4]
  ]
};

Game.prototype.moveAll = function(tile) {


  // create matrix each row represents a column
  var matrix = []
  var matrixValues = []
  for (let i = 0; i < tile.length; i++){
    var queryStr = '.tile[data-col=' + i +']'
    let row = $(queryStr).sort(function (a, b) {
      return +a.getAttribute('data-row') - +b.getAttribute('data-row');
    })
    matrix.push(row)
    matrixValues.push(row.text().split(""))
  }
//   [
//   [2, 4, 2],
//   [4, 2, 2],
//   [2, 2],
//   [4]
// ]
  //
  // var column = []
  for (let j =0; j < matrix.length -1 ; j++){ //j is column
    // for (let i=0; i<4; i++) { // i is the row
    //   if (matrix[i][j] !== 0 ){
    //     column.push(matrix[i][0]);
    //   }
    // }
    // console.log(matrix[0][0])
    for (let i=0; i< matrixValues[j].length; i++) {
      if (matrixValues[j][i] == matrixValues[j][i+1]) {

        // CHANGES VAL AND DATA
        var value = matrixValues[j][i]*2;
        matrixValues[j][i] = value
        $(matrix[j][i]).attr({ "data-val": value.toString() });
        $(matrix[j][i]).text(value);

        // DELETES
        $(matrixValues[j][i]).attr({ "data-row": "0" });
        // matrix[j].splice(i+1,1)
        console.log("HI: ", matrix[i][j])
        $(matrix[j][i+1]).remove();

        // CHANGE INDEXES

           //
          //  change matrix[0].attr({ "data-val": "4" })
          //     matrix[0].text(4)
           //
          //     matrix[0].remove()
          //
        // matrix[]
        // .delete the div
      }
    }
    // console.log(column)
  }

  console.log(matrix)
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up

      console.log(tile);
      // for (let i = 0; i < tile.length; i++)
      // tile.attr({ "data-row": "0" });
      this.moveAll(tile)
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


      // $('.tile[data-row=0]')

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
    console.log("START000000:", game._board)

  // console.log(game.moveAll())

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      console.log(tile)
      game.moveTile(tile, event.which);
    }
  });
});
