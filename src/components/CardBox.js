import React from 'react';
import {Container} from 'react-bootstrap';
import {Row, Col, Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import photo from '../assets/photographer.jpg';
import galeryPhoto from '../assets/galery.jpg';
import photoForNews from '../assets/photo_for_news.jpg';
import servicesData from '../data/services.json';
//import { Link } from 'react-router-dom';
import '../style/styleCardBox.css';

export default function CardBox() {
    const[services, setServices] = React.useState([]);

    React.useEffect(() => {
      setServices(servicesData); // Используем данные JSON напрямую
  }, []);

  return (
    <Container fluid className="mt-4 mb-5">
    <Row>
        <Col md={{ span: 8, offset: 2 }} className="text-center">
            <img src={photo} className="img-photographer" alt="Photographer" />
        </Col>
    </Row>
    <Row>
        <Col md={{ span: 8, offset: 2 }} className="text-center">
            <h2>Добро пожаловать в мир фотографий</h2>
            <p>Будьте в курсе новых трендов и делитесь своими фотографиями</p>
        </Col>
    </Row>
    <Row className="justify-content-md-center">
    {services.map((service) => (
                    <Col key={service.id} xs={10} sm={6} md={4} lg={3}>
                        <Card className="m-2">
                            
                            {service.id === '1' ? (
                                <Card.Img variant="top" src={photoForNews} />
                            ) : (
                                <Card.Img variant="top" src={galeryPhoto} />
                            )}

                            <Card.Body>                               
                                <Card.Title>{service.name}</Card.Title>                                
                                <Card.Text>{service.description}</Card.Text>                              
                                <div className="button-container">
                                    {service.id === '1' ? (
                                        <>
                                            <Button variant="primary" href="/blog">Новости</Button>
                                        </>
                                    ) : (
                                       <>
                                            <Button variant="primary" href="/register" className="me-2">Регистрация</Button>
                                            <Button variant="primary" href="/login" className="me-2">Вход</Button>
                                            <Button variant="primary" href="/galery" className="me-2">Галерея</Button>
                                        </>
                                    )} 
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
    </Row>
</Container>
  )
}
