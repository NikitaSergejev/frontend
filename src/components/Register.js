
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const RegisterSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`https://backender-baedc14d3753.herokuapp.com/users/auth/register`, {
            name: name,
            email: email,
            password: password,
            confPassword: confPassword,
          });
          navigate('/login');
        } catch (error) {
          if (error.response && error.response.data) {
              setMsg(`Error: ${error.response.data.msg}`);
          } else {
              setMsg('Error');
          }
      }
      };
  return (
    <Container className='px-5 mt-3' style={{width: '84%'}}>
        <h2>Форма регистрации</h2>
        <Form onSubmit={RegisterSubmit}>
            <p className='has-text-centered'>{msg}</p>
            <Form.Group className="mb-3">
                <Form.Label>Имя:</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="введите своё имя" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Адрес электронной почты:</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="введите адрес" 
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Пароль:</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
        
            <Form.Group className="mb-3" >
                <Form.Label>Подтверждение пароля:</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="пароль" 
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
            Зарегистрироваться
            </Button>
        </Form>
    </Container>    
  );
}
