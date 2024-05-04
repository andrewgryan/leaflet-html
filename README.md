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
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""
></script>
<script src="https://unpkg.com/leaflet-html@latest/leaflet-html.umd.js"></script>
```

And remember to style the various map container elements with enough size to be visible.

```css
[data-leaflet-html] {
  block-size: 100vh;
}
```

## Example

The HTML in `example/index.html` is a simple demonstration of the API.

![image](https://github.com/andrewgryan/leaflet-html/assets/22789046/0186bce2-ddcc-443a-b7a2-ccd86dcffcfc)

```html
<!-- Note: Leaflet JS/CSS must be included in <head> and [data-leaflet-html] styled to an appropriate size. -->
<div data-leaflet-html data-center="[39.61, -105.02]" data-zoom="10">
  <div data-control-layers>
    <div data-base-maps>
      <div data-tile-layer
           data-name="OpenStreetMap"
           data-url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
           data-attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           data-max-zoom="12"
      ></div>
      <div data-tile-layer
           data-name="Toner"
           data-url-template="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
           data-attribution=''
           data-max-zoom="12"
           data-show
      ></div>
    </div>
    <div data-overlay-maps>
      <div data-layer-group data-name="Cities">
        <div data-marker data-lat-lng="[39.61, -105.02]">
          <div data-popup data-content="This is Littleton, CO."></div>
        </div>
        <div data-marker data-lat-lng="[39.74, -104.99]">
          <div data-popup data-content="This is Denver, CO."></div>
        </div>
        <div data-marker data-lat-lng="[39.73, -104.8]">
          <div data-popup data-content="This is Aurora, CO."></div>
        </div>
        <div data-marker data-lat-lng="[39.77, -105.23]">
          <div data-popup data-content="This is Golden, CO."></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Build

To build the source code run.

```sh
yarn build
```
