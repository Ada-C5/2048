var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tiles, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.legit("up")
      break;
    case 40: //down
      console.log('down');
      this.legit("down")
      break;
    case 37: //left
      console.log('left');
      this.legit("left")
      // this.addTile()
      break;
    case 39: //right
      console.log('right');
      this.legit("right")
      // this.addTile()
      break;
  }
};

Game.prototype.moveBoard = function (direction) {
  if (direction === "left") {

  }
}

// Game.prototype.addTile = function () {
//   var rows = ["r0", "r1", "r2", "r3"]
//   var columns = ["c0", "c1", "c2", "c3"]
//   var random = [rows[Math.floor(Math.random() * rows.length)], columns[Math.floor(Math.random() * columns.length)]]
//   while (status) {
//     var status = true
//     var check = $("div[data-row=" + random[0] + "]")
//     check.each(function (index, value) {
//       current = $(value)
//       if (current.attr("data-col") === random[1]){
//         status = false
//         random = [Math.floor(Math.random() * rows.length), Math.floor(Math.random() * columns.length)]
//       }
//     })
//   }
//   var thing = $(".tile").clone("<div></div>")
//   console.log(random, "yeah", thing)
//   thing.attr("data-row", random[0])
//   thing.attr("data-col", random[1])
//   thing.attr("data-val", "2").html("2")
//   console.log(thing, "YAAAAY")
// }

Game.prototype.legit = function (direction) { // if left or right use rows ||  if up or down use col
  if (direction === "left") {
    for (var row = 0; row < 4; row++) {
      var current = $("div[data-row=r" + row + "]")
      current.each(function (i, val) {
        if (current[i + 1]) { // edge case, if next thing is not null, go on
          var curr = $(val)
          var next = $(current[i + 1])
          console.log(current);
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            next.attr("data-col", curr.attr("data-col"))
            setTimeout(function () {
              curr.attr("data-val", total).html(total)
              next.remove()
            }, 925)
            current.splice([i + 1], 1)
          }
        }
      })
      if (current.length > 0) {
        for (var j = 0; j < current.length; j++) {
          var space = $(current[j])
          space.attr("data-col", "c" + j)
        }
      }
    }

  } else if (direction === "right") {
    for (var row = 0; row < 4; row++) {
      var current = $("div[data-row=r" + row + "]")
      var length = current.length - 1
      for (var i = length; i >= 0; i--) {
        if (current[i - 1]) {
          var curr = $(current[i])
          var next = $(current[i - 1])
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            next.attr("data-col", curr.attr("data-col"))
            // setTimeout(function () {
              curr.attr("data-val", total).html(total)
              next.remove()
            // }, 925)
            current.splice([i - 1], 1)
          }
        }
      }
      if (current.length > 0) {
        var k = 3
        console.log(current.length);
        for (var j = current.length - 1; j >= 0; j--) {
          var space = $(current[j])
          space.attr("data-col", "c" + k)
          k--
        }
      }
    }

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
      game.moveTile(tiles, event.which);
    }
  });
});
