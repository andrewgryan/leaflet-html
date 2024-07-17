+++
title = "Image overlay"
+++

HTML equivalent to `L.imageOverlay` function.
Can be a child of `l-map` or `l-layer-group` elements.

## Example

A standard way to initialise an image overlay.

```html
<l-image-overlay
  url="/image.png"
  bounds="[[-1, -1], [1, 1]]"
></l-image-overlay>
```

More elaborate example, based on a Leaflet tutorial.

```html
<l-image-overlay
  url="https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
  bounds="[[40.799311, -74.118464], [40.68202047785919, -74.33]]"
  opacity="0.8"
  interactive="true"
  error-overlay-url="https://cdn-icons-png.flaticon.com/512/110/110686.png"
  alt="Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection."
></l-image-overlay>
```

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute | Example | Description |
| -- | -- | -- |
| url | /path/to/image.png  | HTTP URL to image |
| bounds | [[0, 0], [45, 45]] | LatLngBounds to define the image extent |

## Properties

| Attribute | Type | Description |
| -- | -- | -- |
| alt | string | Alt text related to image |
| opacity | float | Value to control transparency |

## Events

| Event key | Detail | Description |
| -- | -- | -- |
| l:layer:connected | | Triggered when connected to the document |


