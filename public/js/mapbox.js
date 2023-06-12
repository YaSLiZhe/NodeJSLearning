/* eslint-disable */
export const displayMap = (locations) => {
  // Create a new map instance
  const map = new ol.Map({
    target: document.getElementById('map'),
    // Set the initial map layers and view
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(locations[0].coordinates),
      zoom: 4,
    }),
  });

  // Create a vector layer to hold the markers
  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
  });

  // Iterate through the locations array and create features for each location
  const markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: '../img/pin.png', // Replace with your marker icon image path
      scale: 0.1, // Adjust the scale as needed
    }),
  });
  locations.forEach((location) => {
    const [lng, lat] = location.coordinates;
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat])),
    });
    feature.setStyle(markerStyle);
    vectorLayer.getSource().addFeature(feature);

    // Create an overlay for each marker
    const overlay = new ol.Overlay({
      position: ol.proj.fromLonLat([lng, lat]),
      positioning: 'center-center',
      element: createPopupElement(location.description, location.day),
      stopEvent: false, // Allow events on the overlay element
    });

    map.addOverlay(overlay);
  });

  // Function to create the HTML popup element
  function createPopupElement(description, day) {
    const popupElement = document.createElement('div');
    popupElement.className = 'popup';
    popupElement.innerHTML = `
    <div class="popup-header">
      <h4>${description}</h4>
      <span class="popup-close">x</span>
    </div>
    <div class="popup-body">
      <p>Day ${day}</p>
    </div>
  `;

    // Close function for the popup
    const closeButton = popupElement.querySelector('.popup-close');
    closeButton.addEventListener('click', () => {
      popupElement.remove();
    });
    return popupElement;
  }

  // Add the vector layer to the map
  map.addLayer(vectorLayer);

  // Animate the map zoom from level 4 to level 6 when the map is opened
  map.getView().animate({
    zoom: 7, // Target zoom level
    duration: 2000, // Animation duration in milliseconds
  });
};
