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

//https://www.flatuicolorpicker.com/colors/sauvignon/

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
        {routes.map(route => {
          return(
            <Route exact path={route.path}>
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
