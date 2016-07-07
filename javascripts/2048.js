var Game = function() {
  // Game logic and initialization here
  // this._board = [
  //   [2,2,0,2],
  //   [2,0,2,2],
  //   [0,2,0,0],
  //   [2,0,0,4]
  // ]
};

Game.prototype.moveAll = function(tile, dataValue, dataValue2, num, reverse) {

  var matrix = []
  var matrixValues = []

    this.createMatrix(tile, dataValue, dataValue2, matrix, reverse)
    this.moveTiles(tile, matrix, num, dataValue)

}

Game.prototype.createMatrix = function(tile, data1, data2, matrix, reverse) {
  // var col = $(matrix[j][0]).data("col")

  for (let i = 0; i < 4; i++){
    var queryStr = '.tile[' + data1 +'=' + i +']'
    console.log("query ", queryStr)
    let row = $(queryStr).sort(function (a, b) {
      if (reverse == 'true') {
        return +b.getAttribute(data2) - +a.getAttribute(data2);
      } else {
        return +a.getAttribute(data2) - +b.getAttribute(data2);
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

Game.prototype.moveTiles = function(tile, matrix, direction, data) {

  console.log("DATA: ", data)
  var i2 = 0;
  for (let j = 0; j < matrix.length ; j++) {
    var i3 = 0;
    if (direction === 2 || direction === 1 ) {
      for (let i = 0; i < matrix[j].length; i++) {
        i2 = i + 1;
        i3 = i;
        this.moveDirection(j,i, i2, i3, matrix, data)
      }
    } else if (direction === 3 || direction === 4) {
      for (let i = 3; i > (3-matrix[j].length); i--) {
        k = i+1;
        i2 = i
        this.moveDirection(j, i, i2, i3, matrix, data)
        i3 = i3+1;
      }
      // else if (direction === 1) {
        // for (let i = 0; i < matrix[j].length; i++) {
        //   i2 = i + 1;
        //   i3 = i;
        //   this.moveDirection(j,i, i2, i3, matrix, 'data-row')
        // }
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
  // }
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
Game.prototype.moveDirection = function(j, i, i2, i3, matrix, data) {
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
    if (data === 'data-col') {
    $(matrix[j][i3]).attr({ 'data-row' : i.toString() });
  } else {
    $(matrix[j][i3]).attr({ 'data-col' : i.toString() });
  }
    $(matrix[j][i3+1]).remove();
    matrix[j].splice(i3,1)

  } else {
    if (data == 'data-col') {
      $(matrix[j][i3]).attr({ 'data-row' : i.toString()});
    } else {
      $(matrix[j][i3]).attr({ 'data-col' : i.toString()});
    }
  }
}


Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up

      console.log(tile);
      // for (let i = 0; i < tile.length; i++)
      // tile.attr({ "data-row": "0" });
      this.moveAll(tile, 'data-col', 'data-row', 2, 'false')
      break;

    case 40: //down
      console.log('down');
      this.moveAll(tile, 'data-col', 'data-row', 4, 'true')
      break;

    case 37: //left
      console.log('left')
      this.moveAll(tile, 'data-row', 'data-col', 1, 'false')
      // console.log('left');
      break;


    case 39: //right
      console.log('right');
      this.moveAll(tile, 'data-row','data-col', 3, 'true')
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
