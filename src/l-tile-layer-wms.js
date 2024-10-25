// @ts-check
import LTileLayer from "./l-tile-layer.js";

class LTileLayerWMS extends LTileLayer {
  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    // do stuff
  }
}

export default LTileLayerWMS;
