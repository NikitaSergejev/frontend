import React from 'react';
import { Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Profile() {
    const [userID, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [avatar, setAvatarUrl] = useState('');    

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
          setEmail(decoded.email);
          setRole(decoded.role);
          setUserId(decoded.userId);
          setAvatarUrl(decoded.avatar);
    
        
        }catch(error) {
          if(error.response) {
            navigate('/');
          }
        }
      };  
      
  return (
    <Container className='container mt-5'>
        <h2>Добро пожаловать: {name} </h2>
        <img className='mr-3 img-rounded' width={80} src={avatar} alt='Avatar' />
        <table className='table is-striped'>
        <thead>
            <tr>
            <th># ID пользователя</th>
            <th>Имя</th>
            <th>адрес почты</th>
            <th>Роль</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>{userID}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            </tr>
        </tbody>
        </table>
        <br />
        <Link to={`/editprofile/${userID}`} className="me-1">
                    <button className="btn btn-primary">Изменение данных</button>
                    </Link>
    </Container> 
  );
}
