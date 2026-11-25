

![f26c08f1-ab0e-47de-ae8d-fbd062383555~3.jpg](https://github.com/user-attachments/assets/38887c1b-1c20-48de-be01-df264ee6cdeb)

# Leaflet HTML

Leaflet expresado en HTML añade capacidades de mapas a las Aplicaciones Impulsadas por Hipervínculos (HDA).

[![npm version](http://img.shields.io/npm/v/leaflet-html.svg?style="for-the-badge")](https://npmjs.org/package/leaflet-html)
[![tests](https://img.shields.io/github/actions/workflow/status/andrewgryan/leaflet-html/tests.yml?branch=master&logo=github&style=for-the-badge)](https://github.com/andrewgryan/leaflet-html/actions/workflows/tests.yml)


## Motivación

Expresar Leaflet en HTML habilita la compatibilidad con una amplia gama de frameworks de front end.

Los frameworks reactivos de grano fino como [Solid JS](https://solidjs.com) o [Van JS](https://vanjs.org) son candidatos ideales para el desarrollo del lado del cliente.

Los frameworks RESTful, como [HTMX](Https://htmx.org), que sirven HTML a través de la red son opciones perfectas para contenido renderizado en el servidor.

Incluso los generadores de sitios estáticos como [Zola](https://getzola.org) son ideales para este enfoque.

## Documentación

Se encuentra disponible un sitio de documentación integral.

[Documentación de leaflet-html](https://andrewgryan.github.io/leaflet-html/)

## Instalación

Incluye los activos JS/CSS de Leaflet y Leaflet HTML en el documento.
Esto se puede lograr usando [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
para apuntar tanto a `leaflet` como a `leaflet-html` hacia módulos ES.


```html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
```

### CDN

Leaflet HTML está disponible a través de una Red de Distribución de Contenido (CDN) en unpkg.com.
Esta es una buena opción para casos de uso que no requieren un paso de compilación.

```
<script type="importmap">
  {
    "imports": {
      "leaflet": "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js",
      "leaflet-html": "https://unpkg.com/leaflet-html@latest/dist/leaflet-html.js"
    }
  }
</script>
```

Ejecuta la biblioteca importándola en una etiqueta `script`.
Las dependencias de Leaflet se detectan a través del `importmap`.

```html
<script type="module">
  import "leaflet-html";
</script>
```

### NPM

Leaflet HTML se puede agregar a un proyecto usando `npm`.

```sh
npm install leaflet-html
```

Si se utiliza una herramienta de compilación como `vite`, la siguiente etiqueta de script y algo de CSS es todo lo necesario para comenzar.

```html
<script type="module">
  import "leaflet-html";
</script>
```

### Estilo

En ambos enfoques de instalación, CDN y `npm`, se necesita aplicar algún estilo mínimo.
Los elementos personalizados son `display: inline` por defecto.
Los mapas de Leaflet, los elementos `l-map`, deben establecerse en `display: block` para tener un tamaño vertical.

```css
l-map {
  display: block;
  block-size: 100vh;
}
```
> [!NOTE]
> Solo la etiqueta `l-map` necesita dimensiones.
> Todos los demás elementos `l-*` son puramente semánticos.
> No ocupan espacio en la página.
> Solo indican el estado del mapa.

## Inicio rápido

Para mostrar un mapa con un fondo de mapa base, agrega una etiqueta `<l-tile-layer>` con un `url-template` y `attribution` dentro de un `<l-map>`.

```html
<l-map center="[0, 0]" zoom="1">
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  ></l-tile-layer>
</l-map>
```

Agregar capas, grupos de capas y controles sigue el patrón uno a uno de Leaflet JS.
Por ejemplo, para agregar un marcador al ejemplo anterior.

```html
<l-map center="[0, 0]" zoom="1">
  <l-tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]"></l-marker>
</l-map>
```

## Elementos personalizados

Leaflet HTML utiliza elementos personalizados para declarar el estado de cada mapa en la página. 

Los elementos más comunes se describen a continuación.
La convención de nombres seguida aquí facilita el mapeo desde un método de Leaflet, por ejemplo `L.method()`, a un elemento personalizado, por ejemplo `<l-method></l-method>`.

Los argumentos posicionales y las opciones se especifican como equivalentes en kebab-case de los nombres camelCase de la documentación de Leaflet.
Por ejemplo, `<l-method foo-bar="42"></l-method>` se traduce a `L.method({fooBar: 42})`.
Las conversiones de tipo y las posiciones de llamada correctas son manejadas por la biblioteca.

Nombre             | Documentación de Leaflet                                                            | Descripción
--               | --                                                                      | --
l-map            | [L.map](https://leafletjs.com/reference.html#map)                       | Elemento padre para un mapa. Los elementos hijos se `addTo` a este elemento.
l-tile-layer     | [L.tileLayer](https://leafletjs.com/reference.html#tilelayer)           | TileLayer, se puede adjuntar a un elemento `l-map` o `l-base-layers`.
l-marker         | [L.marker](https://leafletjs.com/reference.html#marker)                 | Marcador, se puede adjuntar a un `l-map` o `l-layer-group`.
l-icon           | [L.icon](https://leafletjs.com/reference.html#icon)                     | Icono adjuntable a `l-marker`.
l-popup          | [L.popup](https://leafletjs.com/reference.html#popup)                   | Ventana emergente (Popup).
l-tooltip        | [L.tooltip](https://leafletjs.com/reference.html#tooltip)               | Sugerencia de herramienta (Tooltip).
l-image-overlay  | [L.imageOverlay](https://leafletjs.com/reference.html#imageoverlay)     | Superposición de imagen.
l-video-overlay  | [L.videoOverlay](https://leafletjs.com/reference.html#videooverlay)     | Superposición de video.
l-control-layers | [L.control.layers](https://leafletjs.com/reference.html#control-layers) | Agrega `l-base-layers` y `l-overlay-layers` a la interfaz de control.
l-base-layers    | [L.control.layers](https://leafletjs.com/reference.html#control-layers) | Hijo de `l-control-layers`. Contiene elementos `l-tile-layer`.
l-overlay-layers | [L.control.layers](https://leafletjs.com/reference.html#control-layers) | Hijo de `l-control-layers`. Contiene elementos de capa o grupos de capas.
l-layer-group    | [L.layerGroup](https://leafletjs.com/reference.html#layergroup)         | Elemento padre para agrupar capas dentro de la interfaz de control. Facilita agregar/eliminar grupos de la interfaz a un mapa.
l-circle         | [L.circle](https://leafletjs.com/reference.html#circle)                 | Capa vectorial.
l-rectangle      | [L.rectangle](https://leafletjs.com/reference.html#rectangle)           | Capa vectorial.
l-polygon        | [L.polygon](https://leafletjs.com/reference.html#polygon)               | Capa vectorial.
l-polyline       | [L.polyline](https://leafletjs.com/reference.html#polyline)             | Capa vectorial.

Cada elemento personalizado se puede configurar usando atributos HTML con la misma convención de nombres que la documentación de Leaflet.

> [!NOTE]
> Los atributos se especifican cambiando **camelCase** a **kebab-case**. Por ejemplo, `maxZoom` se convierte en `max-zoom`.

Por ejemplo, un marcador con un icono personalizado en Leaflet JS tiene atributos como `{ shadowSize: [50, 64] }` en JS, lo cual se traduce a `shadow-size="[50,64]"` en HTML.

```html
<l-map center="[51.5, -0.09]" zoom="12">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
  <l-marker lat-lng="[51.5, -0.09]"><l-icon
      icon-url="icons/leaf-green.png"
      shadow-url="icons/leaf-shadow.png"
      icon-size="[38, 95]"
      shadow-size="[50, 64]" 
      icon-anchor="[22, 94]" 
      shadow-anchor="[4, 62]" 
      popup-anchor="[-3, -76]" 
    ></l-icon>
  </l-marker>
</l-map>
```

## Eventos

Por defecto, el evento "ready" es activado por el elemento del mapa.
Se puede acceder a él a través de la propiedad detail de un CustomEvent.

```html
<l-map id="map" ...>
  ...
</l-map>

<script>
  const el = document.getElementById("map")
  el.addEventListener("ready", (ev) => {
    const map = ev.detail
    console.log({ map })
  })
</script>
```

Se pueden escuchar eventos arbitrarios del mapa especificando una lista de eventos separada por espacios en el atributo on, por ejemplo `on="resize zoomend"`.

Esto agrega un mecanismo de reenvío al CustomElement.
Para agregar oyentes de JS usa `addEventListener("resize", ...)`
e inspecciona la propiedad detail de `CustomEvent` para acceder al Evento de Leaflet.


```html
<l-map id="map" ... on="resize">
  ...
</l-map>

<script>
  // Nota: se necesitan tanto addEventListener como on="eventName"
  const el = document.getElementById("map")
  el.addEventListener("resize", (ev) => {
    const leafletResizeEvent = ev.detail
    console.log(leafletResizeEvent)
  })
</script>
```

### CustomEvents

Leaflet HTML conecta una aplicación Leaflet JS enviando y escuchando CustomEvents.
Estos eventos se pueden observar para agregar funcionalidad adicional a una aplicación.

| Clave                      | Descripción                                                                                 |
| --                       | --                                                                                          |
| l:layer:connected        | Se activa cuando una capa se conecta al DOM                                              |
| l:layer:removed          | Se activa cuando una capa se elimina del DOM pero antes de que se ejecute disconnectedCallback    |
| l:popup:connected        | Se activa cuando un elemento de popup se conecta al DOM. Se usa para vincular el popup al marcador padre |
| l:icon:connected         | Se activa cuando un elemento de icono se conecta al DOM. Se usa para vincular el icono al marcador padre   |
| l:tooltip:connected      | Se activa cuando un elemento de tooltip se conecta al DOM                                    |
| l:latlngbounds:connected | Se activa cuando un elemento lat-lng-bounds se conecta al DOM                             |
| l:latlngbounds:changed   | Se activa cuando cambia un atributo de un elemento lat-lng-bounds                                   |

> [!NOTE]
> Actualmente, solo se han expuesto las claves de eventos necesarias para conectar la funcionalidad principal.
> Las versiones futuras pueden agregar eventos adicionales según las necesidades de los usuarios. 

## Ejemplo realista

El HTML en `example/index.html` es una demostración simple de la API.

![image](https://github.com/andrewgryan/leaflet-html/assets/22789046/0186bce2-ddcc-443a-b7a2-ccd86dcffcfc)

```html
<!-- Nota: Leaflet JS/CSS debe incluirse en <head> y l-map debe estar estilizado con un tamaño apropiado. -->
<l-map center="[39.61, -105.02]" zoom="10">
  <l-control-layers>
    <l-base-layers>
      <l-tile-layer
        name="OpenStreetMap"
        url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        max-zoom="12"
      ></l-tile-layer>
      <l-tile-layer
        name="Toner"
        url-template="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
        attribution=""
        max-zoom="12"
      ></l-tile-layer>
    </l-base-layers>
    <l-overlay-layers>
      <l-layer-group name="Ciudades">
        <l-marker lat-lng="[39.61, -105.02]">
          <l-popup content="This is Littleton, CO."></l-popup>
        </l-marker>
        <l-marker lat-lng="[39.74, -104.99]">
          <l-popup content="This is Denver, CO."></l-popup>
        </l-marker>
        <l-marker lat-lng="[39.73, -104.8]">
          <l-popup content="This is Aurora, CO."></l-popup>
        </l-marker>
        <l-marker lat-lng="[39.77, -105.23]">
          <l-popup content="This is Golden, CO."></l-popup>
        </l-marker>
      </l-layer-group>
    </l-overlay-layers>
  </l-control-layers>
</l-map>
```

## Compilación

Para compilar el código fuente, ejecuta:

```sh
yarn build
```

## Contribución

Leaflet HTML, aunque es una idea simple,
requiere las contribuciones de personas talentosas y generosas.
Por favor, consulta nuestra guía de contribución para saber cómo ayudar a mejorar esta biblioteca.

[CONTRIBUTING.md](CONTRIBUTING.md)
