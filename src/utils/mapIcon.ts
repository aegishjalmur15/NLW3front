import leaflet from "leaflet";
import mapMarkerImg from "../assets/images/Local.svg"

const MapIcon = leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [172, 2]
  })

  export default MapIcon;