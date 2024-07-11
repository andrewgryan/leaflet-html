// @ts-check
import * as L from "leaflet";
import { layerRemoved, layerConnected } from "./events.js";
import LLayer from "./l-layer.js";
import { distribute, int, json, option, parse } from "./parse.js";

class LMap extends HTMLElement {
  static observedAttributes = ["zoom", "center", "zoom-control"];

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
                // Notify listeners of layer removal
                el.dispatchEvent(new CustomEvent(layerRemoved, {
                  bubbles: true,
                  detail: {
                    layer: node.layer
                  }
                }))
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
    this.map = L.map(this, { zoomControl: this.hasAttribute("zoom-control") });

    // Allow listeners to know when the map is "ready"
    this.map.whenReady(() => {
      this.dispatchEvent(
        new CustomEvent("ready", {
          bubbles: true,
          cancelable: true,
          detail: this.map
        })
      )
    })

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
      const schema = distribute({
        zoom: option("zoom", int()),
        center: option("center", json())
      })
      const { zoom, center } = parse(schema, this)
      this.map.setView(center, zoom);
    }

    if (this.hasAttribute("locate")) {
      const schema = option("locate", json())
      this.map.locate(parse(schema, this));
    }

    this.addEventListener(layerConnected, (ev) => {
      const layer = ev.detail.layer;
      layer.addTo(this.map);
    });

    this.addEventListener(layerRemoved, (ev) => {
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
