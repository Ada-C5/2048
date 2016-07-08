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
  We will add the total of all new tiles at the end of the turn. This means that a board with a 2 + 2 collision will accrue points for both the 4 that is created and the new tile that spawns. The total for such a board would be 10 coming from 2 + 2, + 4, +2 as the new tile.

  1. When do tiles enter the game?
  At the end of every non-losing turn.

  1. How do you know if you've won?
  The background color becomes much more obnoxious, which occurs if we have a tile that is 2048 or greater.

  1. How do you know if you've lost?
  There are no more available moves. Also, it's possible that the game will mock you. This feature to be added at some point.

  1. What makes tiles move?
  A keypress event of the right, left, up, or down arrows. To humor old school gamers, we will also accept A, S, D, and W.

  1. What happens when they move?
   - Tiles move their available spaces (which changes our data matrix to reflect the new values, as calculated by our collision math).
   - The new tile is spawned
   - The board is redrawn as necessary in the browser
   - The score is updated

  1. How would you know how far a tile should move?
  A tile slides until it hits a !null square. Collsion math will then determine if it moves one further.

  1. How would you know if tiles would collide?
  If tile_value === next_square_value, tiles should collide.

  1. What happens when tiles collide?
  - In our data matrix, the values of the tiles are combined in the slot furthest in the direction of movement.
  - The moving tile's slot is then "zeroed out" by being reset to null.
  - The representation of the board is updated
  - The score is recalculated using the combined total.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
