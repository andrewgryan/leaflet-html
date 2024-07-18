+++
title = "Marker"
+++

HTML equivalent to `L.marker` function.
Can be a child of `l-map` or `l-layer-group` elements.

## Example

A standard way to initialise.

```html
<l-marker lat-lng="[0,0]"></l-marker>
```

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute | Example | Description |
| -- | -- | -- |
| lat-lng | [45, 45] | LatLng position to define location |

## Properties

| Attribute | Type    | Description |
| --        | --      | --          |
| opacity   | number  | 1.0         |
| icon      | string | JSON options to `setIcon` method |

## Events

| Event key | Detail | Description |
| -- | -- | -- |
| l:layer:connected | | Triggered when connected to the document |



