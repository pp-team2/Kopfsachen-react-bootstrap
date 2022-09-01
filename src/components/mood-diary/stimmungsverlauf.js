import React from 'react';
import { Container } from 'react-bootstrap';
import './tagebuch.css';
import Card from "react-bootstrap/Card";
import 'antd/dist/antd.css';
import { Calendar } from 'antd';
import { FaRegSmile, FaRegMeh, FaRegFrown } from "react-icons/fa";



const getListData = (value) => {
  let listData;
  switch (value.format('MMDD')) {
    case '0701':
      listData = [<FaRegSmile />, 'positive'];
      break;

    case '0702':
      listData = [<FaRegSmile />, 'positive'];
      break;

    case '0703':
      listData = [<FaRegSmile />, 'positive'];
      break;

    case '0704':
      listData = [<FaRegMeh />, 'neutral'];
      break;

    case '0705':
      listData = [<FaRegMeh />, 'neutral'];
      break;

    case '0706':
      listData = [<FaRegFrown />, 'negative'];
      break;

    case '0707':
      listData = [<FaRegMeh />, 'neutral'];
      break;

    case '0708':
      listData = [<FaRegSmile />, 'positive'];
      break;

    case '0709':
      listData = [<FaRegSmile />, 'positive'];
      break;

    case '0710':
      listData = [<FaRegSmile />, 'positive'];
      break;

    case '0711':
      listData = [<FaRegSmile />, 'positive'];
      break;

    default:
  }

  return listData || [];
};



const Stimmungsverlauf = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };


  const dateCellRender = (value) => {
    const listData = getListData(value);
    if (listData[1] === 'positive') {
      return (
        <div className="calendar-emojis-positive">{listData[0]}</div>
      );
    }
    if (listData[1] === 'neutral') {
      return (
        <div className="calendar-emojis-neutral">{listData[0]}</div>
      );
    }
    if (listData[1] === 'negative') {
      return (
        <div className="calendar-emojis-negative">{listData[0]}</div>
      );
    }

  };
  return (
    <Container className="d-grid gap-4">
      <Card>
        <div className="site-calendar-demo-card center-tagebuch">
          <Calendar className="calendar-stimmungsverlauf" fullscreen={true} onPanelChange={onPanelChange}
                    dateCellRender={dateCellRender} />
        </div>
      </Card>
    </Container>
  )
}

export default Stimmungsverlauf
