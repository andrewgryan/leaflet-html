// @vitest-environment happy-dom
import "./index.js";
import { layerRemove, mapAddTo } from "./events"
import { it, expect } from "vitest";
import LTileLayer from "./l-tile-layer";
import LMap from "./l-map.js";

it("should emit map:addTo event(s)", async () => {
  // Arrange: create a <l-map><l-tile-layer>... arrangement
  const el = document.createElement("l-map");
  el.setAttribute("zoom", "0");
  el.setAttribute("center", JSON.stringify([0, 0]));

  const tileLayer = /** @type {LTileLayer} */ (document.createElement("l-tile-layer"))
  tileLayer.setAttribute("url-template", "fake-url")
  el.appendChild(tileLayer)
  const promise = new Promise((resolve) => {
    el.addEventListener(mapAddTo, (ev) => {
      resolve(ev.detail);
    })
  })

  // Act: connect to DOM
  document.body.appendChild(el);

  // Assert: event triggered with layer detail
  const actual = await promise;
  const expected = { layer: tileLayer.layer, name: null };
  expect(actual).toEqual(expected);
});

it("should emit ready event", async () => {
  // Arrange: create a <l-map><l-tile-layer>... arrangement
  const el = /** @type {LMap} */ (document.createElement("l-map"));
  el.setAttribute("zoom", "0");
  el.setAttribute("center", JSON.stringify([0, 0]));

  const promise = new Promise((resolve) => {
    el.addEventListener("ready", (ev) => {
      resolve(ev.detail);
    })
  })

  // Act: connect to DOM
  document.body.appendChild(el);

  // Assert: event triggered with layer detail
  const actual = await promise;
  const expected = el.map;
  expect(actual).toEqual(expected);
});

it("should bubble layer remove events", async () => {
  // Arrange: create a <l-map><l-tile-layer>... arrangement
  const el = document.createElement("l-map");
  el.setAttribute("zoom", "0");
  el.setAttribute("center", JSON.stringify([0, 0]));

  const tileLayer = /** @type {LTileLayer} */ (document.createElement("l-tile-layer"))
  tileLayer.setAttribute("url-template", "fake-url")
  el.appendChild(tileLayer)
  const promise = new Promise((resolve) => {
    el.addEventListener(layerRemove, (ev) => {
      resolve(ev.detail);
    })
  })

  // Act: connect to DOM and remove tile-layer
  document.body.appendChild(el);
  el.removeChild(tileLayer);

  // Assert: event triggered with layer detail
  const actual = await promise;
  const expected = { layer: tileLayer.layer };
  expect(actual).toEqual(expected);
})
