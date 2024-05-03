import React from "react";
import {Routes, Route} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/logo.png'
import HspLocation from "./Components/HspLocation";
import Details from "./Components/Details";
export default function App(){
  return(
    <div>
      <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" style={{padding:25, fontWeight:600, fontSize:30}}>
          <img height={45} src={Logo} style={{marginRight:10}}/>
          MedStart</Navbar.Brand>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={ <HspLocation />}/>
      <Route path="/details" element={ <Details />}/>
    </Routes>
   
    </div>
  )
}