import { modificarUsuario, obtenerUsuario } from '@/Firebase/Promesas';
import { usuario } from '@/Interfases/interfaces';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

export default function ModificarUsuario() {
    const [usuario, setUsuario] = useState<usuario>();
    const router = useRouter();
    //validaciones
    const [validacionNombre, setValidacionNombre] = useState("");
    const [validacionContrasenia, setValidacionContrasenia] = useState("");
    const [todoBienNombre, setTodoBienNombre] = useState(false);
    const [todoBienContrasenia, setTodoBienContrasenia] = useState(false);
    //carga y error
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //funcion validaciones
    const validarNombre = (valor:string) => {
        if (usuario) {
            setUsuario({...usuario, nombre: valor});}
        if (valor.length < 4) {
            setValidacionNombre("Debes ingresar 4 caracteres");
            setTodoBienNombre(false);
        } else {
            setValidacionNombre("");
            setTodoBienNombre(true);}};

    const validarContrasenia=(valor:string)=>{
        if (usuario) {
            setUsuario({ ...usuario, contrasenia: valor });
        }
        const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(valor);
        if (valor.length < 4) {
            setValidacionContrasenia("Debes ingresar 4 caracteres");
            setTodoBienContrasenia(false);
            return;
        }
        if (!caracteresEspeciales) {
            setValidacionContrasenia("Debes incluir al menos un caracter especial");
            setTodoBienContrasenia(false);
            return;
        } else {
            setValidacionContrasenia("");
            setTodoBienContrasenia(true);}};

    const handleUsuario=(name:string,value:string) => {
        if (name=="nombre") {
            validarNombre(value);
        } else if (name=="contrasenia") {
            validarContrasenia(value);}};

    useEffect(() => {
        const key = router.query.key;
        if (typeof key === "string") {
            obtenerUsuario(key).then((u) => {
                if (u != undefined) {
                    setUsuario(u);
                    setTodoBienNombre(true);
                    setTodoBienContrasenia(true);
                } else {router.push("/Visualisar_usuarios");} // volver a la tabla
            });
        } else {
            router.push("/Visualisar_usuarios");} // volver a la tabla
    },[router.query]);

    const handleModificar = () => {
        //si es true y usuario tiene el usuario que se va a modificar
        if (todoBienNombre && todoBienContrasenia && usuario) {
            setLoading(true);
            setError("");
            modificarUsuario(usuario).then(() => {
                setLoading(false);
                router.push("/Visualisar_usuarios"); // volver a la tabla
            }).catch(() => {
                setError("Ocurrio un error");
                setLoading(false);
            });
        } else {setError("Por favor, rellena los campos correctamente");}};

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body  className='col'>
                            <Button variant="danger" href="/Visualisar_usuarios">Volver</Button>
                            <Card.Title className="text-center mb-4">Modificar Usuario</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {usuario ? (
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese nombre"
                                            value={usuario.nombre}
                                            name="nombre"
                                            onChange={(e) => handleUsuario(e.currentTarget.name, e.currentTarget.value)}/>
                                        <Form.Text style={{color:"red"}}>{validacionNombre}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Contraseña:</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Ingrese contraseña"
                                            value={usuario.contrasenia}
                                            name="contrasenia"
                                            onChange={(e) => handleUsuario(e.currentTarget.name, e.currentTarget.value)}/>
                                        <Form.Text style={{color:"red"}}>{validacionContrasenia}</Form.Text>
                                    </Form.Group>
                                    <div className='d-grid gap-2'>
                                        <Button
                                            type="button"
                                            variant="success"
                                            onClick={handleModificar}
                                            className="mt-3"
                                            disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                    /> Cargando...</>) : ("Modificar")}
                                        </Button>
                                    </div>
                                    {/* si aun no carga que se muestre un spinner*/}
                                </Form>) : (
                                <div className="text-center"><Spinner animation="border" /></div>)}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)}
