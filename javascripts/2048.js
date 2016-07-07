var Game = function() {
  // Game logic and initialization here
  //
  // let r_num = "r" + [0..3][Math.floor(Math.random()*4)]
  // let c_num = "c" + [0..3][Math.floor(Math.random()*4)]
  //
  // let $elem = $("<div/>")
  //           .attr({
  //               "data-col": c_num,
  //               "data-row": r_num,
  //               "data-val": 2
  //             })
  //           .addClass("tile")
  //           .html("<div>2</div>")
  //
  // $("gameboard").append($elem)

};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var available,
      axis_index,
      axis,
      array;

  switch(direction) {
    case 38: //up
      console.log('up');
      axis = "row";
      for (let n = 0; n < 4; n++) {
        axis_index = 0;
        var array = $(".tile[data-col=c" + n + "]");
        sort_things(array, "data-row", "up");
        for (let i = 0; i < 4; i++) {
          slide_tile(array, axis_index, i, axis);
          axis_index++;
        }
      }
      break;

    case 40: //down
      console.log('down');
      axis = "row";
      // tile.attr({ "data-row": "r2" });
      for (let n = 0; n < 4; n++) {
        axis_index = 3;
        var array = $(".tile[data-col=c" + n + "]");
        sort_things(array, "data-row", "down");
        for (let i = 0; i < 4; i++) {
          slide_tile(array, axis_index, i, axis);
          axis_index--;
        }
      }
      break;

    case 37: //left
      console.log('left');
      available = [];
      axis = "col";
      // axis = "data-col";
      // loop through all rows
      for (let n = 0; n < 4; n++) {
        axis_index = 0;
        array = $(".tile[data-row=r" + n + "]");
        sort_things(array, "data-col", "left");
        for (let i = 0; i < array.length; i++) {
          slide_tile(array, axis_index, i, axis)
          axis_index++
        }

        // 4 - tiles.count - how many spaces available
        let available_count = 4 - array.length;
        // array of arrays [['r0', 'c0'], ['r0', 'c1']] and then rando this to get next tile spot
        for (let i = 0; i < available_count; i++) {
          let col = 3 - i;
          // when looping through all rows, change the row value
          available.push(['r2', 'c' + col]);
        }
      }
      console.log(available);
      break;

    case 39: //right
      console.log('right');
      axis = "col";
      for (let n = 0; n < 4; n++) {
        axis_index = 3;
        array = $(".tile[data-row=r" + n + "]");
        sort_things(array, "data-col", "right");
        for (let i = 0; i < array.length; i++) {
          slide_tile(array, axis_index, i, axis);
          console.log(axis_index);
          axis_index--;
        }
      }
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

function slide_tile(array, axis_index, i, axis) {
  if (axis === "col") {
    $(array[i]).attr({ "data-col": "c" + axis_index });
  } else {
    $(array[i]).attr({ "data-row": "r" + axis_index });
  }
  // if two values next to each other are the same
  if (array[i+1] && $(array)[i].dataset.val === $(array)[i+1].dataset.val) {
    // move the 2nd value to where the 1st one is
    if (axis === "col") {
      $(array[i+1]).attr({ "data-col": "c" + axis_index });
    } else {
      $(array[i+1]).attr({ "data-row": "r" + axis_index });      
    }
    // double the value stored in data-val
    $(array[i]).attr({"data-val": $(array)[i].dataset.val * 2});
    // double the number that shows on the tile
    $(array[i]).text((array)[i].dataset.val);
    // remove the 2nd element from the DOM
    $(array[i+1]).remove();
    // remove from the array
    array.splice(i+1, 1);
    // console.log(array)
  }
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
