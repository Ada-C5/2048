var Game = function() {
  this._score = 0
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');

      var c0 = $(tile).data('col', 'c0')
      var c1 = $(tile).data('col', 'c1')
      var c2 = $(tile).data('col', 'c2')
      var c3 = $(tile).data('col', 'c3')

      if (c0.length !== 4) {
        $.each(c0, function(index, value) {
          if ($(value).data('val') === ($(c0[index+1]).data('val'))) {
            let val = $(value).attr('data-val')
            $(value).attr('data-val', (val * 2))
            $(value).text(val * 2)

            $(c0[index+1]).remove()

            c0 = jQuery.grep(c0, function(value) {
              return value != c0[index+1];
            })
          }
        })

        // console.log(c0[0])
        // console.log(c0[1])

        $.each(c0, function(index, moving) {
          console.log(moving)
          if ($(moving).data('row') !== ('r' + index)) {
            $(moving).attr('data-row', ('r' + index))
            console.log(index)
          }
        })
      }



      if (c1.length !== 4) {
        $.each(c1, function(index, value) {
          if ($(value).data('row') !== ('r' + index)) {
            $(value).attr('data-row', ('r' + index))
            index++
          }
        })
      }

      if (c2.length !== 4) {
        $.each(c2, function(index, value) {
          if ($(value).data('row') !== ('r' + index)) {
            $(value).attr('data-row', ('r' + index))
            index++
          }
        })
      }

      if (c3.length !== 4) {
        $.each(c3, function(index, value) {
          if ($(value).data('row') !== ('r' + index)) {
            $(value).attr('data-row', ('r' + index))
            index++
          }
        })
      }

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
});
