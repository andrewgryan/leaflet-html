import "../index.js"

export default {
  title: "Example/TileLayerWMS",
  tags: ['autodocs'],
  render: ({ urlTemplate, layers, transparent }) => `<l-tile-layer-wms url-template=${urlTemplate} layers=${layers} transparent=${transparent}></l-tile-layer-wms>`,
  argTypes: {
    layers: { type: "string", control: "select", options: [
      "TOPO-OSM-WMS",
      "SRTM30-Colored-Hillshade",
      "TOPO-WMS",
      "OSM-Overlay-WMS",
      "TOPO-WMS,OSM-Overlay-WMS",
      "TOPO-WMS,SRTM30-Colored-Hillshade",
    ]}
  },
  args: {
    urlTemplate: "http://ows.mundialis.de/services/service?",
    layers: "SRTM30-Colored-Hillshade",
    transparent: true
  },
  decorators: [(story) => `
<l-map center="[45, 0]" zoom="4">
    ${story()}
</l-map>
  `],
}


export const Default = {
  args: {}
}
