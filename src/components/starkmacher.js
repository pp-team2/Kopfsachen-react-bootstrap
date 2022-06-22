import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useState } from 'react';

const Starkmacher = (props) => {
    const [starkmacherListe, setStarkmacherListe] = useState([
    {
        label:"Sicherheitsnetz",
        link:"/starkmacher/sicherheitsnetz",
        logo:"sicherheitsnetz.png"
    },
    {
        label:"Situationskontrolle",
        link:"/starkmacher/Situationskontrolle",
        logo:"situationskontrolle.png"
    }      
        ]);
    
    return (
        <Container>
            <b>Du hast schon so viele Starkmacher für dich entdeckt.</b><br/>
            <b>Wenn du an deinen bestehenden Starkmachern arbeiten willst, klicke einfach auf das entsprechende Symbol! Ansonsten bekommst du nach einem Klick auf “Neue Starkmacher entdecken” eine Auswahl an neuen Übungen vorgeschlagen.</b>
            <br/>
            <ListGroup>
            {starkmacherListe.map((item,key)=>
                <LinkContainer to={item.link} style={{cursor:"pointer"}}>
                <ListGroup.Item key={item.key}>
                    <img style={{width:"100px"}} src={item.logo}/>&nbsp;
                    <b>{item.label}</b>
                </ListGroup.Item>
                </LinkContainer>
            )}
            </ListGroup>
            <br/>
            <LinkContainer to="/neueStarkmacher"><Button>Neue Starkmacher entdecken</Button></LinkContainer>

        </Container>
    )
}

export default Starkmacher

