import React from 'react'
import { Button, Alert, Tab,Tabs,Container,ButtonGroup,ProgressBar , ListGroup ,InputGroup,FormControl} from 'react-bootstrap'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Rate  ,message,Input} from 'antd';
import 'antd/dist/antd.css';

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
        <ProgressBar now={currentTab} max="3" />
		<Tabs
		activeKey={currentTab}
		  defaultActiveKey="1"
		  transition={true}
		>
  <Tab eventKey="1" title="1" disabled>
       <b>Welche Situation belastet dich gerade? Vielleicht gibt es auch mehrere, dann gehe die folgenden Schritte für jede Situation einzeln durch. </b>
       <br/><br/>
        {situations.map((item,key)=>
           	<>
           	<InputGroup>
		    <InputGroup.Text id={'basic-addon'+key}>Situation {key+1}</InputGroup.Text>
		    <FormControl value={item} onChange={(ele)=>handleChangeSituation(ele,key)} aria-describedby={'basic-addon'+key}/ >
		  	</InputGroup>
		  	<br/>
		  	</>
       )}
        	<Button variant="secondary" onClick={handleAddSituation}>Situation hinzufügen</Button><br/><br/>
		  	<Button onClick={() => setCurrentTab("2")}>Das sind alle Situation, die mich beschäftigen</Button>
 			<br/>
			  </Tab>
			  <Tab eventKey="2" title="2" disabled>
			  <br/>
			  <Button variant="secondary" onClick={() => setCurrentTab("1")}>Zurück zu den Situationen</Button>
			  <br/>
			  <br/>
			    	<b>Nun geht es darum die Perspektive zu wechseln und die Situationen in einen neuen Rahmen zu stellen. Es ist dabei nicht zwingend nötig eine positive Interpretation der Situation zu finden, auch eine neutrale Interpretation kann dir helfen die negative Stimmung zu bessern.</b>
			<br/><b>Geht es um eine bestimmte Handlung oder Verhalten, welche(s) du nicht ausführen möchtest, helfen dir die folgenden Fragen zu einer positiveren oder neutralen Bewertung zu kommen.</b>
			<br/>
			  <b>Meine Situationen: </b>
			  {situations.filter(item=>item!="").map((item,key)=>
			  <Alert>{item}</Alert>
			)}
			<Alert variant="success">A) Kontext erweitern oder in einem anderen Kontext betrachten:</Alert><Alert variant="info"> Welchen Vorteil könnte eine ungeliebte Tätigkeit haben?</Alert>
			<Alert variant="success">B) Andere Bewertung anbieten:</Alert><Alert variant="info"> Wozu könnte ein gewisses Verhalten dienen? Welche Funktion könnte es haben?</Alert>
			<Alert variant="success">C) Perspektive ändern:</Alert><Alert variant="info"> Welche Bedeutung könnte es in 10 Jahren haben?</Alert>
			<b>Belastet dich aktuell das Verhalten einer anderen Person, denke über folgende Fragen nach:</b>
			<Alert variant="success">1. Was sind mögliche Gründe für dieses Verhalten (die vielleicht gar nichts mit dir zu tun haben)?</Alert>
			<Alert variant="success">2. Welche Bedürfnisse der anderen Person könnten dahinter stehen? (Zugehörigkeit, Verständnis, Sicherheit usw..)</Alert>
			<Alert variant="success">3. Was braucht eine Person mit diesem Bedürfnis? Was braucht sie vielleicht anderes als bisher?</Alert>
			<Alert variant="success">4. Von wem braucht diese Person etwas?</Alert>
			<Alert variant="success">5. Was braucht sie nicht?</Alert>
			<Alert variant="success">6. Was konkret kannst du als nächstes tun?</Alert>
			<b>Gehe diese Fragen nun mit allen Situationen durch.</b><br/><br/>
			<Button onClick={() => setCurrentTab("3")}>Ich bin zu einer neuen Bewertung der Situationen gekommen.</Button><br/>
			  <br/>
			  </Tab>
			  <Tab eventKey="3" title="3" disabled>
			   <Alert>Wie hat dir die Übung gefallen?</Alert>
		    <Input/>
			<p style={{textAlign:"center"}}><Rate /></p>
			<Button onClick={() => finish()}>Done</Button>
			<br/>
			  </Tab>
			</Tabs>
        </Container>
    )
}

export default Reframing
