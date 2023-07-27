import { useState } from "react";
import ReactMapGL from 'react-map-gl';

const Map = props =>{
    const [viewport, setViewport] = useState({
        latitude:  Number(props.location.lat),
        longitude: Number(props.location.lng),
        zoom: 10
    });
    
    return (
        <ReactMapGL 
            className='map'
            {...viewport}
            mapboxAccessToken= {process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle='mapbox://styles/helldk/ckrrqzoqi8uu417qrcn0cfb8p'
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
        />
      );
}

export default Map;