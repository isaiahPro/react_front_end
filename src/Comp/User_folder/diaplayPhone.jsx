import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
const BucketURL=process.env.REACT_APP_SUPABASE_URL;

const DisplayLap = (props) => {
const imageSrc="bucketFileImage";




  return (
    <Container>
    {props.item ? (
      <Card className="my-3">
        <Row>
          <Col md={4}>
            <Card.Img src={`${BucketURL}/${imageSrc}/images/${props.item[0].image}.jpg`} alt={props.item[0].name} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{props.item[0].name}</Card.Title>
              <Card.Text style={{textAlign:"left",paddingLeft:"80px"}}>
               <p><strong>Price:</strong> {props.item[0].price}</p>
               <p><strong>Storage:</strong> {props.item[0].storage}</p>
               <p><strong>RAM:</strong> {props.item[0].ram}</p>
               <p><strong>DATE:</strong> {props.item[0].created_at}</p>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    ) : (
      <p>Loading...</p>
    )}
  </Container>
  )
}

export default DisplayLap