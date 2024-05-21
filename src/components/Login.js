import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Button, Container, Col} from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/users/auth/login`, { 
        email: email,
        password: password, 
      });
      console.log(response.data.token);//это token
      //записываем в localStorage
      window.localStorage.setItem('token', response.data.token);
      navigate('/profile');
      window.location.reload();
    }catch(error){
      if(error.response){
        setMsg('Error: Email or password incorrect');
      }
    }
  };
  return (
    <Container className='px-5 mt-3'style={{width: '84%'}}>
      <h2>Форма входа</h2>
      <Form onSubmit={Auth}>
        <p className='has-text-center'>{msg}</p>
        <Form.Group className="mb-3">
          <Form.Label>Адрес электронной почты:</Form.Label>
          <Form.Control type="email" 
          placeholder="Введите email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />        
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Пароль</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Введите пароль" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>      
        <Col xs={12} md={6}>
          <Button variant="primary" type="submit">
            Вход
          </Button>
        </Col>
      </Form>
  </Container>  
  );
}
