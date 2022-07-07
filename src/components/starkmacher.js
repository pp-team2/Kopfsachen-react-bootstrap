import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useState } from 'react';
import { Space } from 'antd';

const Starkmacher = (props) => {
    const [starkmacherListe, setStarkmacherListe] = useState([
    {
        label:"Sicherheitsnetz",
        link:"/starkmacher/sicherheitsnetz",
        logo:"sicherheitsnetz.png"
    },
    {
        label:"Situationskontrolle",
        link:"/starkmacher/situationskontrolle",
        logo:"situationskontrolle.png"
    }      
        ]);
    
    return (
        <Container>
            <Space direction="vertical" size="large">
            <b>Du hast schon so viele Starkmacher für dich entdeckt.</b>
            <b>Wenn du an deinen bestehenden Starkmachern arbeiten willst, klicke einfach auf das entsprechende Symbol! Ansonsten bekommst du nach einem Klick auf “Neue Starkmacher entdecken” eine Auswahl an neuen Übungen vorgeschlagen.</b>
            <ListGroup>
            {starkmacherListe.map((item,key)=>
                <LinkContainer to={item.link} style={{cursor:"pointer"}}>
                <ListGroup.Item action key={item.key}>
                    <Space size="large">
                    <img style={{width:"100px"}} src={item.logo}/>
                    <b>{item.label}</b>
                    </Space>
                </ListGroup.Item>
                </LinkContainer>
            )}
            </ListGroup>          
            <LinkContainer to="/neueStarkmacher"><Button>Neue Starkmacher entdecken</Button></LinkContainer>
            </Space>

        </Container>
    )
}

export default Starkmacher

