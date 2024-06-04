// @ts-check
import * as L from "leaflet";
import {
  jsonParseIssue,
  LeafletHTMLError,
  missingAttributeIssue,
  parseIntIssue,
} from "./error.js";
import { layerRemove, mapAddTo } from "./events.js";
import LLayer from "./l-layer.js";

class LMap extends HTMLElement {
  static observedAttributes = ["zoom", "center"];

  constructor() {
    super();

    this.map = null;
    this.addEventListener("map:bounds", (ev) => {
      const { bounds, method } = ev.detail;
      if (this.map !== null) {
        this.map[method](bounds);
      }
    });

    // Observe removed l-tile-layers
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof LMap) {
          const el = mutation.target;
          mutation.removedNodes.forEach((node) => {
            if (node instanceof LLayer) {
              if (el.map !== null && node.layer !== null) {
                el.map.removeLayer(node.layer);
              }
            }
          });
        }
      });
    });
    observer.observe(this, { childList: true });
  }

  connectedCallback() {
    this.map = L.map(this);

    // Connect Leaflet events
    if (this.hasAttribute("on")) {
      const on = this.getAttribute("on");
      if (on !== null) {
        on.split(/\s+/).forEach((eventName) => {
          if (this.map !== null) {
            this.map.on(eventName, (e) => {
              this.dispatchEvent(
                new CustomEvent(eventName, { bubbles: true, detail: e })
              );
            });
          }
        });
      }
    }

    if (this.hasAttribute("fit-world")) {
      this.map.fitWorld();
    } else {
      const issues = [];
      let center = this.getAttribute("center");
      if (center === null) {
        issues.push(missingAttributeIssue("l-map", "center"));
      } else {
        try {
          center = JSON.parse(center);
        } catch (error) {
          issues.push(jsonParseIssue("l-map", "center", error));
        }
      }
      let zoom;
      let zoomAttribute = this.getAttribute("zoom");
      if (zoomAttribute === null) {
        issues.push(missingAttributeIssue("l-map", "zoom"));
      } else {
        zoom = parseInt(zoomAttribute);
        if (isNaN(zoom)) {
          issues.push(parseIntIssue("l-map", "zoom", zoomAttribute));
        }
      }
      if (issues.length > 0) {
        throw new LeafletHTMLError(issues);
      }
      if (center !== null && zoomAttribute !== null) {
        this.map.setView(center, zoom);
      }
    }

    if (this.hasAttribute("locate")) {
      this.map.locate(JSON.parse(this.getAttribute("locate")));
    }

    this.addEventListener(mapAddTo, (ev) => {
      const layer = ev.detail.layer;
      layer.addTo(this.map);
    });

    this.addEventListener(layerRemove, (ev) => {
      if (this.map !== null) {
        this.map.removeLayer(ev.detail.layer);
      }
    });
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.map !== null) {
      if (name === "zoom") {
        this.map.setZoom(parseInt(newValue));
      } else if (name === "center") {
        this.map.setView(JSON.parse(newValue));
      }
    }
  }
}

export default LMap;
