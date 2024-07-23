import { addDoc, collection, getDocs,where,query } from "firebase/firestore";
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
export const verificarUsuario = async (usuario:usuario) => {
    const q = query(
        collection(db, "usuario"),
        where("nombre", "==", usuario.nombre),
        where("contrasenia", "==", usuario.contrasenia)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

