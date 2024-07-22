import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap"; 

export default function Home() {
    const [nombre,setNombre] = useState("")
    const [Contrasenia,setContrasenia] = useState("")
    const [validacion_nombre,setvalidacion_nombre] = useState("")
    const [validacion_contrasenia,setvalidacion_contrasenia] = useState("")
    const [todo_bien_nombre,settodo_bien_nombre] = useState(false);
    const [todo_bien_contrasenia,settodo_bien_contrasenia] = useState(false);


    //validaciones
    const validarNombre = (valor:string) => {
        if (valor.length<4){
            setvalidacion_nombre("Debes ingresar 4 caracteres")
            settodo_bien_nombre(false)}
        else{setvalidacion_nombre("")
            settodo_bien_nombre(true)}}

    const validarContraseña = (valor:string) => {
        const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(valor);
        if (valor.length<4)
            {setvalidacion_contrasenia("Debes ingresar 4 caracteres");
                settodo_bien_contrasenia(false)
                return;}
        if (!caracteresEspeciales) {
            setvalidacion_contrasenia("Debes incluir al menos un carácter especial");
            settodo_bien_contrasenia(false)
            return;}
        else{setvalidacion_contrasenia("")
            settodo_bien_contrasenia(true)
        }}
    

    //pagina web
        return (
    <Container>
        <Row className="justify-content-center mt-5">
        <Col md={6}>
            <Card>
            <Card.Body>
                <Button variant="danger" href="/menu">Volver</Button>
                <Card.Title className="text-center mb-4">Registrar Usuario</Card.Title>
                <Form>
                <Form.Group>
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombre del usuario"
                    onChange={(nombre) => validarNombre(nombre.currentTarget.value)}/>
                    <Form.Text>{validacion_nombre}</Form.Text>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese la contraseña del usuario"
                    onChange={(Contrasenia) => validarContraseña(Contrasenia.currentTarget.value)}/>
                    <Form.Text>{validacion_contrasenia}</Form.Text>
                </Form.Group>
                <div className="d-grid gap-2 mt-4">
                    <Button type="button" variant="success" size="lg" >Registrar</Button>
                </div>
                </Form>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    );
}
