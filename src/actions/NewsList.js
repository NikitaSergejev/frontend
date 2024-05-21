import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { Container, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from '../middleware/axios'; //middleware
import moment from 'moment';

export default function NewsList() {
 const [posts, setPosts] = useState([]);
 //--------------
 useEffect(() =>{
    getPosts();
 },[]);
 //Список новостей из БД
 const getPosts = async() =>{
    const response = await axios.get(`http://localhost:5000/posts`);
    setPosts(response.data);
 };
 //удалить новость
 const deletePost = async(id) =>{
    if (window.confirm('Вы действительно хотите удалить новсостной пост'+id+'?')){
        await axios.delete(`http://localhost:5000/posts/${id}`);
        getPosts();
    }
 }
    posts.forEach((post) => {
        const formatDate = moment(post.createdAt).locale('en-US').format('l');
    post.createdAt = formatDate;
    });
    return (
    <Container className="mt-1" fluid>
        <h2 className="text-center mt-3">Управление новостями</h2>
        <Row>
            <Col md={{span: 10, offset: 1}}>
                <p className="text-end">
                    <Link to="/addpost">
                        <Button variant='primary' size='sm'>Добавить</Button>
                    </Link>
                </p>
                
                    <Table striped >
                        <thead>
                            <tr>
                                <th>No#</th>
                                <th>Заголовок</th>
                                <th>Дата создания</th>                                                      
                                <th className="text-center">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) =>(
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.createdAt}</td>                                                      
                                <td className='text-center'>
                                    <Link to={`/detailpost/${post.id}`} className="me-1">
                                        <Button variant='success' size='sm'>Просмотр</Button>
                                    </Link>
                                    <Link to={`/editpost/${post.id}`} className="me-1">
                                        <Button variant='primary' size='sm'>Редактирование</Button>
                                    </Link>
                                    <Button  onClick={() => deletePost(post.id)} variant='danger' size='sm'>Удаления</Button>
                                </td>                           
                            </tr>   
                            ))}
                        </tbody>
                    </Table>
                    
            </Col>
        </Row>
    </Container>
  );
}
