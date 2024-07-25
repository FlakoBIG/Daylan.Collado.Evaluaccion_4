import { RegistrarUsuario } from "@/Firebase/Promesas";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card,Spinner,Alert } from "react-bootstrap";

//exporta como predetermianda la funcion home
export default function Home() {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    //validaciones 
    const [validacionNombre, setValidacionNombre] = useState("");
    const [validacionContrasenia, setValidacionContrasenia] = useState("");
    const [todoBienNombre, setTodoBienNombre] = useState(false);
    const [todoBienContrasenia, setTodoBienContrasenia] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [registradoalrt, setregistradoalrt] = useState("");

    // funciones validaciones
    const validarNombre=(valor:string) =>{
        setNombre(valor);
        //si valor es menor que 4
        if (valor.length < 4) {
            setValidacionNombre("Debes ingresar 4 caracteres");
            setTodoBienNombre(false);}
        else {
            setValidacionNombre("");
            setTodoBienNombre(true);}};

    const validarContrasenia=(valor:string)=>{
        setContrasenia(valor);
        //consttante que se llama caracteresespeciales que es true si "valor" tiene algun caracter del conjunto y falso si no tiene
        const caracteresEspeciales=/[!@#$%^&*(),.?":{}|<>]/.test(valor);
        //si valor es menor que 4
        if (valor.length<4) {
            setValidacionContrasenia("Debes ingresar 4 caracteres");
            setTodoBienContrasenia(false);
            return;}
        //si no tiene los caracteres especiales 
        if (!caracteresEspeciales){
            setValidacionContrasenia("Debes incluir al menos un caracter especial");
            setTodoBienContrasenia(false);
            return;} 
            else {
            setValidacionContrasenia("");
            setTodoBienContrasenia(true);}};

    // Reiniciar todo al 0
    const reiniciarEstados = () => {
        setNombre("");
        setContrasenia("");
        setValidacionNombre("");
        setValidacionContrasenia("");
        setTodoBienNombre(false);
        setTodoBienContrasenia(false)};
    // registrar al usuario
    const registrarUsuario = () => {
        // si todobiennombre y todobien contrasenia son true ....
        if (todoBienNombre && todoBienContrasenia) {
            setLoading(true);
            setError("");
            setregistradoalrt("");
            const usuario = {nombre,contrasenia};
            RegistrarUsuario(usuario)
                .then(() => {
                    reiniciarEstados();
                    setregistradoalrt("Se registro con exito :D");
                    setLoading(false)})
                .catch((e) => {
                    setError("Algo paso ,vuelve a intentarlo denuevo");
                    console.log(e);
                    setLoading(false);
                })}else{setError("Por favor, Rellena los campos")}};
    // pagina
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body  className='col'>
                            <Button variant="danger" href="/menu">Volver</Button>
                            <Card.Title className="text-center mb-4">Registrar Usuario</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {registradoalrt && <Alert variant="success">{registradoalrt}</Alert>}
                            <Form>
                                <Form.Group>
                                    <Form.Label>Usuario:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre del usuario"
                                        value={nombre}
                                        onChange={(e) => validarNombre(e.currentTarget.value)}/>
                                        {/* no funciona el rojo si lo pongo en una clase :c */}
                                    <Form.Text style={{color:"red"}}>{validacionNombre}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese la contraseña del usuario"
                                        value={contrasenia}
                                        onChange={(e) => validarContrasenia(e.currentTarget.value)}/>
                                        {/* no funciona el rojo si lo pongo en una clase :c */}
                                    <Form.Text style={{color:"red"}}>{validacionContrasenia}</Form.Text>
                                </Form.Group>
                                <div className="d-grid gap-2 mt-4">
                                <Button
                                        type="button"
                                        variant="success"
                                        size="lg"
                                        onClick={registrarUsuario}
                                        disabled={isLoading}>
                                            {/* siesque isloading es true  que haga todo lo qeuesta dentro*/}
                                        {isLoading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                /> Cargando...
                                                {/* siesque es false que muestre registrar */}
                                            </>):("Registrar")}</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)}