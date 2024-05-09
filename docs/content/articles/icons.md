+++
title = "Custom icons"
+++

There are two ways to add an icon to a marker.
One is to specify a `icon` attribute containing a JSON string of `L.Icon` options.

```html
<l-marker
  lat-lng="[51.5, -0.09]"
  icon='{"iconUrl": "icons/leaf-green.png"}'
></l-marker>
```

The other way is to create a separate HTML tag to configure the icon.
This is a more HTML centered approach.
The above JSON approach may be suitable in cases where the icon data is available in a data structure.

```html
<l-marker lat-lng="[51.5, -0.09]"><l-icon
    icon-url="/icons/leaf-green.png"
    shadow-url="/icons/leaf-shadow.png"
    icon-size="[38, 95]"
    shadow-size="[50, 64]" 
    icon-anchor="[22, 94]" 
    shadow-anchor="[4, 62]" 
    popup-anchor="[-3, -76]" 
  ></l-icon>
```

Both are supported, choose whichever is most convenient.

<l-map center="[51.5, -0.09]" zoom="12">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]"><l-icon
      icon-url="/leaflet-html/icons/leaf-green.png"
      shadow-url="/leaflet-html/icons/leaf-shadow.png"
      icon-size="[38, 95]"
      shadow-size="[50, 64]" 
      icon-anchor="[22, 94]" 
      shadow-anchor="[4, 62]" 
      popup-anchor="[-3, -76]" 
    ></l-icon>
  </l-marker>
</l-map>
