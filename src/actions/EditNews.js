import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios'; 
import { useNavigate, useParams } from 'react-router-dom';

export default function EditNews() {
  //--------------  для данных таблицы posts
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState('');
  const [oldImage, setOldImage] = React.useState('');
 
  
  //-----для preview выбранной с диска картинки -image
  const [image, setImage] = React.useState({preview: '', data: ''});
  const handleFileChange =(e) => {
      const img ={
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
      };
      setImage(img); //for upload 
      setFile(img.data.name); //for record DB
  };
  //------------для создания redirect -переход по ссылке
  const navigate = useNavigate();
  const {id} = useParams();
  //------Выбор записи в БД для редактирования по id  
 React.useEffect(() => {
  //-------post By id
  const getPostById = async () => {
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setFile(response.data.image);
      setOldImage(response.data.image);
      
  };
  getPostById();
 }, [id]);
 //----------сохранение записи в БД и загрузка image на сервер
 const updatePost = async (e) => {
  e.preventDefault();
  await axios.patch(`http://localhost:5000/posts/${id}`, {
              title: title,
              description: description,              
              image: file,
          });
          //--upload image server
          let formData = new FormData();
          formData.append('file', image.data);
    await fetch(`http://localhost:5000/image`,{
              method: 'POST',
              body: formData,
          });
          //end upload server
          navigate(`/newslist`);       
 };
return (
  <Container className="mt-1">
      <h2 className="text-center">Редактирование поста id #{id}</h2>
      <Row> 
          <Col md={{span: 7, offset: 2}}>
              <Form onSubmit={updatePost}>
                  <Form.Group className="mb-3" controlId="formControlText">
                      <Form.Label>Заголовок</Form.Label>
                      <Form.Control 
                          className="input"
                          type="text" 
                          placeholder="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)} 
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formControlText">
                      <Form.Label>Описание:</Form.Label>
                      <Form.Control 
                          className="input"
                          as="textarea"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} 
                      />
                  </Form.Group>
                  {image.preview && <img src={image.preview} width="100" height="100" alt="" />}
                  <hr></hr>
                  <Form.Group className="mb-3" controlId="formControlText">
                      <Form.Label>Выбрать файл:</Form.Label>
                      <Form.Control 
                          className="input"
                          type="file"
                          filename={file}
                          onChange={handleFileChange} 
                      />
                  </Form.Group>
                  <hr />
                  <Form.Group className="mb-3" controlId="formControlText">
                      <Form.Label>Старое фото:</Form.Label>
                      <img 
                          className="mr-3 img-thumbnail"
                          src={'/images/' + oldImage}
                          alt="Logo"
                          width={100} 
                      />
                  </Form.Group>
                  <Button variant="primary" type="submit" className='me-1' >
                      Обновить
                  </Button>
                  <Button variant="primary" href='/newslist' className='me-1'>
                      Обратно
                  </Button>
              </Form>
          </Col>
      </Row>
  </Container>
  );
}
