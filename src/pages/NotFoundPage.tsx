import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class NotFoundPage extends React.Component {
  render() {
    return (
      <Container className="d-flex h-100">
        <Row className="w-100 align-self-center">
          <Col>
            <div className="h3 text-center">Nic tu nie ma!</div>
          </Col>
        </Row>
      </Container>
    );
  }
}
