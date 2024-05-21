import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer mt-auto py-3 '>
        <Container
        className='text-center'
        fluid
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#DE8279',
          color: '#fff',
          textAlign: 'center',         
          padding: '2px',
        }}
      >
        
       <p>Design &copy; 2024| Photo world | Nikita Sergejev JKTV22</p>     
        </Container>
      </footer>  
    );
  }
}