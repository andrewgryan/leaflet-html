# Leaflet HTML

Leaflet expressed in HTML adds map capabilities to Hypermedia Driven Applications (HDA).

[![npm version](http://img.shields.io/npm/v/leaflet-html.svg?style="for-the-badge")](https://npmjs.org/package/leaflet-html)
[![tests](https://img.shields.io/github/actions/workflow/status/andrewgryan/leaflet-html/tests.yml?branch=master&logo=github&style=for-the-badge)](https://github.com/andrewgryan/leaflet-html/actions/workflows/tests.yml)


## Motivation

Expressing Leaflet in HTML enables compatibility with a wide range of front end frameworks.

Fine grained reactive frameworks such as [Solid JS](https://solidjs.com) or [Van JS](https://vanjs.org) are ideal candidates for client side development.

RESTful frameworks, like [HTMX](Https://htmx.org), that serve HTML over the wire are perfect choices for server rendered content.

Even static site generators like [Zola](https://getzola.org) are ideal for this approach.

## Documentation

A comprehensive documentation site is available.

[leaflet-html docs](https://andrewgryan.github.io/leaflet-html/)

## Installation

Include Leaflet JS/CSS assets and Leaflet HTML in the document.
This can be achieved using [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
to point both `leaflet` and `leaflet-html` at ES modules.


```html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
```

### CDN

Leaflet HTML is available via a Content Delivery Network (CDN) on unpkg.com.
This is a good option for use cases that don't need a build step.

```
<script type="importmap">
  {
    "imports": {
      "leaflet": "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js",
      "leaflet-html": "https://unpkg.com/leaflet-html@latest/dist/leaflet-html.js"
    }
  }
</script>
```

Execute the library by importing it in a `script` tag.
Leaflet dependencies are detected via the `importmap`.

```html
<script type="module">
  import "leaflet-html";
</script>
```

### NPM

Leaflet HTML can be added to a project using `npm`.

```sh
npm install leaflet-html
```

If using a build tool like `vite`, the following script tag and some CSS is all that is needed to get going.

```html
<script type="module">
  import "leaflet-html";
</script>
```

### Style

In both CDN and `npm` installation approaches some minimal styling needs to be applied.
Custom elements are `display: inline` by default.
Leaflet maps, `l-map` elements, need to be set to `display: block` to have a vertical size.

```css
l-map {
  display: block;
  block-size: 100vh;
}
```
> [!NOTE]
> Only `l-map` tag needs dimensions.
> All other `l-*` elements are purely semantic.
> They do not take up space on the page.
> They just indicate the state of the map.

## Quick start

To show a map with a base map background, add a `<l-tile-layer>` tag with a `url-template` and `attribution` inside a `<l-map>`.

```html
<l-map center="[0, 0]" zoom="1">
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  ></l-tile-layer>
</l-map>
```

Adding layers, layer groups, and controls follows the Leaflet JS one-to-one.
E.g. to add a marker to the above example.

```html
<l-map center="[0, 0]" zoom="1">
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]"></l-marker>
</l-map>
```

## Custom elements

Leaflet HTML uses Custom elements to declare the state of each map on the page. 

The most common elements are described below.
The naming convention followed here makes it easy to map from a Leaflet method, e.g. `L.method()`, to a custom element, e.g. `<l-method></l-method>`.

Positional arguments and options are specified as kebab-case equivalents of the camelCase name from the Leaflet docs.
E.g. `<l-method foo-bar="42"></l-method>` translates to `L.method({fooBar: 42})`.
Type conversions and correct call positions are handled by the library.

Name             | Leaflet docs                                                            | Description
--               | --                                                                      | --
l-map            | [L.map](https://leafletjs.com/reference.html#map)                       | Parent element for a map. Child elements `addTo` this element.
l-tile-layer     | [L.tileLayer](https://leafletjs.com/reference.html#tilelayer)           | TileLayer, can be attached to a `l-map` or `l-base-layers` element.
l-marker         | [L.marker](https://leafletjs.com/reference.html#marker)                 | Marker, can be attached to a `l-map` or `l-layer-group`.
l-icon           | [L.icon](https://leafletjs.com/reference.html#icon)                     | Icon attachable to `l-marker`.
l-popup          | [L.popup](https://leafletjs.com/reference.html#popup)                   | Popup.
l-tooltip        | [L.tooltip](https://leafletjs.com/reference.html#tooltip)               | Tooltip.
l-image-overlay  | [L.imageOverlay](https://leafletjs.com/reference.html#imageoverlay)     | Image overlay.
l-video-overlay  | [L.videoOverlay](https://leafletjs.com/reference.html#videooverlay)     | Video overlay.
l-control-layers | [L.control.layers](https://leafletjs.com/reference.html#control-layers) | Adds `l-base-layers` and `l-overlay-layers` to control UI.
l-base-layers    | [L.control.layers](https://leafletjs.com/reference.html#control-layers) | Child of `l-control-layers`. Contains `l-tile-layer` elements.
l-overlay-layers | [L.control.layers](https://leafletjs.com/reference.html#control-layers) | Child of `l-control-layers`. Contains either layer or layer group elements.
l-layer-group    | [L.layerGroup](https://leafletjs.com/reference.html#layergroup)         | Parent element to group layers inside control UI. Makes adding/removing groups of UI to a map simple.
l-circle         | [L.circle](https://leafletjs.com/reference.html#circle)                 | Vector layer.
l-rectangle      | [L.rectangle](https://leafletjs.com/reference.html#rectangle)           | Vector layer.
l-polygon        | [L.polygon](https://leafletjs.com/reference.html#polygon)               | Vector layer.
l-polyline       | [L.polyline](https://leafletjs.com/reference.html#polyline)             | Vector layer.

Each custom element can be configured using HTML attributes with the same naming convention as the Leaflet docs.

> [!NOTE]
> Attributes are specified by changing **camelCase** to **kebab-case**. E.g. `maxZoom` becomes `max-zoom`.

For example, a marker with a custom icon in Leaflet JS has attributes like `{ shadowSize: [50, 64] }` in JS, which translates to `shadow-size="[50,64]"` in HTML.

```html
<l-map center="[51.5, -0.09]" zoom="12">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]"><l-icon
      icon-url="icons/leaf-green.png"
      shadow-url="icons/leaf-shadow.png"
      icon-size="[38, 95]"
      shadow-size="[50, 64]" 
      icon-anchor="[22, 94]" 
      shadow-anchor="[4, 62]" 
      popup-anchor="[-3, -76]" 
    ></l-icon>
  </l-marker>
</l-map>
```

## Events

By default, the "ready" event is triggered by the map element.
It can be accessed via the detail property of a CustomEvent.

```html
<l-map id="map" ...>
  ...
</l-map>

<script>
  const el = document.getElementById("map")
  el.addEventListener("ready", (ev) => {
    const map = ev.detail
    console.log({ map })
  })
</script>
```

Arbitrary map events can be listened to by specifying a space-separated list of map events in the on attribute, e.g. `on="resize zoomend"`.

This adds a forwarding mechanism to the CustomElement.
To add JS listeners use `addEventListener("resize", ...)`
and inspect the `CustomEvent` detail property to access the Leaflet Event.


```html
<l-map id="map" ... on="resize">
  ...
</l-map>

<script>
  // Note: both addEventListener and on="eventName" needed
  const el = document.getElementById("map")
  el.addEventListener("resize", (ev) => {
    const leafletResizeEvent = ev.detail
    console.log(leafletResizeEvent)
  })
</script>
```

### CustomEvents

Leaflet HTML wires up a Leaflet JS application by firing and listening to CustomEvents.
These events can be observed to add additional functionality to an application.

| Key               | Description                                                                                 |
| --                | --                                                                                          |
| l:layer:connected | Triggered when a layer is connected to the DOM                                              |
| l:layer:removed   | Triggered when a layer is removed from the DOM but before the disconnectedCallback fires    |
| l:popup:connected | Triggered when a popup element is connected to the DOM. Used to bind popup to parent marker |

## Realistic example

The HTML in `example/index.html` is a simple demonstration of the API.

![image](https://github.com/andrewgryan/leaflet-html/assets/22789046/0186bce2-ddcc-443a-b7a2-ccd86dcffcfc)

```html
<!-- Note: Leaflet JS/CSS must be included in <head> and l-map styled to an appropriate size. -->
<l-map center="[39.61, -105.02]" zoom="10">
  <l-control-layers>
    <l-base-layers>
      <l-tile-layer
        name="OpenStreetMap"
        url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        max-zoom="12"
      ></l-tile-layer>
      <l-tile-layer
        name="Toner"
        url-template="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
        attribution=""
        max-zoom="12"
      ></l-tile-layer>
    </l-base-layers>
    <l-overlay-layers>
      <l-layer-group name="Cities">
        <l-marker lat-lng="[39.61, -105.02]">
          <l-popup content="This is Littleton, CO."></l-popup>
        </l-marker>
        <l-marker lat-lng="[39.74, -104.99]">
          <l-popup content="This is Denver, CO."></l-popup>
        </l-marker>
        <l-marker lat-lng="[39.73, -104.8]">
          <l-popup content="This is Aurora, CO."></l-popup>
        </l-marker>
        <l-marker lat-lng="[39.77, -105.23]">
          <l-popup content="This is Golden, CO."></l-popup>
        </l-marker>
      </l-layer-group>
    </l-overlay-layers>
  </l-control-layers>
</l-map>
```

## Build

To build the source code run.

```sh
yarn build
```
