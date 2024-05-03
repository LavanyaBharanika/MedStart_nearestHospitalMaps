import React, { useState, useEffect } from "react";
import { json, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Card from 'react-bootstrap/Card';
import axios from "axios";

export default function Details() {
    const location = useLocation();
    const { name, lat, lon, formatted, website, contact, state, city } = location.state;
    const [latLng, setLatLng] = useState({});
    const [address, setAddress] = useState([]);
    const [direction, setDirection] = useState([]);

    useEffect(() => {
        const geoAddress = `https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json&apiKey=62ba825528b5427c912624eb48608bda`;
        axios.get(geoAddress).then(resp => {
            setAddress(resp.data.results.map(add => add.formatted));
        });
    }, [latLng]);

    useEffect(() => {
        //const geoDIRECTION = `https://api.geoapify.com/v1/routing?waypoints=${latLng.lat},${latLng.lng}|${lat},${lon}&mode=drive&apiKey=62ba825528b5427c912624eb48608bda`;
        const geoDIRECTION = `https://api.geoapify.com/v1/routing?waypoints=16.5160826,81.7233251|16.51933950363376,81.70730646210995&mode=drive&apiKey=62ba825528b5427c912624eb48608bda`;
        axios.get(geoDIRECTION).then(response => {
            const features = response.data.features;
            const directionsArray = [];

            features.forEach(feature => {
                const legs = feature.properties.legs;
                legs.forEach(leg => {
                    const instructions = leg.steps;
                    instructions.forEach(step => {
                        directionsArray.push(step.instruction);
                    });
                });
            });

            setDirection(directionsArray);
        });
    }, []);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }, []);

    return (
        <div>
            <Row>
                <Card style={{ width: '50%', margin: 20 }}>
                    <Col>
                        <Card.Header as="h5">User Address</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                user Latitude: {latLng.lat}
                                <br />
                                user Longitude: {latLng.lng}
                                <br />
                                user Address: {address}
                            </Card.Text>
                        </Card.Body>

                        <br />
                        <Row>

                            <Card.Header as="h5">{name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Hospital Latitude: {lat}
                                    <br />
                                    Hospital Longitude: {lon}
                                    <br />
                                    Hospital Formatted Address: {formatted}
                                </Card.Text>
                            </Card.Body>

                        </Row>
                        <br />
                        <Row>
                            <Card.Header as="h5">{name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Hospital Website : {website}
                                    <br />
                                    Hospital Email : {contact ? contact.email : ''}
                                    <br />
                                    Hospital Phone : {contact ? contact.phone : ''}
                                    <br />
                                    Hospital State : {state}
                                    <br />
                                    Hospital City : {city}
                                </Card.Text>
                            </Card.Body>
                        </Row>
                    </Col>
                </Card>
                <Col>
                    <Card style={{ width: '50%', margin: 20 }}>
                        <Card.Header as="h5">Directions to Hospital</Card.Header>
                        <Card.Body>
                                        <Timeline>
                                            {
                                                direction.map((instruction, index) => <p key={index}>
                                                    <TimelineItem>
                                                        <TimelineSeparator>
                                                        <TimelineDot />
                                                        <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>{(instruction.text)}</TimelineContent>
                                                    </TimelineItem>
                                                    
                                                    
                                        </p>)
                                                }
                                                 
                                      </Timeline>     
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
