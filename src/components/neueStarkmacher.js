import React from 'react'
import { Button, Container, ListGroup,Carousel } from 'react-bootstrap'
import { useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap'

const NeueStarkmacher = (props) => {
	const [neueStarkmacherListe, setNeueStarkmacherListe] = useState([
    {
        label:"Reframing",
        link:"/starkmacher/reframing",
        description:"Beim Reframing geht es darum deine eigene Einschätzung der Situation zu überprüfen und gegebenenfalls. zu einer anderen, für dich angenehmeren Interpretation zu kommen.",
        logo:"Platzhalter-1.png"
    },
    {
        label:"...",
        link:"/starkmacher/...",
        description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        logo:"Platzhalter-1.png"
    }      
        ]);

    return (
        <Container>
            <div>Welchen neuen Starkmacher möchtest du heute ausprobieren?</div>
            <Carousel>
            {neueStarkmacherListe.map((item,key)=>                
                <Carousel.Item key={item.key}>

                	<img style={{width:"100%",height:"400px"}} src={item.logo}/>
                	<Carousel.Caption>
                    <h1>{item.label}</h1>
                    <div>{item.description}</div>
                    <LinkContainer to={item.link}><Button>Let´s go!</Button></LinkContainer>
                    </Carousel.Caption>
                </Carousel.Item>              
            )}
        	</Carousel>
        </Container>
    )
}

export default NeueStarkmacher

