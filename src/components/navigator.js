import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-bootstrap/Image'
import { FiHome, FiBookOpen, FiUser } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdOutlineLocalHospital } from "react-icons/md";

const navItems = [{
  route: "/Home",
  icon: <FiHome />,
  label: "Home"
},{
  route: "/tagebuch",
  icon: <FiBookOpen />,
  label: "Stimmungstagebuch"      
},{
  route: "/wiki",
  icon: <BiBrain />,
  label: "Wiki"      
},{
  route: "/starkmacher",
  icon: <GiWeightLiftingUp />,
  label: "Starkmacher"      
},{
  route: "/notfall",
  icon: <MdOutlineLocalHospital />,
  label: "Notfallnummern"      
},{
  route: "/profil",
  icon: <FiUser />,
  label: "Profil"      
}]


const navigator = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image height="15" src="/logo.png" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {navItems.map((item, index) => { return(
              <LinkContainer key={index} to={item.route}>
                <Nav.Link>
                  <span style={{marginRight: "7px", marginTop: "-3px"}}>
                    {item.icon}
                  </span>
                  {item.label}
                </Nav.Link>
              </LinkContainer>)
              })
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default navigator

/*

              <LinkContainer to="/home">
                <Nav.Link>
                  <FiHome style={{marginRight: "7px", marginTop: "-3px"}} />
                    Home
                </Nav.Link>
              </LinkContainer>
              */