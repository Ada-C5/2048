var Game = function () {
  // Game logic and initialization here


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
        // console.log(nextColEle);

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

}





$(document).ready(function () {
  console.log("ready to go!")
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event) {
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile')

      game.moveTile(tile, event.which)
    }
  })
})
