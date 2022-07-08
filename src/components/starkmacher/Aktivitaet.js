import React from 'react';
import './aktivitaet.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FiArrowLeft } from "react-icons/fi";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


export default class Aktiviatet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {text: '', picture: ''};

        this.selectNewActivity = this.selectNewActivity.bind(this);
        this.textChange = this.textChange.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.exit = this.exit.bind(this);
        this.save = this.save.bind(this);
        this.backButtonClicked = this.backButtonClicked.bind(this);
    }

    backButtonClicked() {
        this.props.selectNewActivity();
    }

    selectNewActivity() {
        // Wenn auf "Weitere Ressourcen hinzufügen" geklickt wurde
        this.save();
        this.props.selectNewActivity();
    }

    textChange(elem) {
        // Wenn der Text im Input-Feld text geändert wurde, dann ändere den state
        this.setState({text: elem.target.value});

        // Macht den Button zu weiteren Ressourcen zugänglich (wenn Text und Bild vorhanden), ansonsten wieder disabled
        if (elem.target.value && this.state.picture) {
            document.querySelector('#weitereRessource').classList.remove('disabled');
        } else {
            document.querySelector('#weitereRessource').classList.add('disabled');
        }
    }

    pictureChange(elem) {
        // Entfernt alle Border von den Bildern die zur Auswahl stehen
        document.querySelectorAll('img').forEach(element => element.style.opacity = '0.5');
        // Setzt den Border wieder an dem Bild was ausgewählt wurde
        document.querySelector('#'+elem.target.getAttribute('id')).style.opacity = "1";
        // Speichert das ausgewählte Bild im state
        this.setState({picture: document.querySelector('#'+elem.target.getAttribute('id')).getAttribute('src')});

        // Macht den Button zu weiteren Ressourcen zugänglich (wenn Text und Bild vorhanden)
        if (this.state.text) {
            document.querySelector('#weitereRessource').classList.remove('disabled');
        }
    }


    save() {  
        // Ruft die saveActitivty-Funktion in SicherheitsnetzController auf um die Aktivität zu speichern
        this.props.saveActivity(this.state.text, this.state.picture, this.props.clickID);
    }

    exit() {
        // Wenn auf "Das sind alle Ressourcen" geklickt wurde
        this.save();
    }

    render() {
        return (
            <Container id="aktivitaetsAuswahl">
                <Card>
                <Card.Body>
                <Row>
                    <Col>
                        <Button id="backButton" variant="success" onClick={this.backButtonClicked}><FiArrowLeft/>Zurück</Button>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <br></br>
                        <p>Das bereitet mir eine Freude:</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <InputGroup >
                        <Form.Control  onChange={this.textChange} type="text" />
                    </InputGroup>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <br></br>
                        <p>Zu welcher Kategorie gehört diese Ressource?</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img className="ressource" id="p_1" onClick={this.pictureChange} src="/personen.png" alt="Personen" />
                    </Col>
                    <Col>
                        <img className="ressource" id="p_2" onClick={this.pictureChange} src="/tier.png" alt="Tier" />
                    </Col>
                    <Col>
                        <img className="ressource" id="p_3" onClick={this.pictureChange} src="/kreativ.png" alt="Kreative Aktivität" />
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        <img className="ressource" id="p_4" onClick={this.pictureChange} src="/sonstiges.png" alt="Sonstige Aktivität" />
                    </Col>
                   {/*  <Col>
                        <img className="ressource" id="p_5" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" />
                    </Col>
                    <Col>
                        <img className="ressource" id="p_6" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" />
                    </Col> */}  
                </Row>
                <Row>
                    <Col>
                        <Button id="weitereRessource" variant="success" onClick={this.selectNewActivity} className="disabled">Ressource zum Sicherheitsnetz hinzufügen</Button>
                    </Col>
                    {/* <Col>
                        <LinkContainer to="/home">
                            <Button id="alleRessourcen" onClick={this.exit} variant="success">Das sind alle Ressourcen</Button>
                        </LinkContainer>
                    </Col> */}
                </Row>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}