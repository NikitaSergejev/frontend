import React from 'react';
import NewsPost from './NewsPost.js';
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
export default function News() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <Container className="mt-1">
      <h2>Новости</h2>
      <Row>
        <Col md={{ span: 5, offset: 7}}>
          <h5 className="text-center mt-3">Поиск</h5>
          <Form className="d-flex ps-1">
            <FormControl 
            type="text"
            placeholder="поиск"
            className="me-sm-2"
            id="input"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            />
            <Button variant="outline-info" onClick={() => setSearchValue('')}>
              Очистить
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md="9">       
          <NewsPost 
          searchValue={searchValue}
          setSearchValue={setSearchValue}  />
        </Col>
      </Row>
    </Container>
  );
}
