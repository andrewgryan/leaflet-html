import "../index.js";

export default {
  title: "Example/TileLayerWMS",
  tags: ["autodocs"],
  render: ({ urlTemplate, layers, transparent, styles }) => {
    if (styles) {
      return `<l-tile-layer-wms url-template=${urlTemplate} layers=${layers} styles=${styles} transparent=${transparent}></l-tile-layer-wms>`;
    } else {
      return `<l-tile-layer-wms url-template=${urlTemplate} layers=${layers} transparent=${transparent}></l-tile-layer-wms>`;
    }
  },
  argTypes: {
    layers: {
      type: "string",
      control: "select",
      options: [
        "TOPO-OSM-WMS",
        "SRTM30-Colored-Hillshade",
        "TOPO-WMS",
        "OSM-Overlay-WMS",
        "TOPO-WMS,OSM-Overlay-WMS",
        "TOPO-WMS,SRTM30-Colored-Hillshade",
      ],
    },
  },
  args: {
    urlTemplate: "http://ows.mundialis.de/services/service?",
    layers: "SRTM30-Colored-Hillshade",
    transparent: true,
  },
  decorators: [
    (story) => `
<l-map center="[45, 0]" zoom="4">
    ${story()}
</l-map>
  `,
  ],
};

export const Default = {
  args: {},
};

export const BritishGeologicalSurvey = {
  argTypes: {
    layers: {
      type: "string",
      control: "select",
      options: [
        "BGS250k.Bedrock",
        "BGS250k.LinearBedrock",
        "BGS250k.SBS",
        "BGS250k.HardSubstrate",
      ],
    },
    urlTemplate: {
      type: "string",
    },
  },
  args: {
    urlTemplate:
      "https://map.bgs.ac.uk/arcgis/services/Offshore/Products_WMS/MapServer/WmsServer",
    layers: "BGS250k.Bedrock",
    transparent: true,
  },
};

export const BritishGeologicalSurveyHeatPump = {
  argTypes: {
    layers: {
      type: "string",
      control: "select",
      options: ["GSHP.viability.screening.layer"],
    },
    urlTemplate: {
      type: "string",
    },
  },
  args: {
    urlTemplate:
      "https://map.bgs.ac.uk/arcgis/services/GSHP/GSHP_WMS/MapServer/WmsServer",
    layers: "GSHP.viability.screening.layer",
    transparent: true,
  },
  render: ({ urlTemplate, layers, transparent }) => {
    return `
      <l-tile-layer-wms url-template=${urlTemplate} layers=${layers} transparent=${transparent}></l-tile-layer-wms>
      <l-tile-layer-wms
          transparent="true"
          url-template="http://ows.mundialis.de/services/service?"
          layers="OSM-Overlay-WMS"></l-tile-layer-wms>
    `;
  },
};
