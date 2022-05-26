import React from 'react';
import './sicherheitsnetz.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


export default class Sicherheitsnetz extends React.Component {
     constructor(props) {
        super(props);

        this.state = {images: []};

        this.addActivities = this.addActivities.bind(this);
        this.uebungBeenden = this.uebungBeenden.bind(this);
        this.commentActivity = this.commentActivity.bind(this);
    } 

    componentDidMount() {
        // Gespeicherte Aktivitäten hinzufügen
        this.addActivities();
        // Wenn auf ein Kreis geklickt wird, dann soll man zum Aktivitätsbildschirm kommen
        let addNewActivity = this.props.addNewActivity;
        // Alle Kreise des SVG-Elements
        let point = document.querySelectorAll("circle");
        
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

                    // Popover für die einzelnen Kommentare
                    const popover = (
                        <Popover>
                            <Popover.Header>{line.text}</Popover.Header>
                            <Popover.Body>
                                
                                <ul>
                                    {line.feedback.map(feedback => {  
                                        return (<li key={feedback.timestamp}>{feedback.comment}</li>)
                                    })}
                                </ul>
                                
                                <Button id={line.id} onClick={this.commentActivity}>Bearbeiten</Button>
                            </Popover.Body>
                        </Popover>
                    )

                    // JSX-Element des Bildes mit Tooltip für den Text und Popover beim raufklicken
                    let newImageElement = 
                    <OverlayTrigger key={line.id} trigger="click" overlay={popover}>
                        <image x={x} y={y} transform='translate(-40,-40)' href={line.picture.getAttribute('src')} 
                            height='80' width='80'>
                            <title>{line.text}</title>
                        </image>
                    </OverlayTrigger>
                    // onClick={this.commentActivity}

                    // neuen State setzen
                    let images = this.state.images;
                    images.push(newImageElement);
                    this.setState({images: images});

                    // verdeckt den ausgewählten Kreis damit dieser nicht hinter dem Bild angezeigt wird
                    document.getElementById(line.placeID).setAttribute('visibility', 'hidden');
                    return;
                }
            });
        }
    }

    commentActivity(elem) {
        this.props.commentActivity(+elem.target.getAttribute('id'));
    }

    uebungBeenden() {
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
                        <svg id='svgNetz' width="98%" height="100%" viewBox='0 0 640 600'>
                            <g id='gNetz'>
                                <line id="svg_56" x1="481.5" x2="560.5" y1="239.5" y2="126.5"/>
                                <line id="svg_55" x1="80" x2="159" y1="348.5" y2="235.5"/>
                                <line id="svg_54" x1="479.5" x2="558.5" y1="234" y2="354"/>
                                <line id="svg_53" x1="82" x2="161" y1="128.5" y2="248.5"/>
                                <line id="svg_52" x1="317" x2="455" y1="139" y2="55"/>
                                <line id="svg_51" x1="181" x2="319" y1="416.5" y2="332.5"/>
                                <line id="svg_50" x1="322.5" x2="453.5" y1="337.5" y2="416.5"/>
                                <line id="svg_49" x1="187" x2="318" y1="57.5" y2="136.5"/>
                                <line id="svg_48" x1="322.5" x2="489.5" y1="135" y2="239"/>
                                <line id="svg_47" x1="153" x2="320" y1="240.5" y2="344.5"/>
                                <line id="svg_46" x1="325.5" x2="488.5" y1="339.5" y2="242.5"/>
                                <line id="svg_45" x1="154" x2="317" y1="237.5" y2="140.5"/>
                                <line id="svg_44" x1="321" x2="375" y1="136.5" y2="239.5"/>
                                <line id="svg_43" x1="264" x2="318" y1="240.5" y2="343.5"/>
                                <line id="svg_42" x1="325" x2="381" y1="332.5" y2="235.5"/>
                                <line id="svg_41" x1="265" x2="321" y1="238.5" y2="141.5"/>
                                <line id="svg_40" x1="326.5" x2="455.5" y1="34" y2="68"/>
                                <line id="svg_39" x1="185" x2="314" y1="415.5" y2="449.5"/>
                                <line id="svg_38" x1="319.5" x2="460.5" y1="443.5" y2="422.5"/>
                                <line id="svg_37" x1="181" x2="322" y1="60.5" y2="39.5"/>
                                <line id="svg_36" x1="80.5" x2="185.5" y1="348" y2="428"/>
                                <line id="svg_35" x1="453" x2="558" y1="53.5" y2="133.5"/>
                                <line id="svg_34" x1="450.5" x2="557.5" y1="425.5" y2="346.5"/>
                                <line id="svg_33" x1="81" x2="188" y1="133.5" y2="54.5"/>
                                <line id="svg_32" x1="553" x2="593" y1="122.5" y2="241.5"/>
                                <line id="svg_31" x1="45" x2="85" y1="238.5" y2="357.5"/>
                                <line id="svg_30" x1="548.5" x2="597.5" y1="352.5" y2="233.5"/>
                                <line id="svg_29" x1="38" x2="87" y1="242.5" y2="123.5"/>
                                <line id="svg_28" x1="150.5" x2="189.5" y1="237.5" y2="426.5"/>
                                <line id="svg_27" x1="448" x2="487" y1="54.5" y2="243.5"/>
                                <line id="svg_26" x1="488" x2="458" y1="236" y2="426"/>
                                <line id="svg_25" x1="183" x2="153" y1="58.5" y2="248.5"/>
                                <line id="svg_24" transform="matrix(1 0 0 1 0 0)" x1="79.5" x2="560.5" y1="239.25" y2="240.75"/>
                                <line id="svg_23" x1="81" x2="562" y1="137" y2="138.5"/>
                                <line id="svg_19" x1="319" x2="319" y1="50" y2="440.5"/>
                                <line id="svg_20" x1="59.999999" x2="576.000009" y1="346" y2="348.5"/>
                                {/* <image x="285.000001" y="52" transform="translate(-50,-50)" href='/tagebuch.jpg' width="100" height="100">
                                                                    <title>Das ist ein ganz tolles Bild</title>
                                                                </image> */}
                                <circle cx="318" cy="47" id="svg_3" r="43.46263" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="318" cy="144" id="svg_4" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="265" cy="241" id="svg_1" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="318" cy="338" id="svg_2" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="318" cy="435" id="svg_5" r="43.462631" />
                                <circle cx="48" cy="241" id="svg_6" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="593" cy="241" id="svg_7" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="157" cy="241" id="svg_8" r="43.462631" />
                                <circle cx="484" cy="241" id="svg_9" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="84" cy="134" id="svg_10" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="184" cy="60" id="svg_11" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="452" cy="60" id="svg_12" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="552" cy="134" id="svg_13" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="184" cy="422" id="svg_14" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="84" cy="348" id="svg_15" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="452" cy="422" id="svg_16" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>
                                <circle cx="552" cy="348" id="svg_17" r="43.462631" />
                                <circle cx="375" cy="241" id="svg_18" r="43.462631" transform="matrix(1 0 0 1 0 0)"/>

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