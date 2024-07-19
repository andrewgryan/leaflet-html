+++
title = "Icon"
+++

HTML equivalent to `L.icon` function.
Can be a child of `l-map` or `l-layer-group` elements.

See [Leaflet docs](https://leafletjs.com/reference.html#icon).

## Example

A standard way to initialise.

```html
<l-icon icon-url="/icon.png"></l-icon>
```

```html
<l-icon
    icon-url="/icons/leaf-green.png"
    shadow-url="/icons/leaf-shadow.png"
    icon-size="[38, 95]"
    shadow-size="[50, 64]" 
    icon-anchor="[22, 94]" 
    shadow-anchor="[4, 62]" 
    popup-anchor="[-3, -76]" 
  ></l-icon>
```

## Related elements

- [l-marker](@/api/l-marker.md)

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute         | Example   | Description              |
| --                | --        | --                       |

## Properties

| Attribute         | Type      | Description              |
| --                | --        | --                       |
| class-name        | string    | Custom class name        |
| cross-origin      | bool      |                          |
| icon-anchor       | Point     | Coordinates of the "tip" of the icon |
| icon-retina-url   | string    |                          |
| icon-size         | Point     | Size of the icon in pixels |
| icon-url          | string    | URL to define icon image |
| popup-anchor      | Point     |                          |
| shadow-anchor     | Point     |                          |
| shadow-retina-url | string    | Coordinates of the "tip" of the shadow |
| shadow-size       | Point     | Size in pixels           |
| shadow-url        | string    | Url for shadow, no shadow if not specified |
| tooltip-anchor    | Point     | Coordinates relative to anchor |

## Events

| Event key | Detail | Description |
| -- | -- | -- |
| l:icon:connected | | Triggered when connected to the document |



