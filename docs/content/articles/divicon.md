+++
title = "Div icons"
+++

A customisable icon using a single `<div/>` and CSS.
For inspiration to style a single div, visit [https://a.singlediv.com/](https://a.singlediv.com/)

<style>
  .icon {
    border: none;
    border-radius: 1000px;
  }

  .pink {
    background-color: hotpink;
  }

  .blue {
    background-color: cadetblue;
  }
</style>

<l-map zoom="5" center="[45, 0]">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[45, 1]">
    <l-div-icon class-name="icon pink"></l-div-icon>
  </l-marker>
  <l-marker lat-lng="[45, -1]">
    <l-div-icon class-name="icon blue"></l-div-icon>
  </l-marker>
</l-map>

## Styling

If custom styles are to be applied,
it is best to use the JS attribute `className` by using the `class-name` equivalent HTML attribute.

```css
.icon {
  border: none;
  border-radius: 1000px;
}

.pink {
  background-color: hotpink;
}

.blue {
  background-color: cadetblue;
}
```

## Mark-up

```html
<l-map zoom="5" center="[45, 0]">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[45, 1]">
    <l-div-icon class-name="icon pink"></l-div-icon>
  </l-marker>
  <l-marker lat-lng="[45, -1]">
    <l-div-icon class-name="icon blue"></l-div-icon>
  </l-marker>
</l-map>
```

# Conclusion

Div icons enable a front-end developer to craft amazing visualisations.
