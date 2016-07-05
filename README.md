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
   point are equivalent to the final tile value

  1. When do tiles enter the game?
  after you move a certain direction

  1. How do you know if you've won?
  have one tile that has a value of 2048

  1. How do you know if you've lost?
  if all of the slots have tiles

  1. What makes tiles move?
  the arrow button

  1. What happens when they move?
  if two tiles' values match when going in the direction of the 'move', they will combine values and make one tile. If there are three tiles with matching values, the combination will happen to the two tiles in the opposite direction of the 'move'.(ex: if you click right, the two tiles on the left will combine). Tiles that don't match will move into an empty slot in the direction of the 'move'

  1. How would you know how far a tile should move?
  It should move over until there's no empty slot in the direction of the 'move'. It will not move if there is no empty slot.

  1. How would you know if tiles would collide?
  if the tile's values are the same

  1. What happens when tiles collide?
  they turn into one tile, and add together their values. It also adds the final value as points to the player.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
