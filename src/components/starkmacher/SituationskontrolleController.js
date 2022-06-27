import React from 'react';
import SituationskontrolleAlpenMethode from './SituationskontrolleAlpenMethode';
import SituationskontrolleNachkontrolle from './SituationskontrolleNachkontrolle';

export default class SituationskontrolleController extends React.Component {
    constructor() {
        super();
       this.state =  {texte: [{textAufgabe: '', textLaenge: '', textPuffer: '', markiert: false},
       {textAufgabe: 'Aufräumen', textLaenge: '', textPuffer: '', markiert: false},
       {textAufgabe: 'Wäsche waschen', textLaenge: '', textPuffer: '', markiert: false},
       {textAufgabe: 'Hausaufgaben machen', textLaenge: '', textPuffer: '', markiert: false}], 
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