// @vitest-environment happy-dom
import { control } from "leaflet";
import { it, expect } from "vitest";
import { layerConnected } from "./events.js";
import "./index.js"


it("should raise a custom event when l-control-layers added to DOM", async () => {
  // Create a <l-control-layers />
  const el = document.createElement("l-control-layers")
  const promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev)
    })
  })

  // Add to document object model
  document.body.appendChild(el)

  // Assert custom event raised
  const event = await promise
  expect(event.detail).toEqual({
    layer: control.layers({}, {})
  })
})

it("should append a base layer to l-control-layers", async () => {
  // Create a <l-control-layers />
  const el = document.createElement("l-control-layers")
  const base = document.createElement("l-base-layers")
  const marker = document.createElement("l-marker")
  marker.setAttribute("lat-lng", "[0,0]")
  base.appendChild(marker)
  el.appendChild(base)
  const promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail.layer)
    })
  })

  // Add to document object model
  document.body.appendChild(el)

  // Assertions
  const controlLayers = await promise
  const expected = control.layers({}, {})
  expected.addBaseLayer(marker.layer)
  expect(controlLayers).toEqual(expected)
})

it("should append a overlay layer to l-control-layers", async () => {
  // Create a <l-control-layers />
  const el = document.createElement("l-control-layers")
  const layers = document.createElement("l-overlay-layers")
  const marker = document.createElement("l-marker")
  marker.setAttribute("lat-lng", "[0,0]")
  layers.appendChild(marker)
  el.appendChild(layers)
  const promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail.layer)
    })
  })

  // Add to document object model
  document.body.appendChild(el)

  // Assertions
  const controlLayers = await promise
  const expected = control.layers({}, {})
  expected.addOverlay(marker.layer)
  expect(controlLayers).toEqual(expected)
})
