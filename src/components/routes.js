import {React , useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './navigator'
import Tagebuch from './tagebuch'
import Header from './header'
import Missing from './missing'
import Wiki from './wikiList'
import Wikientry from './wikientry'
import App from '../App'

//https://www.flatuicolorpicker.com/colors/sauvignon/

function GetWikiData(){
    const [wikii, setWiki] = useState([])

      useEffect(() => {
        fetch('http://127.0.0.1:4010/wiki/quiadfd')
        .then(res => res.json())
        .then(data => setWiki(data))
      }, [])

      console.log(wikii)

     return wikii
}

const Routes = () => {

const data = GetWikiData();

const routess = [{
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
  component: <Wiki list={data} />,
  color: "#f6efe9",
  text: "Wiki",
  img: "./tagebuch.svg"
},
{
  path: "*",
  component: <Missing/>,
  color: "#eefcf5",
  text: "Komponente kommt bald!",
  img: "./logoBig.png"
}]

    return (
    <Router>
      <Nav/>
      <Switch>
        {
          data.map(wikiEntry => {
            console.log(`/wiki/${wikiEntry.id.replace(/\s+/g, '')}`)
            return(
                <Route key={wikiEntry.id} path={`/wiki/${wikiEntry.id.replace(/\s+/g, '')}`}>
                
                  <Header color="#f6efe9" text={wikiEntry.title} img=""/>
                  <Wikientry object={wikiEntry} />
                </Route>
              )
          })
        }

        {
          routess.map((route, index) => {
            return(
              <Route key={index} exact path={route.path}>
                <Header color={route.color} text={route.text} img={route.img}/>
                {route.component}
              </Route>
            )
          })
        }

      </Switch>
    </Router>
    )
}

export default Routes
