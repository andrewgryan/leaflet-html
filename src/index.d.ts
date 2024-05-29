import type { Icon, Layer } from "leaflet";
import type { LIcon } from "l-icon";

declare global {
  type AddToEvent = CustomEvent<{ layer: Layer }>;
  type BindPopupEvent = CustomEvent<{ content: string }>;
  type SetIconEvent = CustomEvent<{ icon: Icon }>;

  interface HTMLElementEventMap {
    addTo: AddToEvent;
    bindPopup: BindPopupEvent;
    setIcon: SetIconEvent;
  }

  interface HTMLElementTagNameMap {
    "l-icon": LIcon;
  }
}
