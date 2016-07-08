Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveAll = function(tile, dataValue, dataValue2, num, reverse) {

  var matrix = []
  var matrixValues = []
  var move = 0;

  this.createMatrix(tile, dataValue, dataValue2, matrix, reverse)
  this.moveTiles(tile, matrix, num, dataValue, move)
  // let self = this

  {setTimeout((move) => this.createTile(), 0.21*1000)}
  console.log("MATRIX AFTER: ", matrix)

}

Game.prototype.createMatrix = function(tile, data1, data2, matrix, reverse) {
//.tile, data1 = data-row or data-col
// up --> (.tile, 'data-col', 'data-row', matrixUp, false)
  for (let i = 0; i < 4; i++){
    var queryStr = '.tile[' + data1 +'=' + i +']'
    let row = $(queryStr).sort(function (a, b) {
      if (reverse == 'true') {
        return +b.getAttribute(data2) - +a.getAttribute(data2);
      } else {
        return +a.getAttribute(data2) - +b.getAttribute(data2);
      }
    })
    if (row.length > 0) {
      matrix.push(row)
    }
  }
  return matrix;
}

Game.prototype.availableMoves = function() {
  //check up and right.
  var matrixUp = []
  var matrixLeft = []

  var tile = $('.tile')
  createMatrix(tile, 'data-col', 'data-row', matrixUp, "false")
  createMatrix(tile, 'data-row', 'data-col', matrixRight, "false")

  matrixUp = matrixUp.map(function() { return $(this).data('value')})
  matrixLeft = matrixLeft.map(function() { return $(this).data('value')})

  return (checkMatrix(matrixUp) && checkMatrix(matrixLeft))

}

Game.prototype.checkMatrix = function(matrix) {
  var result = true
  // available spaces
  if (matrix.length < 4){result = false}

  // else check mataches
  for (let row=0; row<matrix.length; row++) {
    if(matrix[row].length < 4) {result = false}
    for (let col=0; col<matrix[row].length; col++) {
      if (matrix[row][col] == matrix[row][col+1]) {
        result = false
      }
    }
  }
  return result
}

Game.prototype.unoccupiedSpaces = function() {
// function creates a matrix from current by creating a matrix with row and col values
  var allSpaces = []
  var array = ["0","1", "2", "3"]
  array.map(function(x) { allSpaces.push(x+"0"); allSpaces.push(x+"1"); allSpaces.push(x+"2"); allSpaces.push(x+"3")});
  console.log("all", allSpaces)
  var occupiedSpaces = []
  // board of spaces that are occupied ["00","04"]
  // console.log("ALL TILES PLS: ", $('.tile'))
  var x = $('.tile')
  for (let i = 0; i < x.length; i++) {
    // console.log("THIS DATA? ", x[i].dataset)
    occupiedSpaces.push(x[i].dataset.row+x[i].dataset.col)
  }
  // $('.tile').map(function() {
  //   console.log($(this).data())
  //  occupiedSpaces.push($(this).data('row').toString()+$(this).data('col').toString())});
  console.log("occupied: ", occupiedSpaces)
  unoccupiedSpaces = allSpaces.diff(occupiedSpaces)
  // console.log("unoccupied: ", unoccupiedSpaces)

  return unoccupiedSpaces
}

Game.prototype.createTile = function() {
  if(move > 0){
    let availableSpaces = this.unoccupiedSpaces()
    console.log("-->available spaces:  ", availableSpaces)
    // Math.floor(Math.random() * 7)
    console.log(availableSpaces.length)
    let tileLocation = availableSpaces[Math.floor(Math.random() * (availableSpaces.length))];
    console.log("new tile: ", tileLocation)
    console.log("a:", tileLocation.charAt(0) + " b:", tileLocation.charAt(1))

    $('#gameboard').append("<div class=tile data-row=" + tileLocation.charAt(0) + " data-col=" + tileLocation.charAt(1) + " data-val=2>2</div>")
  }
}



Game.prototype.gameOver = function(){

  if(this.unoccupiedSpaces().length === 0){
    return this.availableMoves()
  }else {
    return false
  }
}



Game.prototype.moveTiles = function(tile, matrix, direction, data, move) {

  var i2 = 0;
  for (let j = 0; j < matrix.length ; j++) {
    var i3 = 0;
    if (direction === 2 || direction === 1 ) {
      for (let i = 0; i < matrix[j].length; i++) {
        i2 = i + 1;
        i3 = i;
        this.moveDirection(j,i, i2, i3, matrix, data, move)
      }
    } else if (direction === 3 || direction === 4) {
      for (let i = 3; i > (3-matrix[j].length); i--) {
        k = i+1;
        i2 = i
        this.moveDirection(j, i, i2, i3, matrix, data, move)
        i3 = i3+1;
      }
    }
  }
}

Game.prototype.moveDirection = function(j, i, i2, i3, matrix, data, move) {

  if ($(matrix[j][i3]).text().toString() === $(matrix[j][i3+1]).text().toString()) {
    // CHANGES VAL AND DATA
    var value = $(matrix[j][i3]).text()*2;
    $(matrix[j][i3]).attr({ "data-val": value.toString() });
    $(matrix[j][i3]).text(value);
    move ++

    // DELETES
    if (data === 'data-col') {
      $(matrix[j][i3]).attr({ 'data-row' : i.toString() });
    } else {
      $(matrix[j][i3]).attr({ 'data-col' : i.toString() });
    }

    $(matrix[j][i3+1]).remove();
    matrix[j].splice(i3,1)

  } else {
    if (data == 'data-col') {
      if($(matrix[j][i3]).data('row') != i.toString()){
        $(matrix[j][i3]).attr({ 'data-row' : i.toString()});
        move++ }
    } else {
      if($(matrix[j][i3]).data('col') != i.toString()){
        $(matrix[j][i3]).attr({ 'data-col' : i.toString()});
        move++ }
    }
  }
}


Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      this.moveAll(tile, 'data-col', 'data-row', 2, 'false')
      break;
    case 40: //down
      console.log('down');
      this.moveAll(tile, 'data-col', 'data-row', 4, 'true')
      break;
    case 37: //left
      console.log('left')
      this.moveAll(tile, 'data-row', 'data-col', 1, 'false')
      break;
    case 39: //right
      console.log('right');
      this.moveAll(tile, 'data-row','data-col', 3, 'true')
      break;
  }
};



$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      console.log(tile)
      game.moveTile(tile, event.which);
    }
  });
});



//
// var Game = function() {
//   // Game logic and initialization here
//   // this._board = [
//   //   [2,2,0,2],
//   //   [2,0,2,2],
//   //   [0,2,0,0],
//   //   [2,0,0,4]
//   // ]
// };
//
// Game.prototype.moveAll = function(tile, dataValue, dataValue2, num, reverse) {
//
//   var matrix = []
//   var matrixValues = []
//
//     this.createMatrix(tile, dataValue, dataValue2, matrix, reverse)
//     this.moveTiles(tile, matrix, num, dataValue)
//
// }
//
// Game.prototype.createMatrix = function(tile, data1, data2, matrix, reverse) {
//   // var col = $(matrix[j][0]).data("col")
//
//   for (let i = 0; i < 4; i++){
//     var queryStr = '.tile[' + data1 +'=' + i +']'
//     console.log("query ", queryStr)
//     let row = $(queryStr).sort(function (a, b) {
//       if (reverse == 'true') {
//         return +b.getAttribute(data2) - +a.getAttribute(data2);
//       } else {
//         return +a.getAttribute(data2) - +b.getAttribute(data2);
//       }
//     })
//     console.log("row ", row)
//     if (row.length > 0) {
//       matrix.push(row)
//     }
//     // matrixValues.push(row.text().split(""))
//   }
//   return matrix;
// }
//
// Game.prototype.moveTiles = function(tile, matrix, direction, data) {
//
//   console.log("DATA: ", data)
//   var i2 = 0;
//   for (let j = 0; j < matrix.length ; j++) {
//     var i3 = 0;
//     if (direction === 2 || direction === 1 ) {
//       for (let i = 0; i < matrix[j].length; i++) {
//         i2 = i + 1;
//         i3 = i;
//         this.moveDirection(j,i, i2, i3, matrix, data)
//       }
//     } else if (direction === 3 || direction === 4) {
//       for (let i = 3; i > (3-matrix[j].length); i--) {
//         k = i+1;
//         i2 = i
//         this.moveDirection(j, i, i2, i3, matrix, data)
//         i3 = i3+1;
//       }
//       // else if (direction === 1) {
//         // for (let i = 0; i < matrix[j].length; i++) {
//         //   i2 = i + 1;
//         //   i3 = i;
//         //   this.moveDirection(j,i, i2, i3, matrix, 'data-row')
//         // }
//       }
//     }
//
//     //   var val1 = 0
//     //   var val2 = matrix[j].length
//     //   var counter = 1
//     // {} else {
//     //   var val1 = matrix[j].length
//     //   var val2 = 0
//     //   var counter = -1
//     //   var work = i+'> 0'
//     // }
//     // console.log(column)
//   // }
// }
//   // matrix[j].splice(i+1,1)
//   // console.log("HI: ", matrix[j][i])
//   // CHANGE INDEXES
//
//      //
//     //  change matrix[0].attr({ "data-val": "4" })
//     //     matrix[0].text(4)
//      //
//     //     matrix[0].remove()
//     //
//   // matrix[]
//   // .delete the div
// Game.prototype.moveDirection = function(j, i, i2, i3, matrix, data) {
//   // console.log("[i]: ", i + " [i2]: ", i2 + " [k]: ", k)
//   // console.log("COLOR-1 ", i2)
//   // console.log("[j][i]: ", $(matrix[j][i]).text().toString() + " [j][i2]: " , $(matrix[j][i2]).text().toString() )
//   if ($(matrix[j][i3]).text().toString() === $(matrix[j][i3+1]).text().toString()) {
//     // console.log("ITS A MATCH")
//
//     // CHANGES VAL AND DATA
//     var value = $(matrix[j][i3]).text()*2;
//     $(matrix[j][i3]).attr({ "data-val": value.toString() });
//     $(matrix[j][i3]).text(value);
//
//     // DELETES
//     if (data === 'data-col') {
//     $(matrix[j][i3]).attr({ 'data-row' : i.toString() });
//   } else {
//     $(matrix[j][i3]).attr({ 'data-col' : i.toString() });
//   }
//     $(matrix[j][i3+1]).remove();
//     matrix[j].splice(i3,1)
//
//   } else {
//     if (data == 'data-col') {
//       $(matrix[j][i3]).attr({ 'data-row' : i.toString()});
//     } else {
//       $(matrix[j][i3]).attr({ 'data-col' : i.toString()});
//     }
//   }
// }
//
//
// Game.prototype.moveTile = function(tile, direction) {
//   // Game method here
//   switch(direction) {
//     case 38: //up
//
//       console.log(tile);
//       // for (let i = 0; i < tile.length; i++)
//       // tile.attr({ "data-row": "0" });
//       this.moveAll(tile, 'data-col', 'data-row', 2, 'false')
//       break;
//
//     case 40: //down
//       console.log('down');
//       this.moveAll(tile, 'data-col', 'data-row', 4, 'true')
//       break;
//
//     case 37: //left
//       console.log('left')
//       this.moveAll(tile, 'data-row', 'data-col', 1, 'false')
//       // console.log('left');
//       break;
//
//
//     case 39: //right
//       console.log('right');
//       this.moveAll(tile, 'data-row','data-col', 3, 'true')
//       break;
//   }
// };
//
//
//       // $('.tile[data-row=0]')
//
// $(document).ready(function() {
//   console.log("ready to go!");
//   // Any interactive jQuery functionality
//   var game = new Game();
//     console.log("START000000:", game._board)
//
//   // console.log(game.moveAll())
//
//   $('body').keydown(function(event){
//     var arrows = [37, 38, 39, 40];
//     if (arrows.indexOf(event.which) > -1) {
//       var tile = $('.tile');
//       console.log(tile)
//       game.moveTile(tile, event.which);
//     }
//   });
// });
