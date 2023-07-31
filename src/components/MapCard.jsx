import React from 'react'
import { MapContainer, TileLayer, FeatureGroup} from 'react-leaflet';
import {useSelector} from "react-redux";
import {loader} from "../redux/selectors/RouteSelector";
import Routes from "./Routes";


const MapCard = () => {

    const loading = useSelector(loader);

    if(loading) {
        return (
            <div><h2>Загрузка...</h2></div>
        )
    }

        return (
             <MapContainer
                center={{ lat: 59.938, lng: 30.314 }}
                zoom={11}
                maxZoom={25}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                inertia={true}
                enableHighAccuracy={true}
            >
<FeatureGroup>

    <Routes />
</FeatureGroup>

                 <TileLayer
                     url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                 />
            </MapContainer>
        );
    }


export default MapCard;