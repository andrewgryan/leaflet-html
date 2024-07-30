// @ts-check

// Make L.markerClusterGroup optional
import("leaflet.markercluster").catch((error) => {
  console.warn("Failed to import leaflet.markercluster", error)
});

import { layerConnected } from "./events.js";
import LLayer from "./l-layer.js";

class LMarkerClusterGroup extends LLayer {
  static observedAttributes = [
    "show-coverage-on-hover",
    "icon-options"
  ];

  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const iconOptions = this.getAttribute("icon-options");
    this.layer =  L.markerClusterGroup({
      showCoverageOnHover: this.hasAttribute("show-coverage-on-hover"),
      iconCreateFunction: this._createIconCreateFunction(iconOptions)
    });

    const event = new CustomEvent(layerConnected, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: this.layer,
        name
      }
    });
    this.dispatchEvent(event);

    this.addEventListener(layerConnected, (ev) => {
      ev.stopPropagation();
      this.layer.addLayer(ev.detail.layer);
    });
  }

  _createIconCreateFunction(iconOptions) {
    if (iconOptions) {
      let { size, content, className } = JSON.parse(iconOptions);

      return (cluster) => {
        const resolvedSize = this._callClusterFunction(cluster, size);
        const resolvedContent = this._callClusterFunction(cluster, content);

        return L.divIcon({
          html: resolvedContent,
          className: className,
          iconSize: new L.Point(resolvedSize, resolvedSize)
        });
      };
    }
  }

  _callClusterFunction(cluster, body) {
    return Function("cluster", `"use strict";return (${body})`)(cluster);
  }
}

export default LMarkerClusterGroup;
