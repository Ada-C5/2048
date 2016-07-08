var Game = function() {
  // Game logic and initialization here

  this.container = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ]

  this.score = 0
}

Game.prototype.updateBoard = function() {
  for (let i = 0; i < 16; i++) {
    var tileQ = $('#' + i)

    if (this.container[i] != 0) {
      tileQ.attr('data-val', this.container[i])
      // var tileVal = tileQ.text(this.container[i])
      if (this.container[i] === "2048") { $('.win-lose').text('You got 2048!') }
    } else {
      tileQ.attr('data-val', 0)
      tileQ.text("")
    }
  }
}

Game.prototype.newTile = function () {
 var val = 2

  // generate new random cell while condition is true
  var random_cell
  if (this.container.includes(0) === true) {
    do {
      random_cell = Math.floor(Math.random() * 16)
    } while (this.container[random_cell] != 0)
  }

  // update container
  this.container[random_cell] = val

  // update div info
  var tileQ = $('#' + random_cell)
  tileQ.attr('data-val', val)
  // tileQ.text(val)
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      this.buildUpArray()
      break
    case 40: //down
      this.buildDownArray()
      break
    case 37: //left
      this.buildLeftArray()
      break
    case 39: //right
      this.buildRightArray()
      break
  }
}

Game.prototype.buildDownArray = function () {
  for (let col = 0; col < 4; col++) {
    var a = [];
    for (let row = 0; row < 4; row++) {
      a[row] = this.container[(3 - row) * 4 + col]
    }

    // update to be similiar to loop below to update container to make work on cols
    var b = this.shiftRow(a)

    // update this.container
    for (let row = 0; row < 4; row++) {
      this.container[(3 - row) * 4 + col] = b[row]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildUpArray = function () {
  for (let col = 0; col < 4; col++) {
    var a = [];
    for (let row = 0; row < 4; row++) {
      a[row] = this.container[row * 4 + col];
    }

    // update to be similiar to loop below to update container to make work on cols
    var b = this.shiftRow(a)

    // update this.container
    for (let row = 0; row < 4; row++) {
      this.container[row * 4 + col] = b[row]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildLeftArray = function () {
  // create and feed correct arrays from this.container
  for (let row = 0; row < 4; row++) {
    var a = [];
    for (let col = 0; col < 4; col++) {
      a[col] = this.container[row * 4 + col]
    }

    // update to be similiar to loop below to update container to make work on cols
    var b = this.shiftRow(a)

    // update this.container
    for (let col = 0; col < 4; col++) {
      this.container[row * 4 + col] = b[col]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildRightArray = function () {
  // create and feed correct arrays from this.container
  for (let row = 0; row < 4; row++) {
    var a = [];
    for (let col = 0; col < 4; col++) {
      a[col] = this.container[row * 4 + (3 - col)]
    }

    // update to be similiar to loop below to update container to make work on cols
    var b = this.shiftRow(a)

    // update this.container
    for (let col = 0; col < 4; col++) {
      this.container[row * 4 + (3 - col)] = b[col]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.shiftRow = function(row) {
  var allLost = 0
  if (this.checkLose(row)) {
    allLost += 1
    if (allLost === 4) {
      // need to check if other row or col is also lost
      // if both are lost freeze game and popup alert
      // if only one direction is lost let the player keep playing
      // return false
    }
  }

  var shifted = []
  var can_merge = true

  // shift elements in a row to the left
  for (var el of row) {
    if (!el) {
      // always collapse zeros
      continue;
    }

    if (can_merge &&
        // ensure there is something valid to merge with
        shifted.length && shifted[shifted.length-1] === el) {
          var points = shifted[shifted.length-1] *= 2;
          this.score += points
          $('.score').text(this.score)
      can_merge = false;
    } else {
      shifted.push(el);
      can_merge = true;
    }
  }

  // pad array with zeros
  while (shifted.length < row.length) {
    shifted.push(0);
  }

  return shifted;
}

Game.prototype.checkLose = function(array) {
  // check that there is no zeros
  if (array.includes(0)) {
    return false
  }

  // check that nothing can be collapsed
  var prev = 0
  for (var li of array) {
    if (li === prev) {
      return true
    }
    prev = li
  }
  return false
}

$(document).ready(function() {
  function newGame() {
    game = new Game()
    game.newTile()
    game.newTile()
  }

  newGame()

  $('.new-game').on('click', function(event) {
    $('.tile').text('')
    $('.tile').attr('data-val', "0")
    newGame()
  })

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40]
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile')
      
      game.moveTile(tile, event.which)
    }
  })
})
