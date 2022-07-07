import {React, useState, useEffect} from 'react'
import {Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-bootstrap/Image'
import { FiHome, FiBookOpen, FiUser } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdOutlineLocalHospital } from "react-icons/md";
import LoginModal from "./LoginModal"
import Logout from "./Logout"

const navItems = [{
  route: "/Home",
  icon: <FiHome size={18} />,
  label: "Home",
  requiresSession: false
},{
  route: "/tagebuch",
  icon: <FiBookOpen size={18} />,
  label: "Stimmungstagebuch",
  requiresSession: true     
},{
  route: "/wikilist",
  icon: <BiBrain size={18}  />,
  label: "Wiki",
  requiresSession: false  
},{
  route: "/starkmacher",
  icon: <GiWeightLiftingUp size={18}  />,
  label: "Starkmacher",
  requiresSession: true      
},{
  route: "/notfall",
  icon: <MdOutlineLocalHospital size={18} />,
  label: "Notfallnummern",
  requiresSession: false      
},{
  route: "/profil",
  icon: <FiUser size={18} />,
  label: "Profil"      ,
  requiresSession: true
}]


const Navigator = (props) => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);


  
    return (
      <Navbar fixed="top" style={{ position: "sticky", transition: "0.5s", backgroundColor: "#fff"}} expand="lg" className={scrolled ? 'shadowNav' : ''}>
        <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image height={scrolled ? '20' : '15'} src="/logo.png" style={{transition: "0.5s"}}  />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {navItems.map((item, index) => { return(
              <LinkContainer key={index} to={item.route} style={{display: (item.requiresSession && !props.sessionActive) ? "none" : "block"}}>
                <Nav.Link >
                <Row>
                  <Col xs={2} lg={12}>{item.icon}</Col>
                  <Col xs={2} lg={12} className="navLabel">{item.label}</Col>
                </Row>


        
                </Nav.Link>
              </LinkContainer>)
              })
            }
            </Nav>
            <Nav>
            <LoginModal accountKey={props.accountKey} preLines={props.expertView} sessionActive={props.sessionActive} setExpertView={props.setExpertView} />
            <Logout sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} />
         </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Navigator

/*

              <LinkContainer to="/home">
                <Nav.Link>
                  <FiHome style={{marginRight: "7px", marginTop: "-3px"}} />
                    Home
                </Nav.Link>
              </LinkContainer>
              */