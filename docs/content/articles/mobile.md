+++
title = "Leaflet HTML on mobile"
+++

Leaflet has a nice [tutorial for mobile](https://leafletjs.com/examples/mobile/) users.
The initial steps follow standard Leaflet map and tile layer configuration.

## Preparing the page

The method call, `map.fitWorld()`, with no arguments translates into declarative HTML as a kebab-case attribute.
A nullary funtion is simple, but not all method calls can be invoked without arguments.

```html
<l-map fit-world>
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    max-zoom=19
    attribution="© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  ></l-tile-layer>
</l-map>
```

<l-map fit-world locate='{"setView": true, "maxZoom": 16}'>
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    max-zoom=19
    attribution="© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  ></l-tile-layer>
</l-map>

The tutorial then goes on to fit the bounds to device location.

## Geolocation

To activate device location, `map.locate({ setView: true, maxZoom: 16})`, is required.
As we've seen before `leaflet-html` takes a literal approach to converting JS methods into HTML.
Attributes must be expressed as strings, in this case a JSON formatted string maps to JS Object directly.

```html
<l-map locate='{"setView": true, "maxZoom": 16}'>...</l-map>
```

Applying, the additional `locate` attribute, should prompt the user for their device location.

## Event

Leaflet map events should bubble up through the document.

```js
function onLocationFound(e) {
  // Marker
  const marker = document.createElement("l-marker")
  marker.setAttribute("lat-lng", JSON.stringify(e.detail.latlng))
  e.target.appendChild(marker)

  // Circle
  const circle = document.createElement("l-circle")
  circle.setAttribute("lat-lng", JSON.stringify(e.detail.latlng))
  circle.setAttribute("radius", e.detail.accuracy)
  e.target.appendChild(circle)
}
document.querySelector("l-map").addEventListener("locationfound", onLocationFound)
```

<script>
function onLocationFound(e) {
  const marker = document.createElement("l-marker")
  marker.setAttribute("lat-lng", JSON.stringify(e.detail.latlng))
  e.target.appendChild(marker)
  const circle = document.createElement("l-circle")
  circle.setAttribute("lat-lng", JSON.stringify(e.detail.latlng))
  circle.setAttribute("radius", e.detail.accuracy)
  e.target.appendChild(circle)
}
const el = document.querySelector("l-map")
el.addEventListener("locationfound", onLocationFound)
</script>
