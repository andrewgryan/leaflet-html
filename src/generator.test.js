// @vitest-environment happy-dom
import { polyline } from "leaflet"
import { beforeAll, it, expect } from "vitest"
import generator from "./generator.js"

beforeAll(() => {
  customElements.define("l-polyline", generator(polyline, "polyline"))
})

it("should render <l-polyline lat-lng='[]'>", () => {
  const el = document.createElement("l-polyline")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  expect(el.layer).toEqual(polyline([]))
})

it("should update <l-polyline> lat-lng attribute", () => {
  const line = [[0, 0], [1, 1]]
  const el = document.createElement("l-polyline")
  el.setAttribute("lat-lngs", "[]")
  document.body.appendChild(el);
  el.setAttribute("lat-lngs", JSON.stringify(line))
  el.setAttribute("weight", "1")
  el.setAttribute("color", "blue")
  expect(el.layer).toEqual(polyline(line, { weight: 1, color: "blue" }))
})
