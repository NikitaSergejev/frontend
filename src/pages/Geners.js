import React from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Geners({generId, onClickGener}) {
    const [geners, setGener] = useState([]);
    useEffect(() => {
        const getGener = async () => {
            const response = await axios.get(`https://backender-baedc14d3753.herokuapp.com/geners`);
            setGener(response.data);
        };
        getGener();  
      }, []);
  return (
    <>
        <h5 className="text-center mt-3">Geners</h5>
        <Card>
            <ListGroup variant='flush'>
                <ListGroupItem style={{cursor: 'pointer'}}
                onClick={() => onClickGener(0)}
                className={generId===0 ? 'active' : ''}

                key={0}>
                    All
                </ListGroupItem>
                {geners.map((data) => (
                    <ListGroupItem style={{cursor: 'pointer'}}
                    onClick={() => onClickGener(data.id)}
                    className={generId===data.id ? 'active' : ''}
                    key={data.id}>
                        {data.name}
                     </ListGroupItem> 
                ))}
            </ListGroup>
        </Card>
    </>       
  );
}
