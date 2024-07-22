+++
title = "DivIcon"
+++

HTML equivalent to `L.divIcon` function.
Can be a child of `l-marker` element.

See [Leaflet docs](https://leafletjs.com/reference.html#divicon).

## Example

A standard way to initialise.

```html
<l-div-icon class-name="my-css-class"></l-div-icon>
```

<style>
  .example-div-icon {
    background-color: hotpink;
    transform: scale(4, 0.5);
  }
</style>

<l-map zoom="13" center="[51.5,-0.09]">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]">
    <l-div-icon
      id="example-icon"
      class-name="example-div-icon"
    ></l-div-icon>
  </l-marker>
</l-map>

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute | Example | Description |
| --        | --      | --          |
|           |         |             |

## Properties

| Attribute  | Type    | Description |
| --         | --      | --          |
| class-name |         |             |

## Events

| Event key | Detail  | Description |
| --        | --      | --          |
|           |         |             |



