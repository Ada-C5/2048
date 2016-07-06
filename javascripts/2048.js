var Game = function () {
  // Game logic and initialization here
  thisGame = this
  this.gameOver = false


}

Game.prototype.moveTile = function (tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up')
      break;
    case 40: //down
      console.log('down')
      break;
    case 37: //left
      console.log('left')
      break;
    case 39: //right
      console.log('right')
      seperateMovementFunction('col', '+')
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


})
