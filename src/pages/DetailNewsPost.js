import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function DetailNewsPost() {
    const [post, setPost] = React.useState('');
    const {id} = useParams();

    React.useEffect(() => {
        const getPostById = async() => {
            const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/posts/${id}`);
            setPost(response.data);
            
        };
        getPostById();
      },[id]);
      const formatDate = moment(post.createdAt).format('LL');
      
  return (
    <Container className='mt-1'>
        <h2 className='text-center m-4'>Новость</h2>
        <Row className='mt-2 bg-light mb-5' key={post.id}>
            <Col md="3">
                <img className='mr-3 img-thumbnail' src={'/images/' + post.image} alt='Logo' />
            </Col>
            <Col md="9">
                <h5>{post.title}</h5>
                <p>{post.description}</p>                
                <p>Дата публикации: {formatDate}</p>
                <Link to={`/blog`} className='me-1'>
                <button className="btn btn-primary">Новости</button>
                </Link>
                
        </Col>
    </Row>
</Container>
  )
}
