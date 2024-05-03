+++
+++
# Leaflet HTML

[LeafletJS](https://leafletjs.com/) is a library geared towards map based visualisations.


## Design principles

Leaflet HTML tries to model Leaflet's API as closely as possible to avoid confusion and to ease onboarding.
Naming conventions are followed where possible.
The hierarchy in the JS API is replicated by nesting HTML elements.

## Example

The following is a live running example of Leaflet HTML.

<div data-leaflet-html data-center="[39.61, -105.02]" data-zoom="10">
  <div data-control-layers>
    <div data-base-maps>
      <div
        data-tile-layer
        data-name="CartoDB_Voyager"
        data-url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        data-attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        data-max-zoom="20"
        data-subdomains="abcd"
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


```html
<!-- Example -->
<div data-leaflet-html data-center="[39.61, -105.02]" data-zoom="10">
  <div data-control-layers>
    <div data-base-maps>
      <div
        data-tile-layer
        data-name="CartoDB_Voyager"
        data-url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        data-attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        data-max-zoom="20"
        data-subdomains="abcd"
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

