import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from '../middleware/axios';
import {Link} from 'react-router-dom';

export default function EditProfile() {
    const [name, setName] = useState('');
    const [avatar, setAvatarUrl] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
  //---------------- Update profile form
 
    const navigate = useNavigate();
    useEffect(() => {    
      getProfile();
      //eslint-disable-next-line react-hooks/exhaustive-deps
          }, []); // 
      
      const getProfile = async () => {
          try {
            const token = window.localStorage.getItem('token');
            const decoded = jwtDecode(token); 
            setName(decoded.name);      
            setAvatarUrl(decoded.avatar);
      
          
          }catch(error) {
            if(error.response) {
              navigate('/');
            }
          }
        };  
        
    
    //---------------


    const updateProfile = async (e) => {
        e.preventDefault();
        try {       
         // const token = window.localStorage.getItem('token');
         // const decoded = jwtDecode(token);
          const response = await axios.patch(`https://backender-baedc14d3753.herokuapp.com/users/auth/update`, { 
            name: name,
            password: password,
            confPassword: confPassword,
            avatarUrl:avatar, 
          });
          console.log(response.data.token);//это token
          //записываем в localStorage
          window.localStorage.setItem('token', response.data.token);
          navigate('/profile');
          window.location.reload();
        }catch(error){
          if(error.response){
            setMsg('Error: Ошибка с сохранением данных, заполните все поля');
          }
        }
      };
  return (
    <Container className='container mt-5'>
      <p>Изменения данных пользователя</p>
          <Form onSubmit={updateProfile}>
            <p className='has-text-center'>{msg}</p>
          <Form.Group controlId='formName'>
            <Form.Label>Имя:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>       
            
          <Form.Group controlId='formPassword'>
            <Form.Label>Пароль:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Подтверждение пароля:</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formAvatar'>
            <Form.Label>Аватар</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your avatar URL'
              value={avatar}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className="mt-3 me-2">
            Сохранить изменения
          </Button>
          <Link to={`/profile`} >
            <button className="btn btn-primary mt-3 me-1">Обратно</button>
          </Link>
        </Form>   
    </Container>    
  )
}
