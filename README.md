# Leaflet HTML

Leaflet expressed in HTML to add maps to Hypermedia Driven Applications (HDA).

Indeed, since it is HTML, any front end framework should work with it.

Fine grained reactive frameworks such as [Solid JS](https://solidjs.com) or [Van JS](https://vanjs.org) are ideal candidates for client side development.

RESTful frameworks, like [HTMX](Https://htmx.org), that serve HTML over the wire are perfect choices for server rendered content.

## Usage

Include both Leaflet and Leaflet HTML in script tags in the head of the document.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
<script type="importmap">
  {
    "imports": {
      "leaflet": "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js",
      "leaflet-html": "https://unpkg.com/leaflet-html@latest/dist/leaflet-html.js"
    }
  }
</script>
```

```html
<script type="module">
  import "leaflet-html";
</script>
```

And remember to style the various map container elements with enough size to be visible.

```css
l-map {
  display: block;
  block-size: 100vh;
}
```

## Custom elements

Leaflet HTML uses Custom elements to declare the state of each map on the page. 

The most common elements are described below.

Name | Description
-- | --
l-map | `L.map` parent element for a map. Child elements `addTo` this element.
l-tile-layer | `L.tileLayer` call, can be attached to a `l-map` or `l-base-layers` element.
l-marker | `L.marker` equivalent, can be attached to a `l-map` or `l-layer-group`.

Each custom element can be configured using HTML attributes with the same naming convention as the Leaflet docs.
The only thing to be aware of is to change case from camelCase to kebab-case. E.g. `maxZoom` becomes `max-zoom`.


## Example

The HTML in `example/index.html` is a simple demonstration of the API.

![image](https://github.com/andrewgryan/leaflet-html/assets/22789046/0186bce2-ddcc-443a-b7a2-ccd86dcffcfc)

```html
<!-- Note: Leaflet JS/CSS must be included in <head> and [data-leaflet-html] styled to an appropriate size. -->
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
