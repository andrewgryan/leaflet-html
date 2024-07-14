// @ts-check
import LBaseLayers from "./l-base-layers.js";
import LControlLayers from "./l-control-layers.js";
import LLayerGroup from "./l-layer-group.js";
import LMap from "./l-map.js";
import LMarker from "./l-marker.js";
import LOverlayLayers from "./l-overlay-layers.js";
import LPopup from "./l-popup.js";
import LTileLayer from "./l-tile-layer.js";
import LLatLngBounds from "./l-lat-lng-bounds.js";
import LImageOverlay from "./l-image-overlay.js";
import LVideoOverlay from "./l-video-overlay.js";
import LGeoJSON from "./l-geojson.js";
import LIcon from "./l-icon.js";
import LDivIcon from "./l-div-icon.js";
import LTooltip from "./l-tooltip.js";
import LPane from "./l-pane.js";
import generator from "./generator.js";
import { circle, polyline, polygon, rectangle } from "leaflet";

const init = (() => {
  // Custom elements (order of definition is important)
  customElements.define("l-map", LMap);
  customElements.define("l-pane", LPane);
  customElements.define("l-control-layers", LControlLayers);
  customElements.define("l-base-layers", LBaseLayers);
  customElements.define("l-overlay-layers", LOverlayLayers);
  customElements.define("l-layer-group", LLayerGroup);
  customElements.define("l-tile-layer", LTileLayer);
  customElements.define("l-marker", LMarker);
  customElements.define("l-popup", LPopup);
  customElements.define("l-lat-lng-bounds", LLatLngBounds);
  customElements.define("l-image-overlay", LImageOverlay);
  customElements.define("l-video-overlay", LVideoOverlay);
  customElements.define("l-geojson", LGeoJSON);
  customElements.define("l-icon", LIcon);
  customElements.define("l-circle", generator(circle, "circle"));
  customElements.define("l-polyline", generator(polyline, "polyline"));
  customElements.define("l-polygon", generator(polygon, "polygon"));
  customElements.define("l-rectangle", generator(rectangle, "rectangle"));
  customElements.define("l-tooltip", LTooltip);
  customElements.define("l-div-icon", LDivIcon);
})();

export default init;
