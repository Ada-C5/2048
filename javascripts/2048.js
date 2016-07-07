var Game = function() {
  // Game logic and initialization here
  // this._board = [
  //   [2,2,0,2],
  //   [2,0,2,2],
  //   [0,2,0,0],
  //   [2,0,0,4]
  // ]
};

Game.prototype.moveAll = function(tile, dataValue, num, reverse) {

  var matrix = []
  var matrixValues = []

  // if (num % 2 == 0) {
    this.createMatrix(tile, 'data-col', matrix, reverse)
  // } else if (num % 2 == 1) {
  //   this.createMatrix(tile, 'data-row', matrix)
  // }

          // console.log("i: ", i)
          // console.log("MATRIX: ", matrix)
          // console.log("MATRIcesss: ", $(matrix))
          // console.log("str1: ", $(matrix[j][i3]).text().toString())
          // console.log("str2: ", $(matrix[j][i+1]).text().toString())

        // console.log( "a", matrix[j][i].dataset)
        // console.log( "b", matrix[j][i].dataset['val'] = value)
        // console.log( "c", matrix[j][i].dataset)

  console.log("OUTSIDE: ", matrix[0])
  console.log("OUTSIDE: ", matrix[1])
  console.log("AHHHHHHHHHHHH")
  console.log("LENGTH: ", matrix.length)

  // if (num === 2) {
    this.moveTiles(tile, matrix, num)
  // }
  // console.log(matrix)
}

Game.prototype.createMatrix = function(tile, data, matrix, reverse) {
  // var col = $(matrix[j][0]).data("col")

  for (let i = 0; i < 4; i++){
    var queryStr = '.tile[' + data +'=' + i +']'
    console.log("query ", queryStr)
    let row = $(queryStr).sort(function (a, b) {
      if (reverse == 'true') {
        return +b.getAttribute('data-row') - +a.getAttribute('data-row');
      } else {
        return +a.getAttribute('data-row') - +b.getAttribute('data-row');
      }
    })
    console.log("row ", row)
    if (row.length > 0) {
      matrix.push(row)
    }
    // matrixValues.push(row.text().split(""))
  }
  return matrix;
}

Game.prototype.moveTiles = function(tile, matrix, direction) {
  // if (direction === 2) {
  //   var start1 = 0
  //   var start2 = (matrix.length)
  //   var counts = 1
  // } else {
  //   var start1 = (matrix.length)
  //   var start2 = 0
  //   var counts = -1
  // }

  for (let j = 0; j < matrix.length ; j++) {
     //j is column
    // matrix.each do ()
    // var col = $(matrix[j][0]).data("col")
    // .toString()
    var i3 = 0;
    if (direction === 2) {
      for (let i = 0; i < matrix[j].length; i++) {
        var i2 = i + 1;
        i3 = i;
        var k = i;
        this.moveDirection(j,i, i2, matrix, k, i3)
      }
    } else {
      for (let i = 3; i > (3-matrix[j].length); i--) {
        var k = i+1;
        i2 = i
        this.moveDirection(j, i, i2, matrix, k , i3)
        i3 = i3+1;
      }
    }

    //   var val1 = 0
    //   var val2 = matrix[j].length
    //   var counter = 1
    // {} else {
    //   var val1 = matrix[j].length
    //   var val2 = 0
    //   var counter = -1
    //   var work = i+'> 0'
    // }
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
Game.prototype.moveDirection = function(j, i, i2, matrix, k, i3) {
  // console.log("[i]: ", i + " [i2]: ", i2 + " [k]: ", k)
  // console.log("COLOR-1 ", i2)
  // console.log("[j][i]: ", $(matrix[j][i]).text().toString() + " [j][i2]: " , $(matrix[j][i2]).text().toString() )
  if ($(matrix[j][i3]).text().toString() === $(matrix[j][i3+1]).text().toString()) {
    // console.log("ITS A MATCH")

    // CHANGES VAL AND DATA
    var value = $(matrix[j][i3]).text()*2;
    $(matrix[j][i3]).attr({ "data-val": value.toString() });
    $(matrix[j][i3]).text(value);

    // DELETES
    $(matrix[j][i3]).attr({ "data-row": i.toString() });
    $(matrix[j][i3+1]).remove();
    matrix[j].splice(i3,1)
    // console.log("SPLICE: ", matrix[j])

  } else {
    $(matrix[j][i3]).attr({ "data-row": i.toString()});
  }
}


Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up

      console.log(tile);
      // for (let i = 0; i < tile.length; i++)
      // tile.attr({ "data-row": "0" });
      this.moveAll(tile, 'data-col', 2, 'false')
      break;

    case 40: //down
      console.log('down');
      this.moveAll(tile, 'data-col', 4, 'true')
      break;

    case 37: //left
          this.moveAll(tile, 'data-row')

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
