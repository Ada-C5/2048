# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organzizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?
  When tiles collide and combine, their combined tile value is added to the player's score.

  1. When do tiles enter the game?
  Every move initiated by the arrow keys randomly generates one tile.

  1. How do you know if you've won?
  You get a tile with the value 2048.

  1. How do you know if you've lost?
  The board is filled with tiles and no room remains to move.

  1. What makes tiles move?
  The four arrow keys move the tiles.

  1. What happens when they move?
  If two same-valued tiles are adjacent on the axis of the move, they combine into one tile with the original value doubled. If two tiles are adjacent but do not share a value, they move as far as they can in the move direction without combining.

  1. How would you know how far a tile should move?
  The tile moves according to the direction of the arrow chosen and whether or not it will come into contact with another same-valued tile.

  1. How would you know if tiles would collide?
  If the tiles are directly adjacent and on the move axis they will collide.

  1. What happens when tiles collide?
  Either the two tiles combine to form one new tile with their original value doubled, or they remain adjacent to one another with no value change.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
