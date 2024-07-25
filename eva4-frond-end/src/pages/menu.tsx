import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap"; 

//exporta como predetermianda la funcion home
export default function Home() {
    return (
    <Container>
        <Row className="justify-content-center mt-5">
        <Col md={6}>
            <Card>
            <Card.Body  className='col'>
                <Button variant="danger" href="/">Volver</Button>
                <Card.Title className="text-center mb-4">Menu</Card.Title>
                <div className="d-grid gap-2">
                    <Button variant="success" href="/Registrar_usuario" size="lg">Registrar usuario</Button>
                    <Button variant="success" href="/Registrar_reclutas" size="lg">Registrar reclutas</Button>
                    <Button variant="dark" href="/Visualisar_usuarios" size="lg">Visualizar usuarios</Button>
                    <Button variant="dark" href="/Visualisar_reclutas" size="lg">Visualizar reclutas</Button>
                </div>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    );
}
