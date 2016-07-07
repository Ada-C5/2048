var Game = function() {
  this._score = 0
};

Game.prototype.moveTile = function(tile, direction) {
  var up_array = [],
      down_array = [],
      left_array = [],
      right_array = [],

    // tiles by column
      c0 = $(tile).filter("[data-col=c0]").toArray(),
      c1 = $(tile).filter("[data-col=c1]").toArray(),
      c2 = $(tile).filter("[data-col=c2]").toArray(),
      c3 = $(tile).filter("[data-col=c3]").toArray(),
    // tiles by row
      r0 = $(tile).filter("[data-row=r0]").toArray(),
      r1 = $(tile).filter("[data-row=r1]").toArray(),
      r2 = $(tile).filter("[data-row=r2]").toArray(),
      r3 = $(tile).filter("[data-row=r3]").toArray()

  up_array.push(c0, c1, c2, c3)
  down_array.push(c0, c1, c2, c3)
  left_array.push(r0, r1, r2, r3)
  right_array.push(r0, r1, r2, r3)

  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');

      for (var column of up_array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-row").substring(1))
          valB = parseInt($(b).attr("data-row").substring(1))

          return (valA - valB)
        })
      }

      $.each(up_array, function(i, column) {
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

      for (var column of down_array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-row").substring(1))
          valB = parseInt($(b).attr("data-row").substring(1))

          return (valB - valA)
        })
      }

      $.each(down_array, function(i, column) {
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
          thing = ('r' + (3-index))

          if (row !== thing) {
            let changed = $(moving).attr('data-row', thing)
          }
        })
      })

      break;

    case 37: //left
      console.log('left');

      for (var column of left_array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-col").substring(1))
          valB = parseInt($(b).attr("data-col").substring(1))

          return (valA - valB)
        })
      }

      $.each(left_array, function(i, column) {
        $.each(column, function(index, value) {
          if ($(value).attr("data-val") === ($(column[index+1]).attr("data-val"))) {
            $(value).attr('data-val', (($(value).attr('data-val')) * 2))
            $(value).text($(value).attr('data-val'))

            $(column[index+1]).remove()

            column.splice((index + 1), 1)
          }
        })

        $.each(column, function(index, moving) {
          col = $(moving).attr('data-col')
          thing = ('c' + index)

          if (col !== thing) {
            let changed = $(moving).attr('data-col', thing)
          }
        })
      })

      break;

    case 39: //right
      console.log('right');

      for (var column of right_array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-col").substring(1))
          valB = parseInt($(b).attr("data-col").substring(1))

          return (valB - valA)
        })
      }

      $.each(right_array, function(i, row) {
        $.each(row, function(index, value) {

          if ($(value).attr("data-val") === ($(row[index+1]).attr("data-val"))) {
            $(value).attr('data-val', (($(value).attr('data-val')) * 2))
            $(value).text($(value).attr('data-val'))

            $(row[index+1]).remove()

            row.splice((index + 1), 1)
          }
        })

        $.each(row, function(index, moving) {
          col = $(moving).attr('data-col')
          thing = ('c' + (3-index))

          if (col !== thing) {
            let changed = $(moving).attr('data-col', thing)
          }
        })
      })


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
