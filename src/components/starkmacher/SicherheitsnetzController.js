import React from 'react';
import Sicherheitsnetz from './Sicherheitsnetz';
import Aktiviatet from './Aktivitaet';
import Feedback from './Feedack';
import AktiviatetHilfe from './AktivitaetHilfe';
import API from '../API';

export default class SicherheitsnetzController extends React.Component {
    constructor(props) {
        super(props);

        let activities = [{id: 0, text: '', picture: '', placeID: '', strategies: [''],
        feedback: [{timestamp: '', comment: '', itHelped: false}]}];
        //let lastID = 0;

        // Aktuelle Antwort (26.07.2022 - 12:30 Uhr): 404 (Not Found)
        // Wird aber so auch noch nicht funktionieren, weil die Anfrage asnychron verläuft. Wir brauche aber eine synchrone Anfrage bzw. äquivalente Lösungen
        async function fetchDataGET() {
            const jsonRes = await API.getSafetyNet(props.sessionToken);

            console.log("Test GET Sicherheitsnetz: ");
            console.log(jsonRes);
            
            if (jsonRes) {
                // Transformiert die Daten in das Format welches hier verwendet wird
                jsonRes.forEach(line => {
                    // Die Symboltypen in die source-Adresse übersetzen
                    let imgSrc;
                    switch (line.type) {
                        case 'friends':
                            imgSrc = "/personen.png";
                            break;
                        case 'sport':
                            imgSrc = "/kreativ.png";
                            break;
                        case 'pet':
                            imgSrc = "/tier.png";
                            break;
                        case 'music':
                            imgSrc = "/kreativ.png";
                            break;
                        case 'personality':
                            imgSrc = "/personen.png";
                            break;
                        case 'situationControl':
                            imgSrc = "/personen.png";
                            break;
                        case 'relaxation':
                            imgSrc = "/kreativ.png";
                            break;
                        case 'other':
                            imgSrc = "/sonstiges.png";
                            break;
                        default:
                            imgSrc = "/sonstiges.png";
                    }
        
                    activities.push({id: line.id, text: line.name, picture: imgSrc, placeID: 'svg_'+line.id, strategies: line.strategies, feedback: line.feedback});
                    //lastID = activities[activities.length-1].id; 
            });
            }
            
        }
        fetchDataGET();

        // Lädt die abgespeicherten Aktivitäten (synchron)
        /* let xhr = new XMLHttpRequest();
        //http://127.0.0.1:4010/safetyNet
        console.log(props.sessionToken);
        xhr.open("GET",'https://motivator.api.live.mindtastic.lol/safetyNet', false);
        xhr.setRequestHeader('Access-Control-Allow-Origin','*');
        xhr.setRequestHeader('Authorization',`Bearer ${props.sessionToken}`);
        xhr.setRequestHeader('RequestMode', 'no-cors');
        xhr.send();
        let data = JSON.parse(xhr.responseText);

        // Transformiert die Daten in das Format welches hier verwendet wird
        data.forEach(line => {
            // Die Symboltypen in die source-Adresse übersetzen
            let imgSrc;
            switch (line.type) {
                case 'friends':
                    imgSrc = "/personen.png";
                    break;
                case 'sport':
                    imgSrc = "/kreativ.png";
                    break;
                case 'pet':
                    imgSrc = "/tier.png";
                    break;
                case 'music':
                    imgSrc = "/kreativ.png";
                    break;
                case 'personality':
                    imgSrc = "/personen.png";
                    break;
                case 'situationControl':
                    imgSrc = "/personen.png";
                    break;
                case 'relaxation':
                    imgSrc = "/kreativ.png";
                    break;
                case 'other':
                    imgSrc = "/sonstiges.png";
                    break;
                default:
                    imgSrc = "/sonstiges.png";
            }

            activities.push({id: lastID+1, text: line.name, picture: imgSrc, placeID: 'svg_'+(lastID+1), strategies: line.strategies, feedback: line.feedback});
            lastID = activities[activities.length-1].id; 
        });*/
 
        // Wie das Sicherheitsnetz geladen wurde (Zum ersten Mal beim Öffnen der App oder als Starkmacher)
        let alsStarkmacher = this.props.alsStarkmacher;

        // Setzt den State
        this.state = {site: null, clickID: 0, 
            activities: activities, alsStarkmacher: alsStarkmacher}; 

        this.addNewActivity = this.addNewActivity.bind(this);
        this.selectNewActivity = this.selectNewActivity.bind(this);
        this.saveActivity = this.saveActivity.bind(this);
        this.uebungBeenden = this.uebungBeenden.bind(this);
        this.commentActivity = this.commentActivity.bind(this);
        this.addStrategy = this.addStrategy.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
        this.postActivity = this.postActivity.bind(this);
        this.deleteActivityAPI = this.deleteActivityAPI.bind(this);
    }

    // Aktuelle Antwort (26.07.2022 - 12:30 Uhr): 500 (Internal Server Error)
    // Sendet eine Aktivität an die API
    postActivity(activity) {
        console.log(activity);
        
        let sessionToken = this.props.sessionToken;
        async function fetchDataPOST(name, type, strategies) {
            let test = await API.postSafetyNet(sessionToken, name, type, strategies);
            console.log("Test POST Sicherheitsnetz: ");
            console.log(test);
        }
        fetchDataPOST(activity.name, activity.type, activity.strategies);
    }

    // Sendet DELETE Anfrage an den Server damit die Aktivität gelöscht wird im Backend
    deleteActivityAPI(id) {
        console.log("Zu löschende ID: " + id);

        async function fetchDELETE() {
            let answer = await API.deleteSafetyNet(sessionToken, id);
            console.log("DELETE Activity in Sicherheitsnetz: ");
            console.log(answer);
        }
        fetchDELETE();
    }

    // Transformiert das Format der Aktivitätsobjekte in das Format für die API
    transformActivitiy(activity) {
        let name = activity.text;
        let type;
        switch (activity.picture) {
            case '/personen.png':
                type = "people";
                break;
            case '/kreativ.png':
                type = "activities";
                break;
            case '/tier.png':
                type = "pets";
                break;
            case '/situationskontrolle.png':
                type = "situationControl";
                break;
            case '/tagebuch.jpg':
                type = "relaxation";
                break;
            case '/sonstiges.png':
                type = "other";
                break;
            // TODO: Es fehlt noch der Typ personalStrengths! 
            default:
                type = "other";
        }
        let strategies = activity.strategies;
        let feedback = activity.feedback;
        return {name: name, type: type, strategies: strategies, feedback: feedback};
    }

    saveActivity(text, picture, placeID) {
        // Speichert die Aktivität hier im State
        let alte = this.state.activities;
        // Schaut sich die ID der letzten Aktivität an und setzt sie dann eins hoch
        let lastID = alte[alte.length-1].id;
        alte.push({id: lastID+1, text: text, picture: picture, placeID: placeID, strategies: [], feedback: []});
        this.setState({activities: alte});

        console.log(this.state.activities);
        this.postActivity(this.transformActivitiy(this.state.activities.filter(line => line.id === lastID+1)[0]));
    }

    addStrategy(id, comments) {
        let activities = this.state.activities;

        activities = activities.map(line => {
        // Suche nach der richtigen ID
         if (line.id === id) {
            // Füge die neuen Strategien zu den alten hinzu
            let newOldStrategies = line.strategies;
            comments.forEach(line => newOldStrategies.push(line));
            line.strategies = newOldStrategies;
         }   
         return line;
        });

        this.setState({activities: activities});

        this.selectNewActivity();
    }

    // Löscht eine Aktivität aus dem Array im State
    deleteActivity(id) {
        let activities = this.state.activities;
        activities = activities.filter(line => line.id !== +id);
        this.setState({activities: activities});

        this.deleteActivityAPI(id);
    }

    addNewActivity(id) {
        // Zeigt den Bildschirm einer neuen Aktivität hinzufügen an
        this.setState({site: 1, clickID: id});
    }

    commentActivity(id) {
        this.setState({site: 2, clickID: id});
    }

    uebungBeenden() {
        // Wenn die Übung beendet wird
        this.setState({site: 3});
    }
    
    selectNewActivity() {
        // Zeigt den Bildschrim des Sicherheitsnetzes an
        this.setState({site: 0});
    }

    

    render() {
        let toShow;
        
        switch (this.state.site) {
            case 0: toShow = <Sicherheitsnetz uebungBeenden={this.uebungBeenden} activities={this.state.activities} addNewActivity={this.addNewActivity} deleteActivity={this.deleteActivity} commentActivity={this.commentActivity} alsStarkmacher={this.state.alsStarkmacher}></Sicherheitsnetz>
                break;
            case 1: toShow = <Aktiviatet selectNewActivity={this.selectNewActivity} saveActivity={this.saveActivity} clickID={this.state.clickID} postActivity={this.postActivity}></Aktiviatet>
                break;
            case 2: toShow = <AktiviatetHilfe activity={this.state.activities.filter(line => line.id === this.state.clickID)} addStrategy={this.addStrategy} selectNewActivity={this.selectNewActivity}></AktiviatetHilfe>
                break;
            case 3: toShow = <Feedback></Feedback>
                break;
            default: toShow = <Sicherheitsnetz addNewActivity={this.addNewActivity} activities={this.state.activities} deleteActivity={this.deleteActivity} commentActivity={this.commentActivity} alsStarkmacher={this.state.alsStarkmacher}></Sicherheitsnetz>
        }
        return (
            <div>
                {toShow}
            </div>
        )
    }
}