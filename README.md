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

[Trello Board](https://trello.com/b/NxRw0yYj/2048)


- **Scoring:** every time you combine 2 tiles, add the sum of those 2 tiles to your score
- **Tiles Enter:** At start of game, 2 tiles appear on random cells and are either a 2 or 4 tile, 2tiles are more common than 4tiles.
- **Win Condition:** Two tiles are combined that sum up to 2048 || when one tile exists that has a value of 2048
- **Lose Condition:** The board spaces are filled and no tiles can be combined when pressing any direction key
- **Causes Movement:** Pressing an arrow key shifts tiles in the direction of the arrow key
- **Movement Consequences:** Tiles shift as far in the direction pressed as they can (meaning there are empty spaces for them to move to or there is a like tile that they can combine into) -- check if empty, if not empty, check if it's the same tile value (meaning it will be combined)
 - _Note: one tile only combines once per turn/swipe_
- **When Tiles Collide:** Two tiles combine into one with a new summed value, the tile that is farther from the direction sliding in is deleted
