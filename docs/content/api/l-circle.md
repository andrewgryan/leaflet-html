+++
title = "Circle"
+++

HTML equivalent to `L.circle` function.
Can be a child of `l-map` or `l-layer-group` elements.

## Example

A standard way to initialise.

```html
<l-circle lat-lng="[0,0]"></l-circle>
```

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute | Example | Description |
| -- | -- | -- |
| lat-lng | [45, 45] | LatLng position to define circle center location |

## Properties

| Attribute    | Type    | Description |
| --           | --      | --          |
| radius       | number  |             |
| stroke       | boolean | true        |
| color        | string  | #3388ff     |
| weight       | number  | 3           |
| opacity      | number  | 1.0         |
| lineCap      | string  | round       |
| lineJoin     | string  | round       |
| dashArray    | string  | null        |
| dashOffset   | string  | null        |
| fill         | boolean | true        |
| fillColor    | string  | #3388ff     |
| fillOpacity  | number  | 0.2         |
| smoothFactor | number  | 1.0         |
| noClip       | boolean | false       |
| interactive  | boolean | true        |

## Events

| Event key | Detail | Description |
| -- | -- | -- |
| l:layer:connected | | Triggered when connected to the document |



