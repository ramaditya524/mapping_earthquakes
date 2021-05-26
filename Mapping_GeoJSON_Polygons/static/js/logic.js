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
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL

let torontohoods = "https://raw.githubusercontent.com/ramaditya524/mapping_earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"
// Create a style for the lines.
let myStyle = {
  color: "blue",
  fillColor: "#ffffa1",
  //fillOpacity: 0.7,
  weight: 1
}
d3.json(torontohoods).then(function(data) {
   L.geoJSON(data,{
     style:myStyle,
     onEachFeature: function(feature, layer) {
       layer.bindPopup("<h3>Area name:"+feature.properties.AREA_NAME+"</h3>")
     }
   }).addTo(map)
})

// Grabbing our GeoJSON data.
//d3.json(torontoData).then(function(data) {
//   L.geoJSON(data,{
//       style: myStyle,
//     onEachFeature: function(feature, layer) {

//     layer.bindPopup("<h3> Airline:" + feature.properties.airline + "</h3> <hr> <h3> Destination:"+feature.properties.dst)
    
//                 }

//   }).addTo(map);
    
// })