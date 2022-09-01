import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { IoIosArrowForward, IoIosContact, IoIosTrendingUp, IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import {BiShieldQuarter} from "react-icons/bi"
import {LinkContainer} from "react-router-bootstrap";

const Profil = () => {


    const items = [{
        link: '',
        icon: <IoIosContact/>,
        name: "Account"
    },
    {
        link: '/stimmungsverlauf',
        icon: <IoIosTrendingUp/>,
        name: "Stimmungsverlauf"
    },
    {
        link: '',
        icon: <IoMdNotificationsOutline/>,
        name: "Benachrichtigung"
    },
    {
        link: '',
        icon: <BiShieldQuarter/>,
        name: "Datenschutz"
    },
    {
        link: '',
        icon: <IoMdSettings/>,
        name: "Einstellungen"
    },

]
    return (
        <Container className="d-grid gap-3">
            {
                items.map(item =>
                  <LinkContainer to={item.link}>
                    <Row xs={6}  md={5} className="justify-content-center gap-3 ">
                        <Col xs={1} md={1} >{item.icon}</Col>
                        <Col xs={4} md={3} className="lh-lg">{item.name}</Col>
                        <Col xs={1} md={1}><IoIosArrowForward /></Col>
                    </Row>
                  </LinkContainer>
                )
            }
        </Container>
    )
}

export default Profil

