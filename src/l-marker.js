// @vitest-environment happy-dom
import * as L from "leaflet";
import { LeafletHTMLError, missingAttributeIssue } from "./error.js";
import { mapAddTo, popupAdd } from "./events.js";
import LLayer from "./l-layer.js";
import { distribute, float, json, option, parse, partial } from "./parse.js";

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
    // Experimental parse/validate API
    const latLng = parse(option("lat-lng", json()), this);
    const options = parse(
      partial({
        opacity: option("opacity", float()),
      }),
      this
    );
    this.layer = L.marker(latLng, options);

    if (this.hasAttribute("icon")) {
      const icon = L.icon(JSON.parse(this.getAttribute("icon")));
      this.layer.setIcon(icon);
    }

    this.setAttribute("leaflet-id", L.stamp(this.layer));

    this.addEventListener(popupAdd, (ev) => {
      const { content, openPopup } = ev.detail;
      const popup = this.layer.bindPopup(content);
      if (openPopup) {
        popup.openPopup();
      }
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
    el.setAttribute("lat-lng", "[0, 0]");
    document.body.appendChild(el);
    let actual = el.layer.getIcon();
    let expected = new L.Icon.Default();
    expect(actual).toEqual(expected);
  });

  it("adds an icon", () => {
    const el = document.createElement("l-marker");
    el.setAttribute("lat-lng", "[0, 0]");
    // Set attribute before appendChild
    el.setAttribute("icon", JSON.stringify({ iconUrl: "foo.png" }));
    document.body.appendChild(el);
    let actual = el.layer.getIcon();
    let expected = L.icon({ iconUrl: "foo.png" });
    expect(actual).toEqual(expected);
  });

  it("changes an icon", () => {
    const el = document.createElement("l-marker");
    el.setAttribute("lat-lng", "[0, 0]");
    // Set attribute after appendChild
    document.body.appendChild(el);
    el.setAttribute("icon", JSON.stringify({ iconUrl: "bar.png" }));
    let actual = el.layer.getIcon();
    let expected = L.icon({ iconUrl: "bar.png" });
    expect(actual).toEqual(expected);
  });
}

export default LMarker;
