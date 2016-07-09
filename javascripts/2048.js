Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var Game = function() {
  // Game logic and initialization here
  this.move = 0;
  this.win = false;
  this.score = 0;
  this.bestScore = 0;
  this.start = true;
};

Game.prototype.moveAll = function(tile, dataValue, dataValue2, num, reverse) {

  var matrix = []
  var matrixValues = []

  this.createMatrix(tile, dataValue, dataValue2, matrix, reverse)
  this.moveTiles(tile, matrix, num, dataValue)

  {setTimeout(() => this.createTile(), 0.25*1000)}

  if (this.win) {
    $('#win').text('YOU WON!')
  }

}

Game.prototype.createMatrix = function(tile, data1, data2, matrix, reverse) {
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
  this.createMatrix(tile, 'data-col', 'data-row', matrixUp, "false")
  this.createMatrix(tile, 'data-row', 'data-col', matrixLeft, "false")

  return (this.checkMatrix(matrixUp) && this.checkMatrix(matrixLeft))
}

Game.prototype.checkMatrix = function(matrix) {

  matrix = matrix.map(function(row) {return row.map(function(i) {return $(row[i]).text()})});

  var result = true
  // available spaces
  if (matrix.length < 4){result = false}

  // else check mataches
  for (var row=0; row<matrix.length; row++) {
    if(matrix[row].length < 4) {result = false}
    for (var col=0; col<matrix[row].length; col++) {
      if (matrix[row][col] == matrix[row][col+1]) {
        result = false
      }
    }
  }
  return result
}

Game.prototype.unoccupiedSpaces = function() {
  var allSpaces = []
  var array = ["0","1", "2", "3"]
  array.map(function(x) { allSpaces.push(x+"0"); allSpaces.push(x+"1"); allSpaces.push(x+"2"); allSpaces.push(x+"3")});
  var occupiedSpaces = []

  var x = $('.tile')
  for (let i = 0; i < x.length; i++) {
    occupiedSpaces.push(x[i].dataset.row+x[i].dataset.col)
  }

  unoccupiedSpaces = allSpaces.diff(occupiedSpaces)
  return unoccupiedSpaces
}

Game.prototype.createTile = function(move) {
  $('#points').remove()
  if( this.move > 0 || this.start === true){
    this.start = false;
    let availableSpaces = this.unoccupiedSpaces()
    let tileLocation = availableSpaces[Math.floor(Math.random() * (availableSpaces.length))];
    var tileValueArray = ["2","4"]
    var tileValue = tileValueArray[Math.floor(Math.random() * (tileValueArray.length))];
    $('#gameboard').append("<div class=tile data-row=" + tileLocation.charAt(0) + " data-col=" + tileLocation.charAt(1) + " data-val=2>" + tileValue +"</div>")
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
this.move = 0;
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

Game.prototype.moveDirection = function(j, i, i2, i3, matrix, data) {
  if ($(matrix[j][i3]).text().toString() === $(matrix[j][i3+1]).text().toString()) {
    // CHANGES VAL AND DATA
    var value = $(matrix[j][i3]).text()*2;
    $(matrix[j][i3]).attr({ "data-val": value.toString() });
    $(matrix[j][i3]).text(value);
    this.score += value
    $('.score').text(this.score);
    $('#totalScore').append("<div id=points>+" + value + "</div>")
    $('#points').animate({'marginTop' : "-=200px"});
    // $("#points").queue(function() {
    //    $(this).remove();
    //  });



    setTimeout($('#totalScore').remove("#points"), 2*1000)
    // setTimeout($('#points').remove(), 0.25*1000)

    this.move++
    if (value == 2048) {
      this.win = true;
    }

    // DELETES
    if (data === 'data-col') {
      $(matrix[j][i3]).attr({ 'data-row' : i.toString() });
    } else {
      $(matrix[j][i3]).attr({ 'data-col' : i.toString() });
    }
      $(matrix[j][i3+1]).remove();
      matrix[j].splice(i3,1);
  } else {
    if (data == 'data-col') {

      if($(matrix[j][i3])[0].attributes["data-row"].nodeValue != i.toString()){
        $(matrix[j][i3]).attr({ 'data-row' : i.toString()});
         this.move++
      }
    } else {

      if($(matrix[j][i3])[0].attributes["data-col"].nodeValue != i.toString()) {
        $(matrix[j][i3]).attr({ 'data-col' : i.toString()});
        this.move++
      }
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
      this.moveAll(tile, 'data-col', 'data-row', 4, 'true')
      break;
    case 37: //left
      this.moveAll(tile, 'data-row', 'data-col', 1, 'false')
      break;
    case 39: //right
      this.moveAll(tile, 'data-row','data-col', 3, 'true')
      break;
  }
};



$(document).ready(function() {
  // Any interactive jQuery functionality
  var game = new Game();
  game.createTile();
  var reset = $('.reset button')
    $('body').keydown(function(event){
      if(game.gameOver() === false){
        var arrows = [37, 38, 39, 40];
        if (arrows.indexOf(event.which) > -1) {
          var tile = $('.tile');
          game.moveTile(tile, event.which);
        }
      }else {
        $('#win').text("");
        $('#lose').text("GAME OVER");
        $('#gameboard').addClass("lost")
        if(game.bestScore < game.score){
          game.bestScore = game.score
          $('.best').text(game.bestScore);
        }
      }
    });
  reset.on('click',function(event){
    $('#gameboard').removeClass("lost")
    $('#gameboard').addClass("game")
    $('#win').text("");

    $('#lose').remove()

    if(game.bestScore < game.score){
      game.bestScore = game.score
      $('.best').text(game.bestScore);
    }
    $('.tile').remove();
    game.score = 0;
    $('.score').text(game.score);
    game.start = true;
    game.win = false
    {setTimeout(() => game.createTile(), 0.25*1000)}

  });
});
