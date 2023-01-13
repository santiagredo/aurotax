import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
const secretKey = process.env.ENCRYPTATION_SECRET_KEY; 


export async function encryptHub(data){
    let obj = JSON.parse(JSON.stringify(data));

    for (let key in obj) {
        obj[key] = encrypt(obj[key]);
    }
    
    obj.iv = iv.toString('hex');
    return obj;
}


function encrypt(data){
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex')
}