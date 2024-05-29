import type { Layer } from "leaflet";

declare global {
  type AddToEvent = CustomEvent<{ layer: Layer }>;

  interface HTMLElementEventMap {
    addTo: AddToEvent;
  }
}
