var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tiles, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.legit("up")
      // this.moves("data-row", "r0")
      break;
    case 40: //down
      console.log('down');
      this.legit("down")
      // this.moves("data-row", "r3")
      break;
    case 37: //left
      console.log('left');
      this.legit("left")
      // this.moves("data-col", "c0")
      break;
    case 39: //right
      console.log('right');
      this.legit("right")
      // this.moves("data-col", "c3")
      break;
  }
};

Game.prototype.moves = function (data, space) {
  this.legit()
  $(".tile").attr(data, space)
}

Game.prototype.legit = function (direction) {
  // if left or right use rows
  //if up or down use col
  if (direction === "left") {
    for (var row = 0; row < 4; row++) {
      var current = $("div[data-row=r" + row + "]")
      if (current.length && ($(current[0]).data("val") == $(current[1]).data("val"))) { //current.length is null check
        var tile1 = $(current[0])
        var tile2 = $(current[1])
        var total = tile1.data("val") + tile2.data("val")
        tile1.attr("data-val", total)
        tile1.html(total)
        tile2.remove()
        current.attr("data-col", "c0")
      }
    }
  } else if (direction === "right") {
    $(".tile").attr("data-col", "c3")

  } else if (direction === "up") {
    $(".tile").attr("data-row", "r0")

  } else if (direction === "down") {
    $(".tile").attr("data-row", "r3")

  }
}

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');
      // console.log(tiles)
      game.moveTile(tiles, event.which);
    }
  });
});
