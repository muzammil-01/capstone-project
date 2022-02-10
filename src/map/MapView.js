import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import '../App.css'
import 'leaflet/dist/leaflet.css';
import {useDocument} from '../hooks/useDocument'
import {useParams} from 'react-router-dom'




function MapView() {
  const {id} = useParams()
  const {document} = useDocument('properties',id)
  const position=[24.9056, 67.0822]
  return (
    
    
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
      <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
      </Popup>
    </Marker>
  </MapContainer>
)
  }

export default MapView;