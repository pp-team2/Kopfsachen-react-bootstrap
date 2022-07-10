import React from 'react';
import {Button, Container} from 'react-bootstrap';
import './tagebuch.css';
import Card from "react-bootstrap/Card";
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import { FaRegSmile, FaRegGrinHearts, FaRegLaughBeam, FaRegMeh, FaRegFrown, FaRegAngry, FaRegSadCry } from "react-icons/fa";



const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 1:
      listData = [<FaRegSmile />, 'positive'];
      break;

    case 2:
      listData = [<FaRegSmile />, 'positive'];
      break;

    case 3:
      listData = [<FaRegSmile />, 'positive'];
      break;

    case 4:
      listData = [<FaRegMeh />, 'neutral'];
      break;

    case 5:
      listData = [<FaRegMeh />, 'neutral'];
      break;

    case 6:
      listData = [<FaRegFrown />, 'negative'];
      break;

    case 7:
      listData = [<FaRegMeh />, 'neutral'];
      break;

    case 8:
      listData = [<FaRegSmile />, 'positive'];
      break;

    case 9:
      listData = [<FaRegSmile />, 'positive'];
      break;

    case 10:
      listData = [<FaRegSmile />, 'positive'];
      break;

     case 11:
      listData = [<FaRegSmile />, 'positive'];
      break;

    default:
  }

  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const Stimmungsverlauf = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
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
                    dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
        </div>
      </Card>
    </Container>
  )
}

export default Stimmungsverlauf
