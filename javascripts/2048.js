var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      var col_array = $(".tile[data-col='c2']");
      sort_things(col_array, "data-row", "up");
      for (let i = 0; i < 4; i++) {
        let row = 0 + i;
        $(col_array[i]).attr({ "data-row": "r" + row });
      }
      break;

    case 40: //down
      console.log('down');
      // tile.attr({ "data-row": "r2" });
      var col_array = $(".tile[data-col='c2']");
      sort_things(col_array, "data-row", "down");
      for (let i = 0; i < 4; i++) {
        let row = 3 - i;
        $(col_array[i]).attr({ "data-row": "r" + row });
      }
      break;

    case 37: //left
      console.log('left');
      var row_array = $(".tile[data-row='r2']");
      sort_things(row_array, "data-col", "left");
      let col = 0;
      for (let i = 0; i < row_array.length; i++) { // .length is needed here instead of 4 since the row won't always be full
        $(row_array[i]).attr({ "data-col": "c" + col });
        // if two values next to each other are the same
        if (row_array[i+1] && $(row_array)[i].dataset.val === $(row_array)[i+1].dataset.val) {
          // move the 2nd value to where the 1st one is
          $(row_array[i+1]).attr({ "data-col": "c" + col });
          // double the value stored in data-val
          $(row_array[i]).attr({"data-val": $(row_array)[i].dataset.val * 2});
          // double the number that shows on the tile
          $(row_array[i]).text((row_array)[i].dataset.val);
          // remove the 2nd element from the DOM
          $(row_array[i+1]).remove();
          // increment to skip over the value that was just removed (still in the array used in this loop)
          i++;
        }
        col++;
      }
      break;

    case 39: //right
      console.log('right');
      var row_array = $(".tile[data-row='r0']");
      sort_things(row_array, "data-col", "right");
      for (let i = 0; i < 4; i++) {
        let col = 3 - i;
        $(row_array[i]).attr({ "data-col": "c" + col });
      }
      // console.log(row_array[0].getAttribute("data-col")[1]);
      break;
  }
};

function sort_things(tile_array, sort_by, direction) {
  tile_array = tile_array.sort(function (a, b) {
    var an = a.getAttribute(sort_by),
        bn = b.getAttribute(sort_by),
        result;

    if(an > bn) {
      result = 1;
    } else if (an < bn) {
      result = -1;
    } else {
      result = 0;
    }

    if (direction == "down" || direction == "right") {
      result *= -1
    }

    return result;
  });
}

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
