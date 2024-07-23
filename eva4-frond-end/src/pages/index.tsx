import { verificarUsuario } from "@/Firebase/Promesas"; // Asegúrate de que esta ruta sea correcta
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function Home() {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [validacionNombre, setValidacionNombre] = useState("");
    const [validacionContrasenia, setValidacionContrasenia] = useState("");
    const [todoBienNombre, setTodoBienNombre] = useState(false);
    const [todoBienContrasenia, setTodoBienContrasenia] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Validaciones
    const validarNombre = (valor:string) => {
        setNombre(valor);
        if (valor.length < 4) {
            setValidacionNombre("Debes ingresar 4 caracteres");
            setTodoBienNombre(false);}
        else {
            setValidacionNombre("");
            setTodoBienNombre(true);}};

    const validarContrasenia = (valor:string) => {
        setContrasenia(valor);
        if (valor.length < 4) {
            setValidacionContrasenia("Debes ingresar 4 caracteres");
            setTodoBienContrasenia(false);
        } else {
            setValidacionContrasenia("");
            setTodoBienContrasenia(true);}};

    // Iniciar sesion
    const iniciarSesion = async () => {
        if (todoBienNombre && todoBienContrasenia) {
            setLoading(true);
            setError("");
            const usuario = { nombre, contrasenia };
            try {
                const existe = await verificarUsuario(usuario);
                if (existe) {
                    window.location.href = "/menu";
                } else {
                    setError("Usuario o contraseña incorrectos");
                }
                setLoading(false);
            } catch (e) {
                setError("Algo paso ,vuelve a intentarlo denuevo");
                console.log(e);
                setLoading(false);
            }}else{setError("Por favor, Rellena los campos");}};

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Login Servicio Militar</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form>
                                <Form.Group>
                                    <Form.Label>Usuario:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su nombre"
                                        value={nombre}
                                        onChange={(e) => validarNombre(e.currentTarget.value)}
                                    />
                                    <Form.Text style={{ color: "red" }}>{validacionNombre}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese Contraseña"
                                        value={contrasenia}
                                        onChange={(e) => validarContrasenia(e.currentTarget.value)}/>
                                    <Form.Text style={{ color: "red" }}>{validacionContrasenia}</Form.Text>
                                </Form.Group>
                                <div className="d-grid gap-2 mt-4">
                                    <Button
                                        type="button"
                                        variant="success"
                                        size="lg"
                                        onClick={iniciarSesion}
                                        disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                />{""}
                                                Cargando...</>) : ("Iniciar sesion")}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
