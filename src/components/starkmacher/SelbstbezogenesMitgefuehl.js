import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './situationskontrolle.css';
import { LinkContainer } from 'react-router-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default class SelbstbezogenesMitgefuehl extends React.Component {
    constructor() {
        super();
        this.state = {tooltipText: "Beende zuerst die Meditation"};

        this.audioEnded = this.audioEnded.bind(this);
    }

    // Wenn auf den Schriftzug starte das Audio geklickt wurde
    scroll() {
        window.scrollTo(0, 400);
        document.getElementById('audioControl').play();
    }
    
    // Wenn das Audio fertig gehört wurde oder es einen Fehler gab
    audioEnded() {
        window.scrollTo(0, 500);
        document.getElementById('meditationBeendet').classList.remove('disabled');
        this.setState({tooltipText: "Weiter"})
    }

    render() {
        return (
            <Container>
                <Row>
                    <p>
                        Begib dich an einen ungestörten Ort, 
                        suche dir eine bequeme Position im Sitzen und <a id="audioVerweis" onClick={this.scroll}>starte das Audio.</a>
                    </p>
                </Row>
                <Row>
                    <img src="../meditation.webp"></img>
                    <audio id="audioControl" onError={this.audioEnded} onEnded={this.audioEnded} controls>
                        <source src="../compassion-Meditation.mp3" type="audio/mp3" />
                        Dein Browser unterstützt leider dieses Audio Element nicht. 
                        Versuche es mit einem anderen Browser.
                    </audio>
                </Row>
                <Row>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">{this.state.tooltipText}</Tooltip>}>
                        <div className="d-inline-block">
                            <LinkContainer to='/home'>
                                <Button id="meditationBeendet" className="disabled" variant="success" style={{ pointerEvents: 'none' }}>Geschafft</Button>
                            </LinkContainer>
                        </div>
                    </OverlayTrigger>
                        
                </Row>
            </Container>
        )
    }
}