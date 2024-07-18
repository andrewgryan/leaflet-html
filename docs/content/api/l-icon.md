+++
title = "Icon"
+++

HTML equivalent to `L.icon` function.
Can be a child of `l-map` or `l-layer-group` elements.

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

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute | Example | Description |
| -- | -- | -- |
| icon-url | image.png | URL to define icon image |

## Properties

| Attribute | Type    | Description |
| --        | --      | --          |
| opacity   | number  | 1.0         |
| icon      | string | JSON options to `setIcon` method |

## Events

| Event key | Detail | Description |
| -- | -- | -- |
| l:layer:connected | | Triggered when connected to the document |



