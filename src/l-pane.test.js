// @vitest-environment happy-dom
import "./index.js";
import { expect, it } from "vitest";
import { imageOverlay } from "leaflet";

const createMapElement = (zoom, center) => {
  const root = document.createElement("l-map");
  root.setAttribute("zoom", zoom.toString());
  root.setAttribute("center", JSON.stringify(center));
  return root;
};

it("should support pane", () => {
  const layerName = "layer-name";
  const root = createMapElement(0, [0, 0]);
  const pane = document.createElement("l-pane");
  pane.setAttribute("name", layerName);
  root.appendChild(pane);
  document.body.appendChild(root);

  const actual = root.map.getPane(layerName);
  expect(actual).toBeDefined();
});

it("should capture layers in pane", () => {
  const root = createMapElement(0, [0, 0]);
  const pane = document.createElement("l-pane");
  pane.setAttribute("name", "test-pane");
  root.appendChild(pane);
  const layerEl = document.createElement("l-image-overlay");
  const url = "fake/url";
  const bounds = [
    [0, 0],
    [1, 1],
  ];
  layerEl.setAttribute("url", url);
  layerEl.setAttribute("bounds", JSON.stringify(bounds));
  pane.appendChild(layerEl);
  document.body.appendChild(root);

  const actual = root.map.getPane("test-pane");
  const expected = layerEl.layer.getPane();
  expect(actual).toEqual(expected);
});
