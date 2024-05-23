// @vitest-environment happy-dom
import { circle, polyline, polygon, rectangle, tooltip } from "leaflet";
import { beforeAll, it, expect } from "vitest";
import generator from "./generator.js";
import LTooltip from "./l-tooltip.js";

beforeAll(() => {
  // TODO: use a function to wire up elements to match library usage
  customElements.define("l-circle", generator(circle, "circle"));
  customElements.define("l-rectangle", generator(rectangle, "rectangle"));
  customElements.define("l-polyline", generator(polyline, "polyline"));
  customElements.define("l-polygon", generator(polygon, "polygon"));
  customElements.define("l-tooltip", LTooltip);
});

it("should render <l-polyline lat-lng='[]'>", () => {
  const el = document.createElement("l-polyline");
  el.setAttribute("lat-lngs", "[]");
  document.body.appendChild(el);
  expect(el.layer).toEqual(polyline([]));
});

it.each([
  ["interactive", "false", "interactive", false],
  ["color", "red", "color", "red"],
  ["opacity", "0.2", "opacity", 0.2],
  ["weight", "1", "weight", 1],
  ["stroke", "false", "stroke", false],
  ["line-cap", "square", "lineCap", "square"],
  ["line-join", "miter", "lineJoin", "miter"],
  ["dash-array", "4 1", "dashArray", "4 1"],
  ["dash-offset", "3", "dashOffset", "3"],
  ["fill", "false", "fill", false],
  ["fill-color", "red", "fillColor", "red"],
  ["fill-opacity", "0.8", "fillOpacity", 0.8],
])(
  "should update <l-circle> attribute %s to %s",
  (attName, attValue, key, value) => {
    const line = [
      [0, 0],
      [1, 1],
    ];
    const el = document.createElement("l-circle");
    el.setAttribute("lat-lngs", "[]");
    document.body.appendChild(el);
    el.setAttribute("lat-lngs", JSON.stringify(line));
    el.setAttribute(attName, attValue);
    expect(el.layer).toEqual(circle(line, { [key]: value }));
  }
);

it.each([["smooth-factor", "1.1"]])(
  "should ignore <l-circle> attribute %s",
  (attName, attValue) => {
    const line = [
      [0, 0],
      [1, 1],
    ];
    const el = document.createElement("l-circle");
    el.setAttribute("lat-lngs", "[]");
    document.body.appendChild(el);
    el.setAttribute("lat-lngs", JSON.stringify(line));
    el.setAttribute(attName, attValue);
    expect(el.layer).toEqual(circle(line));
  }
);

it.each([
  ["interactive", "false", "interactive", false],
  ["smooth-factor", "1.1", "smoothFactor", 1.1],
  ["no-clip", "true", "noClip", true],
  ["color", "red", "color", "red"],
  ["opacity", "0.2", "opacity", 0.2],
  ["weight", "1", "weight", 1],
  ["stroke", "false", "stroke", false],
  ["line-cap", "square", "lineCap", "square"],
  ["line-join", "miter", "lineJoin", "miter"],
  ["dash-array", "4 1", "dashArray", "4 1"],
  ["dash-offset", "3", "dashOffset", "3"],
  ["fill", "false", "fill", false],
  ["fill-color", "red", "fillColor", "red"],
  ["fill-opacity", "0.8", "fillOpacity", 0.8],
])(
  "should update <l-polyline> attribute %s",
  (attName, attValue, key, value) => {
    const line = [
      [0, 0],
      [1, 1],
    ];
    const el = document.createElement("l-polyline");
    el.setAttribute("lat-lngs", "[]");
    document.body.appendChild(el);
    el.setAttribute("lat-lngs", JSON.stringify(line));
    el.setAttribute(attName, attValue);
    expect(el.layer).toEqual(polyline(line, { [key]: value }));
  }
);

it.each([
  ["interactive", "false", "interactive", false],
  ["color", "red", "color", "red"],
  ["opacity", "0.2", "opacity", 0.2],
  ["weight", "1", "weight", 1],
  ["stroke", "false", "stroke", false],
  ["line-cap", "square", "lineCap", "square"],
  ["line-join", "miter", "lineJoin", "miter"],
  ["dash-array", "4 1", "dashArray", "4 1"],
  ["dash-offset", "3", "dashOffset", "3"],
  ["fill", "false", "fill", false],
  ["fill-color", "red", "fillColor", "red"],
  ["fill-opacity", "0.8", "fillOpacity", 0.8],
])(
  "should update <l-polygon> attribute %s",
  (attName, attValue, key, value) => {
    const line = [
      [0, 0],
      [1, 0],
      [1, 1],
    ];
    const el = document.createElement("l-polygon");
    el.setAttribute("lat-lngs", "[]");
    document.body.appendChild(el);
    el.setAttribute("lat-lngs", JSON.stringify(line));
    el.setAttribute(attName, attValue);
    expect(el.layer).toEqual(polygon(line, { [key]: value }));
  }
);

it.each([["color", "red", "color", "red"]])(
  "should update <l-rectangle> attribute %s to %s",
  (attName, attValue, key, value) => {
    const line = [
      [0, 0],
      [1, 1],
    ];
    const el = document.createElement("l-rectangle");
    el.setAttribute("lat-lng-bounds", JSON.stringify(line));
    document.body.appendChild(el);
    el.setAttribute(attName, attValue);
    expect(el.layer).toEqual(rectangle(line, { [key]: value }));
  }
);

it("should update <l-rectangle> lat-lng-bounds", () => {
  const before = [
    [0, 0],
    [1, 1],
  ];
  const after = [
    [1, 1],
    [2, 2],
  ];
  const el = document.createElement("l-rectangle");
  el.setAttribute("lat-lng-bounds", JSON.stringify(before));
  document.body.appendChild(el);
  el.setAttribute("lat-lng-bounds", JSON.stringify(after));
  expect(el.layer).toEqual(rectangle(after));
});

it("should update <l-circle> lat-lng", () => {
  const before = [0, 0];
  const after = [1, 1];
  const el = document.createElement("l-circle");
  el.setAttribute("lat-lng", JSON.stringify(before));
  document.body.appendChild(el);
  el.setAttribute("lat-lng", JSON.stringify(after));
  expect(el.layer).toEqual(circle(after));
});

it("should update <l-circle> radius", () => {
  const bounds = [0, 0];
  const el = document.createElement("l-circle");
  el.setAttribute("lat-lng", JSON.stringify(bounds));
  el.setAttribute("radius", "1");
  document.body.appendChild(el);
  el.setAttribute("radius", "2");
  expect(el.layer.getRadius()).toEqual(2);
});

it.each([["circle"], ["rectangle"], ["polyline"], ["polygon"]])(
  "should bindTooltip to <l-%s>",
  (shape) => {
    const content = "Hello, World!";
    const elShape = document.createElement(`l-${shape}`);
    if (shape === "rectangle") {
      elShape.setAttribute(
        "lat-lng-bounds",
        JSON.stringify([
          [0, 0],
          [1, 1],
        ])
      );
    } else if (["polyline", "polygon"].indexOf(shape) !== -1) {
      elShape.setAttribute(
        "lat-lngs",
        JSON.stringify([
          [0, 0],
          [1, 1],
        ])
      );
    }
    const elTooltip = document.createElement("l-tooltip");
    elTooltip.setAttribute("content", content);
    document.body.appendChild(elShape);
    elShape.appendChild(elTooltip);
    expect(elShape.layer.getTooltip().getContent()).toEqual(content);
  }
);
