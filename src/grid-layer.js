// Helpers to support GridLayer inherited Leaflet functions
import { point } from "leaflet";

/**
 * @param {Element} el
 * @returns {import("leaflet").GridLayerOptions}
 */
export const gridLayerOptions = (el) => {
  const options = {};
  const text = el.getAttribute("tile-size");
  if (text) {
    const number = parseInt(text);
    options["tileSize"] = isNaN(number) ? point(JSON.parse(text)) : number;
  }
  return options;
};
