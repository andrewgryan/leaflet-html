// @vitest-environment happy-dom
import "leaflet";
import "leaflet.markercluster";
import { it, expect } from "vitest";
import { layerConnected } from "./events";
import "./index";

it("should cover l-marker-cluster-group", async () => {
  const el = document.createElement("l-marker-cluster-group");
  el.setAttribute("name", "Marker Cluster");
  el.setAttribute("show-coverage-on-hover", "true");

  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);

  const actual = await promise;
  const expected = {
    name: "Marker Cluster",
    layer: L.markerClusterGroup({ showCoverageOnHover: true })
  };

  expect(_removePropertiesToIgnore(actual)).toEqual(_removePropertiesToIgnore(expected));
});

it("should register layers", async () => {
  const el = document.createElement("l-marker-cluster-group");
  const marker = document.createElement("l-marker");
  marker.setAttribute("lat-lng", "[0,0]");
  el.appendChild(marker);

  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);

  const actual = await promise;
  const expected = {
    name: null,
    layer: L.markerClusterGroup({ showCoverageOnHover: false }).addLayer(L.marker(new L.LatLng(0, 0)))
  };

  expect(_removePropertiesToIgnore(actual)).toEqual(_removePropertiesToIgnore(expected));
});

it("should create icon function using icon-options", async () => {
  const el = document.createElement("l-marker-cluster-group");
  const iconOptions = {
    "size": "Math.max(40, cluster.getChildCount() / 2)",
    "content": "\"<div>\" + cluster.getChildCount() + \"</div>\"",
    "className": "mavis-marker-cluster"
  };
  el.setAttribute("icon-options", JSON.stringify(iconOptions));

  let promise = new Promise((resolve) => {
    el.addEventListener(layerConnected, (ev) => {
      resolve(ev.detail);
    });
  });
  document.body.appendChild(el);

  const mockCluster = { getChildCount: () => 100 };
  const actual = await promise;
  const expected = {
    name: null,
    layer: L.markerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        const resolvedSize = 50;
        const resolvedContent = "<div>100</div>";
        return L.divIcon({
          html: resolvedContent,
          className: "mavis-marker-cluster",
          iconSize: new L.Point(resolvedSize, resolvedSize)
        });
      }
    })
  };

  expect(actual.layer.options.iconCreateFunction(mockCluster)).toEqual(expected.layer.options.iconCreateFunction(mockCluster));
});

function _removePropertiesToIgnore(element) {
  element.layer._leaflet_id = null;
  element.layer._featureGroup._eventParents = null;
  element.layer._nonPointGroup._eventParents = null;
  element.layer._needsClustering.forEach(e => e._leaflet_id = null)

  return element;
}