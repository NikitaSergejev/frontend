import React from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import axios from '../middleware/axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function EditPost() {

 //---------gener select для добавления категории в список
 const [geners, setGener] =React.useState([]);
 const [name, setName] = React.useState('');
 const [user] = React.useState(jwtDecode(localStorage.getItem('token')));
 React.useEffect(() =>{
     const getCategory = async () => {
         const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/geners`);
         setGener(response.data);
     };
     getCategory();
 }, []);
 //--------------  для данных таблицы Galery
 const [title, setTitle] = React.useState('');
 const [description, setDescription] = React.useState('');
 const [file, setFile] = React.useState('');
 const [oldImage, setOldImage] = React.useState('');
 const [generId, setGenerId] = React.useState(0);
 const [error, setError] = React.useState(null);

 
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
     const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/galery/${id}`);
     setTitle(response.data.title);
     setDescription(response.data.description);
     setFile(response.data.image);
     setOldImage(response.data.image);
     setGenerId(response.data.generId);
     setName(response.data.user.name);
 };
 getPostById();
}, [id]); 
//----------сохранение записи в БД и загрузка image на сервер
const updatePost = async (e) => {
 e.preventDefault();
 const validateForm = () => {
    let errors = [];
    if (!title.trim()) {
        errors.push('Заголовок не может быть пустым');
    }
    if (!description.trim()) {
        errors.push('Описание не может быть пустым');
    }
    if (!generId) {
        errors.push('Не выбран жанр поста');
    }
    if (!file) {
        errors.push('Файл не выбран');
    }
    if(description.length>250)
    {
        error.push('Превышено количество допустимых символов в описании (250)')
    }
    if (errors.length > 0) {
        setError(errors.join('. '));
        return false;
    }
    
    return true;
    };
    if(validateForm()){
       try{
        await axios.patch(`https://backender-baedc14d3753.herokuapp.com/galery/${id}`, {
                title: title,
                description: description,
                generId: generId,                
                image: file,
            });
            //--upload image server
            let formData = new FormData();
            formData.append('file', image.data);
            await fetch(`https://backender-baedc14d3753.herokuapp.com/image`,{
                method: 'POST',
                body: formData,
            });
            //end upload server
            navigate(`/galery`);       

        }catch(error){
            setError(error.response.data.message);
        } 
    }
    
} 
return (
 <Container className="mt-1">
     {user && ( // Проверка наличия пользователя
     <div>
     <h2 className="text-center">Редактирование поста id #{id}</h2>
     <Row> 
        {name.toLowerCase() === user.name.toLowerCase() ? (
         <Col md={{span: 7, offset: 2}}>
             <Form onSubmit={updatePost}>
             {error && <Alert variant="danger">{error}</Alert>}
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
                 <Form.Group className="mb-3" controlId="formControlText">
                     <Form.Label>Жанр поста</Form.Label>
                    <Form.Select 
                    name="generId" 
                    onChange={(e) => setGenerId(e.target.value)}
                    value={generId}
                    >
                     <option key={0} value={0}>
                         Выбрать жанр
                     </option>
                     {geners.map((data) =>(
                         <option key={data.id} value={data.id}>
                             {data.name}
                         </option>
                     ))}
                    </Form.Select>
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
                     <Form.Label>Старое фото</Form.Label>
                     <img 
                         className="mr-3 img-thumbnail"
                         src={'/images/' + oldImage}
                         alt="Logo"
                         width={100} 
                     />
                 </Form.Group>
                 
                 <Button variant="primary" type="submit"className='me-1' >
                     Обновить пост
                 </Button>

              <Link to={`/detailgalery/${id}`} className='me-1'>
                    <button className="btn btn-primary">Обратно</button>
                </Link>
               </Form> 
             </Col>     
              ) : (
                <Col md={{ span: 7, offset: 2 }}>
                  <div>
                    <p>У вас не права изменения.</p>
                    <Button variant="primary" href="/galery">
                      Галерея
                    </Button>
                  </div>
                </Col>                                       
          )}
     </Row>
     </div>
     )}
 </Container>
);
}
