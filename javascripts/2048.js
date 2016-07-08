var Game = function() {
  // Game logic and initialization here
  this.score = 0
};

Game.prototype.moveTile = function(tiles, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.legit("up")
      // this.addTile()
      break;
    case 40: //down
      console.log('down');
      this.legit("down")
      // this.addTile()
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

Game.prototype.addTile = function () {
  var tiles = $(".tile")
  var rows = ["r0", "r1", "r2", "r3"]
  var columns = ["c0", "c1", "c2", "c3"]
  var value = [2,4]
  var randValue= value[Math.floor(Math.random() * value.length)]
  var newTile = null
  var random = [rows[Math.floor(Math.random() * rows.length)], columns[Math.floor(Math.random() * columns.length)]]
  while (newTile === null) {
    tiles.each(function(index, val){
      if ($(val).attr("data-row") === random[0] && $(val).attr("data-col") === random[1]){
        random = [rows[Math.floor(Math.random() * rows.length)], columns[Math.floor(Math.random() * columns.length)]]
        console.log("match", newTile)
        newTile = null
      } else {
        newTile = $("<div>", {class: "tile", "data-row":random[0], "data-col":random[1], "data-val":randValue, text: randValue})
      }
    })
  }
  console.log(newTile,"YAAY")
  $(".cells").after(newTile)
  console.log(randValue)
  newTile = null
}


Game.prototype.legit = function (direction) { // if left or right use rows ||  if up or down use col
  var self = this
  if (direction === "left") {
    for (var row = 0; row < 4; row++) {
      var current = $("div[data-row=r" + row + "]")
      var length = current.length - 1

      for (var i = 0; i < length; i++) {
        if (current[i + 1]) { // edge case, if next thing is not null, go on
          var curr = $(current[i])
          var next = $(current[i + 1])
          console.log(current);
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
            next.attr("data-col", curr.attr("data-col"))
            self.scoring(total)
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
    // this.addTile()

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
      // this.addTile()

  } else if (direction === "up") {
    for (var col = 0; col < 4; col++) {
      var current = $("div[data-col=c" + col + "]")
      var length = current.length - 1
      for (var i = 0; i < length; i++) {
      // current.each(function (i, val) {
        if (current[i + 1]) {
          var curr = $(current[i])
          var next = $(current[i + 1])
          console.log(current);
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
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
    // this.addTile()

  } else if (direction === "down") {
    for (var col = 0; col < 4; col++) {
      var current = $("div[data-col=c" + col + "]")
      var length = current.length - 1
      for (var i = length; i >= 0; i--) {
        if (current[i - 1]) {
          var curr = $(current[i])
          console.log("curr ", curr);
          var next = $(current[i - 1])
          console.log("next ", next);
          if (curr.attr("data-val") === next.attr("data-val")) {
            var total = parseInt(curr.attr("data-val")) + parseInt(next.attr("data-val"))
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
        // console.log(current.length);
        for (var j = current.length - 1; j >= 0; j--) {
          var space = $(current[j])
          space.attr("data-row", "r" + k)
          k--
        }
      }
    }
      // this.addTile()

  }
  this.addTile()
}

Game.prototype.scoring = function(value){
  console.log("in it")
  this.score += value
  $("p").text('Your Score is:'+this.score)
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
