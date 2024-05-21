import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { Container, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from '../middleware/axios'; //middleware
export default function GenerList() {
    const [geners, setGener] = useState([]);
    //--------------
    useEffect(() =>{
       getGener();
    },[]);
    //Список новостей из БД
    const getGener = async() =>{
       const response = await axios.get(`http://localhost:5000/geners`);
       setGener(response.data);
    };
    //удалить новость
    const deleteGener = async(id) =>{
       if (window.confirm('Вы действительно хотите удалить жанр'+id+'?')){
           await axios.delete(`http://localhost:5000/geners/${id}`);
           getGener();
       }
    }
    return(
       <Container className='mt-1'>
       <h2 className="text-center mt-3">Управление жанрами</h2>
       <Row>
               <Col md={{span: 9, offset: 2}}>
                   <p className="text-end">
                       <Link to="/addgener">
                           <Button variant='primary' size='sm'>Добавить</Button>
                       </Link>
                   </p>
                   <Table striped>
                       <thead>
                           <tr>
                               <th>No#</th>
                               <th>Название</th>
                               <th className="text-center">Действия</th>
                           </tr>
                       </thead>
                       <tbody>
                           {geners.map((gener, index) =>(
                            <tr key={gener.id}>
                               <td>{index + 1}</td>
                               <td>{gener.name}</td>
                               <td className="text-center">
                                   <Link to={`/editgener/${gener.id}`} className="me-1">
                                       <Button variant='success' size='sm'>Редактирование</Button>
                                   </Link>
                                   <Button onClick={() => deleteGener(gener.id)} variant='danger' size='sm'>Удалить</Button>
                               </td>                           
                            </tr>   
                           ))}
                       </tbody>
                   </Table>
               </Col>
           </Row>
       </Container>
  )
}
