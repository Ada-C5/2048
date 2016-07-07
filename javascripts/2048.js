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

  this.lost = function() {
    if (axis_loss("col") === false || axis_loss("row") === false) {
      return false;
    }

    return true;
  }

  function axis_loss(axis) {
    for (let n = 0; n < 4; n++) {
      let array = $(".tile[data-" + axis + "=" + axis[0] + n + "]");
      for (let i = 0; i < array.length; i++) {
        if (array[i+1] && $(array)[i].dataset.val === $(array)[i+1].dataset.val) {
          return false;
        }
      }
    }
  }
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  let available,
  axis_index,
  axis,
  array,
  moved = false;

  switch(direction) {
    case 38: //up
    available = [];
    axis = "row";
    for (let n = 0; n < 4; n++) {
      axis_index = 0;
      array = $(".tile[data-col=c" + n + "]");
      sort_things(array, "data-row", "up");
      for (let i = 0; i < 4; i++) {
        if (slide_tile(array, axis_index, i, axis)) {
          moved = true;
        }
        axis_index++;
      }
      // 4 - tiles.count - how many spaces available
      let available_count = 4 - array.length;
      // array of arrays [['r0', 'c0'], ['r0', 'c1']] and then rando this to get next tile spot
      for (let i = 0; i < available_count; i++) {
        let col = 3 - i;
        // when looping through all rows, change the row value
        available.push(['c' + n, 'r' + col]);
      }
    }

    if (moved === false) {
      return moved;
    } else {
      return available;
    }

    case 40: //down
    available = [];
    axis = "row";
    // tile.attr({ "data-row": "r2" });
    for (let n = 0; n < 4; n++) {
      axis_index = 3;
      array = $(".tile[data-col=c" + n + "]");
      sort_things(array, "data-row", "down");
      for (let i = 0; i < 4; i++) {
        if (slide_tile(array, axis_index, i, axis)) {
          moved = true;
        }
        axis_index--;
      }
      // 4 - tiles.count - how many spaces available
      let available_count = 4 - array.length;
      // array of arrays [['r0', 'c0'], ['r0', 'c1']] and then rando this to get next tile spot
      for (let i = 0; i < available_count; i++) {
        // when looping through all rows, change the row value
        available.push(['c' + n, 'r' + i]);
      }
    }

    if (moved === false) {
      return moved;
    } else {
      return available;
    }

    case 37: //left
    available = [];
    axis = "col";
    // axis = "data-col";
    // loop through all rows
    for (let n = 0; n < 4; n++) {
      axis_index = 0;
      array = $(".tile[data-row=r" + n + "]");
      sort_things(array, "data-col", "left");
      for (let i = 0; i < array.length; i++) {
        if (slide_tile(array, axis_index, i, axis)) {
          moved = true;
        }
        axis_index++
      }
      // 4 - tiles.count - how many spaces available
      let available_count = 4 - array.length;
      // array of arrays [['r0', 'c0'], ['r0', 'c1']] and then rando this to get next tile spot
      for (let i = 0; i < available_count; i++) {
        let col = 3 - i;
        // when looping through all rows, change the row value
        available.push(['c' + col, 'r' + n]);
      }
    }

    if (moved === false) {
      return moved;
    } else {
      return available;
    }

    case 39: //right
    available = [];
    axis = "col";
    for (let n = 0; n < 4; n++) {
      axis_index = 3;
      array = $(".tile[data-row=r" + n + "]");
      sort_things(array, "data-col", "right");
      for (let i = 0; i < array.length; i++) {
        if (slide_tile(array, axis_index, i, axis)) {
          moved = true;
        }
        axis_index--;
      }
      // 4 - tiles.count - how many spaces available
      let available_count = 4 - array.length;
      // array of arrays [['r0', 'c0'], ['r0', 'c1']] and then rando this to get next tile spot
      for (let i = 0; i < available_count; i++) {
        // when looping through all rows, change the row value
        available.push(['c' + i, 'r' + n]);
      }
    }

    if (moved === false) {
      return moved;
    } else {
      return available;
    }
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
  let altered = false;
  if (axis === "col") {
    if (array[i] && $(array[i]).attr("data-col") !== "c" + axis_index) {
      altered = true;
    }
    $(array[i]).attr({ "data-col": "c" + axis_index });
  } else {
    if (array[i] && $(array[i]).attr("data-row") !== "r" + axis_index) {
      altered = true;
    }
    $(array[i]).attr({ "data-row": "r" + axis_index });
  }
  // if two values next to each other are the same
  if (array[i+1] && $(array)[i].dataset.val === $(array)[i+1].dataset.val) {
    altered = true;
    // move the 2nd value to where the 1st one is
    if (axis === "col") {
      $(array[i+1]).attr({ "data-col": "c" + axis_index });
    } else {
      $(array[i+1]).attr({ "data-row": "r" + axis_index });
    }

    let curr = $(array[i]);
    let nxt = $(array[i+1]);

    setTimeout (function() {
      // double the value stored in data-val
      curr.attr({"data-val": $(array)[i].dataset.val * 2});
      // double the number that shows on the tile
      curr.text((array)[i].dataset.val);
      // remove the 2nd element from the DOM
      nxt.remove();
    }, 200);
    // remove from the array
    array.splice(i+1, 1);
  }

  if (altered) {
    return altered
  }
}

Game.prototype.new_tiles = function(available) {
  if (available.length === 0) {return;}
  let tile = available[Math.floor(Math.random()*available.length)];
  let val = Math.random() < 0.9 ? 2 : 4;

  let $elem = $("<div/>")
                .attr({
                    "data-col": tile[0],
                    "data-row": tile[1],
                    "data-val": val
                  })
                .addClass("tile")
                .html(val)

  $("#gameboard").append($elem)
}

Game.prototype.new_game = function() {
  $(".tile").remove();

  for (let i = 0; i < 2; i++) {
    let r_num = Math.floor(Math.random() * (3 + 1) + 0);
    // console.log(r_num)
    let c_num = Math.floor(Math.random() * (3 + 1) + 0);
    // console.log(c_num)
    let vals = [2, 2, 2, 2, 2, 2, 4]
    var val = vals[Math.floor(Math.random() * vals.length)];

    let $elem = $("<div/>")
    .attr({
      "data-col": "c" + c_num,
      "data-row": "r" + r_num,
      "data-val": val
    })
    .addClass("tile")
    .html(val)
    console.log($elem)

    $("#gameboard").append($elem)
  };
}

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $("button.new_game_button").bind("click",function() {
    game.new_game()
  });

  $("body").keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      let available = game.moveTile(tile, event.which);
      let num_tiles = $('.tile').length;
      if (num_tiles === 16) {
        let lost = game.lost();
        console.log(lost);
      } else if (available) {
        setTimeout(function(){
          game.new_tiles(available);
        }, 200);
      }
    }
  });
});
