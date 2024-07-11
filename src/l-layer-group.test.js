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
