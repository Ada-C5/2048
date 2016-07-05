Game.prototype.moveLeft = function () {
  for (let i = 0; i < 4; i ++) {
    for (let space in board[i]) {
      if (board[i][space] === null) {
        board[i][space] = board[i][space+1]
      }
    }
  }
}