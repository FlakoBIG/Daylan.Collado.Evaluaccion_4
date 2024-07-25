import { Recluta } from "@/Interfases/interfaces";
import { RegistrarSoldado } from "@/Firebase/Promesas";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

//exporta como predetermianda la funcion home
export default function Registrar_reclutas() {
    const [nombreRecluta, setNombreRecluta] = useState("");
    const [apellidoPaternoRecluta, setApellidoPaternoRecluta] = useState("");
    const [apellidoMaternoRecluta, setApellidoMaternoRecluta] = useState("");
    const [rutRecluta, setRutRecluta] = useState("");
    const [fechaNacimientoRecluta, setFechaNacimientoRecluta] = useState("");
    const [ultimoEstudioRecluta, setUltimoEstudioRecluta] = useState("Seleccionar..");
    const [vehiculosRecluta, setVehiculosRecluta] = useState<string[]>([]);
    const [porque_quiere_entrar, setporque_quiere_entrar] = useState("");
    const [manejoArmasRecluta, setManejoArmasRecluta] = useState("");
    // Validaciones
    const [validacionNombreRecluta, setValidacionNombreRecluta] = useState("");
    const [validacionApellidoPaternoRecluta, setValidacionApellidoPaternoRecluta] = useState("");
    const [validacionApellidoMaternoRecluta, setValidacionApellidoMaternoRecluta] = useState("");
    const [validacionRutRecluta, setValidacionRutRecluta] = useState("");
    const [validacionFechaNacimientoRecluta, setValidacionFechaNacimientoRecluta] = useState("");
    const [validacionUltimoEstudioRecluta, setValidacionUltimoEstudioRecluta] = useState("");
    const [validacionVehiculosRecluta, setValidacionVehiculosRecluta] = useState("");
    const [validacionporque_quiere_entrar, setValidacionporque_quiere_entrar] = useState("");
    const [validacionManejoArmasRecluta, setValidacionManejoArmasRecluta] = useState("");

    // Estados de carga y errores
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [registroExitoso, setRegistroExitoso] = useState("");

    // Funciones de validacion
    const validarNombreRecluta = (valor:string) => {
        setNombreRecluta(valor);
        setValidacionNombreRecluta(valor?"":"Debes ingresar el nombre del Recluta")};

    const validarApellidoPaternoRecluta=(valor:string) => {
        setApellidoPaternoRecluta(valor);
        setValidacionApellidoPaternoRecluta(valor?"":"Debes ingresar el Primer apellido del Recluta")};

    const validarApellidoMaternoRecluta=(valor:string) => {
        setApellidoMaternoRecluta(valor);
        setValidacionApellidoMaternoRecluta(valor?"": "Debes ingresar el Segundo apellido del Recluta")};

    const validarRutRecluta=(valor:string)=>{
        setRutRecluta(valor);
    
        //siesque el valor no tiene 9 caracteres
        if (valor.length !== 9) {
            setValidacionRutRecluta("El RUT debe tener 9 caracteres");
            return;}
        //tomamos los primeros 8 caracteres de valor
        const primeros8 = valor.slice(0, 8);
        //verificamos si esos primeros 8 numeros son numeros
        //^ inicia la cadena y indica que un numeor es del 0 al 9 y que tienen que haber 8 caracteres y se finalisa 
        const sonNumeros = /^[0-9]{8}$/.test(primeros8);
        if (!sonNumeros) {
            setValidacionRutRecluta("Los primeros 8 caracteres deben ser numeros");
        } else {
            setValidacionRutRecluta("");}};

    const validarFechaNacimientoRecluta = (valor: string) => {
        setFechaNacimientoRecluta(valor);
        setValidacionFechaNacimientoRecluta(valor ? "" : "Debes ingresar la fecha de nacimiento del Recluta");
    };

    const validarUltimoEstudioRecluta = (valor: string) => {
        setUltimoEstudioRecluta(valor);
        setValidacionUltimoEstudioRecluta(valor !== "Seleccionar.." ? "" : "Debes seleccionar uno de los estudios");
    };

    const validarVehiculosRecluta = (nombreVehiculo: string, isChecked: boolean) => {
        //varibale que es una array y depende de la ischeked 
        let nuevosVehiculosRecluta: string[] = isChecked
        //si ischeked es true , se crea una array y tienen todos los elementos de veiculos y el nombre
            ? [...vehiculosRecluta, nombreVehiculo]
            //si es falso , filtra los veiculos y ase una arrai que excluye y/o saca siesque se desmarco la opcion
            : vehiculosRecluta.filter((v) => v !== nombreVehiculo);
            // se llama para actualizar
        setVehiculosRecluta(nuevosVehiculosRecluta);
        setValidacionVehiculosRecluta(nuevosVehiculosRecluta.length > 0 ? "" : "Debes marcar alguna opcion");
        //optenemos los vehiculos para no dejar que seleccione un auto y que no sabe conducir
        let Ediv1 = document.getElementById("1");//div 1
        let Ediv2 = document.getElementById("2");//div 2
        //se le tiene que indicar que es un htmlinputelement si no no funciona 
        let EAuto = document.getElementById("checkAuto") as HTMLInputElement;
        let EMoto = document.getElementById("checkMoto") as HTMLInputElement;
        let ECamion = document.getElementById("checkCamion") as HTMLInputElement;
        let Enose = document.getElementById("checknose") as HTMLInputElement;

        //siesque nose conduir esta marcado oculte el div 1
        if (Enose.checked) {
            Ediv1!.style.display = "none";
        } else {
            Ediv1!.style.display = "inline"}
        // si esque auto , camion , moto estan marcados osea que cheked es true oculte el div 2 
        if ((EAuto.checked) || (ECamion.checked) || (EMoto.checked)) {
            Ediv2!.style.display = "none";
        } else {
            Ediv2!.style.display = "inline"}};

    const validarporque_quiere_entrar = (valor: string) => {
        setporque_quiere_entrar(valor);
        setValidacionporque_quiere_entrar(valor.length >= 30 ? "" : "Debes ingresar al menos 30 caracteres")};

    const validarManejoArmasRecluta = (valor: string) => {
        setManejoArmasRecluta(valor);
        setValidacionManejoArmasRecluta(valor ? "" : "Debes marcar alguna de las 2 opciones")};

    // Funcion para registrar al recluta
    const registrarRecluta = () => {
        if (
            nombreRecluta &&
            apellidoPaternoRecluta &&
            apellidoMaternoRecluta &&
            rutRecluta.length === 9 &&
            fechaNacimientoRecluta &&
            ultimoEstudioRecluta !== "Seleccionar.." &&
            vehiculosRecluta.length > 0 &&
            porque_quiere_entrar.length >= 30 &&
            manejoArmasRecluta
        ) {
            setLoading(true);
            setError("");
            setRegistroExitoso("");
            const Recluta: Recluta = {
                nombre: nombreRecluta,
                apellido_paterno: apellidoPaternoRecluta,
                apellido_materno: apellidoMaternoRecluta,
                rut: rutRecluta,
                fechaNacimiento: fechaNacimientoRecluta,
                ultimoEstudio: ultimoEstudioRecluta,
                vehiculos: vehiculosRecluta,
                porque_quiere_entrar: porque_quiere_entrar,
                manejoArmas: manejoArmasRecluta,
            };
            RegistrarSoldado(Recluta)
                .then(() => {
                    reiniciarEstados();
                    setRegistroExitoso("Se registro con exito :D");
                    setLoading(false);
                })
                .catch((e: any) => {
                    setError("Algo paso, vuelve a intentarlo de nuevo");
                    console.log(e);
                    setLoading(false);
                });
        } else {setError("Por favor, rellena todos los campos");}};

    // Funcion para reiniciar los estados del formulario
    const reiniciarEstados = () => {
        let Ediv1 = document.getElementById("1");//div 1
        let Ediv2 = document.getElementById("2");//div 2
        let EAuto = document.getElementById("checkAuto") as HTMLInputElement;
        let EMoto = document.getElementById("checkMoto") as HTMLInputElement;
        let ECamion = document.getElementById("checkCamion") as HTMLInputElement;
        let Enose = document.getElementById("checknose") as HTMLInputElement;
        let Eno = document.getElementById("radiosi") as HTMLInputElement;
        let Esi = document.getElementById("radiono") as HTMLInputElement;
        setNombreRecluta("");
        setApellidoPaternoRecluta("");
        setApellidoMaternoRecluta("");
        setRutRecluta("");
        setFechaNacimientoRecluta("");
        setUltimoEstudioRecluta("Seleccionar..");
        setVehiculosRecluta([]);
        Ediv1!.style.display = "inline";
        Ediv2!.style.display = "inline";
        EAuto.checked = false
        EMoto.checked = false
        ECamion.checked = false
        Enose.checked = false
        Eno.checked = false
        Esi.checked = false
        setporque_quiere_entrar("");
        setManejoArmasRecluta("");
        setValidacionNombreRecluta("");
        setValidacionApellidoPaternoRecluta("");
        setValidacionApellidoMaternoRecluta("");
        setValidacionRutRecluta("");
        setValidacionFechaNacimientoRecluta("");
        setValidacionUltimoEstudioRecluta("");
        setValidacionVehiculosRecluta("");
        setValidacionporque_quiere_entrar("");
        setValidacionManejoArmasRecluta("");
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body  className='col'>
                            <Button variant="danger" href="/menu">Volver</Button>
                            <Card.Title className="text-center mb-4">Registrar Recluta</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Nombre"
                                        value={nombreRecluta}
                                        onChange={(e) => validarNombreRecluta(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionNombreRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Apellido Paterno</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Apellido Paterno"
                                        value={apellidoPaternoRecluta}
                                        onChange={(e) => validarApellidoPaternoRecluta(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionApellidoPaternoRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Apellido Materno</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Apellido Materno"
                                        value={apellidoMaternoRecluta}
                                        onChange={(e) => validarApellidoMaternoRecluta(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionApellidoMaternoRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el Rut"
                                        value={rutRecluta}
                                        onChange={(e) => validarRutRecluta(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionRutRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fechaNacimientoRecluta}
                                        onChange={(e) => validarFechaNacimientoRecluta(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionFechaNacimientoRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Ultimo estudio:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ultimoEstudioRecluta}
                                        onChange={(e) => validarUltimoEstudioRecluta(e.target.value)}>
                                        <option>Seleccionar..</option>
                                        <option>Kinder</option>
                                        <option>Basica</option>
                                        <option>Media</option>
                                        <option>Universidad</option>
                                    </Form.Control>
                                    <Form.Text style={{color:"red"}}>{validacionUltimoEstudioRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Que sabes conducir?</Form.Label>
                                    <div className="mb-3">
                                        <div id="1" className="inline">
                                            <Form.Check
                                                id= "checkCamion"
                                                type="checkbox"
                                                label="Camion"
                                                name="Camion"
                                                onChange={(e) => validarVehiculosRecluta(e.target.name, e.target.checked)}/>
                                            <Form.Check
                                                id= "checkAuto"
                                                type="checkbox"
                                                label="Auto"
                                                name="Auto"
                                                onChange={(e) => validarVehiculosRecluta(e.target.name, e.target.checked)}/>
                                            <Form.Check
                                                type="checkbox"
                                                label="Moto"
                                                name="Moto"
                                                id= "checkMoto"
                                                onChange={(e) => validarVehiculosRecluta(e.target.name, e.target.checked)}/>
                                        </div>
                                        <div id="2" className="inline">
                                        <Form.Check
                                            id= "checknose"
                                            type="checkbox"
                                            label="No se conducir"
                                            name="No se conducir"
                                            onChange={(e) => validarVehiculosRecluta(e.target.name, e.target.checked)}/>
                                        </div>
                                    </div>
                                    <Form.Text style={{color:"red"}}>{validacionVehiculosRecluta}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Por que quieres entrar?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ingrese el motivo"
                                        value={porque_quiere_entrar}
                                        onChange={(e) => validarporque_quiere_entrar(e.target.value)}/>
                                    <Form.Text style={{color:"red"}}>{validacionporque_quiere_entrar}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Maneja armas?</Form.Label>
                                    <div className="mb-3">
                                        <Form.Check
                                            id="radiosi"
                                            type="radio"
                                            label="Si"
                                            value="Si"
                                            name="ManejoArmas"
                                            onChange={(e) => validarManejoArmasRecluta(e.target.value)}/>
                                        <Form.Check
                                            id="radiono"
                                            type="radio"
                                            label="No"
                                            value="No"
                                            name="ManejoArmas"
                                            onChange={(e) => validarManejoArmasRecluta(e.target.value)}/>
                                    </div>
                                    <Form.Text style={{color:"red"}}>{validacionManejoArmasRecluta}</Form.Text>
                                </Form.Group>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {registroExitoso && <Alert variant="success">{registroExitoso}</Alert>}
                                <div className="d-grid gap-2 mt-4">
                                    <Button
                                        className="mt-3"
                                        variant="success"
                                        onClick={registrarRecluta}
                                        disabled={isLoading}>
                                        {isLoading ? <Spinner animation="border" size="sm"/> : "Registrar"}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)}