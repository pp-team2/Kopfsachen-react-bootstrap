import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export default class Sicherheitsnetz extends React.Component {
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
    }

    pictureChange(elem) {
        // Macht den Button zu weiteren Ressourcen wieder zugänglich
        document.querySelector('#weitereRessource').classList.remove('disabled');
        // Entfernt alle Border von den Bildern die zur Auswahl stehen
        document.querySelectorAll('img').forEach(element => element.style.border = '');
        // Setzt den Border wieder an dem Bild was ausgewählt wurde
        document.querySelectorAll('.'+elem.target.getAttribute('class')).forEach(element => element.style.border = "black solid");
        // Speichert das ausgewählte Bild im state
        this.setState({picture: document.querySelector('.'+elem.target.getAttribute('class'))});
        //console.log(document.querySelector('.'+elem.target.getAttribute('class')));
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
            <Container style={{textAlign: 'center'}}>
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
                        <img className="p_1" onClick={this.pictureChange} src="/logo.png" alt="Logo-Bild" style={{width: 30 + '%', height: 30 + '%'}}/>
                    </Col>
                    <Col>
                        <img className="p_2" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" style={{width: 30 + '%', height: 30 + '%'}}/>
                    </Col>
                    <Col>
                        <img className="p_3" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" style={{width: 30 + '%', height: 30 + '%'}}/>
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        <Button id="weitereRessource" onClick={this.selectNewActivity} className="disabled">Weitere Ressource hinzufügen</Button>
                    </Col>
                    <Col>
                        <Button id="alleRessourcen" onClick={this.exit} variant="success">Das sind alle Ressourcen</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}