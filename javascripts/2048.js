var Game = function () {
  // Game logic and initialization here
  thisGame = this
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
      // console.log(newTile)
      while (newTile === null) {
        for (let i = 0; i < tiles.length; i++) {
          if (tiles[i].row !== randRow || tiles[i].col !== randCol) {
            // console.log('coords: ', randRow)
            // console.log('coords: ', randCol)
            // console.log('val: ', randVal)
            newTile = $('<div>', { class: 'tile', 'data-row': randRow, 'data-col': randCol, 'data-val': randVal, text: randVal })
          } else {
            randRow = 'row' + randomSpace()
            randCol = 'col' + randomSpace()
          }
        }
      }
    }
    $(".cells").after(newTile)
    // newTile = null
    return newTile
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

function upSort(arr) {
  return arr.sort(row_ascending)
}

function downSort(arr) {
  return arr.sort(row_descending)
}

function leftSort(arr) {
  return arr.sort(col_ascending)
}

function rightSort(arr) {
  return arr.sort(col_descending)
}

function row_ascending(a, b) {
  if (a.dataset.row[3] < b.dataset.row[3]) {
    return -1
  } else if (a.dataset.row[3] > b.dataset.row[3]) {
    return 1
  }
  return 0
}

function row_descending(a, b) {
  if (a.dataset.row[3] > b.dataset.row[3]) {
    return -1
  } else if (a.dataset.row[3] < b.dataset.row[3]) {
    return 1
  }
  return 0
}

function col_ascending(a, b) {
  if (a.dataset.col[3] < b.dataset.col[3]) {
    return -1
  } else if (a.dataset.col[3] > b.dataset.col[3]) {
    return 1
  }
  return 0
}

function col_descending(a, b) {
  if (a.dataset.col[3] > b.dataset.col[3]) {
    return -1
  } else if (a.dataset.col[3] < b.dataset.col[3]) {
    return 1
  }
  return 0
}

Game.prototype.moveTile = function (tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      seperateMovementFunction('row', '-')
      break;
    case 40: //down
      seperateMovementFunction('row', '+')
      break;
    case 37: //left
      seperateMovementFunction('col', '-')
      break;
    case 39: //right
      seperateMovementFunction('col', '+')
      break;
  }

  function seperateMovementFunction(type, operand) {
    function sortArrays(type, operand) {
      var arrayTiles = []

      if (type === "col" && operand === '+' ) {
        arrayTiles.push(rightSort($('.tile[data-row=row0]')))
        arrayTiles.push(rightSort($('.tile[data-row=row1]')))
        arrayTiles.push(rightSort($('.tile[data-row=row2]')))
        arrayTiles.push(rightSort($('.tile[data-row=row3]')))
      } else if (type === "col" && operand === '-') {
        arrayTiles.push(leftSort($('.tile[data-row=row0]')))
        arrayTiles.push(leftSort($('.tile[data-row=row1]')))
        arrayTiles.push(leftSort($('.tile[data-row=row2]')))
        arrayTiles.push(leftSort($('.tile[data-row=row3]')))
      } else if (type === "row" && operand === '-') {
        arrayTiles.push(upSort($('.tile[data-col=col0]')))
        arrayTiles.push(upSort($('.tile[data-col=col1]')))
        arrayTiles.push(upSort($('.tile[data-col=col2]')))
        arrayTiles.push(upSort($('.tile[data-col=col3]')))
      } else if (type === "row" && operand === '+') {
        arrayTiles.push(downSort($('.tile[data-col=col0]')))
        arrayTiles.push(downSort($('.tile[data-col=col1]')))
        arrayTiles.push(downSort($('.tile[data-col=col2]')))
        arrayTiles.push(downSort($('.tile[data-col=col3]')))
      }
      return arrayTiles
    }

    moveAllTheWay(sortArrays(type, operand), type, operand)

    // collideIfSameValue(sortArrays(type, operand),type, operand)

    // moveAllTheWay(sortArrays(type, operand), type, operand)

  }

  function moveAllTheWay(arrayQuerys, type, operand) {
    // console.log('arr: ',arrayQuerys);
    for(line of arrayQuerys) {
      if (line.length > 0) {
        $.each(line, function( index, value ) {
          console.log('row/col: ', line.selector + " contains: " + line.length);
          var num = parseInt(value.dataset[type][3])
          if (operand === "+") {
            var nextEle = num + 1
            var wall = 4
          } else if (operand === "-") {
            var nextEle = num - 1
            var wall = 0
          }
          var nextCol = '.tile[data-' + type + '=' + type + nextEle.toString() + ']'
          var nextColEle = $(nextCol)
          if (wall === 4) {
            while (nextEle < wall) {
              let nextString = nextEle.toString()
              let nextCol = '.tile[data-' + type + '=' + type + nextString + ']'
              let nextColEle = $(nextCol)

              if (nextColEle.length == 0) {
                value.dataset[type] = type + nextString
              }
              nextEle++;
            }
          } else if (wall === 0) {
            while (nextEle >= wall) {
              let nextString = nextEle.toString()
            //interpolates the next element
              let nextCol = '.tile[data-' + type + '=' + type + nextString + ']'
              let nextColEle = $(nextCol)

              //check if next tile is empty,
              if (nextColEle.length == 0) {
                value.dataset[type] = type + nextString
              }
              nextEle--;
            }
          }
        });
      }
    }
  }

  function collideIfSameValue(arrayQuerys,type, operand) {
    for( line of arrayQuerys) {
      $.each(line, function( index, value ) {
        var num = parseInt(value.dataset[type][3])
        //defines the next colunm
        if (operand === "+") {
          var nextEle = num + 1
        } else {
          var nextEle = num - 1
        }

        let nextString = nextEle.toString()
        //interpolates the next element
        let nextCol = '.tile[data-' + type + '=' + type + nextString + ']'
        let nextColEle = $(nextCol)

        //if it is the same value, sum and keep moving
        //elseif is different, grab that one and star looking for next empty tile
        if (nextColEle.length > 0) {
          //check if value is the same than current tile
          if (value.dataset.val === nextColEle[0].dataset.val) {
            value.dataset[type] = type + nextString
            value.dataset.val = parseInt(value.dataset.val) + parseInt(nextColEle[0].dataset.val)
            setTimeout(function(){
              $(value).text(value.dataset.val)
            }, 240);
            // delete the one of the tiles that combined
            $(value).remove()
          }
        }
      });
    }
  }

  // spawn a new tile after each move
  // console.log('new: ', thisGame.newTile())
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
