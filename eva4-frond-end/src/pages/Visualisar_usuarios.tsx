import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table, Modal,Spinner } from "react-bootstrap";
import { eliminarusuario, obtenerUsuarios } from "@/Firebase/Promesas";
import { usuario } from "@/Interfases/interfaces";
import Link from "next/link";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function visualisar_usuarios() {
    //para almacenar la lista de usuarios 
    const [usuario, setusuario] = useState<usuario[]>([]);
    //visibilidad del modal
    const [show, setShow] = useState(false);
    //este se usa para almacenar al usuario que se selecciono para eliminar 
    const [usuarioAEliminar, setUsuarioAEliminar] = useState<usuario | null>(null);
//estado de carga 
    const [isLoading, setLoading] = useState(false);

    //funcion para cerrar el modal 
    const handleClose = () => setShow(false);
    //para abrir el modal y mostrar el usuario que se va a elminar
    const handleShow = (usuario: usuario) => {
        setUsuarioAEliminar(usuario);
        setShow(true);};

    useEffect(() => {
        const fetchusuario = async () => {
            const usuarioObtenidos = await obtenerUsuarios(); // se obtiene la lista de los usuarios de firebase
            setusuario(usuarioObtenidos);}; // se setea la lista de usuarios
        fetchusuario()}); // se llama la funcion para obtener 


    const Eliminar_usuario = async () => {
        setLoading(true);
        if (usuarioAEliminar) {//verifica que hay un usuario seleccionado para eliminar
            await eliminarusuario(usuarioAEliminar.key!);//se le envia a la promesa la key del usuario a eliminar
            useEffect//cargamos la tabla denuevo 
            setLoading(false);
            handleClose();}};

    //pagina
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={7}>
                    <Card>
                        <Card.Body  className='col'>
                            <Button variant="danger" href="/menu">Volver</Button>
                            <Card.Title className="text-center mb-4">Tabla de usuarios registrados</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Contraseña</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuario.map((usuario, index) => (
                                        <tr key={index}>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.contrasenia}</td>
                                            <td className="mt-3">
                                                <Link href={`/Modificar_usuario?key=${usuario.key}`}>
                                                    <Button variant="warning"><MdModeEditOutline /></Button>
                                                </Link>
                                                <Button 
                                                    variant="danger" 
                                                    onClick={() => handleShow(usuario)}><MdDelete />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`¿Seguro que quieres eliminar al usuario (${usuarioAEliminar?.nombre}) ??`}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mt-3" variant="secondary" onClick={handleClose}>No</Button>
                    <Button 
                        className="mt-3" 
                        variant="success" 
                        onClick={Eliminar_usuario}
                        disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm"/> : "Eliminar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>);}
