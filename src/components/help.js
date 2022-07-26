import React from 'react'
import {  Container, Card , Button} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const content = [{
    title: "jugendnotmail.de",
    link: "http://jugendnotmail.de",
    bulletpoints: ["kostenlose Online-Beratung", "Einzelchat-Beratung: Fachkräfte beraten dich kostenlos und datensicher zu jeder Lebenskrise. Di-Fr, 18-21 Uhr.", "Mail-Beratung: Hier kannst du jederzeit und zu jedem Thema schreiben.", "Themenchats: Zu bestimmten Themen finden hier organisierte Chats statt. Dort kannst du deine Fragen und Probleme in der Gruppe offen ansprechen und lesen, was andere schreiben.", "Foren: Hier können verschiedenste Themen rund um die Uhr diskutiert werden.", "krisenchat.de | 24/7 Krisenberatung per Chat"]
},{
    title: "krisenchat.de",
    link: "https://krisenchat.de",
    bulletpoints: ["per WhatsApp kannst du hier rund um die Uhr mit erfahrenen Krisenberater:innen chatten", "Egal ob es einfach das Bedürfnis ist mit jemandem zu reden, oder ein großes Problem - du kannst einfach schreiben!"]
}, {
    title: "bke-jugendberatung.de",
    link: "https://bke-jugendberatung.de",
    bulletpoints: ["Foren, Gruppenchats und Email-Beratung bei erfahrenen Berater:innen und im Austausch mit anderen Jugendlichen."]
},{
    title: "Nummer gegen Kummer",
    link: "https://www.nummergegenkummer.de",
    bulletpoints: ["Tel.: 116111", "Montags bis samstags von 14 - 20 Uhr.", "Dein Anruf ist anonym und kostenlos aus dem deutschen Festnetz und vom Handy.", "Auch Online-Beratung per Mail oder Chat unter: https://www.nummergegenkummer.de/"]
},{
    title: "Kindspace",
    link: "https://www.kindspace.me",
    bulletpoints: ["Moderierte Gruppengespräche zwischen Jugendlichen zum Austausch über Mental Health."]
}]


const Help = () => {
    return (
        <Container className="d-grid gap-4"> 
            <Tabs
                defaultActiveKey={content[0].title}
               variant="pills"
                className="mb-3"
                
            
            >
            {
                content.map(entry =>
                <Tab eventKey={entry.title} title={entry.title} key={entry.title}>
                    <Card style={{ marginTop: "-20px"}}>
                        <Card.Header>
                        {entry.title}
                        </Card.Header>
                        <div className="pdd">
                        {        
                        entry.bulletpoints.map((bullet, index) =>
                                                 <li key={index}>{bullet}</li>
                                             )   
                        }

                                 <br />               
                        <Button href={entry.link} size="md" variant="success">Mehr erfahren</Button>
                        </div>
                    </Card>       
                </Tab>
                )
            }
            </Tabs>
        </Container>
    )
}

export default Help
