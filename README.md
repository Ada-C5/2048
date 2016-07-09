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

      When you collide 2 equivalent tiles together, their value is added to the score.

  1. When do tiles enter the game?

    The game starts with 2 tiles in a random location. New tiles enter the game whenever you swipe. There is a 90% chance the tile will be the number 2, and a 10% chance that it will be the number 4.

  1. How do you know if you've won?

    When at least one tile's value is 2048.

  1. How do you know if you've lost?

    When there are no more empty spaces on the grid.

  1. What makes tiles move?

    Arrow keys.

  1. What happens when they move?

    The tile's old location becomes empty and its destination space's value is updated with that tile's value.

  1. How would you know how far a tile should move?

    A tile can only move up to 3 spaces up, down, right, or left. If there's a tile in the way that doesn't have the same value, the tile is blocked by it. A tile always moves the length of empty spaces; it cannot move just one space at a time.

  1. How would you know if tiles would collide?

    Tiles collide when their value is the same.

  1. What happens when tiles collide?

      The destination tile becomes the sum of the source tile + the destination tile. The source tile then disappears.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
