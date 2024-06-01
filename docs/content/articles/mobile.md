+++
title = "Leaflet HTML on mobile"
+++

Leaflet has a nice [tutorial for mobile](https://leafletjs.com/examples/mobile/) users.
The initial steps follow standard Leaflet map and tile layer configuration.

This article demonstrates how to achieve the same effect in HTML.

## Preparing the page

The method call, `map.fitWorld()`, with no arguments translates into declarative HTML as a kebab-case attribute.

**Note** Nullary (zero argument) funtions like this one, and unary (single argument) functions are easy to represent in HTML.
         But not all Leaflet method calls can be invoked with zero or one arguments.
         An elegant way to support N-ary functions is being developed.


```html
<l-map fit-world>
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    max-zoom=19
    attribution="© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  ></l-tile-layer>
</l-map>
```

<l-map fit-world locate='{"setView": true, "maxZoom": 16}' on="locationfound locationerror">
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
To expose internal Leaflet events to the outside world list them in the `on` attribute.

```html
<l-map on="locationfound locationerror">...</l-map>
```

To add custom behaviour, listen to the events forwarded by the `l-map` element.

```js
const el = document.querySelector("l-map")

function onLocationFound(e) {
  let { latlng, accuracy } = e.detail
  latlng = JSON.stringify(latlng)

  // Marker
  const marker = document.createElement("l-marker")
  marker.setAttribute("lat-lng", latlng)
  e.target.appendChild(marker)

  // Popup
  const message = `You are within ${accuracy} meters from this point`
  marker.innerHTML = `<l-popup content='${message}' open-popup></l-popup>`

  // Circle
  const circle = document.createElement("l-circle")
  circle.setAttribute("lat-lng", latlng)
  circle.setAttribute("radius", accuracy)
  e.target.appendChild(circle)
}
el.addEventListener("locationfound", onLocationFound)
```

In the event of an `error` it is nice to tell the user that something went wrong.

```js
// LocationError
function onLocationFound(e) {
  alert(e.detail.message)
}
el.addEventListener("locationerror", onLocationError)
```

This concludes the tutorial.
The mapping from Leaflet to LeafletHTML should be clearer now.

This library is a work in progress,
the API design will be refined in the coming releases.

**Note** Not all methods, events and attributes are covered by LeafletHTML at the time of writing.
         Work is underway to fill in the missing gaps.

<script>
// LocationFound
function onLocationFound(e) {
  let { latlng, accuracy } = e.detail
  latlng = JSON.stringify(latlng)

  const marker = document.createElement("l-marker")
  marker.setAttribute("lat-lng", latlng)
  e.target.appendChild(marker)

  const message = `You are within ${accuracy} meters from this point`
  marker.innerHTML = `<l-popup content='${message}' open-popup></l-popup>`

  const circle = document.createElement("l-circle")
  circle.setAttribute("lat-lng", latlng)
  circle.setAttribute("radius", accuracy)
  e.target.appendChild(circle)
}
const el = document.querySelector("l-map")
el.addEventListener("locationfound", onLocationFound)

// LocationError
function onLocationError(e) {
  alert(e.detail.message)
}
el.addEventListener("locationerror", onLocationError)
</script>
