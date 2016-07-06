var Game = function() {
  // Game logic and initialization here
  // this._board = [
  //   [2,2,0,2],
  //   [2,0,2,2],
  //   [0,2,0,0],
  //   [2,0,0,4]
  // ]
};

Game.prototype.moveAll = function(tile, num) {

  var matrix = []
  var matrixValues = []

  if (num%2 == 0) {
    this.createMatrix(tile, 'data-col', matrix)
  } else if (num%2 == 1) {
    this.createMatrix(tile, 'data-col', matrix)
  }

          // console.log("i: ", i)
          // console.log("MATRIX: ", matrix)
          // console.log("MATRIcesss: ", $(matrix))
          // console.log("str1: ", $(matrix[j][i]).text().toString())
          // console.log("str2: ", $(matrix[j][i+1]).text().toString())

        // console.log( "a", matrix[j][i].dataset)
        // console.log( "b", matrix[j][i].dataset['val'] = value)
        // console.log( "c", matrix[j][i].dataset)

  console.log("OUTSIDE: ", matrix[0])
  console.log("OUTSIDE: ", matrix[1])
  console.log("AHHHHHHHHHHHH")
  console.log("LENGTH: ", matrix.length)
  if (num === 2) {
    this.moveTiles(tile, matrix, 2)
  }
  // console.log(matrix)
}

Game.prototype.createMatrix = function(tile, data, matrix) {
  // var col = $(matrix[j][0]).data("col")

  for (let i = 0; i < 4; i++){
    var queryStr = '.tile[' + data +'=' + i +']'
    console.log("query ", queryStr)
    let row = $(queryStr).sort(function (a, b) {
      return +a.getAttribute('data-row') - +b.getAttribute('data-row');
    })
    // console.log("row ", row)
    if (row.length > 0) {
      matrix.push(row)
    }
    // matrixValues.push(row.text().split(""))
  }
  return matrix;
}

Game.prototype.moveTiles = function(tile, matrix, direction) {
  if (direction === 2) {
    var start1 = 0
    var start2 = (matrix.length)
    var counts = 1
  } else {
    var start1 = (matrix.length)
    var start2 = 0
    var counts = -1
  }

  for (let j = 0; j < (matrix.length) ; j=j+counts){
     //j is column
    // matrix.each do ()
    // var col = $(matrix[j][0]).data("col")
    // .toString()
    // console.log("COLOR ", col)
    if (direction === 2) {
      var val1 = 0
      var val2 = matrix[j].length
      var counter = 1
    } else {
      var val1 = 0
      var val2 = matrix[j].length
      var counter = -1
    }
    for (let i = val1; i < val2; i=i+counter) {
      if ($(matrix[j][i]).text().toString() === $(matrix[j][i+1]).text().toString()) {
        // console.log("ITS A MATCH")
        // CHANGES VAL AND DATA
        var value = $(matrix[j][i]).text()*2;
        $(matrix[j][i]).attr({ "data-val": value.toString() });
        // console.log("VALUE: ", value)
        $(matrix[j][i]).text(value);
        // matrix[j][i]

        // DELETES
        $(matrix[j][i]).attr({ "data-row": i.toString() });
        $(matrix[j][i+1]).remove();
        matrix[j].splice(i+1,1)
        // console.log(matrix[j])
        // $(matrix[j][i+2]).attr({ "data-row": (i+1).toString()});
      } else {
        // console.log("hi")
        $(matrix[j][i]).attr({ "data-row": i.toString()});
      }
    }
    // console.log(column)
  }
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
      this.moveAll(tile, 2)
      break;

    case 40: //down
      console.log('down');
      this.moveAll(tile, 4)
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
