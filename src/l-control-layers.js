// @ts-check
/** @typedef {import("leaflet").Layer} Layer */
import { control } from "leaflet";
import { layerConnected } from "./events.js";

class LControlLayers extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** @type {{ [key: string]: Layer }} */
    const base = {};
    /** @type {{ [key: string]: Layer }} */
    const overlay = {};
    const controlLayers = control.layers(base, overlay);

    this.addEventListener(layerConnected, (ev) => {
      const { type, name, layer } = ev.detail;
      if (type === "overlay") {
        controlLayers.addOverlay(layer, name);
      } else if (type === "base") {
        controlLayers.addBaseLayer(layer, name);
      }
      ev.preventDefault();
    });

    const event = new CustomEvent(layerConnected, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: controlLayers,
      },
    });
    this.dispatchEvent(event);
  }
}

export default LControlLayers;
