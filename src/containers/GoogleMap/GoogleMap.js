//    center: {lat: 43.6271378716183, lng: -79.4772237615888},
//    key: "AIzaSyCHk-HlOpB2q3FLgDIrNYnTXsuVNijaUGY"
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import PersonIcon from '@material-ui/icons/Person';
import { Box, Tooltip } from '@material-ui/core';

function GoogleMap(){

    const [userLocation, setUserLocation] = useState(null);
    
    useEffect(()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                setUserLocation({lat: position.coords.latitude, lng: position.coords.longitude});
            })
        }
    })

    return(
        <Box>
            <GoogleMapReact
                bootstrapURLKeys = {{ key: "AIzaSyCHk-HlOpB2q3FLgDIrNYnTXsuVNijaUGY"}}
                defaultCenter = {{ lat: 43.6271378716183, lng: -79.4772237615888 }}
                defaultZoom = { 15 }
                style={{height: '60vh', width: '100%' }}
                resetBoundsOnResize={ true }
            >
                <Tooltip 
                    title="Our Store Location" 
                    lat = { 43.6271378716183 }
                    lng = { -79.4772237615888 }>
                        <RoomIcon/>
                </Tooltip>

                { userLocation?
                    
                    (
                        <Tooltip
                            title="Your Current Location"
                            lat = {userLocation.lat} 
                            lng = {userLocation.lng} 
                        >
                            <PersonIcon/>
                        </Tooltip>
                    ) 
                    :
                    null
                }
            </GoogleMapReact>
        </Box>
    )
}

export default GoogleMap;