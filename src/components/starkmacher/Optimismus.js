import React from 'react';
import { Button, Alert, Tab,Tabs,Container,ButtonGroup,ProgressBar , ListGroup ,InputGroup,FormControl} from 'react-bootstrap';
import { useState,useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Rate ,Space ,message,Input,Tag} from 'antd';
import 'antd/dist/antd.css';

const ALLOWED_TIME_MINUTES = 10;

export const  StarkmacherOptimismus = (props)=>{

	const [currentTab,setCurrentTab] = useState("1");

	const [notes,setNotes] = useState([]);

	const [note,setNote] = useState("");

	const [time,setTime] = useState("00:00");

	const [timerInterval,setTimerInterval] = useState(null);

	const history = useHistory();

	const handleGo = ()=>{
		setCurrentTab("2");

		const endTime = (Date.now()/1000) + ALLOWED_TIME_MINUTES * 60;

		const timerThread = ()=>{

			const currentTime = Date.now()/1000;
			const timeDiff = endTime - currentTime;

			if(timeDiff <= 0){
				stopTimerInterval();

				return setTime("ENDE");
			}
			
			let minutes = Math.floor(timeDiff / 60);
			let seconds = Math.floor(timeDiff % 60);

			setTime(`${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`);

		}

		stopTimerInterval();
		setTimerInterval(setInterval(timerThread,100));
		timerThread();
	}

	const stopTimerInterval = ()=>{
		if(timerInterval){
			clearInterval(timerInterval);
			setTimerInterval(null)
		} 
	}

	const finish = ()=>{
		message.info('Optimismus ist nun Teil deiner Starkmacher');
		history.push("/starkmacher");
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

	const handleDeleteNote = (key)=>{
		notes.splice(key,1);
		setNotes([...notes]);
	}

	const handleInputChange = (e)=>{
		setNote(e.target.value);
	}

	const handleBack = ()=>{
		stopTimerInterval();
		setCurrentTab("1");
	}

	const handleDone = ()=>{
		stopTimerInterval();
		setCurrentTab("4");
	}

	return (
		<Container>
		<Tabs
		activeKey={currentTab}
		  defaultActiveKey="1"
		  transition={true}
		>
 		 <Tab eventKey="1" disabled>
		<Space direction="vertical">
		<b>Wenn du Optimismus üben möchtest, kann dir die folgende Aufgabe helfen:</b>
		<p>Lege dir mehrere Zettel für diese Übung bereit. Stell dir einen Timer auf 10 Minuten. Denke während dieser Zeit an dein bestmögliches zukünftiges Selbst und schreibe es auf einem Zettel auf. Stell dir dein Leben so vor, wie du es dir immer ausgemalt hast. Stell dir vor du hättest dein Bestes gegeben und all die Dinge erreicht, die du im Leben immer erreichen wolltest. Mache dir beim Schreiben keine Gedanken über Grammatik oder Rechtschreibung. Konzentriere dich nur darauf all deine Gedanken und Emotionen in einer lebhaften Weise auszudrücken.</p>
		</Space>
		<Button onClick={handleGo}>Let`s go</Button>
		</Tab>
		  <Tab eventKey="2" disabled>
		<Space direction="vertical" size="large" style={{width:"100%"}}>
		<Button variant="secondary" onClick={handleBack}>Zurück</Button>
		<div style={{textAlign:"center"}}><h1>{time}</h1></div>
		<Space><b>Notizen</b><i>Klicke auf die Notiz, um diese zu löschen</i></Space>
		<ListGroup>
		{notes.map((note,key)=>
			<ListGroup.Item action key={key} onClick={()=>handleDeleteNote(key)}>
			<b>{note.text}</b>
			</ListGroup.Item>
		)}
		</ListGroup>
		<div style={{display:"flex",width:"100%"}}>
		
		<Input placeholder="Notiz..." value={note} onChange={handleInputChange} onPressEnter={handleAddNote} block/>
		<Button variant="secondary" onClick={handleAddNote}>Hinzufügen</Button>
		</div>
		<Button  onClick={(handleDone)}>Done</Button>
		</Space>
		</Tab>
		 <Tab eventKey="3" disabled>
		 <h1>Ende</h1>
		</Tab>
		 <Tab eventKey="4" disabled>
			  <Space style={{width:"100%"}} direction="vertical" size="large">
			   <div><b>Wie hat dir die Übung gefallen?</b></div>
		    <Input placeholder="Bewertung" />
			<p style={{textAlign:"center"}}><Rate /></p>
			<Button onClick={() => finish()}>Done</Button>
			</Space>
			  </Tab>
		</Tabs>
		</Container>
	)

}