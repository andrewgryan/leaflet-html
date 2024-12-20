// @vitest-environment happy-dom
import "./index.js";
import { layerRemoved, layerConnected } from "./events"
import { vi, it, expect } from "vitest";
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
    el.addEventListener(layerConnected, (ev) => {
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
    el.addEventListener(layerRemoved, (ev) => {
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

it("should handle layerConnected event from l-control-layers correctly", async () => {
  // Arrange: create a <l-map><l-control-layers>... arrangement
  const el = /** @type {LMap} */ (document.createElement("l-map"));
  el.setAttribute("zoom", "0");
  el.setAttribute("center", JSON.stringify([0, 0]));

  const controlLayers = document.createElement("l-control-layers");
  el.appendChild(controlLayers);

  // Arrange: add a trackable mock layer to the layerConnected event 
  const mockLayer = {
    addTo: vi.fn(), // Mocks layer.addTo method
  };
  const event = new CustomEvent(layerConnected, {
    bubbles: true,
    detail: { layer: mockLayer },
  });

  // Act: connect to DOM
  document.body.appendChild(el);

  // Act: Dispatch the layerConnected event on the control layers
  const promise = new Promise((resolve) => {
    controlLayers.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  controlLayers.dispatchEvent(event);
  
  // Assert: event detail is correctly passed
  const actual = await promise;
  expect(actual).toEqual({ layer: mockLayer });

  // Assert: addTo method was called on the map
  const map = el.map; // Map instance from <l-map>
  expect(mockLayer.addTo).toHaveBeenCalledWith(map);
});
