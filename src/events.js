import { Evented } from "leaflet";

// NOTE: These event keys are part of the public API of leaflet-html
export const layerConnected = "l:layer:connected";
export const popupConnected = "l:popup:connected";
export const iconConnected = "l:icon:connected";
export const layerRemoved = "l:layer:removed";
export const latLngBoundsConnected = "l:latlngbounds:connected";
export const latLngBoundsChanged = "l:latlngbounds:changed";
export const tooltipConnected = "l:tooltip:connected";
export const paneConnected = "l:pane:connected";

/**
 * @param {HTMLElement} el
 * @param {Evented} evented
 */
export const connectLeafletEvents = (el, evented) => {
  if (el.hasAttribute("on")) {
    const on = el.getAttribute("on");
    if (on !== null) {
      on.split(/\s+/).forEach((eventName) => {
        if (evented !== null) {
          evented.on(eventName, (e) => {
            el.dispatchEvent(
              new CustomEvent(eventName, { bubbles: true, detail: e })
            );
          });
        }
      });
    }
  }
}
