// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satellitestreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v10',
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    Satellite: satellitestreets
  };

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL
let earthquakedata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Create a style for the lines.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

d3.json(earthquakedata).then(function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng);
    },
    style: styleInfo
    }).addTo(map)
  })    
// ,{
//      style:myStyle,
//      onEachFeature: function(feature, layer) {
//        layer.bindPopup("<h3>Area name:"+feature.properties.AREA_NAME+"</h3>")
//      }
//    }).addTo(map)
// })
