var Game = function () {
  // Game logic and initialization here
  thisGame = this
  this.gameOver = false
  this.score = 0
  this.validCollision = null

  this.newGame = function () {
    // spawn 2 tiles in random spaces
    this.newTile()
    this.newTile()
  }

  this.newTile = function () {
    let tiles = $('.tile')
    let randRow = 'row' + randomSpace()
    let randCol = 'col' + randomSpace()
    let randVal = randomVal({4:0.3, 2:0.7})
    var newTile = null

    if (tiles[0] === undefined) {
      newTile = $('<div>', { id: 'newTile', class: 'tile', 'data-row': randRow, 'data-col': randCol, 'data-val': randVal, text: randVal })
    } else {
      while (newTile === null) {
        for (let i = 0; i < tiles.length; i++) {
          if (tiles[i].dataset.row !== randRow || tiles[i].dataset.col !== randCol) {
            newTile = $('<div>', { id: 'newTile', class: 'tile', 'data-row': randRow, 'data-col': randCol, 'data-val': randVal, text: randVal })
          } else {
            randRow = 'row' + randomSpace()
            randCol = 'col' + randomSpace()
          }
        }
        tiles = $('.tile')
      }
    }
    $(".cells").after(newTile)
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
    if (tile === 2048) {
      console.log('won!')
      $('#endgame').toggleClass('layer')
      $('.win-text').text("You Won!")
      thisGame.gameOver = true
    }
  }

  this.hasLost = function () {
    // checks if the board is full
    // needs to check if there are no more valid moves
    if ($('.tiles').length >= 16 && thisGame.validCollision == false) {
      console.log("lost");
      $('#endgame').addClass('layer')
      $('.win-text').text("LOOOSER!")
      thisGame.gameOver = true
    }
    // return false
  }
}

function upSort(arr) {
  return arr.sort(function row_ascending(a, b) {
    if (a.dataset.row[3] < b.dataset.row[3]) {
      return -1
    } else if (a.dataset.row[3] > b.dataset.row[3]) {
      return 1
    }
    return 0
  })
}

function downSort(arr) {
  return arr.sort(function row_descending(a, b) {
    if (a.dataset.row[3] > b.dataset.row[3]) {
      return -1
    } else if (a.dataset.row[3] < b.dataset.row[3]) {
      return 1
    }
    return 0
  })
}

function leftSort(arr) {
  return arr.sort(function col_ascending(a, b) {
    if (a.dataset.col[3] < b.dataset.col[3]) {
      return -1
    } else if (a.dataset.col[3] > b.dataset.col[3]) {
      return 1
    }
    return 0
  })
}

function rightSort(arr) {
  return arr.sort(function col_descending(a, b) {
    if (a.dataset.col[3] > b.dataset.col[3]) {
      return -1
    } else if (a.dataset.col[3] < b.dataset.col[3]) {
      return 1
    }
    return 0
  })
}

Game.prototype.moveTile = function (direction) {
  // Game method here
  if (!thisGame.gameOver) {
    console.log($(".tile").length);
    console.log(thisGame.validCollision);

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
  }

  function defineType2(value, type) {
    if (type === "col") {
      var type2 = "row"
      var type2Number = value.dataset[type2][3]
      return type2 + '=' + type2 + type2Number
    } else if (type === "row") {
      type2 = "col"
      var type2Number = value.dataset[type2][3]
      return type2 + '=' + type2 + type2Number
    }
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
    collideIfSameValue(sortArrays(type, operand),type, operand)
    moveAllTheWay(sortArrays(type, operand), type, operand)
  }

  function moveAllTheWay(arrayQuerys, type, operand) {
    for( line of arrayQuerys) {
      if (line.length > 0) {
        $.each(line, function( index, value ) {
          // remove the 'newTile' id that was used to animate popping in
          $(value).removeAttr('id')
          var num = parseInt(value.dataset[type][3])
          if (operand === "+") {
            var nextEle = num + 1
            var wall = 4
          } else if (operand === "-") {
            var nextEle = num - 1
            var wall = 0
          }

          let textTointepolate = defineType2(value, type)

          var nextCol = '.tile[data-' + textTointepolate + '][data-' + type + '=' + type + nextEle.toString() + ']'
          var nextColEle = $(nextCol)

          if (wall === 4) {
            while (nextEle < wall) {
              let nextString = nextEle.toString()
              var nextCol = '.tile[data-' + textTointepolate + '][data-' + type + '=' + type + nextEle.toString() + ']'
              let nextColEle = $(nextCol)

              if (nextColEle.length === 0) {
                value.dataset[type] = type + nextString
              }
              nextEle++;
            }
          } else if (wall === 0) {
            while (nextEle >= wall) {
              let nextString = nextEle.toString()
              var nextCol = '.tile[data-' + textTointepolate + '][data-' + type + '=' + type + nextEle.toString() + ']'
              let nextColEle = $(nextCol)

              if (nextColEle.length === 0) {
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

      let textTointepolate = defineType2(value, type)

      let nextString = nextEle.toString()
      var nextCol = '.tile[data-' + textTointepolate + '][data-' + type + '=' + type + nextEle.toString() + ']'
      let nextColEle = $(nextCol)

        if (nextColEle.length > 0) {
          if (value.dataset.val === nextColEle[0].dataset.val) {
            thisGame.validCollision = true
            value.dataset[type] = type + nextString
            let newVal = parseInt(value.dataset.val) + parseInt(nextColEle[0].dataset.val)
            value.dataset.val = newVal
            thisGame.addScore(newVal)
            thisGame.hasWon(newVal)
            setTimeout(function(){
              $(value).text(value.dataset.val)
            }, 240);
            nextColEle[0].remove()
          }
        }
      });
    }

  }


  // spawn a new tile after each move
  thisGame.newTile()
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
        game.moveTile(event.which)
        updateScore()
        game.hasLost()
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
