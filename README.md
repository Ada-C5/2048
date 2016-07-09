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
  1. When do tiles enter the game?
  1. How do you know if you've won?
  1. How do you know if you've lost?
  1. What makes tiles move?
  1. What happens when they move?
  1. How would you know how far a tile should move?
  1. How would you know if tiles would collide?
  1. What happens when tiles collide?
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.

### ANSWERS
1. How does scoring work?
when 2 of the same tiles love each other (are the same), they add up in the direction of the swipe, starting from the opposite direction of the swipe.
2. When do tiles enter the game?
At the beginning, and every time we swipe, it randomly places a tile in a space available.
3. How do you know if you've won?
When you get a tile that has 2048
4. How do you know if you've lost?
When all the spaces are filled and none of the same values are next to each other.
5. What makes tiles move?
When the user presses the arrows on the keyboard. It's based on the direction.
6. What happens when they move?
They traverse across each tile (in the direction) and stop if they hit a wall or a different valued tile. If it's the same value, please read number 1.
7. How would you know how far a tile should move?
We are creating pointers, that tell us the last available space a tile can move to.
8. How would you know if tiles would collide?
We check the tile in the direction of the swipe and the closest one to it (in the same direction), if it matches, we add them. Collision!
9. What happens when tiles collide?
They add together, some weird CSS happens and it changes their data val and their actual value in the div.

EDGE CASES
diag 
      <div class="tile" data-row="0", data-col="0" data-val="2">2</div>
      <div class="tile" data-row="1", data-col="1" data-val="2">2</div>
      <div class="tile" data-row="2", data-col="2" data-val="2">2</div>
      <div class="tile" data-row="3", data-col="3" data-val="2">2</div>
