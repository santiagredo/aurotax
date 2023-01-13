import dotenv from 'dotenv';
dotenv.config()

import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTATION_SECRET_KEY; 


export async function decryptHub(data){    
    let obj = JSON.parse(JSON.stringify(data));
    obj.idtaxpayer=String(obj.idtaxpayer);
    console.log("Object received from server, ID parsed to string")
    console.log(data)

    for (let key in obj) {
        if(obj[key] != obj.iv && obj[key]!= obj.idtaxpayer){
            obj[key] = decrypt(obj[key], obj.iv)
        }
    }
    console.log("Object Decrypted")
    console.log(data)
    return obj
}


function decrypt(text, ivec){
    let iv = Buffer.from(ivec, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex');
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}