import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { IoIosArrowForward, IoIosContact, IoIosTrendingUp, IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import {BiShieldQuarter} from "react-icons/bi"

const Profil = () => {


    const items = [{
        icon: <IoIosContact/>,
        name: "Account"
    },
    {
        icon: <IoIosTrendingUp/>,
        name: "Stimmungsverlauf"
    },
    {
        icon: <IoMdNotificationsOutline/>,
        name: "Benachrichtigung"
    },
    {
        icon: <BiShieldQuarter/>,
        name: "Datenschutz"
    },
    {
        icon: <IoMdSettings/>,
        name: "Einstellungen"
    },

]
    return (
        <Container className="d-grid gap-3">
            {
                items.map(item => 
                    <Row xs={6}  md={5} className="justify-content-center gap-3 ">
                        <Col xs={1} md={1} >{item.icon}</Col>
                        <Col xs={4} md={3} className="lh-lg">{item.name}</Col>
                        <Col xs={1} md={1}><IoIosArrowForward /></Col>
                    </Row>    
                )
            }
        </Container>
    )
}

export default Profil

