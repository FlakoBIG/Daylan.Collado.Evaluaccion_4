import { modificarRecluta, obtenerRecluta } from '@/Firebase/Promesas';
import { Recluta } from '@/Interfases/interfaces';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

export default function ModificarRecluta() {
    const [recluta, setRecluta] = useState<Recluta>();
    const router = useRouter();
    const [datosCargados, setDatosCargados] = useState(false);
    // Validaciones
    const [validacionNombre, setValidacionNombre] = useState("");
    const [validacionApellidoPaterno, setValidacionApellidoPaterno] = useState("");
    const [validacionApellidoMaterno, setValidacionApellidoMaterno] = useState("");
    const [validacionRut, setValidacionRut] = useState("");
    const [validacionFechaNacimiento, setValidacionFechaNacimiento] = useState("");
    const [validacionUltimoEstudio, setValidacionUltimoEstudio] = useState("");
    const [validacionVehiculos, setValidacionVehiculos] = useState("");
    const [validacionPorqueQuiereEntrar, setValidacionPorqueQuiereEntrar] = useState("");
    const [validacionManejoArmas, setValidacionManejoArmas] = useState("");

    // Estados de carga y error
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Funciones de validacion
    const validarNombre = (valor:string)=>{
        setRecluta({...recluta!, nombre: valor});
        setValidacionNombre(valor ? "" : "Debes ingresar el nombre del Recluta")};

    const validarApellidoPaterno=(valor: string) => {
        setRecluta({...recluta!,apellido_paterno: valor });
        setValidacionApellidoPaterno(valor?"":"Debes ingresar el Primer apellido del Recluta")};

    const validarApellidoMaterno = (valor: string)=>{
        setRecluta({...recluta!, apellido_materno: valor});
        setValidacionApellidoMaterno(valor?"":"Debes ingresar el Segundo apellido del Recluta")};

    const validarRut=(valor: string)=>{
        setRecluta({...recluta!, rut: valor });
        setValidacionRut(valor.length=== 9? "":"El RUT debe tener 9 caracteres");
        //tomamos los primeros 8 caracteres de valor
        const primeros8 = valor.slice(0, 8);
        //verificamos si esos primeros 8 numeros son numeros
        //^ inicia la cadena y indica que un numeor es del 0 al 9 y que tienen que haber 8 caracteres y se finalisa 
        const sonNumeros = /^[0-9]{8}$/.test(primeros8);
        if (!sonNumeros) {
            setValidacionRut("Los primeros 8 caracteres deben ser numeros");
        } else {
            setValidacionRut("");}};

    const validarFechaNacimiento =(valor: string) => {
        setRecluta({...recluta!, fechaNacimiento: valor});
        setValidacionFechaNacimiento(valor ? "" : "Debes ingresar la fecha de nacimiento del Recluta")};

    const validarUltimoEstudio =(valor: string) => {
        setRecluta({...recluta!, ultimoEstudio: valor});
        setValidacionUltimoEstudio(valor !== "Seleccionar.." ? "" : "Debes seleccionar uno de los estudios")};
    const validarPorqueQuiereEntrar = (valor:string)=>{
        setRecluta({ ...recluta!, porque_quiere_entrar: valor });
        setValidacionPorqueQuiereEntrar(valor.length >= 30 ? "":"Debes ingresar al menos 30 caracteres");
    };

    const validarManejoArmas = (valor:string) => {
        setRecluta({ ...recluta!, manejoArmas: valor });
        setValidacionManejoArmas(valor ? "" :"Debes marcar alguna de las 2 opciones");
    };
    const validarVehiculos = (nombreVehiculo:string,isChecked:boolean) => {
        let nuevosVehiculosRecluta: string[] = isChecked
            ? [...recluta!.vehiculos, nombreVehiculo]
            : recluta!.vehiculos.filter((v) => v !== nombreVehiculo);
        setRecluta({ ...recluta!, vehiculos: nuevosVehiculosRecluta });
        setValidacionVehiculos(nuevosVehiculosRecluta.length > 0 ? "" : "Debes marcar alguna opcion");
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
            Ediv1!.style.display = "inline";
        }
        // si esque auto , camion , moto estan marcados osea que cheked es true oculte el div 2 
        if ((EAuto.checked)||(ECamion.checked)||(EMoto.checked)){
            Ediv2!.style.display = "none";
        } else {
            Ediv2!.style.display = "inline";
        }};
    
    const cargarcheboxes = (vehiculos: string[]) => {
        console.log(vehiculos);
        let Ediv1 = document.getElementById("1");//div 1
        let Ediv2 = document.getElementById("2");//div 2
        let EAuto = document.getElementById("checkAuto") as HTMLInputElement;
        let EMoto = document.getElementById("checkMoto") as HTMLInputElement;
        let ECamion = document.getElementById("checkCamion") as HTMLInputElement;
        let Enose = document.getElementById("checknose") as HTMLInputElement;
        if (EAuto) EAuto.checked = vehiculos.includes("Auto");
        if (EMoto) EMoto.checked = vehiculos.includes("Moto");
        if (ECamion) ECamion.checked = vehiculos.includes("Camion");
        if (Enose) Enose.checked = vehiculos.includes("No se conducir")
            if (Enose.checked) {
                Ediv1!.style.display = "none";
            } else {
                Ediv1!.style.display = "inline";
            }
            // si esque auto , camion , moto estan marcados osea que cheked es true oculte el div 2 
            if ((EAuto.checked)||(ECamion.checked)||(EMoto.checked)){
                Ediv2!.style.display = "none";
            } else {
                Ediv2!.style.display = "inline";
            }};

    
    useEffect(() => {
        const key = router.query.key;
        if (typeof key === "string") {
                obtenerRecluta(key).then((r) => {
                    if (r) {
                        setRecluta(r);
                        setDatosCargados(true);
                    } else {
                        router.push("/Visualisar_reclutas");
                    }
                });
            } else {
                router.push("/Visualisar_reclutas");
            }
        }, [router.query]);
    
        useEffect(() => {
            if (datosCargados && recluta) {
                cargarcheboxes(recluta.vehiculos);
            }
        }, [datosCargados, recluta]);

    const handleModificar = () => {
        if (recluta && validacionNombre === "" && validacionApellidoPaterno === "" && validacionApellidoMaterno === "" &&
            validacionRut === "" && validacionFechaNacimiento === "" && validacionUltimoEstudio === "" &&
            validacionVehiculos === "" && validacionPorqueQuiereEntrar === "" && validacionManejoArmas === "")
            {setLoading(true);
            setError("");
            modificarRecluta(recluta).then(() => {
                setLoading(false);
                router.push("/Visualisar_reclutas");
            }).catch(() => {
                setError("Ocurrio un error");
                setLoading(false);
            });
        } else {setError("Por favor, rellena los campos correctamente")}};
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body  className='col'>
                            <Button variant="danger" href="/Visualisar_reclutas">Volver</Button>
                            <Card.Title className="text-center mb-4">Modificar Recluta</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {recluta ? (
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese nombre"
                                            value={recluta.nombre}
                                            name="nombre"
                                            onChange={(e) => validarNombre(e.currentTarget.value)}
                                        />
                                        <Form.Text style={{color: "red"}}>{validacionNombre}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Apellido Paterno:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese apellido paterno"
                                            value={recluta.apellido_paterno}
                                            name="apellido_paterno"
                                            onChange={(e) => validarApellidoPaterno(e.currentTarget.value)}
                                        />
                                        <Form.Text style={{color: "red"}}>{validacionApellidoPaterno}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Apellido Materno:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese apellido materno"
                                            value={recluta.apellido_materno}
                                            name="apellido_materno"
                                            onChange={(e) => validarApellidoMaterno(e.currentTarget.value)}
                                        />
                                        <Form.Text style={{color:"red"}}>{validacionApellidoMaterno}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Rut:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese RUT"
                                            value={recluta.rut}
                                            name="rut"
                                            onChange={(e)=>validarRut(e.currentTarget.value)}
                                        />
                                        <Form.Text style={{color:"red"}}>{validacionRut}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={recluta.fechaNacimiento}
                                            name="fechaNacimiento"
                                            onChange={(e) => validarFechaNacimiento(e.currentTarget.value)}
                                        />
                                        <Form.Text style={{color:"red"}}>{validacionFechaNacimiento}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Ultimo Estudio:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={recluta.ultimoEstudio}
                                            name="ultimoEstudio"
                                            onChange={(e) => validarUltimoEstudio(e.currentTarget.value)}
                                        >
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
                                                id= "checkCamion"
                                                type="checkbox"
                                                label="Camion"
                                                name="Camion"
                                                onChange={(e)=> validarVehiculos(e.target.name, e.target.checked)}/>
                                            <Form.Check
                                                id= "checkAuto"
                                                type="checkbox"
                                                label="Auto"
                                                name="Auto"
                                                onChange={(e)=> validarVehiculos(e.target.name, e.target.checked)}/>
                                            <Form.Check
                                                type="checkbox"
                                                label="Moto"
                                                name="Moto"
                                                id= "checkMoto"
                                                onChange={(e) =>validarVehiculos(e.target.name, e.target.checked)}/>
                                        </div>
                                        <div id="2" className="inline">
                                        <Form.Check
                                            id= "checknose"
                                            type="checkbox"
                                            label="No se conducir"
                                            name="No se conducir"
                                            onChange={(e)=> validarVehiculos(e.target.name, e.target.checked)}/>
                                        </div>
                                    </div>
                                    <Form.Text style={{color:"red"}}>{validacionVehiculos}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Porque quiere entrar?</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={recluta.porque_quiere_entrar}
                                            name="porque_quiere_entrar"
                                            onChange={(e) => validarPorqueQuiereEntrar(e.currentTarget.value)}
                                        />
                                        <Form.Text style={{color:"red"}}>{validacionPorqueQuiereEntrar}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Maneja armas?</Form.Label>
                                        <div>
                                            <Form.Check
                                                type="radio"
                                                label="Si"
                                                name="manejoArmas"
                                                value="Si"
                                                checked={recluta.manejoArmas === "Si"}
                                                onChange={(e) => validarManejoArmas(e.currentTarget.value)}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="No"
                                                name="manejoArmas"
                                                value="No"
                                                checked={recluta.manejoArmas === "No"}
                                                onChange={(e) => validarManejoArmas(e.currentTarget.value)}
                                            />
                                        </div>
                                        <Form.Text style={{color:"red"}}>{validacionManejoArmas}</Form.Text>
                                    </Form.Group>
                                    <div className="d-grid gap-2 mt-3">
                                        <Button variant="success" onClick={handleModificar} disabled={isLoading}>
                                            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Modificar Recluta"}
                                        </Button>
                                    </div>
                                </Form>
                            ) : (
                                <div className="text-center">
                                    <Spinner animation="border" />
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)}
