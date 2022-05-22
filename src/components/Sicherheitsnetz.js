import React from 'react';
import './sicherheitsnetz.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export default class Sicherheitsnetz extends React.Component {
     constructor(props) {
        super(props);

        this.state = {images: []};

        this.addActivities = this.addActivities.bind(this);
        this.uebungBeenden = this.uebungBeenden.bind(this);
    } 

    componentDidMount() {
        // Gespeicherte Aktivitäten hinzufügen
        this.addActivities();
        // Wenn auf ein Kreis geklickt wird, dann soll man zum Aktivitätsbildschirm kommen
        let addNewActivity = this.props.addNewActivity;
        // Alle Kreise des SVG-Elements
        let point = document.querySelectorAll("ellipse");
        
        // Für jeden Kreis ein Event-Listener hinzufügen, damit man auf jeden Kreis raufklicken kann
        [...point].forEach(function(elem) {
            elem.addEventListener("click", function(evt) {
                let id = evt.target.getAttribute("id");
                addNewActivity(id);
                
            }); 
        });

        // Wenn die Übung bereit ist zum beenden (es wurde eine Aktivität hinzugefügt), dann soll der Button dazu sichtbar werden
        if (!this.props.uebungBeenden) {
             document.querySelector('#beendenBtn').style.visibility = 'hidden';
        }
    }

    addActivities() {
        // Alle gespeicherten Aktivitäten abrufen
        let activities = this.props.activities;

        // Wenn noch keine Aktivitäten gespeichert sind, breche die Funktion ab
        if (activities === undefined) {
            return;
        } else {
            activities.forEach(line => {
                // placeID beschreibt wo das Bild dann platziert werden soll
                if (line.placeID === '') {
                    return;
                } else {
                    // x und y Koordinaten für das Bild
                    let x = document.getElementById(line.placeID).getAttribute('cx');
                    let y = document.getElementById(line.placeID).getAttribute('cy');

                    // JSX-Element des Bildes mit Tooltip für den Text
                    let newImageElement = 
                    <image key={line.id} x={x} y={y} transform='translate(-40,-40)' href={line.picture.getAttribute('src')} height='80' width='80'>
                        <title>{line.text}</title>
                    </image>

                    // neuen State setzen
                    let images = this.state.images;
                    images.push(newImageElement);
                    this.setState({images: images});

                    // macht den ausgewählten Kreis Weiß
                    document.getElementById(line.placeID).setAttribute('fill', '#ffffff');
                    return;
                }
            });
        }
    }

    uebungBeenden() {
        console.log(this.props);
        this.props.uebungBeenden(); 
    }


    render() {
        let images = this.state.images;

        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Welche Personen oder Aktivitäten bereiten dir im Alltag Freude und geben dir Antrieb?</h3>
                        <Button id="beendenBtn" onClick={this.uebungBeenden}>Übung beenden</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <svg id='svgNetz' width="98%" height="100%" viewBox='0 0 600 600'>
                            <g id='gNetz'>
                                <line fill="none" id="svg_32" stroke="#000000" strokeWidth="5" x1="145" x2="426" y1="287.5" y2="289.5"/>
                                <line fill="none" id="svg_31" stroke="#000000" strokeWidth="5" x1="153" x2="439" y1="144.5" y2="147.5"/>
                                <line fill="none" id="svg_30" stroke="#000000" strokeWidth="5" x1="362" x2="361" y1="338.5" y2="72.5"/>
                                <line fill="none" id="svg_29" stroke="#000000" strokeWidth="5" x1="213" x2="212" y1="348.5" y2="69.5"/>
                                <line fill="none" id="svg_28" stroke="#000000" strokeWidth="5" x1="208" x2="446" y1="338.5" y2="134.5"/>
                                <line fill="none" id="svg_27" stroke="#000000" strokeWidth="5" x1="363" x2="142" y1="337.5" y2="143.5"/>
                                <line fill="none" id="svg_26" stroke="#000000" strokeWidth="5" x1="144" x2="364" y1="291.5" y2="78.5"/>
                                <line fill="none" id="svg_25" stroke="#000000" strokeWidth="5" x1="207" x2="435" y1="74.5" y2="287.5"/>
                                <line fill="none" id="svg_24" stroke="#000000" strokeWidth="5" x1="288" x2="287" y1="49.499995" y2="386.5"/>
                                <line fill="none" id="svg_22" stroke="#000000" strokeWidth="5" x1="113" x2="464" y1="218.5" y2="218.5"/>
                                <ellipse cx="107.000001" cy="220.5" fill="#c32e04" id="svg_4" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                {/* <image x="285.000001" y="52" transform="translate(-50,-50)" href='/tagebuch.jpg' width="100" height="100">
                                    <title>Das ist ein ganz tolles Bild</title>
                                </image> */}
                                <ellipse cx="285.000001" cy="52" fill="#c32e04" id="svg_6" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="366.000001" cy="80" fill="#c32e04" id="svg_7" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="432.000001" cy="144" fill="#c32e04" id="svg_8" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="462.000001" cy="221" fill="#c32e04" id="svg_9" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5"/>
                                <ellipse cx="291.000001" cy="378" fill="#c32e04" id="svg_10" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="416.000001" cy="289" fill="#c32e04" id="svg_11" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5"/>
                                <ellipse cx="213.000001" cy="350" fill="#c32e04" id="svg_12" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="150.000001" cy="293" fill="#c32e04" id="svg_13" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="152.000001" cy="146" fill="#c32e04" id="svg_14" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="206.000001" cy="78" fill="#c32e04" id="svg_15" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="368.000001" cy="352" fill="#c32e04" id="svg_16" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="206.000001" cy="217" fill="#c32e04" id="svg_17" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse cx="287.000001" cy="216" fill="#c32e04" id="svg_18" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5"/>
                                <ellipse cx="289.000001" cy="137" fill="#c32e04" id="svg_19" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5"/>
                                <ellipse cx="295.000001" cy="297" fill="#c32e04" id="svg_20" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5"/>
                                <ellipse cx="374.000001" cy="214" fill="#c32e04" id="svg_21" rx="36.000001" ry="36" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)"/>
                            </g>
                            <g>
                                { images }
                            </g>
                        </svg>
                    </Col>
                </Row>
            </Container>
        )
    }
}