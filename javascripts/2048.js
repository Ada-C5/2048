var Game = function() {
  this._score = 0
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');

      var c0 = $(tile).filter("[data-col=c0]")
      var c1 = $(tile).filter("[data-col=c1]")
      var c2 = $(tile).filter("[data-col=c2]")
      var c3 = $(tile).filter("[data-col=c3]")

      var array = []

      array.push(c0)
      array.push(c1)
      array.push(c2)
      array.push(c3)

      $.each(array, function(i, column) {
        $.each(column, function(index, value) {
          if ($(value).attr("data-val") === ($(column[index+1]).attr("data-val"))) {
            $(value).attr('data-val', (($(value).attr('data-val')) * 2))
            $(value).text($(value).attr('data-val'))

            $(column[index+1]).remove()

            column.splice((index + 1), 1)
          }
        })

        $.each(column, function(index, moving) {
          row = $(moving).attr('data-row')
          thing = ('r' + index)

          if (row !== thing) {
            let changed = $(moving).attr('data-row', thing)
          }
        })
      })

      break;


    case 40: //down
      console.log('down');

      var c0 = $(tile).filter("[data-col=c0]").toArray().reverse()
      var c1 = $(tile).filter("[data-col=c1]")
      var c2 = $(tile).filter("[data-col=c2]")
      var c3 = $(tile).filter("[data-col=c3]")

      var array = []

      array.push(c0)
      array.push(c1)
      array.push(c2)
      array.push(c3)

      // "reverse each" through the array so you are looking at the bottom-est first,
      // and comparing it to the bottom-est possible index... thing...

      $.each(array, function(i, column) {
        $.each(column, function(index, value) {

          if ($(value).attr("data-val") === ($(column[index+1]).attr("data-val"))) {
            $(value).attr('data-val', (($(value).attr('data-val')) * 2))
            $(value).text($(value).attr('data-val'))

            $(column[index+1]).remove()

            column.splice((index + 1), 1)
          }
        })

        $.each(column, function(index, moving) {
          row = $(moving).attr('data-row')
          thing = ('r' + index)

          if (row !== thing) {
            let changed = $(moving).attr('data-row', thing)
          }
        })
      })

      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
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

      game.moveTile(tile, event.which);
    }
  });
});
