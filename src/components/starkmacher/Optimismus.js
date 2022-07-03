import React from 'react'
import { Button, Alert, Tab,Tabs,Container,ButtonGroup,ProgressBar , ListGroup ,InputGroup,FormControl} from 'react-bootstrap'
import { useState,useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Rate ,Space ,message,Input,Tag} from 'antd';
import 'antd/dist/antd.css';

const ALLOWED_TIME_MINUTES = .1;

export const  StarkmacherOptimismus = (props)=>{

	const [currentTab,setCurrentTab] = useState("1");

	const [notes,setNotes] = useState([]);

	const [note,setNote] = useState("");

	const [time,setTime] = useState("00:00");

	const handleGo = ()=>{
		setCurrentTab("2");

		const endTime = (Date.now()/1000) + ALLOWED_TIME_MINUTES * 60;

		const timerThread = ()=>{

			const currentTime = Date.now()/1000;
			const timeDiff = endTime - currentTime;

			if(timeDiff <= 0){
				clearInterval(timerInterval);

				return setTime("ENDE");
			}
			
			let minutes = Math.floor(timeDiff / 60);
			let seconds = Math.floor(timeDiff % 60);

			setTime(`${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`);

		}

		const timerInterval = window.setInterval(timerThread,500);
		timerThread();


	}

	const handleDone = ()=>{

	}

	const handleAddNote = ()=>{
		if(note=="") return;
		notes.push({
			text:note,
			rotation:Math.random()*10
		});
		setNotes([...notes]);
		setNote("");
	}

	return (
		<Container>
		<Tabs
		activeKey={currentTab}
		  defaultActiveKey="1"
		  transition={true}
		>
  <Tab eventKey="1" disabled>
		<p>
<b>Wenn du Optimismus üben möchtest, kann dir die folgende Aufgabe helfen:</b><br/>Lege dir mehrere Zettel für diese Übung bereit. Stell dir einen Timer auf 10 Minuten. Denke während dieser Zeit an dein bestmögliches zukünftiges Selbst und schreibe es auf einem Zettel auf. Stell dir dein Leben so vor, wie du es dir immer ausgemalt hast. Stell dir vor du hättest dein Bestes gegeben und all die Dinge erreicht, die du im Leben immer erreichen wolltest. Mache dir beim Schreiben keine Gedanken über Grammatik oder Rechtschreibung. Konzentriere dich nur darauf all deine Gedanken und Emotionen in einer lebhaften Weise auszudrücken.  
		</p>
		<Button variant="secondary" onClick={handleGo}>Let`s go</Button>
		</Tab>
		  <Tab eventKey="2" disabled>
		<p>
		<div style={{textAlign:"center"}}><h1>{time}</h1></div>
<b>Notizen:</b>
		</p>
		<Space direction="vertical" style={{width:"100%"}}>
		<div style={{display:"flex",flexWrap:"wrap"}}>
		{notes.map((note,key)=>

			<div style={{margin:"10px",transform:"rotate("+note.rotation+"deg)",transformOrigin:"center center"}} key={key}><Space><span>{note.text}</span>
			<a style={{color:"red"}} onClick={()=>{notes.splice(key,1);setNotes([...notes]);}}>X</a>
			</Space></div>
		)}
		</div>
		<div style={{display:"flex",width:"100%"}}>
		
		<Input value={note} onChange={(e)=>setNote(e.target.value)} onPressEnter={handleAddNote} block/>
		<Button onClick={handleAddNote}>Hinzufügen</Button>
		</div>
		<Button variant="secondary" onClick={handleDone}>Done</Button>
		</Space>
		</Tab>
 <Tab eventKey="3" disabled>
 <h1>Ende</h1>
		</Tab>
		</Tabs>
		</Container>
	)

}