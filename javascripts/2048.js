var Game = function() {
  this.score = 0
};

Game.prototype.moveTile = function(tiles, direction) {
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
      break;
    case 39: //right
      console.log('right');
      this.legit("right")
      break;
  }
};

Game.prototype.addTile = function () {
  var tiles = $(".tile")
  var rows = ["r0", "r1", "r2", "r3"]
  var columns = ["c0", "c1", "c2", "c3"]
  var value = [2,4]
  var randValue= value[Math.floor(Math.random() * value.length)]
  var newTile = null
  var random = [rows[Math.floor(Math.random() * rows.length)], columns[Math.floor(Math.random() * columns.length)]]
  while (newTile === null) {
    var exists = $(".tile[data-row=" + random[0] + "][data-col=" + random[1] + "]")
      if (exists.length !== 0) {
        random = [rows[Math.floor(Math.random() * rows.length)], columns[Math.floor(Math.random() * columns.length)]]
      } else {
        newTile = $("<div>", {class: "tile", "data-row":random[0], "data-col":random[1], "data-val":randValue, text: randValue})
      }
  }
  console.log("this is random ", random);
  $(".cells").after(newTile)
  newTile = null
}


Game.prototype.legit = function (direction) { // if left or right use rows ||  if up or down use col
  var self = this
  if (direction === "left") {
    for (var row = 0; row < 4; row++) {
      var current = $("div[data-row=r" + row + "]").get().sort(function (div1, div2) {
        if ($(div1).attr("data-col") < $(div2).attr("data-col")) {
          return -1
        } else if ($(div1).attr("data-col") === $(div2).attr("data-col")) {
          return 0
        } else {
          return 1
        }
      })
      var length = current.length - 1

      for (var i = 0; i < length; i++) {
        if (current[i + 1]) { // edge case, if next thing is not null, go on
          var curr = $(current[i])
          var next = $(current[i + 1])
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            next.attr("data-col", curr.attr("data-col"))
            self.scoring(total)
            self.checkWin(total)
            // setTimeout(function () {
              curr.attr("data-val", total).html(total)
              next.remove()
            // }, 925)
            current.splice([i + 1], 1)
          }
        }
      }
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
            self.scoring(total)
            self.checkWin(total)
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
        for (var j = current.length - 1; j >= 0; j--) {
          var space = $(current[j])
          space.attr("data-col", "c" + k)
          k--
        }
      }
    }
  } else if (direction === "up") {
    for (var col = 0; col < 4; col++) {
      var current = $("div[data-col=c" + col + "]")
      var length = current.length - 1
      for (var i = 0; i < length; i++) {
      // current.each(function (i, val) {
        if (current[i + 1]) {
          var curr = $(current[i])
          var next = $(current[i + 1])
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            self.scoring(total)
            self.checkWin(total)
            next.attr("data-row", curr.attr("data-row"))
            // setTimeout(function () {
              curr.attr("data-val", total).html(total)
              next.remove()
            // }, 925)
            current.splice([i + 1], 1)
          }
        }
      }
      if (current.length > 0) {
        for (var j = 0; j < current.length; j++) {
          var space = $(current[j])
          space.attr("data-row", "r" + j)
        }
      }
    }
  } else if (direction === "down") {
    for (var col = 0; col < 4; col++) {
      var current = $("div[data-col=c" + col + "]")
      var length = current.length - 1
      for (var i = length; i >= 0; i--) {
        if (current[i - 1]) {
          var curr = $(current[i])
          var next = $(current[i - 1])
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            self.scoring(total)
            self.checkWin(total)
            next.attr("data-row", curr.attr("data-row"))
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
        for (var j = current.length - 1; j >= 0; j--) {
          var space = $(current[j])
          space.attr("data-row", "r" + k)
          k--
        }
      }
    }
  }
  this.addTile()
}

Game.prototype.scoring = function(value){
  this.score += value
  $("p").text('Your Score is: '+this.score)
}

Game.prototype.checkWin = function(value){
  if (value === 2048){
    $("p").text('YOU WON!!')
  }
}

// Game.prototype.checkLose = function(){
//   var tiles = $(".tile")
//   if (tiles.length === 16 &&) {

//   }
// }

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
