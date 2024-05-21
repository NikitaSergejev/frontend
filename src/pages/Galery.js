import React from 'react';
import GaleryPost from './GaleryPost';
import Geners from './Geners';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

export default function Galery() {
  const [activeIndex, setActiveIndex] = React.useState(0);//состояние для Geners
  return (
    <Container className="mt-1 mb-5">
      <h2>Галерея</h2>
      <Row>
      <Link to="/addgalerypost">
          <Button variant='primary' size='sm'>Добавить пост</Button>
        </Link>
        <Col md="9">       
          <GaleryPost 
          generId={activeIndex} />
        </Col>
        <Col md="3">
          <Geners generId={activeIndex} onClickGener={(id) => setActiveIndex(id)}/>
        </Col>  
      </Row>
    </Container>
  )
}
