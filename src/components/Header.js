import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
//import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
//import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import logo from '../assets/logo.png';
import Content from './Content.js';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
    const [state, setState] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatarUrl] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        getMe();
    }, []);
    const getMe = async () => {
        try{ 
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token); // Декодируем токен
            setState(true);
            setName(decoded.name);
            setAvatarUrl(decoded.avatar);
            setRole(decoded.role);
        }else {
            setState(false);
        }
        }catch(error) {
            if(error.response){            
            }
        }
    };
  return (
  <div>  
    <header>
    <Navbar collapseOnSelect 
    expand="lg"  
    style={{ backgroundColor: '#A3BBCE' }}
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{' '}
          Photo World
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/blog">Новости</Nav.Link>
            {state ? (
              <>
                <Nav.Link href="/galery">Галерея</Nav.Link>
                <Nav.Link href="/rules">Правила</Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
          <Nav className="me-auto">
            {state && role === 'admin' ? (
              <>
                <Nav.Link href="/newslist">Управление новостями</Nav.Link>
                <Nav.Link href="/generlist">Управление жанрами</Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {state ? (
              <>
                <span className="d-flex align-items-center me-3">
                  Привет: {name}
                  <img
                    className="ms-2 img-rounded"
                    src={avatar}
                    alt="Avatar"
                    width={30}
                    height={30}
                  />
                </span>
                <Nav.Link href="/profile">Профиль</Nav.Link>
                <Nav.Link href="/logout">Выход</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Вход</Nav.Link>
                <Nav.Link href="/register">Регистрация</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  <Content />
  </div>
);
}
