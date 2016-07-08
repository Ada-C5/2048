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
    A player starts with a total score of 0. When a tile-match is made, the total score is updated with the value of that tile-match's new tile. For example, when a "2" tile matches with another "2" tile, the new tile is a "4". Then 4 points are added to the player's total score. The total score does not change if no matches are made.

  2. When do tiles enter the game?
    * Keypress event happens
    * All tiles move to the side of the board indicated by the keypress
    * Tile matches occur (if there are any)
    * A new "2" or "4" tile is added to the board in a random space

  3. How do you know if you've won?
    If you match two tiles and the resulting tile's value is "2048", you have won the game.

  4. How do you know if you've lost?
    If all board spaces are filled with tiles and no more tile matches can be made, you have lost the game.

  5. What makes tiles move?
    * Tiles are moved based on a key press of up-arrow, right-arrow, down-arrow or left-arrow.
    * If no tile movement/collisions would occur on a direction, that direction cannot be chosen.

  6. What happens when they move?
    * All tiles move to the side of the board indicated by the keypress, filling in all available empty space.
    * Tile matches occur (if there are any). If there is a tile match, the tiles "combine" their values into the directioniest-most tile and the other tile disappears.  
    * A new "2" or "4" tile is added to the board in a random space.

  7. How would you know how far a tile should move?
    A tile should move in the indicated direction as far as it can go without overlapping another tile. E.G. If three tiles in one row are moving right, they will each move one space right, filling in the only empty space on the board (the board is 4 x 4). If a row contains one tile, and move right command is placed, the one tile will move three spaces to the right. All available space must be filled.

  8. How would you know if tiles would collide?
    If tiles have the same value, and when moving they would normally share a side, they will combine when they collide.

  9. What happens when tiles collide?
    If they have the same value, they combine. If they do not, they do nothing. 

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
