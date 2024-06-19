// @vitest-environment happy-dom
import { it, expect } from "vitest";
import * as L from "leaflet";
import "./index.js";

it("default", () => {
  const el = document.createElement("l-icon");
  document.body.appendChild(el);

  let actual = el.icon;
  let expected = L.icon();
  expect(actual).toEqual(expected);
});

it("emits icon:add event", async () => {
  const el = document.createElement("l-icon");
  let promise = new Promise((resolve) => {
    el.addEventListener("icon:add", (ev) => {
      resolve(ev.detail.icon);
    });
  });
  document.body.appendChild(el);
  let actual = await promise;
  let expected = L.icon();
  expect(actual).toEqual(expected);
});

it("options", () => {
  const el = document.createElement("l-icon");
  el.setAttribute("icon-url", "url.png");
  el.setAttribute("icon-retina-url", "retina.png");
  el.setAttribute("icon-size", "[0, 0]");
  el.setAttribute("icon-anchor", "[0, 0]");
  el.setAttribute("popup-anchor", "[0, 0]");
  el.setAttribute("tooltip-anchor", "[0, 0]");
  el.setAttribute("shadow-url", "urlShadow.png");
  el.setAttribute("shadow-retina-url", "retinaShadow.png");
  el.setAttribute("shadow-size", "[0, 0]");
  el.setAttribute("shadow-anchor", "[0, 0]");
  el.setAttribute("class-name", "foo");
  el.setAttribute("cross-origin", "true");
  document.body.appendChild(el);

  let actual = el.icon;
  let expected = L.icon({
    iconUrl: "url.png",
    iconRetinaUrl: "retina.png",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
    tooltipAnchor: [0, 0],
    shadowUrl: "urlShadow.png",
    shadowRetinaUrl: "retinaShadow.png",
    shadowSize: [0, 0],
    shadowAnchor: [0, 0],
    className: "foo",
    crossOrigin: true,
  });
  expect(actual).toEqual(expected);
});
