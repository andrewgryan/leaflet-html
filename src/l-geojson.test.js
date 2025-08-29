// @vitest-environment happy-dom
import { geoJson } from "leaflet";
import { it, expect } from "vitest";
import "./index.js";
import { layerConnected } from "./events.js";

it("should render a geoJson object", async () => {
  const el = document.createElement("l-geojson");
  el.setAttribute("geojson", "[[50, 0], [50, -1], [49, -1], [49,0]]");
  el.setAttribute("id", "test-layer");
  el.setAttribute("style", '{"color": "#0000ff"}');
  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);
  const actual = await promise;
  const expected = {
    layer: geoJson(
    [
      [50, 0],
      [50, -1],
      [49, -1],
      [49, 0],
    ],
    { style: { color: "#0000ff" } },
  )
  };
  expect(actual).toEqual(expected);
});
