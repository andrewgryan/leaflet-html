const init = () => {
  // Render Leaflet API calls
  document.querySelectorAll("[data-leaflet-html]").forEach((el) => {
    const { center, zoom } = el.dataset
    const map = L.map(el).setView(JSON.parse(center), parseInt(zoom))

    // L.control.layers
    el.querySelectorAll("[data-control-layers]").forEach((el) => {
      const baseMaps = {}
    
      // L.tileLayers
      el.querySelectorAll("[data-tile-layer]").forEach((tileEl) => {
        const { show, urlTemplate, attribution, maxZoom, name } = tileEl.dataset
        baseMaps[name] = L.tileLayer(urlTemplate, { maxZoom, attribution });
        if (show != null) {
          baseMaps[name].addTo(map)
        }
      })

      const overlayMaps = {}
      // L.layerGroup
      el.querySelectorAll("[data-layer-group]").forEach((el) => {
        const { name } = el.dataset
        const layers = []

        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
              const { latLng } = node.dataset // MutationObserver needed
              const marker = L.marker(JSON.parse(latLng))
              const group = overlayMaps[name]
              group.addLayer(marker)
              map.addLayer(marker)
            })

            mutation.removedNodes.forEach(node => {
              const { _leafletId } = node.dataset
              const group = overlayMaps[name]
              const layer = group.getLayer(_leafletId)
              group.removeLayer(layer)
              map.removeLayer(layer)
            })
          })
        })
        observer.observe(el, { childList: true })

        // L.marker
        el.querySelectorAll("[data-marker]").forEach((el) => {
          const { latLng } = el.dataset
          const marker = L.marker(JSON.parse(latLng)).addTo(map)
          el.dataset._leafletId = L.stamp(marker) // Save ID for later

          const observer = new MutationObserver(function(mutations) {
              mutations.forEach((mutation) => {
                const { latLng } = mutation.target.dataset
                marker.setLatLng(JSON.parse(latLng))
              })
          })
          observer.observe(el, { attributes: true, attributeFilter: ["data-lat-lng"] })

          // marker.bindPopup
          el.querySelectorAll("[data-popup]").forEach((el) => {
            const { content } = el.dataset
            marker.bindPopup(content)
            const observer = new MutationObserver(function() {
              marker.getPopup().setContent(el.dataset.content)
            })
            observer.observe(el, { attributes: true, attributeFilter: ["data-content"] })
          })

          layers.push(marker)
        })

        overlayMaps[name] = L.layerGroup(layers)
      })

      L.control.layers(baseMaps, overlayMaps).addTo(map)
    })
  })
}

export default init
