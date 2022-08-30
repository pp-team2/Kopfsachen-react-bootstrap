import React from 'react';
import SituationskontrolleAlpenMethode from './SituationskontrolleAlpenMethode';
import SituationskontrolleNachkontrolle from './SituationskontrolleNachkontrolle';

export default class SituationskontrolleController extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {texte: [{id: 0, textAufgabe: '', laenge: '', puffer: '', markiert: false},
        {id: 1, textAufgabe: 'Aufräumen', laenge: '60 Minuten', puffer: '20 Minuten und 0 Sekunden', markiert: false},
        {id: 2, textAufgabe: 'Wäsche waschen', laenge: '30 Minuten', puffer: '10 Minuten und 0 Sekunden', markiert: true},
        {id: 3, textAufgabe: 'Hausaufgaben machen', laenge: '45 Minuten', puffer: '15 Minuten und 0 Sekunden', markiert: false}],
        erinnerung: false, timestamp: undefined, screen: 'alpen'};

        this.texteSpeichern = this.texteSpeichern.bind(this);
        this.setErinnerung = this.setErinnerung.bind(this);
        this.nachkontrolleLaden = this.nachkontrolleLaden.bind(this);
    }

    componentDidMount() {
        if (this.props.nachkontrolle) {
            this.setState({screen: 'nachkontrolle'});
        } else {
            this.setState({screen: 'alpen'});
        }
    }

    // Speichert die in der ALPEN-Methode erhobenen Aufgaben hier im state
    texteSpeichern(texte) {
        this.setState({texte: texte});
        console.log(texte);
    }

    // Es wurde auf den Button "Bitte erinner mich nachher" geklickt
    setErinnerung() {
        this.setState({erinnerung: true, timestamp: Date.now()});
        // TODO: Macht keinen Sinn es direkt zu notificaten (soll am Ende des Tages passieren)
        let notification = new Notification("Situationskontrolle Nachkontrolle", {
            body: "Klicke hier um mit der Nachkontrolle deiner Aufgaben zu beginnen!"
        });

        notification.addEventListener('click', this.nachkontrolleLaden);
    }

    nachkontrolleLaden() {
        window.location = "starkmacher/SituationskontrolleNachkontrolle";
    }

    render() {
        let toShow;
            switch(this.state.screen) {
                case 'alpen': 
                    toShow = <SituationskontrolleAlpenMethode texteSpeichern={this.texteSpeichern} setErinnerung={this.setErinnerung}></SituationskontrolleAlpenMethode>;
                    break;
                case 'nachkontrolle': 
                    toShow = <SituationskontrolleNachkontrolle texte={this.state.texte}></SituationskontrolleNachkontrolle>;
                    break;
                default: toShow = <SituationskontrolleAlpenMethode texteSpeichern={this.texteSpeichern} setErinnerung={this.setErinnerung}></SituationskontrolleAlpenMethode>; 
            }

        return (
            
            <div>
                { toShow }
            </div>
        )
    }
}