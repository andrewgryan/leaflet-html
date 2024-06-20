// @vitest-environment happy-dom
import { tileLayer } from "leaflet";
import { it, expect } from "vitest";
import { mapAddTo } from "./events";
import "./index";

it("should cover l-tile-layer", async () => {
  const urlTemplate = "template";
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);

  let promise = new Promise((resolve) => {
    el.addEventListener(mapAddTo, (ev) => {
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

it("should perform arbitrary templating", () => {
  const urlTemplate = "/tile/{z}/{x}/{y}.png?key={key}";
  const el = document.createElement("l-tile-layer");
  el.setAttribute("url-template", urlTemplate);
  el.setAttribute("key", "value")
  document.body.appendChild(el);

  const actual = el.layer
  const expected = tileLayer(urlTemplate, { key: "value" })
  expect(actual).toEqual(expected)
})
