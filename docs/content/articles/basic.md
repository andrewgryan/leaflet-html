+++
title = "Basic usage"
+++

The minimal `leaflet-html` app is a basemap centered and zoomed on a location.

```html
<l-map center="[53, 0]" zoom="4">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
</l-map>
```

<l-map center="[53, 0]" zoom="4">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
</l-map>

To add the above widget to a HTML document both JS and CSS tags need to be included in the `<head>` of the page.

## Assets

Basic HTML recommended settings, e.g. `charset`, `lang`, and `viewport` to help with cross device support.
Can be placed in the `<head>` tag, along with CSS and JS assets.

```html
<head lang="en">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
```

### Leaflet

Leaflet is an external dependency of `leaflet-html`, as such,
the standard Leaflet assets should be included.

```html
<head>
...
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
...
</head>
```

### Leaflet-HTML

Leaflet-HTML is available via **npm** and **unpkg**.
To get started quickly, use the CDN version available on **unpkg**.

```html
<script type="importmap">
  {
    "imports": {
      "leaflet": "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js",
      "leaflet-html": "https://unpkg.com/leaflet-html@latest/dist/leaflet-html.js"
    }
  }
</script>
```

```html
<script type="module">
  import "leaflet-html";
</script>
```

The `@latest` keyword should keep your site up to date during development.

## Minimal style

By default Custom elements are `display: inline`,
meaning they are unaffected by `height`.
Add the following ruleset to your stylesheet to enable map size.

```css
l-map {
  display: block;
}
```

It's not always necessary to set `block` directly on an `l-map` tag.
For example, a parent with `display: grid`, will size the `l-map` tag appropriately.

### Z-index

Leaflet has fairly strong `z-index` settings that are not easy to override.
The easiest way to get around them is to start a new stacking context using `isolation: isolate`.

### Sensible defaults

Without knowing anything specific about your application the following settings should be a good starting place.

```css
l-map {
  display: block;
  block-size: 40ch;
  isolation: isolate;
  z-index: 1;
}
```

This allows overlaying your own UI elements and gives full control over size and position of each map on the page.
