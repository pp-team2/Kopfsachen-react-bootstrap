import React from 'react';
import SituationskontrolleAlpenMethode from './SituationskontrolleAlpenMethode';
import SituationskontrolleNachkontrolle from './SituationskontrolleNachkontrolle';

export default class SituationskontrolleController extends React.Component {
    constructor() {
        super();
       this.state =  {texte: [{id: 0, textAufgabe: '', laenge: '', puffer: '', markiert: false},
       {id: 1, textAufgabe: 'Aufräumen', laenge: '60 Minuten', puffer: '20 Minuten und 0 Sekunden', markiert: false},
       {id: 2, textAufgabe: 'Wäsche waschen', laenge: '30 Minuten', puffer: '10 Minuten und 0 Sekunden', markiert: false},
       {id: 3, textAufgabe: 'Hausaufgaben machen', laenge: '45 Minuten', puffer: '15 Minuten und 0 Sekunden', markiert: false}], 
       erinnerung: false, timestamp: undefined};

       this.texteSpeichern = this.texteSpeichern.bind(this);
       this.setErinnerung = this.setErinnerung.bind(this);
    }

    texteSpeichern(texte) {
        this.setState({texte: texte});
        console.log(texte);
    }

    setErinnerung() {
        this.setState({erinnerung: true, timestamp: Date.now()});
    }

    render() {
        return (
            <div>
                {/* <SituationskontrolleNachkontrolle texte={this.state.texte}></SituationskontrolleNachkontrolle> */}
                <SituationskontrolleAlpenMethode texteSpeichern={this.texteSpeichern} setErinnerung={this.setErinnerung}></SituationskontrolleAlpenMethode>
            </div>
        )
    }
}