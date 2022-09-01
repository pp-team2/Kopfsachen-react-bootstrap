import React from 'react'
import { Button, Alert, Tab,Tabs,Container,ButtonGroup,ProgressBar , ListGroup ,InputGroup,FormControl,Card} from 'react-bootstrap'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Rate  ,Modal,Space,message,Input} from 'antd';
import 'antd/dist/antd.css';
import { FiArrowLeft } from "react-icons/fi";
import {LinkContainer} from 'react-router-bootstrap'
import { FaRegSmile, FaRegGrinHearts, FaRegLaughBeam, FaRegMeh, FaRegFrown, FaRegAngry, FaRegSadCry } from "react-icons/fa";

const Reframing = () => {
	const [situations,setSituations] = useState(["","","",""]);

	const [currentTab,setCurrentTab] = useState("1");
	const history = useHistory();

	const finish = ()=>{
		message.info('Reframing ist nun Teil deiner Starkmacher');
		history.push("/starkmacher");
	}

	const handleAddSituation = ()=>{
		const data = [...situations];
		data.push("");
		setSituations(data);
	}

	const handleChangeSituation = (ele,key)=>{
		const data = [...situations];
		data[key] = ele.target.value;
		setSituations(data);
	}

    return (
        <Container>
		<Tabs
		activeKey={currentTab}
		  defaultActiveKey="1"
		  transition={true}
		>
  		<Tab eventKey="1" disabled>
  		<LinkContainer to="/neueStarkmacher"><Button variant="success"><FiArrowLeft/> Andere Starkmacher entdecken</Button></LinkContainer>
       <br/><br/><Card><Card.Body><Alert>Welche Situation belastet dich gerade? Vielleicht gibt es auch mehrere, dann gehe die folgenden Schritte für jede Situation einzeln durch. </Alert>
        {situations.map((item,key)=>
           	<>
           	<InputGroup>
		    <InputGroup.Text id={'basic-addon'+key}>Situation {key+1}</InputGroup.Text>
		    <FormControl value={item} onChange={(ele)=>handleChangeSituation(ele,key)} aria-describedby={'basic-addon'+key}/>
		  	</InputGroup>
		  	<br/>
		  	</>
       )}
        	<Button variant="secondary" onClick={handleAddSituation}>Weitere Situation</Button></Card.Body></Card><br/>
		  	<Button variant="success" onClick={() => setCurrentTab("2")}>Das sind alle Situation, die mich beschäftigen</Button>
 			<br/>
			  </Tab>
			  <Tab eventKey="2" disabled>
			  <br/>
			 <Button variant="secondary" onClick={() => setCurrentTab("1")}><FiArrowLeft/>Ein schritt zurück</Button>
			  <br/><br/>
<Card><Card.Body>
			 <br/>
			    	<Alert>Nun geht es darum die Perspektive zu wechseln und die Situationen in einen neuen Rahmen zu stellen. Es ist dabei nicht zwingend nötig eine positive Interpretation der Situation zu finden, auch eine neutrale Interpretation kann dir helfen die negative Stimmung zu bessern.</Alert>
		<Alert>Geht es um eine bestimmte Handlung oder Verhalten, welche(s) du nicht ausführen möchtest, helfen dir die folgenden Fragen zu einer positiveren oder neutralen Bewertung zu kommen.</Alert>
			<Card><Card.Body>
				<div>A) Kontext erweitern oder in einem anderen Kontext betrachten:</div><div> Welchen Vorteil könnte eine ungeliebte Tätigkeit haben?</div>
				<div>B) Andere Bewertung anbieten:</div><div> Wozu könnte ein gewisses Verhalten dienen? Welche Funktion könnte es haben?</div>
				<div>C) Perspektive ändern:</div><div> Welche Bedeutung könnte es in 10 Jahren haben?</div>
			</Card.Body></Card><br/>
			<Alert>Belastet dich aktuell das Verhalten einer anderen Person, denke über folgende Fragen nach:</Alert>
			<Card><Card.Body>				
				<div>1. Was sind mögliche Gründe für dieses Verhalten (die vielleicht gar nichts mit dir zu tun haben)?</div>
				<div>2. Welche Bedürfnisse der anderen Person könnten dahinter stehen? (Zugehörigkeit, Verständnis, Sicherheit usw..)</div>
				<div>3. Was braucht eine Person mit diesem Bedürfnis? Was braucht sie vielleicht anderes als bisher?</div>
				<div>4. Von wem braucht diese Person etwas?</div>
				<div>5. Was braucht sie nicht?</div>
				<div>6. Was konkret kannst du als nächstes tun?</div>
			</Card.Body></Card><br/>
			
				<Alert>Gehe diese Fragen nun mit allen Situationen durch.</Alert>
			</Card.Body></Card><br/>
			<Button variant="success" onClick={() => setCurrentTab("3")}>Ich bin zu einer neuen Bewertung der Situationen gekommen.</Button><br/>
			  <br/>
			  </Tab>
			 <Tab eventKey="3" disabled>
			  <Space style={{width:"100%"}} direction="vertical" size="large">
			   <div style={{textAlign:"center"}}>
			   <h1>Wie hat dir die Übung gefallen?</h1>
	   <Button variant="success"><FaRegSmile size="60"/></Button>
			<Button variant="danger"><FaRegFrown size="60"/></Button>
			   </div>
		    <Input.TextArea placeholder="Bewertung" rows={5}/>
			
			<Button variant="success" onClick={() => finish()}>Done</Button>
			</Space>
			  </Tab>
			</Tabs>
        </Container>
    )
}

/*
	<b>Meine Situationen: </b>
			  {situations.filter(item=>item!="").map((item,key)=>
			  <div>{item}</div>
			)}
*/

export default Reframing
