import React from 'react'
import { Button, Container,Carousel, Alert} from 'react-bootstrap'
import { useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import { FiArrowLeft } from "react-icons/fi";

const NeueStarkmacher = (props) => {
	const [neueStarkmacherListe, setNeueStarkmacherListe] = useState([
    {
        label:"Soziale Unterstützung",
        link:"/starkmacher/sozialeUnterstuetzungLvl1",
        description:"In diesem Starkmacher geht es daum, zu überlegen welche Menschen es in deinem Umfeld gibt und wie sie dich unterstützen können.",
        logo:"situationskontrolle.png",
        color:"#cae2e2"
    },
    {
        label:"Reframing",
        link:"/starkmacher/reframing",
        description:"Beim Reframing geht es darum deine eigene Einschätzung der Situation zu überprüfen und gegebenenfalls. zu einer anderen, für dich angenehmeren Interpretation zu kommen.",
        logo:"reframing.png",
        color:"#f2c7d0"
    },
    {
        label:"Optimismus",
        link:"/starkmacher/optimismus",
        description:"Optimismus heißt das Gute im Leben zu sehen. Auch, wenn es mal nicht so einfach ist.",
        logo:"optimismus.png",
        color:"#fde802"
    },    
    {
        label:"Situationskontrolle",
        link:"/starkmacher/Situationskontrolle",
        description:"Bei der Situationskontrolle geht es darum, dir einen Plan zu machen, wie du dein aktuelles Problem lösen kannst.",
        logo:"situationskontrolle.png",
        color:"#cae2e2"
    }      
        ]);

    return (
        <Container>
        <LinkContainer to="/starkmacher"><Button variant="success"><FiArrowLeft/>Zurück zu den Starkmachern</Button></LinkContainer>
        

        <Alert variant="success" style={{marginTop: "15px"}}>
            Welchen neuen Starkmacher möchtest du heute ausprobieren?
        </Alert>

            <Carousel variant="dark" style={{borderRadius: "5px", marginBottom: "20px"}}>
            {neueStarkmacherListe.map((item,key)=>                
                <Carousel.Item key={item.key}>
                	<Carousel.Caption  style={{backgroundColor:item.color,position:"static",color:"black",minHeight:"500px"}}>
                    <div style={{width:"80%",margin:"auto",marginBottom:"2em"}}>
                        <h2>{item.label}</h2>
                        <b>{item.description}</b>
                        <br/><br/>
                        <div><img style={{maxWidth:"100%", borderRadius:"10px", boxShadow:"#0000001a 6px 7px 15px 8px"}} src="video.png"/></div>  
                        <br/>
                        <LinkContainer to={item.link}><Button  variant="secondary" className="my-2" >Let´s go!</Button></LinkContainer>                
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>              
            )}
        	</Carousel>

            <br></br>
        </Container>
    )
}

export default NeueStarkmacher

