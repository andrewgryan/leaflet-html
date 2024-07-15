// @vitest-environment happy-dom
import { videoOverlay } from "leaflet";
import { it, expect } from "vitest";
import { layerConnected } from "./events";
import "./index.js";

it("should render a l-video-overlay tag", async () => {
  const el = document.createElement("l-video-overlay");
  el.setAttribute("url", '["/fake/url"]');
  el.setAttribute("bounds", "[[0,0],[1,1]]");

  // Resolve a layerConnected event
  const promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail.layer);
    });
  });

  document.body.appendChild(el);
  const actual = await promise;
  const expected = videoOverlay(
    ["/fake/url"],
    [
      [0, 0],
      [1, 1],
    ],
    { alt: "", autoplay: true, muted: true, opacity: 1, playsInline: true },
  );
  expect(actual).toEqual(expected);
});
