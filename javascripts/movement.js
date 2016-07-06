Game.prototype.moveLeft = function () {
  for (let i = 3; i > 0; i --) {
    for (let j = 3; j > 0; j --) {
      this.collide(this.board[i][j], this.board[i][j-1])
      }
    }
  }
}

// Game.prototype.checkLeft = function (array) {
//   if (array === [null, null, null, null]) {
//     return array
//   }

//   for (let i in array) {
//     if (array[i] === null) {
//       array[i] = array[i+1]
//       array[i+1] = null
//     }
//   }
// }


// Game.prototype.collideLeft = function (array) {
//   for (let i = 3; i > 0; i--) {
//     if (array[i] === array[i-1]) {
//       array[i] += array[i-1]
//     } else if (array[i] === null) {
//       array[i] = array[i-1]
//     } else {
//       array[i] = array[i]
//     }
//   }

//   return array
// }

// is array 4 empty?
// is it mergable?

// is array 3 now empty?
// is it mergable






// is array 0 empty?

// if no, is array 1 mergable?

