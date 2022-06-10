import React from 'react'
import { Button, Alert, Tab, Tabs, Container,ProgressBar, InputGroup, FormControl} from 'react-bootstrap'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Rate  ,message} from 'antd';

import 'antd/dist/antd.css';

const Reframing = () => {
	const [currentTab,setCurrentTab] = useState("1");
	const history = useHistory();
	const finish = ()=>{
		message.info('Reframing ist nun Teil deiner Starkmacher');
		history.push("/starkmacher");
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
       <Alert>Welche Situation belastet dich gerade? Vielleicht gibt es auch mehrere, dann gehe die folgenden Schritte für jede Situation einzeln durch. </Alert>
            <InputGroup>
		    <InputGroup.Text id="basic-addon1">Situation 1</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon1"/ >
		  	</InputGroup>
		  	<br/>
		  	<InputGroup>
		    <InputGroup.Text id="basic-addon2">Situation 2</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon2"/ >
		  	</InputGroup>
		  	<br/>
		  	<InputGroup>
		    <InputGroup.Text id="basic-addon3">Situation 3</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon3"/ >
		  	</InputGroup>
		  	<br/>
		  	<InputGroup>
		    <InputGroup.Text id="basic-addon4">Situation 4</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon4"/ >
		  	</InputGroup>
		  	<br/>
		  	<Button onClick={() => setCurrentTab("2")}>Das sind alle Situation, die mich beschäftigen</Button>
 			<br/>
  </Tab>
  <Tab eventKey="2" title="2" disabled>
    	<Alert>Nun geht es darum die Perspektive zu wechseln und die Situationen in einen neuen Rahmen zu stellen. Es ist dabei nicht zwingend nötig eine positive Interpretation der Situation zu finden, auch eine neutrale Interpretation kann dir helfen die negative Stimmung zu bessern.</Alert>
<Alert>Geht es um eine bestimmte Handlung oder Verhalten, welche(s) du nicht ausführen möchtest, helfen dir die folgenden Fragen zu einer positiveren oder neutralen Bewertung zu kommen.</Alert>
<Alert variant="success">A) Kontext erweitern oder in einem anderen Kontext betrachten:</Alert><Alert> Welchen Vorteil könnte eine ungeliebte Tätigkeit haben?</Alert>
<Alert variant="success">B) Andere Bewertung anbieten:</Alert><Alert> Wozu könnte ein gewisses Verhalten dienen? Welche Funktion könnte es haben?</Alert>
<Alert variant="success">C) Perspektive ändern:</Alert><Alert> Welche Bedeutung könnte es in 10 Jahren haben?</Alert>
<Alert>Belastet dich aktuell das Verhalten einer anderen Person, denke über folgende Fragen nach:</Alert>
<Alert variant="success">1. Was sind mögliche Gründe für dieses Verhalten (die vielleicht gar nichts mit dir zu tun haben)?</Alert>
<Alert variant="success">2. Welche Bedürfnisse der anderen Person könnten dahinter stehen? (Zugehörigkeit, Verständnis, Sicherheit usw..)</Alert>
<Alert variant="success">3. Was braucht eine Person mit diesem Bedürfnis? Was braucht sie vielleicht anderes als bisher?</Alert>
<Alert variant="success">4. Von wem braucht diese Person etwas?</Alert>
<Alert variant="success">5. Was braucht sie nicht?</Alert>
<Alert variant="success">6. Was konkret kannst du als nächstes tun?</Alert>
<Alert>Gehe diese Fragen nun mit allen Situationen durch.</Alert>
<Button onClick={() => setCurrentTab("3")}>Ich bin zu einer neuen Bewertung der Situationen gekommen.</Button>
  <br/>
  </Tab>
  <Tab eventKey="3" title="3" disabled>
   <Alert>Wie hat dir die Übung gefallen?</Alert>
<p><Rate /></p>
<Button onClick={() => finish()}>Done</Button>
<br/>
  </Tab>
</Tabs>
        </Container>
    )
}

export default Reframing
