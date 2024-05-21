import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios'; 
import { useNavigate, useParams } from 'react-router-dom';

export default function EditGener() {
  //--------------  для данных таблицы geners 
  const [name, setname] = React.useState('');
//------------для создания redirect -переход по ссылке
const navigate = useNavigate();
const {id} = useParams();
  //------Выбор записи в БД для редактирования по id  
React.useEffect(() =>{
 //-------category By id
    const getGenerById = async() =>{
    const response = await axios.get(`http://localhost:5000/geners/${id}`);
    setname(response.data.name);
};
getGenerById();
}, [id])
//----------сохранение записи в БД и загрузка image на сервер
const updateGener = async (e) => {
  e.preventDefault();
  try{
  await axios.patch(`http://localhost:5000/geners/${id}`, {
              name:name
          });          
          //end upload server
          navigate(`/generlist`);  
          
     }catch(error){
      console.error('Error edit gener: ', error);
     }     
 };

  return (
    <Container className='mt-1'>
    <h2 className='text-center'>Редактирование жанра</h2>
    <Row>
        <Col>
        <Form onSubmit={updateGener}>
        <Form.Group className="mb-3" controlId="formControlText">
            <Form.Label>Название жанра</Form.Label>
                <Form.Control 
                    className="input"
                    type="text" 
                    placeholder="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)} 
                    />
            </Form.Group>
            <Button variant="primary" type="submit" className='me-1' >
                    Сохранить изменения
            </Button>                    
            <Button variant="primary" href='/generlist' className='me-1'>
                Жанры
            </Button>
        </Form>
        </Col>
    </Row>
    </Container>
  )
}
