import { addDoc, collection, getDocs,where,query,deleteDoc,doc,updateDoc,getDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Recluta, usuario } from "@/Interfases/interfaces";

//registrar usuario
export const RegistrarUsuario = async(usuario:usuario)=>{
    const docRef = await addDoc(collection(db,"usuario"),usuario);
}
//registrar recluta
export const RegistrarSoldado = async(recluta:Recluta)=>{
    const docRef = await addDoc(collection(db,"Recluta"),recluta);
}

//buscar usuario 
//esto se encuentra en firebase ejecutar consultas simples y compuestas
export const verificarUsuario = async (usuario:usuario) => {
    const q = query(
        collection(db, "usuario"),
        where("nombre", "==", usuario.nombre),
        where("contrasenia", "==", usuario.contrasenia)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

// Obtener reclutas
export const obtenerReclutas = async () => {
    const querySnapshot = await getDocs(collection(db, "Recluta"));
    const reclutas: Recluta[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const recluta: Recluta = {
            nombre: data.nombre,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            rut: data.rut,
            fechaNacimiento: data.fechaNacimiento,
            ultimoEstudio: data.ultimoEstudio,
            vehiculos: data.vehiculos,
            porque_quiere_entrar: data.porque_quiere_entrar,
            manejoArmas: data.manejoArmas,
            key: doc.id
        };
        reclutas.push(recluta);
    });
    return reclutas;
};

// Obtener usuarios
export const obtenerUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "usuario"));
    const usuario: usuario[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const recluta: usuario = {
            nombre: data.nombre,
            contrasenia: data.contrasenia,
            key: doc.id
        };
        usuario.push(recluta);
    });
    return usuario;
};

//eliminar recluta
export const eliminarSoldado = async(reclutaId:string)=>{
    const ref = doc(db,"Recluta",reclutaId);
    await deleteDoc(ref);
}
//eliminar usuario
export const eliminarusuario = async(usuarioId:string)=>{
    const ref = doc(db,"usuario",usuarioId);
    await deleteDoc(ref);
}

// Modificar usuario
export const modificarUsuario = async (usuario: usuario) => {
    const ref = doc(collection(db, "usuario"), usuario.key);
    await updateDoc(ref, {
        nombre: usuario.nombre,
        contrasenia: usuario.contrasenia,
    });
};

// Obtener un usuario con la key
export const obtenerUsuario = async (key: string) => {
    const docRef = doc(db, "usuario", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let usuario: usuario = {
            nombre: docSnap.data().nombre,
            contrasenia: docSnap.data().contrasenia,
            key: docSnap.id,
        };
        return usuario;
    } else {
        return undefined;
    }
};
// Modificar recluta
export const modificarRecluta = async (recluta: Recluta) => {
    const ref = doc(collection(db, "Recluta"), recluta.key);
    await updateDoc(ref, {
        nombre: recluta.nombre,
        apellido_paterno: recluta.apellido_paterno,
        apellido_materno: recluta.apellido_materno,
        rut: recluta.rut,
        fechaNacimiento: recluta.fechaNacimiento,
        ultimoEstudio: recluta.ultimoEstudio,
        vehiculos: recluta.vehiculos,
        porque_quiere_entrar: recluta.porque_quiere_entrar,
        manejoArmas: recluta.manejoArmas,
    });
};

// Obtener un recluta con la key
export const obtenerRecluta = async (key: string) => {
    const docRef = doc(db, "Recluta", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let recluta: Recluta = {
            nombre: docSnap.data().nombre,
            apellido_paterno: docSnap.data().apellido_paterno,
            apellido_materno: docSnap.data().apellido_materno,
            rut: docSnap.data().rut,
            fechaNacimiento: docSnap.data().fechaNacimiento,
            ultimoEstudio: docSnap.data().ultimoEstudio,
            vehiculos: docSnap.data().vehiculos,
            porque_quiere_entrar: docSnap.data().porque_quiere_entrar,
            manejoArmas: docSnap.data().manejoArmas,
            key: docSnap.id,
        };
        return recluta;
    } else {return undefined;}};