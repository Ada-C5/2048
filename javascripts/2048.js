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

Game.prototype.moveBoard = function (direction) {
  // this.legit()
  // $(".tile").attr(data, space)
}

Game.prototype.legit = function (direction) {
  // if left or right use rows
  //if up or down use col
  if (direction === "left") {
    for (var row = 0; row < 4; row++) {
      var current = $("div[data-row=r" + row + "]")

      // console.log(current);

      current.each(function (i, val) {
        if (current[i + 1]) { // edge case, if next thing is not null, go on
          var curr = $(val)
          var next = $(current[i + 1])
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            curr.attr("data-val", total).html(total)
            next.attr("data-col", curr.data("col"))
            next.remove()
            current.splice([i + 1], 1)
          }
        }
      })
    }
  } else if (direction === "right") {
    $(".tile").attr("data-col", "c3")

  } else if (direction === "up") {
    $(".tile").attr("data-row", "r0")

  } else if (direction === "down") {
    $(".tile").attr("data-row", "r3")

  }
  this.moveBoard(direction)
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
