var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      var col_array = $(".tile[data-col='c0']");
      sort_things(col_array, "data-row", "up")
      console.log(col_array);
      break;
    case 40: //down
      console.log('down');
      // console.log($('.tile').data());
      // tile.data("row", "r2");
      // tile.attr({ "data-row": "r2" });
      // var $gameboard = $("#gameboard");
      var col_array = $(".tile[data-col='c0']");
      sort_things(col_array, "data-row", "down")
      console.log(col_array);
      break;
    case 37: //left
      console.log('left');
      var row_array = $(".tile[data-row='r0']");
      sort_things(row_array, "data-col", "left")
      console.log(row_array);
      break;
    case 39: //right
      console.log('right');
      var row_array = $(".tile[data-row='r0']");
      sort_things(row_array, "data-col", "right")
      for (let i = 0; i < 4; i++) {
        let col = 3 - i;
        console.log(row_array[i]);
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
  })
  // $sorted.detach().appendTo(gameboard);
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
