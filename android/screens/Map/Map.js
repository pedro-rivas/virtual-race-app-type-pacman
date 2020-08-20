import React from 'react';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {mapStyle } from './mapStyle';
export default MapContainer = (props) => {

    const {width, height, inGame, zoom, coords} = props;
    const {latitude, longitude} = coords;

    return(
        <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0000,
            longitudeDelta: 0.0000,
            }}
            style={{height, width}}
            customMapStyle={mapStyle}
            maxZoomLevel={zoom}
            minZoomLevel={zoom}
        >
            {props.children}
        </MapView>
    )
};


  