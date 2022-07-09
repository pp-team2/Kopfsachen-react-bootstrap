import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sozialeUnterstuetzung.css';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

export default class SozialeUnterstuetzungInfoText extends React.Component {
     constructor(props) {
        super(props);

    } 

    render() {
        let level = this.props.level;
        let lvl1Text = <Container>
            <Card>
                <Card.Body>
                        <Row>
                            <b>
                               Um dir diesen Starkmacher genauer anzuschauen, überlege dir erst einmal welche Menschen es in deinem Umfeld gibt – 
                                    wer weiß immerhin, wer von ihnen dir in Zukunft vielleicht einmal in irgendeiner Form unterstützend zur Seite stehen kann?
                            </b>
                        </Row>
                        <Row>
                            <Col>
                                <p>Skizziere dazu dein persönliches Netzwerk in folgendem Schema mit dir selbst als gedachtem Mittelpunkt:</p>
                            </Col>
                            <Col>
                                <p><b>Der innere Kreis</b> – Trage hier die wichtigsten Menschen in deinem Leben ein.</p>
                                <p><b>Der mittlere Kreis</b> – Trage hier Personen ein, die dir noch nahe stehen und/oder mit denen du regelmäßig Zeit verbringst.</p>
                                <p><b>Der äußere Kreis</b> – Trage hier Bekannte und eher entferntere Personen ein, mit denen du aber auch ab und zu zu tun hast.</p>
                            </Col>
                        </Row>
                        </Card.Body>
                        </Card>

                <br></br>
                            <Alert>
                                Klicke einfach auf einen leeren Kreis, um Personen dem jeweiligen Kreis hinzuzufügen.
                            </Alert>
                      
                    </Container>

        let lvl2Text = <Container>
                        <Row>
                            <Col>
                                <p>
                                Schaue dir noch einmal dein soziales Netz an. 
                                Überlege welche Personen dich vielleicht schon wie unterstützt haben.
                                An wen kannst du dich in Bezug auf bestimmten Themen beziehungsweise Bedürfnissen am ehesten wenden? Versehe die Personen in deinem sozialen Netz mit den entsprechenden, unten beschriebenen Symbolen. (Jeder Person können 0-3 Symbole zugeordnet werden.)
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    <img className="symbol" src='/herz.png' alt='Bild vom Tagebuch'></img> = Emotionale Unterstützung 

                                    Manchmal tut es einfach nur gut über die eigenen Gefühle sprechen zu können und sich verstanden und akzeptiert zu fühlen: 
                                    Manchmal braucht man vielleicht auch nur eine mitfühlende Umarmung, Aufmunterung oder das Wissen, dass überhaupt jemand da ist. 
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    <img className="symbol" src='/buecher.png' alt='Bild vom Tagebuch'></img> = Informationale Unterstützung 

                                    Zwei Köpfe sind nicht selten besser als Einer. 
                                    Wissen, Ratschläge und Meinungen anderer können hilfreich sein, wenn wir uns mit Dingen nicht so sicher fühlen. 
                                    Vielleicht hat eine andere Person schon Erfahrungen mit einem bestimmten Problem gemacht oder kennt sich mit dem Thema aus, 
                                    welches uns Sorgen bereitet.  
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    <img className="symbol" src='/oberarm.png' alt='Bild vom Tagebuch'></img> = Instrumentale Unterstützung

                                    Bei so manchem Problem, das uns Kopfzerbrechen bereitet, kann praktische Hilfe Anderer - in Form von Taten 
                                    oder materiellen Dingen - einiges dazu beitragen die Situation zu lösen oder zumindest besser zu machen. 
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                Klicke einfach auf den jeweiligen Namen, um ein Symbol hinzuzufügen oder füge neue Namen ein.
                                </p>
                            </Col>
                        </Row>
                    </Container>
        
        let lvl3Text = <Container>
                        <Row>
                            <Col>
                                <p>
                                Fordere dich selbst heraus – markiere in jedem der 3 Kreise eine Person und schaue in den nächsten 2 Wochen,
                                ob du sie vielleicht auf die eine oder andere Weise unterstützen kannst und wie es dir dabei geht.
                                </p>
                            </Col>
                        </Row>
                        </Container>

        let toShow;
        switch (level) {
            case 1: 
                toShow = lvl1Text;
                break;
            case 2:
                toShow = lvl2Text;
                break;
            case 3:
                toShow = lvl3Text;
                break;
            default: toShow = lvl1Text;
        }
        return (
            <div>
                { toShow }
            </div>
               
        );
    }
}