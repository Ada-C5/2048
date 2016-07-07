var Game = function() {
  // Game logic and initialization here

};





var board = {


}


Game.prototype.newTile = function(newTile){

return $('#gameboard').append("<div class='tile' data-row='r" + ( Math.floor(Math.random() * 1) + 0) + "', data-col='c" + ( Math.floor(Math.random() * 1) + 0) + "' data-val='2'>2</div>")
}





Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up

     $('.tile[data-row="r3"]').each(function(index){
       var col = $(this).attr("data-col")
       var row = $(this).attr("data-row")
       var colnum = parseInt(col[1])
       var rownum = parseInt(row[1])-1
       var previousRow =  $('.tile[data-row="r'+rownum+'"][data-col="'+col+'"]')
       if(previousRow.length == 0){
         $(this).attr("data-row", 'r' + rownum)

       }

    })




    var col03 = $('.tile[data-row="r3"][data-col="c0"]')
    col03.attr('data-row', 'r2')




    //  $('.tile[data-row="r3"]').each(function(index){
    //   $(this).attr("data-row", "r2")
    // })
    //
    // $('.tile[data-row="r2"]').each(function(index){
    //  $(this).attr("data-row", "r1")
    //
    //  $('.tile[data-row="r1"]').each(function(index){
    //   $(this).attr("data-row", "r0")
    // })



    //   var row3 = $('.tile[data-row="r3"]')//selected all the tiles on row three
    //  row3.attr("data-row", "r2")
    //  var row2 = $('.tile[data-row="r2"]')
    //  console.log(row2)
    //  row2.attr("data-row", "r1")
    //  var row1 = $('.tile[data-row="r1"]')
    //  row1.attr("data-row","r0")


      // console.log('up');
      //   var data = $('.tile[data-row="r3"]')
      //   var row2 = data[0].dataset.row = "r2"
      //
      //
      //$('.tile').attr("data-row", "r0")
      //
      //   console.log(data[0].dataset.row)



      break;
    case 40: //down
      console.log('down');
        $('.tile').attr("data-row", "r3")
      break;
    case 37: //left
      console.log('left');
        $('.tile').attr("data-col", "c0")
      break;
    case 39: //right
      console.log('right');
        $('.tile').attr("data-col", "c3")
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

      game.moveTile(tile, event.which);// event.which means which key
    }
  });
    $('body').keyup(function(event){
      game.newTile()
    })

});
