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

```js
const gameLoop = () => {
  console.log("tick")
  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
```

### Entities

No modern game engine would be complete without a concept of entities.

In our game we have three entities, two paddles and a ball.

### Collision detection

Pong has very simple rules around collision detection. The paddles and upper and lower walls work very similarly. 

The ball is said to have collided with an obstacle if it's final position is behind the obstacle and the point of intersection is within the extent of the obstacle.

### Recoil

Bouncing off the upper and lower walls is an elastic collision like light bouncing off a mirror. Calculate the angle of incidence and use that as the angle of reflection. 

Bouncing off a paddle however is different. The angle that the ball leaves the paddle is proportional to the distance from the center of the paddle. Independent of the angle of incidence.

### Scoring

Scoring is another kind of collision, if either of the vertical boundaries are collided with then the opposite players score counter is incremented and the ball is placed back into the field of play or a game over state is reached.