var Game = function() {
  this._score = 0
};

// // // ADD SCORE // // //
Game.prototype.addScore = function(value_to_add) {
  // add new score to total score
  this._score += parseInt(value_to_add)

  // Update in view
  $('.score').text(this._score)
}

// // // GET TILES // // //
Game.prototype.getTiles = function(tile, direction) {
  // set self variable to carry the scope of 'game' throughout method
  var self = this

  // If up/down get tiles by column
  if (direction === 38 || direction === 40) {
    var up_down_array = [],

    // tiles by column
    c0 = $(tile).filter("[data-col=c0]").toArray(),
    c1 = $(tile).filter("[data-col=c1]").toArray(),
    c2 = $(tile).filter("[data-col=c2]").toArray(),
    c3 = $(tile).filter("[data-col=c3]").toArray()

    up_down_array.push(c0, c1, c2, c3)
    self.moveTile(up_down_array, direction, tile)

  // If left/right get tiles by row
  } else if (direction === 37 || direction === 39) {
    var left_right_array = [],

    // tiles by row
    r0 = $(tile).filter("[data-row=r0]").toArray(),
    r1 = $(tile).filter("[data-row=r1]").toArray(),
    r2 = $(tile).filter("[data-row=r2]").toArray(),
    r3 = $(tile).filter("[data-row=r3]").toArray()

    left_right_array.push(r0, r1, r2, r3)
    self.moveTile(left_right_array, direction)
  } else if (direction === undefined) {
    var return_array = [],
        up_down_array = [],
        left_right_array = []

    c0 = $(tile).filter("[data-col=c0]").toArray(),
    c1 = $(tile).filter("[data-col=c1]").toArray(),
    c2 = $(tile).filter("[data-col=c2]").toArray(),
    c3 = $(tile).filter("[data-col=c3]").toArray()

    r0 = $(tile).filter("[data-row=r0]").toArray(),
    r1 = $(tile).filter("[data-row=r1]").toArray(),
    r2 = $(tile).filter("[data-row=r2]").toArray(),
    r3 = $(tile).filter("[data-row=r3]").toArray()

    up_down_array.push(c0, c1, c2, c3)
    left_right_array.push(r0, r1, r2, r3)
    return_array.push(up_down_array, left_right_array)
    return return_array
  }
}

// // // ADD TILE // // //
Game.prototype.addTile = function() {
  var self = this,
      tiles = $('.tile').toArray(),
      values = [2, 2, 2, 2, 2, 2, 2, 2, 4],
      vectors = ["c0r0", "c0r1", "c0r2", "c0r3", "c1r0", "c1r1", "c1r2", "c1r3", "c2r0", "c2r1", "c2r2", "c2r3", "c3r0", "c3r1", "c3r2", "c3r3"]

  // get vector values of current tiles
  $.each(tiles, function(index, tile) {
    var row = $(tile).attr('data-row'),
        col = $(tile).attr('data-col'),
        taken = col + row

    // remove current tile vectors from possible vectors for new tile
    if (vectors.includes(taken)) {
      vectors.splice((vectors.indexOf(taken)), 1)
    }
  })

  if (tiles.length !== 16) {
    // get random tile location and random value
    var new_loc = vectors[Math.floor(Math.random()*vectors.length)],
        new_val = values[Math.floor(Math.random()*values.length)],
        new_col = new_loc.substring(0, 2),
        new_row = new_loc.substring(2, 4)

    // Make new div and put it in the tile box
    $('.tile_box').append($("<div>").attr('class', 'tile').attr('data-row', new_row).attr('data-col', new_col).attr('data-val', new_val).text(new_val))
  }
}

// // // HAS LOST // // //
Game.prototype.hasLost = function(tiles) {
  var return_array = this.getTiles(tiles),
      up_down = return_array[0],
      left_right = return_array[1]

  for (var column of up_down) {
    column.sort(function(a,b) {
      valA = parseInt($(a).attr("data-row").substring(1))
      valB = parseInt($(b).attr("data-row").substring(1))
        return (valA - valB)
      })
    }

  for (var row of left_right) {
    row.sort(function(a,b) {
      valA = parseInt($(a).attr("data-col").substring(1))
      valB = parseInt($(b).attr("data-col").substring(1))
      return (valA - valB)
    })
  }

  var all_sorted = []
  var moves_avail = true
  all_sorted.push(up_down, left_right)

  $.each(all_sorted, function(i, array) {
    $.each(array, function(j, column) {
      $.each(column, function(index, value) {

        // Compair tile values to their neighbors in order
        let current = $(value).attr('data-val')
        let next = $(column[index+1]).attr("data-val")
        if (current === next) {
          // moves are possible, return false
          moves_avail = false
          return moves_avail
        }
      })
    })
  })
  return moves_avail
}

// // // MOVE TILE // // //
Game.prototype.moveTile = function(array, direction) {
  // set self variable to carry the scope of 'game' throughout method
  var self = this

  // Game method here
  switch(direction) {
    case 38: //up
      // sort array of column arrays so the tiles are in row order
      for (var column of array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-row").substring(1))
          valB = parseInt($(b).attr("data-row").substring(1))
          return (valA - valB)
        })
      }

      // Iterare through every column of tiles, combining tiles if needed
      $.each(array, function(i, column) {
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
      for (var column of array) {
        column.sort(function(a,b) {
          valA = parseInt($(a).attr("data-row").substring(1))
          valB = parseInt($(b).attr("data-row").substring(1))
          return (valB - valA)
        })
      }

      // Iterare through every column of tiles, combining tiles if needed
      $.each(array, function(i, column) {
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
      for (var row of array) {
        row.sort(function(a,b) {
          valA = parseInt($(a).attr("data-col").substring(1))
          valB = parseInt($(b).attr("data-col").substring(1))
          return (valA - valB)
        })
      }

      // Iterare through every row of tiles, combining tiles if needed
      $.each(array, function(i, row) {
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
      for (var row of array) {
        row.sort(function(a,b) {
          valA = parseInt($(a).attr("data-col").substring(1))
          valB = parseInt($(b).attr("data-col").substring(1))
          return (valB - valA)
        })
      }

      // Iterare through every row of tiles, combining tiles if needed
      $.each(array, function(i, row) {
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

      game.getTiles(tile, event.which);
      game.addTile()
    }

    if ($('.tile').length === 16) {
      if (game.hasLost($('.tile'))) {
        alert('You lose!')
      }
    }
  });
});
