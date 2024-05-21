import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios'; 
import { useNavigate } from 'react-router-dom';

export default function AddGener() {
    const [name, setname] = React.useState('');
    //------------для создания redirect -переход по ссылке
    const navigate = useNavigate();
    const saveGener = async (e) => {
        e.preventDefault();
        try{          
            await axios.post(`http://localhost:5000/geners`, {
                name: name,  
            });            
            navigate(`/generlist`);
        }catch (error) {
            console.error('Error saving gener: ', error);
        }
    };
  return (
    <Container className='mt-1'>
    <h2 className='text-center'>Добавить жанр</h2>
    <Row>
        <Col>
            <Form onSubmit={saveGener}>
                <Form.Group className="mb-3" controlId="formControlText">
                    <Form.Label>Название жанра</Form.Label>
                        <Form.Control 
                            className="input"
                            type="text" 
                            placeholder="Название"
                            value={name}
                            onChange={(e) => setname(e.target.value)} 
                        />
                </Form.Group>
                <Button variant="primary" type="submit" className='me-1' >
                        Добавить новый жанр
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
