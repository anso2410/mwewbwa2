import * as React from "react";
import {icon} from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default function Test(){
        return( <Map>
                    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    /> 
        </Map>
        );
}