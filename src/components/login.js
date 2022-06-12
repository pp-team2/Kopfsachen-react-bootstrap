import React from 'react'
import { Button, Alert, Tab,Tabs,Container,ButtonGroup,ProgressBar , ListGroup ,InputGroup,FormControl} from 'react-bootstrap'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Rate  ,Form,Input,Checkbox,message} from 'antd';
import 'antd/dist/antd.css';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  let failCounter = 0;

  const onFinishFailed = (errorInfo) => {
  	if(++failCounter==2) message.info('Brauchst du Hilfe beim ausfüllen! Klicke Hilfe im unteren Menu.');
  };

  return (
  	<Container>
  	<h1>Anmeldung</h1>
    <Form
      name="basic"
       labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Benutzername"
        name="username"
        rules={[
          {
            required: true,
            message: 'Bitte gebe deinen Benutzername ein!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Passwort"
        name="password"
        rules={[
          {
            required: true,
            message: 'Bitte gebe dein Passwort ein!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Angemeldet bleiben</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Anmelden
        </Button>

      </Form.Item>
    </Form>
    <a href="loginHelp">Hilfe</a><br/>
    <a href="createAccount">Konto erstellen</a><br/>
    <a href="forgotPassword">Passwort vergessen</a>
    </Container>
  );
}

export default Login
