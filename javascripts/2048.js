var Game = function() {
  // Game logic and initialization here
  //add rando first value
  this.matrix = [
    {col:"c0", row: "r0", val:"" },
    {col:"c1", row: "r0", val:"" },
    {col:"c2", row: "r0", val:"" },
    {col:"c3", row: "r0", val:"" },
    {col:"c0", row: "r1", val:"" },
    {col:"c1", row: "r1", val:"" },
    {col:"c2", row: "r1", val:"" },
    {col:"c3", row: "r1", val:"" },
    {col:"c0", row: "r2", val:"" },
    {col:"c1", row: "r2", val:"" },
    {col:"c2", row: "r2", val:"" },
    {col:"c3", row: "r2", val:"" },
    {col:"c0", row: "r3", val:"" },
    {col:"c1", row: "r3", val:"" },
    {col:"c2", row: "r3", val:"" },
    {col:"c3", row: "r3", val:"" }
  ]
  var initialSquare = this.matrix[Math.floor(Math.random()*this.matrix.length)];
  console.log(initialSquare)

  const initialValues = [2, 4]
  initialSquare['val'] = initialValues[Math.floor(Math.random()*initialValues.length)];
  console.log(initialSquare)
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }

};



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


  // <div class="tile" data-row="r2", data-col="c2" data-val="4">4</div>

  var tilex = $(".tile") //al 16 of them

  for (var i=0, max=tilex.length; i < max; i++) {
     // Do something with the element here
     console.log(tilex[i])
     console.log(game.matrix[i])
     tilex[i].dataset.row = game.matrix[i]['row']
     tilex[i].dataset.col = game.matrix[i]['col']
     tilex[i].dataset.val = game.matrix[i]['val']
     tilex[i].innerHTML = game.matrix[i]['val']
  }


});
