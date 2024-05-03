import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function HspLocation(){
    const [latLng, setLatLng] = useState({});
    const [hospitals, setHospitals] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatLng({
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                });
              
            })
        }
       },[]);
    useEffect(()=>{
        const geoAPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:81.7266397,16.5149732,5000&bias=proximity:${latLng.lng},${latLng.lat}&limit=20&apiKey=62ba825528b5427c912624eb48608bda`
        //const geoAPI=`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:78.4740613,17.360589,5000&bias=proximity:78.4740613,17.360589&limit=20&apiKey=62ba825528b5427c912624eb48608bda`
    axios.get(geoAPI).then(res => {
        const featuresArr = res.data.features;
        console.log(res.data.features)
        console.log(featuresArr)
        
        setHospitals(featuresArr);
    })  
    }, [latLng]);
    const handleClick = (x)=>{
        console.log(x)
        navigate('/details', {state: x})
    }
    return(
        <div style={{padding:30, display:'flex', flexWrap:'wrap' }}>
           {hospitals.map((hos, index) =>{
            return(
                <div key={index}>
                    <Card onClick={()=>handleClick(hos.properties)}  variant="outlined"  style={{width: '25rem', padding: 18, height: 'auto', overflow:'hidden' , margin: 15, cursor:"pointer"}}>
                    <CardContent>
                        <Typography sx={{fontStyle: 'bold', fontWeight:600, fontSize: 14 }}  gutterBottom>
                          {hos.properties.name} 
                          
                        </Typography>

                        <hr style={{color:'black'}}/>

                        <Typography variant="body2" color="text.secondary">
                          {hos.properties.address_line2}
                          <br /> 
                          {JSON.stringify(hos.properties.contact)}
                         
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
            )
           })}
        </div>
    )
}