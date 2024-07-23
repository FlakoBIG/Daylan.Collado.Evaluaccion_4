import { Recluta } from "@/Interfases/interfaces";
import { RegistrarSoldado } from "@/Firebase/Promesas";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function Home() {
    const [nombre, setNombre] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [rut, setRut] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [ultimoEstudio, setUltimoEstudio] = useState("Seleccionar..");
    const [vehiculos, setVehiculos] = useState<string[]>([]);
    const [mensaje, setMensaje] = useState("");
    const [manejoArmas, setManejoArmas] = useState("");

    // Validaciones
    const [validacionNombre, setValidacionNombre] = useState("");
    const [validacionApellido1, setValidacionApellido1] = useState("");
    const [validacionApellido2, setValidacionApellido2] = useState("");
    const [validacionRut, setValidacionRut] = useState("");
    const [validacionFechaNacimiento, setValidacionFechaNacimiento] = useState("");
    const [validacionUltimoEstudio, setValidacionUltimoEstudio] = useState("");
    const [validacionVehiculos, setValidacionVehiculos] = useState("");
    const [validacionMensaje, setValidacionMensaje] = useState("");
    const [validacionManejoArmas, setValidacionManejoArmas] = useState("");

    // Estados de carga y errores
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [registradoalrt, setRegistradoalrt] = useState("");

    // Funciones de validacion
    const validarNombre = (valor: string) => {
        setNombre(valor);
        setValidacionNombre(valor ? "" : "Debes ingresar el nombre del Recluta");
    };

    const validarApellido1 = (valor: string) => {
        setApellido1(valor);
        setValidacionApellido1(valor ? "" : "Debes ingresar el Primer apellido del Recluta");
    };

    const validarApellido2 = (valor: string) => {
        setApellido2(valor);
        setValidacionApellido2(valor ? "" : "Debes ingresar el Segundo apellido del Recluta");
    };

    const validarRut = (valor: string) => {
        setRut(valor);
        setValidacionRut(valor.length === 9 ? "" : "El RUT debe tener 9 caracteres");
    };

    const validarFechaNacimiento = (valor: string) => {
        setFechaNacimiento(valor);
        setValidacionFechaNacimiento(valor ? "" : "Debes ingresar la fecha de nacimiento del Recluta");
    };

    const validarUltimoEstudio = (valor: string) => {
        setUltimoEstudio(valor);
        setValidacionUltimoEstudio(valor !== "Seleccionar.." ? "" : "Debes seleccionar uno de los estudios");
    };

    const validarVehiculos = (nombreVehiculo: string, isChecked: boolean) => {
        let nuevosVehiculos: string[] = isChecked
            ? [...vehiculos, nombreVehiculo]
            : vehiculos.filter((v) => v !== nombreVehiculo);
        setVehiculos(nuevosVehiculos);
        setValidacionVehiculos(nuevosVehiculos.length > 0 ? "" : "Debes marcar alguna opcion");
    };

    const validarMensaje = (valor: string) => {
        setMensaje(valor);
        setValidacionMensaje(valor.length >= 30 ? "" : "Debes ingresar al menos 30 caracteres");
    };

    const validarManejoArmas = (valor: string) => {
        setManejoArmas(valor);
        setValidacionManejoArmas(valor ? "" : "Debes marcar alguna de las 2 opciones");
    };

    // Funcion para registrar al recluta
    const registrarRecluta = () => {
        if (
            nombre &&
            apellido1 &&
            apellido2 &&
            rut.length === 9 &&
            fechaNacimiento &&
            ultimoEstudio !== "Seleccionar.." &&
            vehiculos.length > 0 &&
            mensaje.length >= 30 &&
            manejoArmas
        ) {
            setLoading(true);
            setError("");
            setRegistradoalrt("");
            const Recluta: Recluta = {
                nombre,
                apellido1,
                apellido2,
                rut,
                fechaNacimiento,
                ultimoEstudio,
                vehiculos,
                mensaje,
                manejoArmas,
            };
            RegistrarSoldado(Recluta)
                .then(() => {
                    reiniciarEstados();
                    setRegistradoalrt("Se registro con exito :D");
                    setLoading(false);
                })
                .catch((e: any) => {
                    setError("Algo paso, vuelve a intentarlo de nuevo");
                    console.log(e);
                    setLoading(false);
                });
        } else {
            setError("Por favor, rellena todos los campos");
        }
    };

    // Funcion para reiniciar los estados del formulario
    const reiniciarEstados = () => {
        setNombre("");
        setApellido1("");
        setApellido2("");
        setRut("");
        setFechaNacimiento("");
        setUltimoEstudio("Seleccionar..");
        setVehiculos([]);
        setMensaje("");
        setManejoArmas("");
        setValidacionNombre("");
        setValidacionApellido1("");
        setValidacionApellido2("");
        setValidacionRut("");
        setValidacionFechaNacimiento("");
        setValidacionUltimoEstudio("");
        setValidacionVehiculos("");
        setValidacionMensaje("");
        setValidacionManejoArmas("");
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Button variant="danger" href="/menu">Volver</Button>
                            <Card.Title className="text-center mb-4">Registrar Recluta</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {registradoalrt && <Alert variant="success">{registradoalrt}</Alert>}
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Nombre"
                                        value={nombre}
                                        onChange={(e) => validarNombre(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionNombre}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Apellido Paterno</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Apellido Paterno"
                                        value={apellido1}
                                        onChange={(e) => validarApellido1(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionApellido1}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Apellido Materno</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Apellido Materno"
                                        value={apellido2}
                                        onChange={(e) => validarApellido2(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionApellido2}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Rut"
                                        value={rut}
                                        onChange={(e) => validarRut(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionRut}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fechaNacimiento}
                                        onChange={(e) => validarFechaNacimiento(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionFechaNacimiento}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Ultimo estudio:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ultimoEstudio}
                                        onChange={(e) => validarUltimoEstudio(e.target.value)}>
                                        <option>Seleccionar..</option>
                                        <option>Kinder</option>
                                        <option>Basica</option>
                                        <option>Media</option>
                                        <option>Universidad</option>
                                    </Form.Control>
                                    <Form.Text style={{color:"red"}}>{validacionUltimoEstudio}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Que sabes conducir?</Form.Label>
                                    <div className="mb-3">
                                        <div id="1" className="inline">
                                            <Form.Check
                                                type="checkbox"
                                                label="Camion"
                                                name="Camion"
                                                onChange={(e) => validarVehiculos(e.target.name, e.target.checked)}/>
                                            <Form.Check
                                                type="checkbox"
                                                label="Auto"
                                                name="Auto"
                                                onChange={(e) => validarVehiculos(e.target.name, e.target.checked)}/>
                                            <Form.Check
                                                type="checkbox"
                                                label="Moto"
                                                name="Moto"
                                                onChange={(e) => validarVehiculos(e.target.name, e.target.checked)}/>
                                        </div>
                                        <div id="2" className="inline">
                                        <Form.Check
                                            type="checkbox"
                                            label="No se conducir"
                                            name="No se conducir"
                                            onChange={(e) => validarVehiculos(e.target.name, e.target.checked)}/>
                                        </div>
                                    </div>
                                    <Form.Text style={{color:"red"}}>{validacionVehiculos}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Por que quieres entrar?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ingrese el motivo"
                                        value={mensaje}
                                        onChange={(e) => validarMensaje(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionMensaje}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Manejo de armas:</Form.Label>
                                    <div className="mb-3">
                                        <Form.Check
                                            type="radio"
                                            label="Si"
                                            value="Si"
                                            name="ManejoArmas"
                                            onChange={(e) => validarManejoArmas(e.target.value)}/>
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            value="No"
                                            name="ManejoArmas"
                                            onChange={(e) => validarManejoArmas(e.target.value)}/>
                                    </div>
                                    <Form.Text style={{color:"red"}}>{validacionManejoArmas}</Form.Text>
                                </Form.Group>
                                <Button
                                    className="mt-3"
                                    variant="primary"
                                    onClick={registrarRecluta}
                                    disabled={isLoading}>
                                    {isLoading ? <Spinner animation="border" size="sm"/> : "Registrar"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
