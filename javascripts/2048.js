var Game = function() {
  // Game logic and initialization here
  //add rando first value
  this.matrix = [
    {col:0, row:0, val:"" },
    {col:1, row:0, val:"2" },
    {col:2, row:0, val:"" },
    {col:3, row:0, val:"" },
    {col:0, row:1, val:"" },
    {col:1, row:1, val:"" },
    {col:2, row:1, val:"" },
    {col:3, row:1, val:"" },
    {col:0, row:2, val:"" },
    {col:1, row:2, val:"2" },
    {col:2, row:2, val:"" },
    {col:3, row:2, val:"" },
    {col:0, row:3, val:"" },
    {col:1, row:3, val:"" },
    {col:2, row:3, val:"" },
    {col:3, row:3, val:"" }
  ]
  var initialSquare = this.matrix[Math.floor(Math.random()*this.matrix.length)];
  // console.log(initialSquare)

  const initialValues = [2, 4]
  initialSquare['val'] = initialValues[Math.floor(Math.random()*initialValues.length)];
  // console.log(initialSquare)
};

Game.prototype.moveTile = function(tile, direction, matrix, game) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      //check each square above the designated square ranging R0-R3
      // if tile_hash[row] === R0
        // check all squares with the same column value with row values 1-3 to see if they are occupied
      // else if tile_hash[row] === R1
        // check all squares with the same column value with row values 2-3 to see if they are occupied
      // else if tile_hash[row] === R2
        // check square with same column value and R3 to see if it is occupied

      //first column
        //check upmost (row 0) cell for non=empty values


      // MOVING COLUMNS (UP)
      for (let c = 0; c<4; c++) {
        var this_col = matrix.filter(function(x) {return x['col'] == c})
        console.log(this_col) //works!!
        for (var r = 1; r < 4; r++) {
          if (this_col[r]["val"] != "") { //do this whenver you find a tile with a number
            let currentTile = this_col[r]["val"]
            for (var s = r-1; s > -1; s--) {
              if (this_col[s]["val"] == "") { //if the tile above is empty, swap the values
                this_col[s]["val"] = currentTile
                this_col[s+1]["val"] = ""
              }
            }
          }
        }
        render(game)
      }

      break;
    case 40: //down
      console.log('down');
      //check each square below the designated square ranging R3-R0
      // MOVING COLUMNS (DOWN)
      for (let c = 0; c<4; c++) { //doing it for each column
        var this_col = matrix.filter(function(x) {return x['col'] == c})
        console.log(this_col) //works!!
        for (var r = 2; r > -1 ; r--) {
          if (this_col[r]["val"] != "") { //do this whenver you find a tile with a number
            let currentTile = this_col[r]["val"]
            for (var s = r+1; s < 4; s++) {
              if (this_col[s]["val"] == "") { //if the tile above is empty, swap the values
                this_col[s]["val"] = currentTile
                this_col[s-1]["val"] = ""
              }
            }
          }
        }
        render(game)
      }


      break;
    case 37: //left
      console.log('left');
      //check each square right of the designated square ranging C0-C3

      break;
    case 39: //right
      console.log('right');
      //check each square left of the designated square ranging C3-C0
      break;
  }

};

//FUNCTION THAT RENDERS
// <div class="tile" data-row="r2", data-col="c2" data-val="4">4</div>
function render(game) {
  var tilex = $(".tile") //al 16 of them

  for (var i=0, max=tilex.length; i < max; i++) {
     // Do something with the element here
    //  console.log(tilex[i])
    //  console.log(game.matrix[i])
     tilex[i].dataset.row = "r" + (game.matrix[i]['row']).toString()
     tilex[i].dataset.col = "c" + (game.matrix[i]['col']).toString()
     tilex[i].dataset.val = game.matrix[i]['val']
     tilex[i].innerHTML = game.matrix[i]['val']
  }
//
}

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  render(game)

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which, game.matrix, game);
    }
  });

});
