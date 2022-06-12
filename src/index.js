import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/navigator'
import Tagebuch from './components/tagebuch'
import  Header  from './components/header'
import  Missing  from './components/missing'
import  Wiki  from './components/wikiList'
import Wikientry from './components/wikientry'
import Starkmacher from './components/starkmacher';
import NeueStarkmacher from './components/neueStarkmacher';
import Reframing from './components/starkmacher/reframing';
import Login from './components/login';
//https://www.flatuicolorpicker.com/colors/sauvignon/


const wiki = [
  {letter: "A",
    entries: [{
      title: "ABC Modell",
      content: "Anhand der ABC - Eselsbrücke lässt sich die Entstehung von Gefühlen veranschaulichen: A steht für eine auslösende Situation, B für die Bewertung der Situation und C für das englische Wort consequence. Ein Beispiel für eine auslösende Situation könnte sein, dass der Bus zu spät kommt. Diese Situation könnte negativ bewertet werden, weil man später zuhause ankommt oder aber man findet es vielleicht gar nicht so schlecht, weil man gerade noch mit seinen Freunden am Quatschen ist. Aus der jeweiligen Bewertung resultiert dann in consequence ein spezielles Gefühl. In unserem Beispiel könnte man sich über die Verspätung ärgern oder freuen.Je nachdem können also bei der gleichen auslösenden Situation (A) aufgrund von unterschiedlicher Bewertung (B) sehr unterschiedliche Gefühle die Konsequenz (C) sein.",
      img: "./logoBig.png",
    }]
  },
  {letter: "E",
  entries: [{
    title: "Emotion",
    content: "Unterschiedliche Emotionen wie Wut, Angst, Freude, Trauer oder Überraschung entstehen in Reaktion auf verschiedene auslösende Situationen und wie wir diese Situationen bewerten (siehe ABC-Modell). Man kann sie sich als vorbereitete Antwort-Tendenzen vorstellen, die uns im Laufe der Evolution geholfen haben rasch und möglichst adaptiv auf wichtige Chancen und Herausforderungen in unserer Umwelt zu reagieren: Beispielsweise indem unser Körper und Gehirn automatisch das Emotions-Programm ‚Angst‘ abruft, welches uns fluchtbereit macht, ohne dass wir dafür groß nachdenken müssten.. Jede Emotion besteht dabei aus vier miteinander in Wechselwirkung stehenden Elementen: Der die Emotion begleitenden Körperreaktion (1), den damit einhergehenden Gedanken (2), dem dazugehörigen Gefühl (3) und daran anschließendes Verhalten (4). Wenn man also eine Emotion beeinflussen will (siehe Emotionsregulation), um zum Beispiel einer negativen Emotion entgegenzuwirken, kann man an diesen vier Stellschrauben ansetzen.",
    img: "./logoBig.png",
  },
  {
    title: "Emotion2",
    content: "Unterschiedliche Emotionen wie Wut, Angst, Freude, Trauer oder Überraschung entstehen in Reaktion auf verschiedene auslösende Situationen und wie wir diese Situationen bewerten (siehe ABC-Modell). Man kann sie sich als vorbereitete Antwort-Tendenzen vorstellen, die uns im Laufe der Evolution geholfen haben rasch und möglichst adaptiv auf wichtige Chancen und Herausforderungen in unserer Umwelt zu reagieren: Beispielsweise indem unser Körper und Gehirn automatisch das Emotions-Programm ‚Angst‘ abruft, welches uns fluchtbereit macht, ohne dass wir dafür groß nachdenken müssten.. Jede Emotion besteht dabei aus vier miteinander in Wechselwirkung stehenden Elementen: Der die Emotion begleitenden Körperreaktion (1), den damit einhergehenden Gedanken (2), dem dazugehörigen Gefühl (3) und daran anschließendes Verhalten (4). Wenn man also eine Emotion beeinflussen will (siehe Emotionsregulation), um zum Beispiel einer negativen Emotion entgegenzuwirken, kann man an diesen vier Stellschrauben ansetzen.",
    img: "./logoBig.png",
  },]
  },
  {letter: "F",
  entries: [{
    title: "Fassmodell",
    content: "Das Fassmodell ist eine Metapher für unsere persönliche Belastungsgrenze. Es füllt sich mit Dingen, die uns Kraft kosten und belasten, zum Beispiel Stress, Anforderungen, negativen Gefühlen und Krankheit. Diese Faktoren lassen sich in soziale (Streit, Erwartungen andere), biologische (Gene, Krankheit, Zyklus, Hormonspiegel) und psychologische Faktoren (Stress, Werte, Selbstwert, Bedürfnisse) unterteilen. Dabei kann unser Geist mit diesen Belastungen in Maßen gut umgehen, bis es irgendwann mal zu viel auf einmal wird und das Fass “überläuft”. Wie dieses Überlaufen aussieht unterscheidet sich von Person zu Person und kann auch von Situation zu Situation unterschiedlich sein. Manche merken es zum Beispiel,  dass ihnen gerade alles zu viel ist, wenn sie aggressiv reagieren oder sie sich am liebsten “die Decke über den Kopf ziehen” würden. Auch wann genau das Fass überläuft ist bei jedem unterschiedlich, da alle unterschiedliche Voraussetzungen haben. Emotionsregulation (Siehe Emotionsregulation) und unsere Ressourcen können uns dabei helfen, dass das Fass nicht überläuft beziehungsweise es auch wieder zu leeren, indem wir zum Beispiel positive Aktivitäten einplanen und unsere Aufmerksamkeit gezielt lenken.",
    img: "./logoBig.png",
  }]
  },
  {letter: "M",
  entries: [{
    title: "Mentale Gesundheit",
    content: "Mentale Gesundheit ist nicht nur die Abwesenheit von Krankheit, sondern umfasst auch Dinge wie Wohlbefinden, das Ausschöpfen eigener Fähigkeiten, sowie Belastungen bewältigen zu können und sich selbst zu verwirklichen. Mentale Gesundheit  ermöglicht so ein kreatives und produktives Leben, gesellschaftliche Teilhabe und versetzt uns in die Lage mit anderen beiderseitig zufriedenstellende Beziehungen einzugehen - sich aber auch wohl fühlen zu können, wenn man alleine ist. ",
    img: "./logoBig.png",
  }]
}]

console.log(wiki.flatMap(x => x.entries))
 


const routes = [{
  path: ["/", "/home"],
  component: <App/>,
  color: "#f3f0f8",
  text: "Herzlich Willkommen!",
  img: "./logoBig.png"
},
{
  path: "/tagebuch",
  component: <Tagebuch/>,
  color: "#f6efe9",
  text: "Stimmungstagebuch",
  img: "./tagebuch.svg"
},
{
  path: "/wiki",
  component: <Wiki list={wiki} />,
  color: "#f6efe9",
  text: "Wiki",
  img: "./tagebuch.svg"
},
{
  path: "/starkmacher",
  component: <Starkmacher/>,
  color: "#eefcf5",
  text: "Meine Starkmacher",
  img: "./starkmacher.png"
},
{
  path: "/neueStarkmacher",
  component: <NeueStarkmacher/>,
  color: "#eefcf5",
  text: "Neue Starkmacher",
  img: "./starkmacher.png"
},
{
  path: "/starkmacher/reframing",
  component: <Reframing/>,
  color: "#f2c7d0",
  text: "Reframing",
  img: "/reframing.png"
},
{
  path: "/login",
  component: <Login/>,
  color: "#eefcf5",
  text: "Anmeldung",
  img: "./logoBig.png"
},
{
  path: "*",
  component: <Missing/>,
  color: "#eefcf5",
  text: "Komponente kommt bald!",
  img: "./logoBig.png"
}
]
ReactDOM.render(
  <React.StrictMode>
      <Router>
      <Nav/>
      <Switch>

      {wiki.flatMap(x => x.entries).map((wikiEntry, index) => {
        console.log(wikiEntry)
          return(
            <Route key={index} path={`/wiki/${wikiEntry.title.replace(/\s+/g, '')}`}>
              <Header color="#f6efe9" text={wikiEntry.title} img={wikiEntry.img}/>
              <Wikientry title={wikiEntry.title} content={wikiEntry.content} />
            </Route>
          )
        })}


        {routes.map((route, index) => {
          return(
            <Route key={index} exact path={route.path}>
              <Header color={route.color} text={route.text} img={route.img}/>
              {route.component}
            </Route>
          )
        })}

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

