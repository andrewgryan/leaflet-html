// Helpers to support GridLayer inherited Leaflet functions
import { point } from "leaflet";


/**
 * @param {Element} el
 * @returns {import("leaflet").GridLayerOptions}
 */
export const gridLayerOptions = (el) => {
  const options = {}
  if (el.hasAttribute("tile-size")) {
    let tileSize = null;
    const text = el.getAttribute("tile-size");
    const number = parseInt(text);
    if (isNaN(number)) {
      tileSize = point(JSON.parse(text));
    } else {
      tileSize = number;
    }
    options["tileSize"] = tileSize;
  }
  return options;
}
