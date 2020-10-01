import * as React from "react";
import {icon} from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default function Test(){
       
        return( <Map center = {[50.632557, 5.579666 ]} zoom= {12}>
                    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    /> 
        </Map>
        );
}