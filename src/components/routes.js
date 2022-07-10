import {React , useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './navigator'
import Tagebuch from './mood-diary/tagebuch'
import Positiv from './mood-diary/positive-stimmung-uebersicht'
import Stimmungsverlauf from './mood-diary/stimmungsverlauf'
import Header from './header'
import Missing from './missing'
import Zugriff from './zugriff';
import Wiki from './wikiList'
import Wikientry from './wikientry'
import App from '../App'
import Starkmacher from './starkmacher';
import NeueStarkmacher from './neueStarkmacher';
import {StarkmacherOptimismus } from './starkmacher/Optimismus';
import Reframing from './starkmacher/reframing';
import SicherheitsnetzController from './starkmacher/SicherheitsnetzController';
import SozialeUnterstuetzungController from './starkmacher/sozialeUnterstuetzungController';
import  Help  from './help';
import Profil from './profil';
import { message} from 'antd';
import API from "./API";
message.config({
  top: 50
});


//https://www.flatuicolorpicker.com/colors/sauvignon/


const Routes = () => {


  const [expertView, setExpertView] = useState([])
  const [sessionActive, setSessionActive] = useState(false);
  const [accountKey, setAccountKey] = useState("");

  const checkSession = async () => {
      const jsonRes = await API.checkSession();
      const isSessionActive = !(jsonRes.hasOwnProperty("error"));
      setSessionActive(isSessionActive);
      setAccountKey(jsonRes.identity.traits.accountKey)

      console.log(jsonRes.identity.traits.accountKey)

      console.log(jsonRes)
      console.log(sessionActive)
  }

  useEffect(checkSession);



const [wikii, setWiki] = useState([])

useEffect(() => {
  async function fetchData() {
    const jsonRes = await API.getWiki();

    setWiki(jsonRes.entries)

    console.log(jsonRes)
  }
  fetchData();
}, []);


useEffect(() => {
  async function fetchData() {
    const jsonRes = await API.getUser();

    console.log("Test: ")
    console.log(jsonRes)
  }
  fetchData();
});

const routes = [{
  path: ["/", "/home"],
  component: <App  accountKey={accountKey} sessionActive={sessionActive} check={checkSession} expertView={expertView} setExpertView={setExpertView} />,
  color: "#eeebea",
  text: "Herzlich Willkommen!",
  img: "./logoBig.png",
  header_width:200,
  requiresSession: false
},
{
  path: "/stimmungstagebuch",
  component: <Tagebuch/>,
  color: "#eeebea",
  text: "Stimmungstagebuch",
  img: "./tagebuch.svg",
  requiresSession: true
},
{
  path: "/positiv",
  component: <Positiv/>,
  color: "#eeebea",
  text: "Stimmungstagebuch",
  img: "./smiley-positive.png",
  requiresSession: true
},

{
  path: "/stimmungsverlauf",
  component: <Stimmungsverlauf/>,
  color: "#eeebea",
  text: "Stimmungsverlauf",
  img: "",
  requiresSession: true
},
{
  path: "/wikilist",
  component: <Wiki list={wikii} />,
  color: "#eeebea",
  text: "Wiki",
  img: "./wiki.png",
  header_width:300,
  requiresSession: false
},
{
  path: "/starkmacher",
  component: <Starkmacher/>,
  color: "#eeebea",
  text: "Meine Starkmacher",
  img: "./starkmacher.png",
  requiresSession: true
},
{
  path: "/neueStarkmacher",
  component: <NeueStarkmacher/>,
  color: "#eeebea",
  text: "Neue Starkmacher",
  img: "./starkmacher.png",
  requiresSession: true
},
{
  path: "/starkmacher/reframing",
  component: <Reframing/>,
  color: "#eeebea",
  text: "Reframing",
  img: "/reframing.png",
  requiresSession: true
},
{
  path: "/starkmacher/optimismus",
  component: <StarkmacherOptimismus/>,
  color: "#fde802",
  text: "Optimismus",
  img: "/optimismus.png",
  requiresSession: true
},
{
  path: "/starkmacher/SozialeUnterstuetzungLvl1",
  component: <SozialeUnterstuetzungController level={1} />,
  color: "#eeebea",
  text: "Soziale Unterstützung",
  img: "/sozialeUnterstuetzungLvl1.png",
  requiresSession: true
},
{
  path: "/starkmacher/SozialeUnterstuetzungLvl2",
  component: <SozialeUnterstuetzungController level={2} />,
  color: "#eeebea",
  text: "Soziale Unterstützung",
  img: "/sozialeUnterstuetzungLvl2.png",
  requiresSession: true
},
{
  path: "/starkmacher/SozialeUnterstuetzungLvl3",
  component: <SozialeUnterstuetzungController level={3} />,
  color: "#eeebea",
  text: "Soziale Unterstützung",
  img: "/sozialeUnterstuetzungLvl3.png",
  requiresSession: true
},
  {
  path: "/starkmacher/sicherheitsnetz",
  component: <SicherheitsnetzController alsStarkmacher={true} />,
  color: "#eeebea",
  text: "Sicherheitsnetz",
  img: "/sicherheitsnetz.png",
  requiresSession: true
},
{
  path: "/notfall",
  component: <Help />,
  color: "#eeebea",
  text: "Externe Hilfe",
  img: "./notfall.svg",
  requiresSession: false
},
{
  path: "/profil",
  component: <Profil />,
  color: "#eeebea",
  text: "Profil",
  img: "./tagebuch.svg",
  requiresSession: true
},
{
  path: "*",
  component: <Missing/>,
  color: "#eeebea",
  text: "Komponente kommt bald!",
  img: "./logoBig.png",
  requiresSession: false
}]

    return (
    <Router>
      <Nav accountKey={accountKey} sessionActive={sessionActive} check={checkSession} expertView={expertView} setExpertView={setExpertView}/>
      <Switch>
        {
          wikii.filter(a => a.id !== '').map(wikiEntry => {
            return(
                <Route key={wikiEntry.id} path={`/wikientry/${wikiEntry.title.replace(/\s+/g, '')}`}>
                  <Header color="#f6efe9" text={wikiEntry.title} img=""/>
                  <Wikientry object={wikiEntry} />
                </Route>
              )
          })
        }

        {
          routes.map((route, index) => {
            return(
              <Route key={index} exact path={route.path} >
                <Header color={route.color} text={route.text} img={route.img} width={route.header_width} />
                {
                (route.requiresSession && !sessionActive)? <Zugriff sessionActive={sessionActive} check={checkSession} expertView={expertView} setExpertView={setExpertView} /> : route.component
                }
              </Route>
            )
          })
        }

      </Switch>
    </Router>
    )
}

export default Routes
