// @vitest-environment happy-dom
import "./index.js";
import { expect, it } from "vitest";

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

// Add minimum attributes to each Custom Element
const fakeElement = (key) => {
  const el = document.createElement(key);
  switch (key) {
    case "l-image-overlay":
      el.setAttribute("url", "fake/url");
      el.setAttribute("bounds", "[[0,0],[1,1]]");
      break;
    case "l-marker":
      el.setAttribute("lat-lng", "[0, 0]");
      break;
    case "l-tile-layer":
      el.setAttribute("url-template", "fake/{z}/{x}/{y}.png");
      break;
    case "l-geojson":
      el.setAttribute("geojson", '{"type": "Feature", "properties": {}}');
      break;
  }
  return el;
};

// Check each layer supports custom pane
it.each([["l-image-overlay"], ["l-marker"], ["l-tile-layer"], ["l-geojson"]])(
  "should capture %s in pane",
  (key) => {
    const root = createMapElement(0, [0, 0]);
    const pane = document.createElement("l-pane");
    pane.setAttribute("name", "test-pane");
    root.appendChild(pane);
    const layerEl = fakeElement(key);
    pane.appendChild(layerEl);
    document.body.appendChild(root);

    // Assert pane on map is the pane on the layer
    const actual = root.map.getPane("test-pane");
    const expected = layerEl.layer.getPane();
    expect(actual).toEqual(expected);
  }
);
