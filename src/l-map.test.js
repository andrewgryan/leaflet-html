// @vitest-environment happy-dom
import "./index.js";
import { mapAddTo } from "./events"
import { it, expect } from "vitest";
import LTileLayer from "./l-tile-layer";

it("should emit events", async () => {
  // Arrange: create a <l-map><l-tile-layer>... arrangement
  const el = document.createElement("l-map");
  el.setAttribute("zoom", "0");
  el.setAttribute("center", JSON.stringify([0, 0]));

  const tileLayer = /** @type {LTileLayer} */ (document.createElement("l-tile-layer"))
  tileLayer.setAttribute("url-template", "fake-url")
  el.appendChild(tileLayer)
  const promise = new Promise((resolve) => {
    el.addEventListener(mapAddTo, (ev) => {
      resolve(ev);
    })
  })

  // Act: connect to DOM
  document.body.appendChild(el);

  // Assert: event triggered with layer detail
  const actual = await promise;
  const expected = { layer: tileLayer.layer, name: null };
  expect(actual.detail).toEqual(expected);
});
