import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

const secretKey = process.env.ENCRYPTATION_SECRET_KEY; 



//Funcion exportada, recibe el objeto a encriptar
export async function encryptHub(data){
    //Crea un nuevo objeto despues de aplanar la informacion recibida desde el front
    let obj = JSON.parse(JSON.stringify(data));

    //Recorre todos los valores en obj.properties, encriptandolos a su paso
    for (let key in obj) {
        obj[key] = encrypt(obj[key]);
    }

    //Asigna una nueva propiedad al objeto, el vector de inicializacion
    obj.iv = iv.toString('hex');
    return obj;
}

//Funcion para encriptar cadenas de texto
function encrypt(data){
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex')
}