+++
title = "Icon"
+++

HTML equivalent to `L.icon` function.
Can be a child of `l-map` or `l-layer-group` elements.

See [Leaflet docs](https://leafletjs.com/reference.html#icon).

## Example

A standard way to initialise with minimal options.

```html
<l-icon icon-url="/icon.png"></l-icon>
```

A more detailed approach is to specify custom icon and shadow images.

<l-map zoom="13" center="[51.5,-0.09]">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]">
    <l-icon
      id="example-icon"
      icon-size="[38, 95]"
      icon-anchor="[22, 94]"
      icon-url="/icons/leaf-green.png"
      shadow-url="/icons/leaf-shadow.png"
      shadow-size="[50, 64]"
      shadow-anchor="[4, 62]"
    ></l-icon>
</l-map>

<div>
<label for="icon-size">Icon size</label>
<input type="range" min="0" max="100" value="38" id="icon-size" name="icon-size" />
</div>

<script>
    const icon = document.getElementById("example-icon")
    document.getElementById("icon-size").addEventListener("change", (ev) => {
        const scale = parseInt(ev.target.value) / 38
        const size = [38 * scale, 95 * scale]
        const anchor = [22 * scale, 94 * scale]
        const shadowSize = [50 * scale, 64 * scale]
        const shadowAnchor = [4 * scale, 62 * scale]
        icon.setAttribute("icon-size", JSON.stringify(size))
        icon.setAttribute("icon-anchor", JSON.stringify(anchor))
        icon.setAttribute("shadow-size", JSON.stringify(shadowSize))
        icon.setAttribute("shadow-anchor", JSON.stringify(shadowAnchor))
    })

</script>


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



