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
  + How does scoring work?
    - When numbers are able to combine, the sum is added to the total score.
  + When do tiles enter the game?
    - If movement is possible, when moved a new "2" or "4" tile enters the game. (noted: this is usually on the edge of the game board)
  + How do you know if you've won?
    - The score of 2048 is reached on any ONE tile. Not combined score. 
  +  How do you know if you've lost?
    - You are unable to combine any more tilesand when the squares are full. 
  + What makes tiles move?
    - the arrow keys on the keyboard
  + What happens when they move?
    - They slide in the direction that the arrow key was pressed. They also slide across the entire board until they encounter a tile they cannot combine with. 
  + How would you know how far a tile should move?
    - They can slide across the board to the furthest empty cell. If the cell adjacent to the sliding tile contains a tile of equal value, they will combine. 
  + How would you know if tiles would collide?
    - See above. If the tile sliding is of equal value to the adjacent tile, they will combine. 
  + What happens when tiles collide?
    - The previous tile that slid is replaced with an empty cell. The adjacent tile it slid into has a new score. Also, a new "2" or "4" tile appears randomly on the board. 
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
