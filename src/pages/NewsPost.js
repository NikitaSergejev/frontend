import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import {Link} from 'react-router-dom';


export default function NewsPost({searchValue}) {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [posts , setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/posts`);
            setPosts(response.data);
        };
        fetchPosts();
    }, []);
    
    useEffect(() => {
        // Фильтрация постов и обновление состояния filteredPosts
        const filteredPosts = posts.filter(data => {
            if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        });
        setFilteredPosts(filteredPosts);
    }, [searchValue, posts]); // Зависимость от searchValue и posts

      posts.forEach((post) => {
        const formatDate = moment(post.createdAt).locale('en-US').format('LL');
      post.createdAt = formatDate;
    });
  return (
    <>
    
   <p>Количество новостей: {filteredPosts.length}</p>
            {filteredPosts.map(data => (
                <Row className="m-3 bg-light" key={data.id}>
                    <Col md="3">
                        <img className='mr-3 img-thumbnail' src={'/images/' + data.image} alt='Логотип' />
                    </Col>
                    <Col md="9">
                        <h5>{data.title}</h5>
                        <p>{data.description.slice(0, 100)}...</p>
                        <p>
                            <span className='fst-italic'>Дата публикации:</span> {data.createdAt}
                        </p>
                        <Link to={`/detailpost/${data.id}`} className="me-1">
                            Подробнее
                        </Link>
                    </Col>
                </Row>
            ))}
       
        
    </>
  );
}
