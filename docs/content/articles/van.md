+++
title = "Programming with VanJS"
published = true
+++

## Pong

To illustrate the elegance and efficiency of representing application state in hypermedia it is instructive to implement a simple arcade game in Leaflet HTML.

```html
<l-map></l-map>
```

### Game loop

A good place to start is the game loop. Essentially, what happens on each frame of the game. 

In a browser, to sync a render cycle with the browsers paint cycle it is best to use `window.requestAnimationFrame` method.

```js
const gameLoop = () => {
  console.log("tick")
  window.requestAnimationFrame(gameLoop)
}

window requestAnimationFrame(gameLoop)
```

The game loop is responsible updating the game state and calling the render method to display the latest game state.

In our game re-renders of state are handled by VanJS and LeafletHTML.

### Entities

No modern game engine would be complete without a concept of entities.

In our game we have three entities, two paddles and a ball.

For simplicity, let's make them rectangles.

```html
<l-rectangle></l-rectangle>
```

### Movement

Each tick of the game loop simulates some elapsed time. Pong is a world of elastic collisions. The only thing that needs to be tracked is position and direction.

#### Ball

Ball movement is simple, the ball has a constant velocity and an angle. 

```js
const ball = {
   velocity: 1,
   angleRadians: 0,
   x: 0,
   y: 0
}
```

A single tick, moves the ball in its direction of travel proportional to the elapsed time since the last update. 

```js
ball.x += ball.velocity * Math.cos(ball.angleRadians) * dT
ball.y += ball.velocity * Math.sin(ball.angleRadians) * dT
```

#### Paddle

Paddle movement responds to keyboard input events and is constrained by the upper and lower walls.

### Collision detection

Pong has very simple rules around collision detection. The paddles and upper and lower walls work very similarly. 

The ball is said to have collided with an obstacle if it's final position is behind the obstacle and the point of intersection is within the extent of the obstacle.

```js
const willCollide = (ball, obstacle) => {
  return ball.x > obstacle.x
}
```

### Recoil

Bouncing off the upper and lower walls is an elastic collision like light bouncing off a mirror. Calculate the angle of incidence and use that as the angle of reflection. 

Bouncing off a paddle however is different. The angle that the ball leaves the paddle is proportional to the distance from the center of the paddle. Independent of the angle of incidence.

### Scoring

Scoring is based on collision detection.
If either of the vertical boundaries are collided with then the opposite players score counter is incremented and the ball is placed back into the field of play or a game over state is reached.

```js
if (final.x > rightWall.x) {
  score.playerOne += 1
  resetBall()
}
if (final.x < leftWall.x) {
  score.playerTwo += 1
  resetBall()
}
```

## Rendering

A game that updates state without displaying the game to the user is a meaningless game. 

To render Pong we use Leaflet to embed our entities in a cylindrical projection world. 

To make our game run at 60 frames per second, we can use a light weight reactive framework such as VanJS.

```js
import van from "vanjs-core"
```