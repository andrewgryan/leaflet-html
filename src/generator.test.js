// @vitest-environment happy-dom
import { circle, polyline, polygon } from "leaflet"
import { beforeAll, it, expect } from "vitest"
import generator from "./generator.js"

beforeAll(() => {
  // TODO: use a function to wire up elements to match library usage
  customElements.define("l-circle", generator(circle, "circle"))
  customElements.define("l-polyline", generator(polyline, "polyline"))
  customElements.define("l-polygon", generator(polygon, "polygon"))
})

it("should render <l-polyline lat-lng='[]'>", () => {
  const el = document.createElement("l-polyline")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  expect(el.layer).toEqual(polyline([]))
})

it.each([
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
  ["fill-opacity", "0.8", "fillOpacity", 0.8]
])("should update <l-circle> attribute %s to %s", (attName, attValue, key, value) => {
  const line = [[0, 0], [1, 1]]
  const el = document.createElement("l-circle")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  el.setAttribute("lat-lngs", JSON.stringify(line))
  el.setAttribute(attName, attValue)
  expect(el.layer).toEqual(circle(line, { [key]: value }))
})

it.each([
  ["smooth-factor", "1.1"],
])("should ignore <l-circle> attribute %s", (attName, attValue) => {
  const line = [[0, 0], [1, 1]]
  const el = document.createElement("l-circle")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  el.setAttribute("lat-lngs", JSON.stringify(line))
  el.setAttribute(attName, attValue)
  expect(el.layer).toEqual(circle(line))
})

it.each([
  ["smooth-factor", "1.1", "smoothFactor", 1.1],
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
  ["fill-opacity", "0.8", "fillOpacity", 0.8]
])("should update <l-polyline> attribute %s", (attName, attValue, key, value) => {
  const line = [[0, 0], [1, 1]]
  const el = document.createElement("l-polyline")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  el.setAttribute("lat-lngs", JSON.stringify(line))
  el.setAttribute(attName, attValue)
  expect(el.layer).toEqual(polyline(line, { [key]: value }))
})

it.each([
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
  ["fill-opacity", "0.8", "fillOpacity", 0.8]
])("should update <l-polygon> attribute %s", (attName, attValue, key, value) => {
  const line = [[0, 0], [1, 0], [1, 1]]
  const el = document.createElement("l-polygon")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  el.setAttribute("lat-lngs", JSON.stringify(line))
  el.setAttribute(attName, attValue)
  expect(el.layer).toEqual(polygon(line, { [key]: value }))
})
