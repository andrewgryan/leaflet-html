// @vitest-environment happy-dom
import { divIcon, DivIcon } from "leaflet";
import { it, expect } from "vitest";
import "./index.js";

it("should render a div icon", () => {
  const el = document.createElement("l-div-icon");
  el.innerHTML = "Hello, World!";
  document.body.appendChild(el);
  expect(el.icon).toBeInstanceOf(DivIcon);
  expect(el.icon).toEqual(divIcon({ html: "Hello, World!" }));
});

it("should attach div icon to marker", () => {
  const icon = document.createElement("l-div-icon");
  const marker = document.createElement("l-marker");
  marker.setAttribute("lat-lng", "[0,0]");
  marker.appendChild(icon);
  document.body.appendChild(marker);

  const actual = marker.layer.getIcon();
  expect(icon.icon).toEqual(marker.layer.getIcon());
});
