import { useEffect, useState, useContext, useRef, useCallback } from "react";
import './Map.css';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { BakeryContext } from './BakeryProvider'


const mapContainerStyle = {
    height: '100%',
    flex: 1
};

const center = {
    lat: 53.551086,
    lng: 9.993682
}

const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapId: 'a6cda6562a34e491'
};


function Map() {
    
    const { selectedBakery, setSelectedBakery } = useContext(BakeryContext);

    //const [selectedBakery, setSelectedBakery] = useState(null);


    useEffect(()=> {
        fetch('http://localhost:8080/api/locations/get')
            .then(resp => resp.json())
            .then(msg => {  
                setMarkers([]);              
                msg.result.forEach(location => {
                    let coordinates = location.coordinates.split(', ');
                    setMarkers((current) => [...current, {
                        lat: parseFloat(coordinates[0]),
                        lng: parseFloat(coordinates[1]),
                        id: location.id,
                        thumbnail_src: location.thumbnail_src,
                        name: location.branch_name,
                        slug: location.slug
                    }]);
                });
            })
            .catch(err => console.error(err))
    }, []);
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const [markers, setMarkers] = useState([]);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);
  
    const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }, []);

    if( loadError ) return 'Error loading maps';
    if( !isLoaded ) return 'Loading maps';

    return (
        <div className="map-container">

            <Locate panTo={panTo} />

            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >

                {markers.map((marker) => (
                    <Marker 
                        key={marker.id} 
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: marker.thumbnail_src,
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                        onClick={() => {
                            setSelectedBakery(marker);
                        }}
                    />
                ))}

                {selectedBakery ? (
                    <InfoWindow
                        position={{lat: selectedBakery.lat, lng: selectedBakery.lng}} 
                        onCloseClick={() => {
                            setSelectedBakery(null);
                        }}
                    >
                        <div>
                            <h2>{selectedBakery.name}</h2>
                            <Link to={`/${selectedBakery.slug}`}>Go to bakery</Link>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
        </div>
    );
}


function Locate({panTo}) {
    return ( 
        <button 
            className='locate' 
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    }, 
                    () => null
                );
            }}
        >
            <img src='compass.svg' alt='compass - locate me' />
        </button>
    )
}


export default Map;
