+++
title = "Arcade games"
+++

## Pong

To illustrate the elegance and efficiency of representing application state in hypermedia it is instructive to implement a simple arcade game in Leaflet HTML.

To play pong in a cylindrical projection of a sphere it is wise to position the board close to the equator.

```html
<l-map
  lat-lng="[0,40]"
  zoom="12"></l-map>
```

<l-map center="[0, 0]" zoom="6">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-rectangle id="ball" lat-lng-bounds="[[0,0],[0.1,0.1]]" weight="1" fill-opacity="1" color="#f44708">
  </l-rectangle>
  <l-rectangle id="paddle-1" lat-lng-bounds="[[-0.5,-5], [0.5,-4.9]]" weight="1"></l-rectangle>
  <l-rectangle id="paddle-2" lat-lng-bounds="[[-0.5,5], [0.5,4.9]]" weight="1"></l-rectangle>
  <l-polyline lat-lngs="[[2,-5],[2,5]]" weight="1" color="cadetblue">
  </l-polyline>
  <l-polyline lat-lngs="[[-2,-5],[-2,5]]" weight="1" color="cadetblue">
  </l-polyline>
  <l-polyline lat-lngs="[[-2,0],[2,0]]" weight="1" color="cadetblue">
  </l-polyline>
</l-map>

<script>
  let ball = {
    x: 0,
    y: 0,
    dx: 0.125,
    dy: 0.125,
    velocity: -0.0275,
    angleRadians: Math.PI / 6,
    el: document.getElementById("ball")
  }

  let paddleOne = {
    x: -5,
    y: -0.7,
    dx: 0.1,
    dy: 1,
    el: document.getElementById("paddle-1")
  }
  let paddleTwo = {
    x: 5 - 0.05,
    y: 1.2,
    dx: 0.1,
    dy: 1,
    el: document.getElementById("paddle-2")
  }

  const extent = (entity) => {
    const { x, y, dx, dy } = entity
    const low = [y - (dy / 2.0), x - (dx / 2.0)]
    const high = [y + (dy / 2.0), x + (dx / 2.0)]
    return [low, high]
  }

  const integrate = (entity) => {
    const y = entity.y + entity.velocity * Math.sin(entity.angleRadians)
    const x = entity.x + entity.velocity * Math.cos(entity.angleRadians)
    return {...entity, x, y}
  }

  const render = (entity) => {
    entity.el.setAttribute("lat-lng-bounds", JSON.stringify(extent(entity)))
  }

  const upperExtent = (entity) => entity.y + (entity.dy / 2)
  const lowerExtent = (entity) => entity.y - (entity.dy / 2)
  const rightFace = (entity) => entity.x + (entity.dx / 2)
  const leftFace = (entity) => entity.x - (entity.dx / 2)

  const gameLoop = () => {
    let nextBall = integrate(ball)
    if ((upperExtent(nextBall) > 2) || (lowerExtent(nextBall) < -2)) {
      nextBall.angleRadians *= -1
    }
    if ((rightFace(nextBall) > leftFace(paddleTwo)) || (leftFace(nextBall) < rightFace(paddleOne))) {
      nextBall.angleRadians *= -1
      nextBall.velocity *= -1
    }
    ball = nextBall

    render(ball)
    render(paddleOne)
    render(paddleTwo)
    window.requestAnimationFrame(gameLoop)
  }
  window.requestAnimationFrame(gameLoop)
</script>

### Game loop

A good place to start is the game loop. Essentially, what happens on each frame of the game. 

In a browser, to sync a render cycle with the browsers paint cycle it is best to use `window.requestAnimationFrame` method.

```js
const gameLoop = () => {
  console.log("tick")
  window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)
```

The game loop is responsible updating the game state and calling the render method to display the latest game state.

In our game re-renders of state are handled by LeafletHTML tag updates.

### Entities

No modern game engine would be complete without a concept of entities.

In our game we have three entities, two paddles and a ball.

For simplicity, let's make them rectangles.

```html
<l-rectangle
  lat-lng-bounds="[[-5, -5], [5, 5]]">
</l-rectangle>
```

```js
const bounds = (entity) => {
  const {x, y, dx, dy} = entity
  const low = [
    x - (dx / 2),
    y - (dy / 2)
  ]
  const high = [
    x + (dx / 2),
    y + (dy / 2)
  ]
  return [low, high]
}
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

```js
// Reflective bounce mechanic
const wall = {
  y: 5
}

const ball = {
  x: 0,
  y: 4,
  angleRadians: Math.PI / 4,
  velocity: 1
}

const dT = 2 // Fake units

const nextBall = integrateMotion(ball, dT)

if (behind(wall, nextBall)) {
  // recoil algorithm
  nextBall.y = wall.y - Math.abs(nextBall.y - wall.y)
  nextBall.angleRadians // TO DO
}
```

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
