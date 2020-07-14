import React, { useGlobal, useState } from "reactn";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

import Leaflet, { LatLngTuple } from "leaflet";

//import "./../node_modules/leaflet/dist/leaflet.css";
import "./app.css";

import { useQuery } from "react-query";
import axios from "axios";

Leaflet.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.6.0/dist/images/";

interface MapProps {
  path: [{ st_asgeojson: string; edge: string }];
}

export const MapWrapper: React.FC<MapProps> = ({ path }) => {
  const [start, setStart] = useGlobal("start");
  const [end, setEnd] = useGlobal("end");
  const defaultLatLng: LatLngTuple = [start.lng, start.lat];

  const [position, setPosition] = useState(defaultLatLng);
  const [zoom, setZoom] = useState(14);

  return (
    <div className="map-wrapper">
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          key="start"
          onDragEnd={(e: any) => {
            const { lat, lng } = e.target.getLatLng();
            setStart({ lat: lng, lng: lat });
          }}
          draggable={true}
          position={Leaflet.latLng({ lng: start.lat, lat: start.lng })}
        />
        <Marker
          key="end"
          onDragEnd={(e: any) => {
            const { lat, lng } = e.target.getLatLng();
            setEnd({ lat: lng, lng: lat });
          }}
          draggable={true}
          position={Leaflet.latLng({ lng: end.lat, lat: end.lng })}
        />
        {path
          ? path.map((way, wi) => (
              <GeoJSON
                key={way.edge}
                data={JSON.parse(way.st_asgeojson)}
              ></GeoJSON>
            ))
          : null}
      </Map>
    </div>
  );
};
