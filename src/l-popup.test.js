// @vitest-environment happy-dom
import { it, expect } from "vitest";
import "./index";
import { popupConnected } from "./events.js";

it.each([[true], [false]])(
  "should render l-popup given openPopup %s",
  async (openPopup) => {
    const el = document.createElement("l-popup");
    if (openPopup) {
      el.setAttribute("open-popup", "true");
    }

    let promise = new Promise((resolve) => {
      el.addEventListener(popupConnected, (ev) => {
        resolve(ev.detail);
      });
    });
    document.body.appendChild(el);
    let actual = await promise;
    let expected = { content: null, openPopup };
    expect(actual).toEqual(expected);
  }
);
