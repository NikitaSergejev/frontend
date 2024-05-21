import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Home from '../pages/Home';

import News from '../pages/News';
import DetailNewsPost from '../pages/DetailNewsPost';
//-------------------------
import Galery from '../pages/Galery';
import DetailGaleryPost from '../pages/DetailGaleryPost';
import AddPost from '../actions/AddPost';
import EditPost from '../actions/EditPost';
//------------------------
import Login from './Login';
import Profile from './Profile';
import Logout from './Logout';
import Register from './Register';
import EditProfile from './EditProfile';
//-------------------------
import NewsList from'../actions/NewsList';
import AddNews from '../actions/AddNews';
import EditNews from '../actions/EditNews';
//--------------------------
import GenerList from '../actions/GenerList';
import AddGener from '../actions/AddGener';
import EditGener from '../actions/EditGener';
//------------------------
import Rules from '../pages/Rules';

export default function Content() {
  const [state, setState] = useState(false);
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
    <main className="flex-shrink-0">
    <Router>
        <Routes>
            {/*exact - точное совпадение маршрута и ссылки*/}
            <Route exact path='/' element={<Home />} />

            {/*Новости*/}
            <Route exact path='/blog' element={<News />} />
            <Route path='/detailpost/:id' element={<DetailNewsPost />} />

            {state && (role === 'user' || role === 'admin') ? (
              <>
              <Route exact path='/galery' element={<Galery />} />
              <Route path='/detailgalery/:id' element={<DetailGaleryPost />} />
              <Route path='/addgalerypost' element={<AddPost/>} />
              <Route path='/editgalerypost/:id' element={<EditPost/>} />
              <Route exact path='/profile' element={<Profile />} />
              <Route path='/editprofile/:id' element={<EditProfile />} /> 
              <Route path='/rules' element={<Rules />} />            
            </>
            ) :(
              <></>
          )}
            {/*Для админа*/}
            {state && role === 'admin' ? (
              <>
                <Route exact path='/newslist' element={<NewsList />} />
                <Route path='/addpost' element={<AddNews/>} />
                <Route path='/editpost/:id' element={<EditNews/>} />
                <Route exact path='/generlist' element={<GenerList/>} />
                <Route path='/addgener' element={<AddGener/>} />
                <Route path='/editgener/:id' element={<EditGener />} />
            </>
            ) :(
                <></>
            )}
            {/* регистрация, профиль, логин*/}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />           
            <Route exact path='/logout' element={<Logout/>} /> 
        </Routes>
    </Router>
</main>
  );
}
