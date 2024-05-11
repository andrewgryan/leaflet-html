// @vitest-environment happy-dom
import * as L from "leaflet";
import { mapAddTo, popupAdd } from "./events.js";
import LLayer from "./l-layer.js";

class LMarker extends LLayer {
  static observedAttributes = ["lat-lng", "opacity", "icon"];

  constructor() {
    super();
    this.layer = null;
    this.addEventListener("icon:add", (ev) => {
      ev.stopPropagation();
      this.layer.setIcon(ev.detail.icon);
    });
  }

  connectedCallback() {
    const latLng = JSON.parse(this.getAttribute("lat-lng"));
    const opacity = parseFloat(this.getAttribute("opacity") || "1.0");
    this.layer = L.marker(latLng, { opacity });
    if (this.hasAttribute("icon")) {
      const icon = L.icon(JSON.parse(this.getAttribute("icon")));
      this.layer.setIcon(icon);
    }

    this.setAttribute("leaflet-id", L.stamp(this.layer));

    this.addEventListener(popupAdd, (ev) => {
      const { content } = ev.detail;
      this.layer.bindPopup(content);
    });

    const event = new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: this.layer,
      },
    });
    this.dispatchEvent(event);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.layer !== null) {
      if (name === "lat-lng") {
        this.layer.setLatLng(JSON.parse(newValue));
      }
      if (name === "opacity") {
        this.layer.setOpacity(parseFloat(newValue));
      }
      if (name === "icon") {
        this.layer.setIcon(L.icon(JSON.parse(newValue)));
      }
    }
  }
}

if (import.meta.vitest) {
  const { it, expect, beforeAll } = import.meta.vitest;

  beforeAll(() => {
    customElements.define("l-marker", LMarker);
  });

  it("default icon", () => {
    const el = document.createElement("l-marker");
    document.body.appendChild(el);
    let actual = el.layer.getIcon();
    let expected = new L.Icon.Default();
    expect(actual).toEqual(expected);
  });

  it("adds an icon", () => {
    const el = document.createElement("l-marker");
    // Set attribute before appendChild
    el.setAttribute("icon", JSON.stringify({ iconUrl: "foo.png" }));
    document.body.appendChild(el);
    let actual = el.layer.getIcon();
    let expected = L.icon({ iconUrl: "foo.png" });
    expect(actual).toEqual(expected);
  });

  it("changes an icon", () => {
    const el = document.createElement("l-marker");
    // Set attribute after appendChild
    document.body.appendChild(el);
    el.setAttribute("icon", JSON.stringify({ iconUrl: "bar.png" }));
    let actual = el.layer.getIcon();
    let expected = L.icon({ iconUrl: "bar.png" });
    expect(actual).toEqual(expected);
  });
}

export default LMarker;
