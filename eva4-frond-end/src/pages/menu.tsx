import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap"; 

export default function Home() {
    return (
    <Container>
        <Row className="justify-content-center mt-5">
        <Col md={6}>
            <Card>
            <Card.Body>
                <Button variant="danger" href="/">Volver</Button>
                <Card.Title className="text-center mb-4">Menu</Card.Title>
                <div className="d-grid gap-2">
                    <Button variant="success" href="/Registrar_usuario" size="lg">Registrar usuario</Button>
                    <Button variant="success" href="/" size="lg">Registrar reclutas</Button>
                    <Button variant="dark" href="/" size="lg">Visualizar reclutas</Button>
                </div>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    );
}
