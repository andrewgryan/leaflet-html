// @vitest-environment happy-dom
import "./index.js"
import { expect, it } from "vitest";

const createMapElement = (zoom, center) => {
  const root = document.createElement("l-map")
  root.setAttribute("zoom", zoom.toString())
  root.setAttribute("center", JSON.stringify(center))
  return root
}

it("should support pane", () => {
  const layerName = "layer-name"
  const root = createMapElement(0, [0, 0])
  const pane = document.createElement("l-pane")
  pane.setAttribute("name", layerName)
  root.appendChild(pane)
  document.body.appendChild(root)
  
  const actual = root.map.getPane(layerName)
  expect(actual).toBeDefined()
})
