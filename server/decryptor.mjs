import dotenv from 'dotenv';
dotenv.config()

import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

const secretKey = process.env.ENCRYPTATION_SECRET_KEY; 


//Funcion exportada, recibe el objeto a desencriptar
export async function decryptHub(data){
    //Crea un nuevo objeto despues de aplanar la informacion recibida
    let obj = JSON.parse(JSON.stringify(data));
    obj.idTaxPayer=String(obj.idTaxPayer);
    console.log(obj);

    //Recorre todos los valores en obj, desencriptandolos a su paso
    //La desencriptacion requiere el vector de inicializacion, que fue asignado al objeto al momento de crearlo
    for (let key in obj) {
        console.log(obj[key]);
        if(obj[key] != obj.iv && obj[key]!= obj.idTaxPayer){
            console.log(obj[key]);
            obj[key] = decrypt(obj[key], obj.iv)
            console.log(obj[key]);
        }
    }
    
    return obj
}

//Funcion para desencriptar cadenas de texto, necesita el vector de inicializacion para desencriptar
function decrypt(text, ivec){
    let iv = Buffer.from(ivec, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex');
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}