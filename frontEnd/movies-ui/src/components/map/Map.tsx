import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import type Coordinate from "./coordinate.model";
import { useState } from "react";

export default function Map(props: MapProps) {

    const [coordinates, setCoordinates] = useState(props.coordinates);

    return (
        <>
            <MapContainer center={[41.88526796778196, -87.62960338465705]}
                zoom={14} scrollWheelZoom={true} style={{ height: '500px' }}
            >

                <TileLayer attribution="React Movies"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <HandleMapClick setCoordinate={coordinate => {
                    setCoordinates([coordinate]);
                    if (props.setCoordinate) {
                        props.setCoordinate(coordinate);
                    }
                }} />

                {coordinates?.map(coordinate => <Marker key={coordinate.lat + coordinate.lng}
                    position={[coordinate.lat, coordinate.lng]}
                >
                    {coordinate.message ? <Popup>{coordinate.message}</Popup> : undefined}
                </Marker>)}

            </MapContainer>
        </>
    )
}

interface MapProps {
    coordinates?: Coordinate[];
    setCoordinate?: (coordinate: Coordinate) => void;
}


function HandleMapClick(props: { setCoordinate(coordinate: Coordinate): void }) {
    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        props.setCoordinate({ lat, lng });
    });

    return null;

}
