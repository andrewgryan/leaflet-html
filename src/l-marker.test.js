// @vitest-environment happy-dom
import { it, expect } from "vitest";
import * as L from "leaflet";
import "./index";

it("default icon", () => {
  const el = document.createElement("l-marker");
  el.setAttribute("lat-lng", "[0, 0]");
  document.body.appendChild(el);
  let actual = el.layer.getIcon();
  let expected = new L.Icon.Default();
  expect(actual).toEqual(expected);
});

it("adds an icon", () => {
  const el = document.createElement("l-marker");
  el.setAttribute("lat-lng", "[0, 0]");
  // Set attribute before appendChild
  el.setAttribute("icon", JSON.stringify({ iconUrl: "foo.png" }));
  document.body.appendChild(el);
  let actual = el.layer.getIcon();
  let expected = L.icon({ iconUrl: "foo.png" });
  expect(actual).toEqual(expected);
});

it("changes an icon", () => {
  const el = document.createElement("l-marker");
  el.setAttribute("lat-lng", "[0, 0]");
  // Set attribute after appendChild
  document.body.appendChild(el);
  el.setAttribute("icon", JSON.stringify({ iconUrl: "bar.png" }));
  let actual = el.layer.getIcon();
  let expected = L.icon({ iconUrl: "bar.png" });
  expect(actual).toEqual(expected);
});
