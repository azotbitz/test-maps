import React, {useContext, useEffect, useState} from "react";
import {useMap} from "react-leaflet/hooks";
import Leaflet from "leaflet";
import "leaflet.vectorgrid";
import {useSelector} from "react-redux";
import {data} from "../redux/selectors/RouteSelector";
import {RouteContext} from "./Window";



const Routes = () => {

    const status = useContext(RouteContext)

    const greenIcon = new Leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })

    const yellowIcon = new Leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })

    const redIcon = new Leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })


    const dataWindow = useSelector(data);
    const route = [dataWindow[0][0].routes[0].geometry.coordinates]
    const routeSecond = [dataWindow[0][1].routes[0].geometry.coordinates]
    const route2 = [dataWindow[1][0].routes[0].geometry.coordinates]
    const route2Second = [dataWindow[1][1].routes[0].geometry.coordinates]
    const route3 = [dataWindow[2][0].routes[0].geometry.coordinates]
    const route3Second = [dataWindow[2][1].routes[0].geometry.coordinates]
    const map = useMap();

    const [selectRoute, setSelectRoute] = useState(route)
    const [selectRouteSecond, setSelectRouteSecond] = useState(routeSecond)






    useEffect(() => {

        switch (status.toString()) {
            case 'route1':
                setSelectRoute(route)
                setSelectRouteSecond(routeSecond)

                break
            case 'route2':
                setSelectRoute(route2)
                setSelectRouteSecond(route2Second)

                break
            case 'route3':
                setSelectRoute(route3)
                setSelectRouteSecond(route3Second)
                break
            default: return null
        }

        const layer = Leaflet.layerGroup()
        const myRenderer = Leaflet.canvas({ padding: 0.5, tolerance: 20 })
        const line = Leaflet.polyline([selectRoute], { color: 'darkgreen',
                weight: 4,
                opacity: .9,
                lineJoin: 'miter',
                noClip: true,
                lineCap: "square",
                renderer: myRenderer }).bindPopup(status)


        const line2 = Leaflet.polyline([selectRouteSecond], { color: 'darkgreen',
            weight: 4,
            opacity: .9,
            lineJoin: 'miter',
            noClip: true,
            lineCap: "square",
            renderer: myRenderer }).bindPopup(status)


        const markerStart = Leaflet.marker([line.getLatLngs()[0][0][0].lat, line.getLatLngs()[0][0][0].lng], {
            icon: greenIcon
        }).bindPopup('Старт')

        const markerStop = Leaflet.marker([line2.getLatLngs()[0][0][0].lat, line2.getLatLngs()[0][0][0].lng], {
            icon: yellowIcon
        }).bindPopup('Стоп')

        const markerFinish = Leaflet.marker([line2.getLatLngs()[0][0].slice(-1)[0].lat, line2.getLatLngs()[0][0].slice(-1)[0].lng], {
            icon: redIcon
        }).bindPopup('Финиш')

        layer.initialize([line, line2, markerStart, markerStop, markerFinish])
        layer.addTo(map)
        map.fitBounds([line.getBounds(), line2.getBounds()])

        setTimeout(() => {
            layer.remove()
        }, 1500)

    },[status])
    return null;
}
export default Routes;

