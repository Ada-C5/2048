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
      console.log(newTile)
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

function upSort(arr) {
  return arr.sort(ascending)
}

function downSort(arr) {
  return arr.sort(descending)
}

function leftSort(arr) {
  return arr.sort(ascending)
}

function rightSort(arr) {
  return arr.sort(descending)
}

function ascending(a, b) {
  console.log('a1: ', a.dataset.col[3])
  console.log('b1: ', b.dataset.col[3])
  if (a.dataset.col[3] < b.dataset.col[3]) {
    return -1
  } else if (a.dataset.col[3] > b.dataset.col[3]) {
    return 1
  }
  return 0
}

function descending(a, b) {
  console.log('a1: ', a.dataset.col[3])
  console.log('b1: ', b.dataset.col[3])
  if (a.dataset.col[3] > b.dataset.col[3]) {
    return -1
  } else if (a.dataset.col[3] < b.dataset.col[3]) {
    return 1
  }
  return 0
}

Game.prototype.moveTile = function (tile, direction) {
  // Game method here
  let arrayTiles = null
  let sortedTiles = null

  let arrayRows = [$('.tile[data-row=row0]'), $('.tile[data-row=row1]'),
  $('.tile[data-row=row2]'), $('.tile[data-row=row3]')]
  // gets all the tiles in the second row

  switch(direction) {
    case 38: //up
      arrayTiles = $('.tile[data-col=col2]')
      sortedTiles = upSort(arrayTiles) // => array
      console.log('up')
      console.log('arr', arrayTiles)
      console.log('sort', sortedTiles)
      seperateMovementFunction('row', '-', sortedTiles)
      break;
    case 40: //down
      arrayTiles = $('.tile[data-col=col2]')
      sortedTiles = downSort(arrayTiles) // => array
      console.log('down')
      console.log('arr', arrayTiles)
      console.log('sort', sortedTiles)
      seperateMovementFunction('row', '+', sortedTiles)
      break;
    case 37: //left
      arrayTiles = $('.tile[data-row=row1]')
      sortedTiles = leftSort(arrayTiles) // => array
      console.log('left')
      console.log('arr', arrayTiles)
      console.log('sort', sortedTiles)
      seperateMovementFunction('col', '-', sortedTiles)
      break;
    case 39: //right
      arrayTiles = $('.tile[data-row=row1]')
      sortedTiles = rightSort(arrayTiles) // => array
      console.log('right')
      console.log('arr', arrayTiles)
      console.log('sort', sortedTiles)
      seperateMovementFunction('col', '+', sortedTiles)
      break;
  }

  function seperateMovementFunction(type, operand) {

    // tile.each(function() {
    //   let num = parseInt(this.dataset[type][3])
    //   if (operand === '+') {
    //     num = num + 1
    //   } else if (operand === '-') {
    //     num = num - 1
    //   }
    // })

    // this.dataset[type] = type + num.toString()
    //gets all the tiles in the second row
      // arrayTiles = $('.tile[data-row=row1]')

      // console.log(arrayTiles[2]);
      arrayTiles = $('.tile')

    moveAllTheWay(arrayTiles, type)

    collideIfSameValue(arrayTiles,type)

    moveAllTheWay(arrayTiles,  type)


  }

  function moveAllTheWay(arrayQuerys, type) {
    $.each(arrayQuerys, function( index, value ) {
      //convert the colunm into an integer
      let numRow = value.dataset["row"][3]
      let num = parseInt(value.dataset["col"][3])
      //defines the next colunm
      var nextEle = num + 1
      var nextString = nextEle.toString()
      //interpolates the next element
      var nextCol = '.tile[data-row=row'+ numRow + '][data-col=' + type + nextString + ']'
      var nextColEle = $(nextCol)

      //if it is not empty

      while (nextEle < 4) {
        let nextString = nextEle.toString()
        //interpolates the next element
        let nextCol = '.tile[data-row=row'+ numRow + '][data-col=' + type + nextString + ']'
        let nextColEle = $(nextCol)

        //check if next tile is empty,
        if (nextColEle.length == 0) {
          value.dataset[type] = type + nextString
        }
        //keep moving next while empty, and colum is equal or less than 3
        nextEle++;
      }
    });
  }

  function collideIfSameValue(arrayTiles,type) {
    $.each(arrayTiles, function( index, value ) {

      let numRow = value.dataset["row"][3]
      let num = parseInt(value.dataset["col"][3])
      //defines the next colunm
      let nextEle = num + 1
      let nextString = nextEle.toString()
      //interpolates the next element
      let nextCol = '.tile[data-row=row'+ numRow + '][data-col=' + type + nextString + ']'
      let nextColEle = $(nextCol)

          //if it is the same value, sum and keep moving
            //elseif is different, grab that one and star looking for next empty tile
            if (nextColEle.length > 0) {
              //chek if value is the same than current tile
              if (value.dataset.val === nextColEle[0].dataset.val) {
                value.dataset[type] = type + nextString
                value.dataset.val = parseInt(value.dataset.val) + parseInt(nextColEle[0].dataset.val)
                setTimeout(function(){
                  $(value).text(value.dataset.val)
                }, 240);
              }
            }
    });
  }
  thisGame.newTile()

  console.log(thisGame);
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
