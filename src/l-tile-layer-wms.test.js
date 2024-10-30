// @vitest-environment happy-dom
import { tileLayer } from "leaflet";
import { it, expect } from "vitest";
import { layerConnected } from "./events";
import "./index";

it("should create an l-tile-layer-wms with the correct options", async () => {
  const urlTemplate = "http://ows.mundialis.de/services/service?";
  const el = document.createElement("l-tile-layer-wms");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute("layers", "example-wms-layer");

  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);

  const actual = await promise;
  const expected = {
    name: null,
    layer: tileLayer.wms(urlTemplate, { layers: "example-wms-layer" }),
  };
  expect(actual).toEqual(expected);
});

it.each([
  ["http://example.com/wms", "styles", "default"],
  ["http://example.com/wms", "format", "image/png"],
  ["http://example.com/wms", "transparent", "true"]
])("should handle WMS options %s %s", (urlTemplate, key, value) => {
  const el = document.createElement("l-tile-layer-wms");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute("layers", "defaultLayer"); 
  el.setAttribute(key, value);
  document.body.appendChild(el);

  const actual = el.layer;
  const expected = tileLayer.wms(urlTemplate, { layers: "defaultLayer", [key]: value });
  expect(actual).toEqual(expected);
});


it("should support attribution", () => {
  const urlTemplate = "http://example.com/wms";
  const attribution = "&copy; OpenStreetMap contributors";
  const layers="example-wms-layer"
  const el = document.createElement("l-tile-layer-wms");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute("attribution", attribution);
  el.setAttribute("layers", layers);
  document.body.appendChild(el);

  const actual = el.layer;
  const expected = tileLayer.wms(urlTemplate, { attribution, layers });
  expect(actual).toEqual(expected);
});
