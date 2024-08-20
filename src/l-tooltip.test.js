// @vitest-environment happy-dom
import { tooltip } from "leaflet";
import { expect, it } from "vitest";
import "./index.js";

it("should render a tooltip", () => {
  const el = document.createElement("l-tooltip");
  el.setAttribute("permanent", "");
  el.setAttribute("interactive", "");
  el.setAttribute("direction", "right");
  el.setAttribute("content", "<div>Hello, tooltip!</div>");

  const expectedTooltip = tooltip(
    {
      permanent: true,
      interactive: true,
      direction: "right"
    }
  );
  expectedTooltip.setContent("<div>Hello, tooltip!</div>");

  document.body.appendChild(el);

  expect(el.tooltip).toEqual(expectedTooltip);
});

it("should change attributes after rendering", () => {
  const el = document.createElement("l-tooltip");
  el.setAttribute("permanent", "");

  const expectedTooltip = tooltip(
    {
      permanent: false,
      interactive: true,
      direction: "center"
    }
  );
  expectedTooltip.setContent("Hello there!");

  document.body.appendChild(el);
  el.setAttribute("content", "Hello there!");
  el.setAttribute("direction", "center");
  el.removeAttribute("permanent");
  el.setAttribute("interactive", "");

  expect(el.tooltip).toEqual(expectedTooltip);
});
