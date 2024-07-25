import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table,Modal,Spinner} from "react-bootstrap";
import { obtenerReclutas,eliminarSoldado } from "@/Firebase/Promesas";
import { Recluta } from "@/Interfases/interfaces";
import Link from "next/link";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Visualisar_reclutas() {
    //para almacenar la lista de reclutas 
    const [reclutas, setReclutas] = useState<Recluta[]>([]);
    //visibilidad del modal
    const [show, setShow] = useState(false);
    //estado de carga 
    const [isLoading, setLoading] = useState(false);
    //este se usa para almacenar al usuario que se selecciono para eliminar
    const [ReclutaAEliminar, setReclutaAEliminar] = useState<Recluta | null>(null);
    //funcion para cerrar el modal 
    const handleClose = () => setShow(false);
    //para abrir el modal y mostrar el usuario que se va a elminar
    const handleShow = (recluta:Recluta) => {
        setReclutaAEliminar(recluta);
        setShow(true);};

        useEffect(() => {
        const fetchReclutas = async () => {
            const reclutasObtenidos = await obtenerReclutas();
            setReclutas(reclutasObtenidos);};
            fetchReclutas()});

        const Eliminar_recluta = async () => {
            setLoading(true);
            if (ReclutaAEliminar) {//verifica que hay un usuario seleccionado para eliminar
                await eliminarSoldado(ReclutaAEliminar.key!);//se le envia a la promesa la key del usuario a eliminar
                useEffect//cargamos la tabla denuevo 
                setLoading(false);
                handleClose();}};
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={11}>
                    <Card>
                        <Card.Body  className='col'>
                            <Button variant="danger" href="/menu">Volver</Button>
                            <Card.Title className="text-center mb-4">Tabla de reclutas registrados</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido Paterno</th>
                                        <th>Apellido Materno</th>
                                        <th>RUT</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Ultimo Estudio</th>
                                        <th>Sabe manejar </th>
                                        <th>Porque quiere entrar ?</th>
                                        <th>Maneja armas?</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {reclutas.map((recluta, index) => (
                                    <tr key={index}>
                                        <td>{recluta.nombre}</td>
                                        <td>{recluta.apellido_paterno}</td>
                                        <td>{recluta.apellido_materno}</td>
                                        <td>{recluta.rut}</td>
                                        <td>{recluta.fechaNacimiento}</td>
                                        <td>{recluta.ultimoEstudio}</td>
                                        <td>{recluta.vehiculos.join(' - ')}</td>
                                        <td>{recluta.porque_quiere_entrar}</td>
                                        <td>{recluta.manejoArmas}</td>
                                        <div className="">
                                            <Link href={`/Modificar_recluta?key=${recluta.key}`}>
                                                <Button variant="warning"><MdModeEditOutline/></Button>
                                            </Link>
                                            <Button 
                                                    variant="danger" 
                                                    onClick={() => handleShow(recluta)}><MdDelete />
                                            </Button>
                                        </div>
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
                    <Modal.Title>Eliminar Recluta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`¿Seguro que quieres eliminar al Recluta?`}
                    <br />
                    {ReclutaAEliminar?.nombre}{` `}{ReclutaAEliminar?.apellido_paterno}{` `}{ReclutaAEliminar?.apellido_materno}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mt-3" variant="secondary" onClick={handleClose}>No</Button>
                    <Button 
                        className="mt-3" 
                        variant="success" 
                        onClick={Eliminar_recluta}
                        disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm"/>:"Eliminar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>)}
