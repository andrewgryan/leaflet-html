+++
title = "Map"
+++

HTML equivalent to `L.map` function. Can call methods, e.g. `map.fitWorld()`.

## Example

A standard way to initialise a map is with a center and a zoom level.

```html
<l-map center="[0,0]" zoom="0"></l-map>
```

To detect mobile device location, zoom to it and enable location event handlers.

```html
<l-map fit-world locate='{"setView": true, "maxZoom": 16}' on="locationfound locationerror">
  ...
</l-map>
```

## Parameters

Mandatory HTML properties to successfully instantiate a map.

| Attribute | Example | Description |
| -- | -- | -- |
| center | [0, 0]  | LatLng position |
| zoom | 0 | Zoom level |

OR

| Attribute | Example | Description |
| -- | -- | -- |
| fit-world  | | Existence of this property calls `map.fitWorld()` |

## Properties

| Attribute | Value | Description |
| -- | -- | -- |
| fit-world | | Auto-fits map to world extent |
| on | | Used to connect `map.on` Leaflet event handler to HTML CusomEvent |
| locate | | `map.locate` method call options |

## Events

| Event key | Detail | Description |
| -- | -- | -- |
| ready | | Triggered by `map.whenReady` method |
| l:layer:connected | | Triggered by child elements when a layer is connected to the document |

