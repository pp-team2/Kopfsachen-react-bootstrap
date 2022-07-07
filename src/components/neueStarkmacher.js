import React from 'react'
import { Button, Container, ListGroup,Carousel } from 'react-bootstrap';
import { useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Space} from 'antd';

const NeueStarkmacher = (props) => {
	const [neueStarkmacherListe, setNeueStarkmacherListe] = useState([
    {
        label:"Reframing",
        link:"/starkmacher/reframing",
        description:"Beim Reframing geht es darum deine eigene Einschätzung der Situation zu überprüfen und gegebenenfalls. zu einer anderen, für dich angenehmeren Interpretation zu kommen.",
        logo:"reframing.png",
        color:"#f2c7d0"
    },
    {
        label:"Soziale Unterstützung",
        link:"/starkmacher/sozialeUnterstuetzung",
        description:"In diesem Starkmacher geht es daum, zu überlegen welche Menschen es in deinem Umfeld gibt und wie sie dich unterstützen können.",
        logo:"situationskontrolle.png",
        color:"#cae2e2"
    },
    {
        label:"Situationskontrolle",
        link:"/starkmacher/...",
        description:"Lorem ipsum dolor sit amet, consetetur sadipscing elit voluptua.",
        logo:"situationskontrolle.png",
        color:"#cae2e2"
    },
    {
        label:"Optimismus",
        link:"/starkmacher/optimismus",
        description:"Lorem ipsum dolor sit amet, consetetur sadipscing elit voluptua.",
        logo:"optimismus.png",
        color:"#fde802"
    }        
        ]);

    const [aktiverStarmacher, setAktiverStarmacher] = useState(3);

    const onAndererStarkmacher =()=>{
        setAktiverStarmacher(aktiverStarmacher + 1 >= neueStarkmacherListe.length ? 0 : aktiverStarmacher+1);        
    }

    const onSelect = (neuAktiv)=>{
        setAktiverStarmacher(neuAktiv);
    }

    return (
        <Container>
        <Space direction="vertical" size="large">
            <LinkContainer to="/starkmacher"><Button variant="secondary">Zurück zu meinen Starkmachern</Button></LinkContainer>
            <b>Welchen neuen Starkmacher möchtest du heute ausprobieren?</b>
        </Space>
        <Carousel activeIndex={aktiverStarmacher} onSelect={onSelect}>
        {neueStarkmacherListe.map((item,key)=>                
            <Carousel.Item key={item.key}>
            	<Carousel.Caption  style={{backgroundColor:item.color,position:"static",color:"black",minHeight:"500px"}}>
                <div style={{width:"80%",margin:"auto",marginBottom:"2em"}}>
                    <Space direction="vertical">
                    <h2>{item.label}</h2>
                    <b>{item.description}</b>
                    <div><img style={{maxWidth:"100%"}} src="video.png"/></div>  
                    <Space>
                    <LinkContainer to={item.link}><Button>Let´s go!</Button></LinkContainer>
                    <Button onClick={onAndererStarkmacher} variant="secondary">Anderen Starkmacher ausprobieren</Button>
                    </Space>
                    </Space>             
                </div>
                </Carousel.Caption>
            </Carousel.Item>              
        )}
    	</Carousel>
        
        </Container>
    )
}

export default NeueStarkmacher

