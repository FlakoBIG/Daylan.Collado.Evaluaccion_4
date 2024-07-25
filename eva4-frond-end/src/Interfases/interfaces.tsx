export interface usuario{
    nombre:string;
    contrasenia:string;
    key?:string;
}
export interface Recluta {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    rut: string;
    fechaNacimiento: string;
    ultimoEstudio: string;
    vehiculos: string[];
    porque_quiere_entrar: string;
    manejoArmas: string;
    key?:string;
}