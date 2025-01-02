// @vitest-environment happy-dom
import { tileLayer } from "leaflet";
import { it, expect } from "vitest";
import { layerConnected } from "./events";
import "./index";

it("should cover l-tile-layer", async () => {
  const urlTemplate = "template";
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);

  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);

  const actual = await promise;
  const expected = {
    name: null,
    layer: tileLayer(urlTemplate),
  };
  expect(actual).toEqual(expected);
});

it.each([
  ["/tile/{z}/{x}/{y}.png?key={key}", "key", "value"],
  ["/tile/{z}/{x}/{y}.png?key={camelCase}", "camelCase", "value"],
  ["/tile/{z}/{x}/{y}.png?key={kebab-case}", "kebab-case", "value"]
])("should perform arbitrary templating %s %s", (urlTemplate, key, value) => {
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute(key, value)
  document.body.appendChild(el);

  const actual = el.layer
  const expected = tileLayer(urlTemplate, { [key]: value })
  expect(actual).toEqual(expected)
})

it("should support error-tile-url", () => {
  const urlTemplate = "/{z}/{x}/{y}.png"
  const errorTileUrl = "/error.png"
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute("error-tile-url", errorTileUrl)
  document.body.appendChild(el);

  const actual = el.layer
  const expected = tileLayer(urlTemplate, { errorTileUrl })
  expect(actual).toEqual(expected)
})

it.each([
  ["512", 512],
  ["[256, 512]", {x: 256, y: 512}],
  ['{"x": 256, "y": 512}', {x: 256, y: 512}]
])("should support tile-size attribute", (text, value) => {
  const urlTemplate = "/"
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute("tile-size", text)
  document.body.appendChild(el);
  const actual = el.layer;
  const expected = tileLayer(urlTemplate, { tileSize: value })
  expect(actual).toEqual(expected);
})

it("should support tile-size attribute default value", () => {
  const urlTemplate = "/"
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);
  document.body.appendChild(el);
  const actual = el.layer;
  const expected = tileLayer(urlTemplate, {})
  expect(actual).toEqual(expected);
})
