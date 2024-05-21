import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios'; 
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function AddNews() {
  //------category select для добавления категории в список 
  const[userId, setUserId] = React.useState('');

    React.useEffect(() => {
        getProfile();
        //eslint-disable-next-line react-hooks/exhaustive-deps
            }, []); // 
    //-------для данных таблицы posts 
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [file, setFile] = React.useState('');

    //------idUser 
    const getProfile = async () => {
        try {
            const token = window.localStorage.getItem('token');
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        }catch(error) {}
    };
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
    //------сохранение записи в БД и загрузка image на сервер 
    const savePost = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`https://backender-baedc14d3753.herokuapp.com/posts`, {
                title: title,
                description: description,               
                userId: userId,
                image: file,
            });
            //--upload image server
            let formData = new FormData();
            formData.append('file', image.data);
            await fetch(`https://backender-baedc14d3753.herokuapp.com/image`,{
                method: 'POST',
                body: formData,
            });
            navigate(`/newslist`);
        }catch (error) {
            navigate(`/addpost`);
        }
    };
    return (
    <Container className="mt-1">
        <h2 className="text-center">Добавление новостного поста</h2>
        <Row> 
            <Col>
                <Form onSubmit={savePost}>
                    <Form.Group className="mb-3" controlId="formControlText">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control 
                            className="input"
                            type="text" 
                            placeholder="заголовок"
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
                    <Button variant="primary" type="submit" className='me-1' >
                        Добавить новость
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
