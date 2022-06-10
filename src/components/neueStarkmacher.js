import React from 'react'
import { Button, Container,Carousel } from 'react-bootstrap'
import { useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap'

const NeueStarkmacher = (props) => {
	const [neueStarkmacherListe, setNeueStarkmacherListe] = useState([
    {
        label:"Reframing",
        link:"/starkmacher/reframing",
        description:"Beim Reframing geht es darum deine eigene Einschätzung der Situation zu überprüfen und gegebenenfalls. zu einer anderen, für dich angenehmeren Interpretation zu kommen.",
        logo:"testbild.jpg"
    },
    {
        label:"Soziale Unterstützung",
        link:"/starkmacher/sozialeUnterstuetzung",
        description:"Bei der Sozialen Unterstützung geht es darum, zu überlegen welche anderen Personen dir helfen können zurechtzukommen.",
        logo:"testbild.jpg"
    },
    {
        label:"Lorem Ipsum",
        link:"/starkmacher/...",
        description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        logo:"testbild.jpg"
    }      
        ]);

    return (
        <Container>
            <div>Welchen neuen Starkmacher möchtest du heute ausprobieren?</div>
            <br/>
            <Carousel>
            {neueStarkmacherListe.map((item,key)=>                
                <Carousel.Item key={key}>
                	<img style={{width:"100%",height:"500px"}} src={item.logo}/>
                	<Carousel.Caption>
                    <h1>{item.label}</h1>
                    <div>{item.description}</div>
                    <br/>
                    <LinkContainer to={item.link}><Button>Let´s go!</Button></LinkContainer>
                    <br/>
                    </Carousel.Caption>
                </Carousel.Item>              
            )}
        	</Carousel>
        </Container>
    )
}

export default NeueStarkmacher

