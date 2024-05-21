import React from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

export default function DetailGaleryPost() {
    const [post, setPost] = React.useState('');
    const [user, setUser] = React.useState('');
    const [name, setName] = React.useState('');
    const [gener, setGener] = React.useState('');
   const [comments, setComments] = React.useState([]);
   const[userId, setUserId] = React.useState('');
   const [newComment, setNewComment] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const {id} = useParams();

    
  
        
        //getPostById();     
      const formatDate = moment(post.createdAt).format('L');
      const handleModalOpen = () => setShowModal(true);
      const handleModalClose = () => setShowModal(false);       
      
        const getMe = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token); // Декодируем токен
                    setName(decoded.name);
                    setUserId(decoded.userId);
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };
    
        const getPostById = async () => {
            try {
                const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/galery/${id}`);
                console.log('Response data:', response.data);
                setPost(response.data);
                setUser(response.data.user);
                setGener(response.data.geners);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
    
        const getCommentsByPostId = async () => {
            try {
                const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/comments/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };
     
        React.useEffect(() => {
          // Вызов функций внутри useEffect
          getMe();
          getPostById();
          getCommentsByPostId();
      }, [id]); // Включаем id в массив зависимостей useEffect
  
    
    
    const saveComment = async (e) => {
      e.preventDefault();
      // Проверяем, что содержание комментария не пустое
    if (!newComment.trim()) {
      alert('Комментарий не может быть пустым');
      return;
    }

    // Проверяем, что комментарий не содержит ссылок
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(newComment)) {
      alert('Комментарий не может содержать ссылки');
      return;
    }
      // Выводим данные перед отправкой запроса
      //console.log("Данные для отправки:", {
      //  body_text: newComment,
      //  postId: id,
      //  userId: userId,
    // });
      try {
          await axios.post(`https://backender-baedc14d3753.herokuapp.com/comments`, {
              body_text: newComment,
              postId: id,
              userId: userId,
          });
          
      } catch (error) {
        console.log()
          console.error('Error adding comment:', error.message);
      }
  };
  //удалить комментарий
  const deleteComment = async (id) => {
    if (window.confirm('Вы действительно хотите удалить комментарий?')) {
      try {
        await axios.delete(`https://backender-baedc14d3753.herokuapp.com/comments/${id}`);
        getCommentsByPostId();
      } catch (error) {
        console.error('Error deleting comment:', error.message);
      }
    }
  };
  return (
    <Container className='mt-1'>
      {post ? (
      <>
        <h2 className='text-center m-4'>Пост</h2>
        <Row className='mt-2' key={post.id}>
            <Col md="3">
                <img className='mr-3 img-thumbnail' 
                src={'/images/' + post.image} 
                alt='Logo' 
                style={{ height: '230px', cursor: 'pointer' }}
                onClick={handleModalOpen} />
            </Col>
            <Col md="9">
                <h5>{post.title}</h5>
                <p>{post.description}</p>
                <p>Автор: {user.name}</p>
                <p>Жанр: {gener.name}</p>

                <img className='mr-3 img-rounded'width={60} src={user.avatarUrl} alt='Logo' />      
                <p>Дата публикации: {formatDate}</p>
                <Link to={`/galery`} className='me-1'>
                  <button className="btn btn-primary">Галерея</button>
                </Link>
                
                {name.toLowerCase() === user.name.toLowerCase() && (
              <Link to={`/editgalerypost/${post.id}`} className='me-1'>
                 <button className="btn btn-primary">Редактировать</button>
              </Link>
            )}
        </Col>
    </Row>
       <Form onSubmit={saveComment}>
       <Form.Group>
        <Form.Label>Добавить комментарий:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          maxLength={200} // Устанавливаем максимальную длину вводимого текста
        />
  <Form.Text className={newComment.length > 200 ? 'text-danger' : 'text-muted'}>
   Количество символов {newComment.length}/200
  </Form.Text>
</Form.Group>

          <Button variant="primary" type="submit">
            Добавить комментарий
          </Button>
        </Form>    

        <h3 className="mt-4 mb-3">Комментарии:</h3>
        {comments.map(comment => (
            <div key={comment.id} className="border p-3 mb-3 rounded">
                <div className="d-flex align-items-center">                  
                    <div>
                        <p className="mb-0"><strong>{comment.user.name}</strong></p>
                        <p className="text-muted mb-1">Дата создания комментария: {moment(comment.createdAt).format('LLL')}</p>
                    </div>
                </div>
                <p className="mb-0">{comment.body_text}</p>
                {name.toLowerCase() === comment.user.name.toLowerCase() || name === 'admin' ? (
                <Button onClick={() => deleteComment(comment.id)} variant='danger' size='sm'>Delete</Button>
              ) : null}
            </div>           
        ))}
        

     {/* Модальное окно */}
     <Modal show={showModal} onHide={handleModalClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{post.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={'/images/' + post.image} alt="Logo" style={{ width: '100%' }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </>
     ) : (
      <p>Нет данных</p>
    )}
</Container>
  )
}
