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