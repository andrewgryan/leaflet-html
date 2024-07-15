// @vitest-environment happy-dom
import { layerGroup } from "leaflet";
import { it, expect } from "vitest";
import { layerConnected } from "./events";
import "./index";

it("should cover l-layer-group", async () => {
  const el = document.createElement("l-layer-group");
  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);
  const actual = await promise;
  const expected = {
    name: null,
    layer: layerGroup(),
  };
  expect(actual).toEqual(expected);
});

it("should register layers", async () => {
  const el = document.createElement("l-layer-group");
  const marker = document.createElement("l-marker");
  marker.setAttribute("lat-lng", "[0,0]");
  el.appendChild(marker);
  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);
  const actual = await promise;
  const expected = {
    name: null,
    layer: layerGroup([marker.layer]),
  };
  expect(actual).toEqual(expected);
});

it("should support removed layers from a group", async () => {
  const root = document.createElement("l-layer-group");
  const marker = document.createElement("l-marker");
  marker.setAttribute("lat-lng", "[0,0]");
  root.appendChild(marker);
  document.body.appendChild(root);

  // System under test
  marker.remove();

  // Wait one animation frame to allow MutationObserver
  // to process el.remove()
  const frame = new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      resolve();
    });
  });
  await frame;

  // Assertions
  const group = root.layer;
  const actual = group.hasLayer(group.getLayerId(marker.layer));
  const expected = false;
  expect(actual).toEqual(expected);
});
