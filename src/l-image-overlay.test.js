// @vitest-environment happy-dom
import { imageOverlay } from "leaflet";
import { it, expect } from "vitest";
import { mapAddTo } from "./events";
import "./index";

it("should cover l-image-overlay", async () => {
  const url = "/image.png";
  const bounds = [
    [0, 0],
    [1, 1],
  ];
  const el = document.createElement("l-image-overlay");
  el.setAttribute("url", url);
  el.setAttribute("bounds", JSON.stringify(bounds));

  let promise = new Promise((resolve) => {
    el.addEventListener(mapAddTo, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);

  const actual = await promise;
  const expected = {
    layer: imageOverlay(url, bounds, { alt: "", opacity: 1 }),
  };
  expect(actual).toEqual(expected);
});

it("should not render l-image-overlay without url", async () => {
  const bounds = [
    [0, 0],
    [1, 1],
  ];
  const el = document.createElement("l-image-overlay");
  el.setAttribute("bounds", JSON.stringify(bounds));

  document.body.appendChild(el);

  expect(el.layer).toEqual(null);
});

it("should not render l-image-overlay without bounds", async () => {
  const url = "/image.png";
  const el = document.createElement("l-image-overlay");
  el.setAttribute("url", url);

  document.body.appendChild(el);

  expect(el.layer).toEqual(null);
});

it.each([
  ["url", "fresh.jpg"],
  ["bounds", "[[2,2],[3,3]]"],
  ["opacity", "0.1"],
])("should update l-image-overlay on attribute %s %s ", (key, value) => {
  const url = "/image.png";
  const bounds = [
    [0, 0],
    [1, 1],
  ];
  const el = document.createElement("l-image-overlay");
  el.setAttribute("url", url);
  el.setAttribute("bounds", JSON.stringify(bounds));
  document.body.appendChild(el);

  el.setAttribute(key, value);
  let expected = null;
  let options = { alt: "", opacity: 1 };
  if (key === "url") {
    expected = imageOverlay(value, bounds, options);
  } else if (key === "bounds") {
    expected = imageOverlay(url, JSON.parse(value), options);
  } else {
    expected = imageOverlay(url, bounds, {
      ...options,
      [key]: parseFloat(value),
    });
  }
  expect(el.layer).toEqual(expected);
});
