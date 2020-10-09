
import L from "leaflet";
import * as React from "react";
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import Trees from "../../../data/arbustums02.json";


export default function Test() {
   
    return (
        <Map center={[50.632557, 5.579666]} zoom={12}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />

            {Trees.map(tree => (
                <Marker
                    key={(tree.x_lambert72)}
                    position={[tree.geoloc.lat, tree.geoloc.lon]}>
                        onClick={() => {
                            setActiveTree(tree);
                        }}

                        <Popup>
                    <p> Nom:{tree.nom_complet}</p>
                    <p>Latitude:{tree.geoloc.lat}</p>
                    <p>Diamètre:{tree.diametre_cime}</p>
                        </Popup>
                       
                    </Marker>
                   
                        
                   
                     
                
                  
                    
                
            ))}
           
             
            
        </Map>
    );
}
