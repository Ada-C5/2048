var Game = function () {
  // Game logic and initialization here
  var thisGame = this
  this.gameOver = false
  this.score = 0

  this.newGame = function () {
    // spawn 2 tiles in random spaces
    this.newTile()
    this.newTile()
    // this.newTile(2)
  }

  this.newTile = function (numberOfTiles) {
    let tiles = $('.tile')
    let randRow = 'row' + randomSpace()
    let randCol = 'col' + randomSpace()
    let randVal = randomVal({4:0.3, 2:0.7})
    var newTile = null

    if (tiles[0] === undefined) {
      newTile = $('<div>', { class: 'tile', 'data-row': randRow, 'data-col': randCol, 'data-val': randVal, text: randVal })
    } else {
      console.log(newTile)
      while (newTile === null) {
        for (let i = 0; i < tiles.length; i++) {
          if (tiles[i].row !== randRow || tiles[i].col !== randCol) {
            console.log('coords: ', randRow)
            console.log('coords: ', randCol)
            console.log('val: ', randVal)
            newTile = $('<div>', { class: 'tile', 'data-row': randRow, 'data-col': randCol, 'data-val': randVal, text: randVal })
          } else {
            randRow = 'row' + randomSpace()
            randCol = 'col' + randomSpace()
          }
        }
      }
    }
    $(".cells").after(newTile)
    newTile = null
  }

  function randomSpace() {
    return Math.floor(Math.random() * (4 - 0)) + 0
  }

  function randomVal(spec) {
    var i, sum = 0, r = Math.random()
    for (i in spec) {
      sum += spec[i]
      if (r <= sum) return i
    }
  }

  this.addScore = function (num) {
    this.score = this.score + num
  }

  this.hasWon = function (tile) {
    if (tile.dataset.val === "2048") {
      console.log('won!')
      thisGame.gameOver = true
    }
  }

  this.hasLost = function () {
    console.log('lost!')
    // checks if the board is full
    // needs to check if there are no more valid moves
    if ($('.tiles').length === 9) {
      thisGame.gameOver = true
    }
  }
}

function upSort() {

}
function downSort() {

}
function leftSort() {

}
function rightSort() {

}

Game.prototype.moveTile = function (tile, direction) {
  // Game method here
  let sortedArray = null
  switch(direction) {
    case 38: //up
      sortedArray = upSort() // => array
      console.log('up')
      seperateMovementFunction('row', '-', sortedArray)
      break;
    case 40: //down
      sortedArray = downSort() // => array
      console.log('down')
      seperateMovementFunction('row', '+', sortedArray)
      break;
    case 37: //left
      sortedArray = leftSort() // => array
      console.log('left')
      seperateMovementFunction('col', '-', sortedArray)
      break;
    case 39: //right
      sortedArray = rightSort() // => array
      console.log('right')
      seperateMovementFunction('col', '+', sortedArray)
      break;
  }

  function seperateMovementFunction(type, operand) {
    tile.each(function() {
      let num = parseInt(this.dataset[type][3])
      if (operand === '+') {
        num = num + 1
      } else if (operand === '-') {
        num = num - 1
      }

      this.dataset[type] = type + num.toString()
    })
  }
  this.newTile()

  // call gameOver() before every move
  // call addScore() for every combination
}

$(document).ready(function () {
  console.log("ready to go!")
  // Any interactive jQuery functionality
  startGame()

  function startGame() {
      game = new Game()
      game.newGame()
  }

  $('body').keydown(function(event) {
    if (!game.gameOver) {
      var arrows = [37, 38, 39, 40];
      if (arrows.indexOf(event.which) > -1) {
        var tile = $('.tile')

        game.moveTile(tile, event.which)
        updateScore()
      }
    }
  })

  $('#newgame').click(function() {
    // remove all tiles
    $('.tile').each(function () {
      this.remove()
    })
    startGame()
  })

  function updateScore() {
    $('#score').text(game.score)
  }

})
