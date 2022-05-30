import {React, useState, useEffect} from 'react'
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


const Navigator = () => {

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
      <Navbar bg="light" fixed="top" style={{ position: "sticky", transition: "0.5s"}} expand="lg" className={scrolled ? 'shadow' : ''}>
        <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image height={scrolled ? '20' : '15'} src="/logo.png" style={{transition: "0.5s"}}  />
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

export default Navigator

/*

              <LinkContainer to="/home">
                <Nav.Link>
                  <FiHome style={{marginRight: "7px", marginTop: "-3px"}} />
                    Home
                </Nav.Link>
              </LinkContainer>
              */