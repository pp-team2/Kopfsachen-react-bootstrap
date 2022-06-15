import React from 'react';
import './aktivitaet.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap'


export default class Aktiviatet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {text: '', picture: ''};

        this.selectNewActivity = this.selectNewActivity.bind(this);
        this.textChange = this.textChange.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.exit = this.exit.bind(this);
        this.save = this.save.bind(this);
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
        document.querySelectorAll('img').forEach(element => element.style.border = '');
        // Setzt den Border wieder an dem Bild was ausgewählt wurde
        document.querySelector('#'+elem.target.getAttribute('id')).style.border = "black solid";
        // Speichert das ausgewählte Bild im state
        this.setState({picture: document.querySelector('#'+elem.target.getAttribute('id'))});
        //console.log(document.querySelector('.'+elem.target.getAttribute('class')));

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
            <Container id="aktivitaetsAuswahl" style={{textAlign: 'center'}}>
                <Row>
                    <Col>
                        <p>Das bereitet mir eine Freude:</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input onChange={this.textChange} type="text"></input>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                        <Button id="weitereRessource" onClick={this.selectNewActivity} className="disabled">Weitere Ressource hinzufügen</Button>
                    </Col>
                    {/* <Col>
                        <LinkContainer to="/home">
                            <Button id="alleRessourcen" onClick={this.exit} variant="success">Das sind alle Ressourcen</Button>
                        </LinkContainer>
                    </Col> */}
                </Row>
                
            </Container>
        )
    }
}