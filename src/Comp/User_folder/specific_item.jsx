// ItemDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ItemDetails(props) {
  const {_id} = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/laptops/${_id}`)
      .then(response => setItem(response.data))
      .catch(error => console.log(error));
  },);

  return (
    <Container>
    {item ? (
      <Card className="my-3">
        <Row>
          <Col md={4}>
            <Card.Img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                <p><strong>Price:</strong> {item.price}</p>
                <p><strong>Processor:</strong> {item.processor}</p>
                <p><strong>Storage:</strong> {item.storage}</p>
                <p><strong>RAM:</strong> {item.ram}</p>
                <p><strong>Graphics Card:</strong> {item.graphicsCard}</p>
                <p><strong>Operating System:</strong> {item.operatingSystem}</p>
                <p><strong>Display Size:</strong> {item.displaySize}</p>
                <p><strong>Display Resolution:</strong> {item.displayResolution}</p>
                <p><strong>Ports:</strong> {item.ports.join(', ')}</p>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    ) : (
      <p>Loading...</p>
    )}
  </Container>
  );
}

export default ItemDetails;