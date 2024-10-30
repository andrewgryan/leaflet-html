import "../index.js"
import "./divicon.css"


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/DivIcon',
  tags: ['autodocs'],
  render: ({ className }) => {
    let icon = "<l-div-icon></l-div-icon>"
    if (className) {
      icon =  `<l-div-icon class-name=${className}></l-div-icon>`
    }
    return `<l-marker lat-lng="[55, 0]">${ icon }</l-marker>`
  },
  argTypes: {
    className: { type: "string", description: "HTML attribute **class-name**, passed to Leaflet as **className** option.", control: "select", options: ["none", "red", "blue", "yellow"]},
  },
  args: {
  },
  decorators: [(story) => `
<l-map center="[53, 0]" zoom="4">
  <l-tile-layer
    url-template="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  ></l-tile-layer>
    ${story()}
</l-map>
  `],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
  },
};

export const Red = {
  args: {
    className: "red"
  },
};

export const Blue = {
  args: {
    className: "blue"
  },
};
