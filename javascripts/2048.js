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
    // matrixValues.push(row.text().split(""))
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

    for (let i=0; i< matrix[j].length; i++) {
      if ($(matrix[j][i]).text().toString() === $(matrix[j][i+1]).text().toString()) {

        // CHANGES VAL AND DATA
        var value = $(matrix[j][i]).text()*2;
        $(matrix[j][i]).attr({ "data-val": value.toString() });
        $(matrix[j][i]).text(value);

        // DELETES
        $(matrix[j][i]).attr({ "data-row": "0" });
        $(matrix[j][i+1]).remove();
        $(matrix[j][i+2]).attr({ "data-row": (i+1).toString()});
      }
    }

    // console.log(column)
  }

  console.log(matrix)
}

  // matrix[j].splice(i+1,1)
  // console.log("HI: ", matrix[j][i])
  // CHANGE INDEXES

     //
    //  change matrix[0].attr({ "data-val": "4" })
    //     matrix[0].text(4)
     //
    //     matrix[0].remove()
    //
  // matrix[]
  // .delete the div

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
