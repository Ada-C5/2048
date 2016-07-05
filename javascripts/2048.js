var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    // case 38: //up
    //   console.log('up');
    //   break;
    // case 40: //down
    //   console.log('down');
    //   var row = $('.tile').data('row')
    //   var col = $('.tile').data('col')
    //   debugger; 
    //   break;
    case 37: //left
      console.log('left');
      // this gets the column position of the tile
      var tileC0 = $('.tile')[0]
      tileC0.setAttribute('data-col', 'c0')
      var tileC1 = $('.tile')[1]
      
      // logic for c1 collapsing into C0 

      // check to see if c0 is empty 
      // if empty, move all the way to c0 from c1 
      // if not empty, check and see if value is the same as c1
        // if the same, they gotta merge
          // merging happens first, then they move all the way across the board 
            // c1 tile gets removed completely
            // c0 tile gets new value of 4 (for right now)
        // if not the same, nobody moves 

      break;
    case 39: //right
      console.log('right');
      var col = $('.tile')[0]
      col.setAttribute('data-col', 'c3')


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
});
