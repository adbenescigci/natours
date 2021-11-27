/* eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWJkdWxsYWhjaWdjaSIsImEiOiJja3Y2ZWJ0M2sxZmFhMm9zM2h3MDhreWFjIn0.Vp7MAduuWSFSo8zgPM2Ksg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/abdullahcigci/ckv6k72we7opt14l9zxdtp7br',
    scrollZoom: false,
    //   center: [-118.031517, 33.997584],
    //   zoom: 8,
    //   interactive:false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Prepare Marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    //Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);

    //Extend map bounds
    bounds.extend(loc.coordinates);

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  });
};
