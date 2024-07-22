import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap"; 

export default function Home() {
    return (
    <Container>
        <Row className="justify-content-center mt-5">
        <Col md={6}>
            <Card>
            <Card.Body>
                <Card.Title className="text-center mb-4">Login Servicio Militar</Card.Title>
                <Form>
                <Form.Group>
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese Contraseña" />
                </Form.Group>
                <div className="d-grid gap-2 mt-4">
                    <Button type="button" variant="success" size="lg" href="/menu">Iniciar sesión</Button>
                </div>
                </Form>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    );
}
