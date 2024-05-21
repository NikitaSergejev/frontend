import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const onClickLogout =() => {
        if(window.confirm('Вы действительно хотите выйти ?')) {
            //удаление токена из памяти
           window.localStorage.removeItem('token');
           navigate('/');
           window.location.reload();
        }
    }; 
  return (
    <Container className='container mt-5 textAlign'>
        <h2>Выход</h2>
        <Button onClick={onClickLogout} variant='danger'>
            Выход
        </Button>
    </Container>
  );
}
