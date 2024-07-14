+++
title = "Div icons"
+++

<style>
  .leaflet-div-icon {
    border: none;
    background-color: hotpink;
    border-radius: 1000px;
  }
</style>

<l-map zoom="5" center="[45, 0]">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[45, 0]">
    <l-div-icon></l-div-icon>
  </l-marker>
</l-map>

