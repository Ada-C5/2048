var Game = function() {
  this._score = 0
};

Game.prototype.addScore = function(value_to_add) {
  // add new score to total score
  this._score += parseInt(value_to_add)

  // Update in view
  $('.score').text(this._score)
}

Game.prototype.addTile = function() {
  
}

Game.prototype.moveTile = function(tile, direction) {
  // Setting variables that will be needed throughout the function (specifically self, so that I can preserve the scope of "game" throughout)
  var self = this,
      up_down_array = [],
      left_right_array = [],

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


  up_down_array.push(c0, c1, c2, c3)
  left_right_array.push(r0, r1, r2, r3)

  // Game method here
  switch(direction) {
    case 38: //up
      // sort array of column arrays so the tiles are in row order
      for (var column of up_down_array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-row").substring(1))
          valB = parseInt($(b).attr("data-row").substring(1))
          return (valA - valB)
        })
      }

      // Iterare through every column of tiles, combining tiles if needed
      $.each(up_down_array, function(i, column) {
        $.each(column, function(index, value) {
          // If there is no div, return
          if (value === undefined) {return}

          // Compair tile values to their neighbors in order
          let current = $(value).attr('data-val')
          if (current === ($(column[index+1]).attr("data-val"))) {
            // Update value of tile being checked
            $(value).attr('data-val', (current * 2))
            $(value).text(current * 2)

            // Remove tile from view and array being iterated through
            $(column[index+1]).remove()
            column.splice((index + 1), 1)

            // Add the combined tiles to the total score
            self.addScore(current * 2)
          }
        })

        // Move altered and un-altered tiles if there is blank space for them to move to
        $.each(column, function(index, moving) {
          row = $(moving).attr('data-row')
          thing = ('r' + index)

          if (row !== thing) {
            $(moving).attr('data-row', thing)
          }
        })
      })

      break;

    case 40: //down

    // sort array of columns so they are in reversed row order
      for (var column of up_down_array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-row").substring(1))
          valB = parseInt($(b).attr("data-row").substring(1))
          return (valB - valA)
        })
      }

      // Iterare through every column of tiles, combining tiles if needed
      $.each(up_down_array, function(i, column) {
        $.each(column, function(index, value) {
          // If there is no div, return
          if (value === undefined) {return}

          // Compair tile values to their neighbors in order
          var current = $(value).attr('data-val')
          if (current === ($(column[index+1]).attr("data-val"))) {
            // Update value of tile being checked
            $(value).attr('data-val', (current * 2))
            $(value).text(current * 2)

            // Remove tile from view and array being iterated through
            $(column[index+1]).remove()
            column.splice((index + 1), 1)

            // Add the combined tiles to the total score
            self.addScore(current * 2)
          }
        })

        // Move altered and un-altered tiles if there is blank space for them to move to
        $.each(column, function(index, moving) {
          row = $(moving).attr('data-row')
          thing = ('r' + (3-index))

          if (row !== thing) {
            $(moving).attr('data-row', thing)
          }
        })
      })

      break;

    case 37: //left
      // sort array of column arrays so the tiles are in row order
      for (var row of left_right_array) {
        row.sort(function(a,b) {
          valA = parseInt($(a).attr("data-col").substring(1))
          valB = parseInt($(b).attr("data-col").substring(1))
          return (valA - valB)
        })
      }

      // Iterare through every row of tiles, combining tiles if needed
      $.each(left_right_array, function(i, row) {
        $.each(row, function(index, value) {
          // If there is no div, return
          if (value === undefined) {return}

          // Compair tile values to their neighbors in order
          var current = ($(value).attr('data-val'))
          if (current === ($(row[index+1]).attr("data-val"))) {
            // Update value of tile being checked
            $(value).attr('data-val', (current * 2))
            $(value).text(current * 2)

            // Remove tile from view and array being iterated through
            $(row[index+1]).remove()
            row.splice((index + 1), 1)

            // Add the combined tiles to the total score
            self.addScore(current * 2)
          }
        })

        // Move altered and un-altered tiles if there is blank space for them to move to
        $.each(row, function(index, moving) {
          col = $(moving).attr('data-col')
          thing = ('c' + index)

          if (col !== thing) {
            $(moving).attr('data-col', thing)
          }
        })
      })

      break;

    case 39: //right
      // sort array of column arrays so the tiles are in row order
      for (var row of left_right_array) {
        row.sort(function(a,b) {
          valA = parseInt($(a).attr("data-col").substring(1))
          valB = parseInt($(b).attr("data-col").substring(1))
          return (valB - valA)
        })
      }

      // Iterare through every row of tiles, combining tiles if needed
      $.each(left_right_array, function(i, row) {
        $.each(row, function(index, value) {
          // If there is no div, return
          if (value === undefined) {return}

          // Compair tile values to their neighbors in order
          var current = $(value).attr('data-val')
          if (current === ($(row[index+1]).attr("data-val"))) {
            // Update value of tile being checked
            $(value).attr('data-val', (current * 2))
            $(value).text(current * 2)

            // Remove tile from view and array being iterated through
            $(row[index+1]).remove()
            row.splice((index + 1), 1)

            // Add the combined tiles to the total score
            self.addScore(current * 2)
          }
        })

        // Move altered and un-altered tiles if there is blank space for them to move to
        $.each(row, function(index, moving) {
          col = $(moving).attr('data-col')
          thing = ('c' + (3-index))

          if (col !== thing) {
            $(moving).attr('data-col', thing)
          }
        })
      })

    break;
  }
};

// Ready set gooooo!
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
