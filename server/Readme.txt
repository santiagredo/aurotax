El frontend es generado a partir de una petición get al servidor, este devuelve el html por defecto en la carpeta 'public': index.html.



Flujo de datos de generador de pdf:

    index.html -> index.js -> server.js -> pdfGenerator.mjs -> server.js -> index.js



1.  index.html - Captura datos

    1.1 validators.js - Verifica varias entradas en tiempo real: ssn, ssn2...

2.  index.js - Envuelve los datos en objeto y los pasa al servidor por petición POST al servidor: server.js.

    Error: devuelve en consolo: {status: 'failed'}.

3.  server.js - Recibe el objeto del frontend, procede a generar el pdf enviando el objeto a pdfGenerator.mjs

4.  pdfGenerator.mjs - Crea un nuevo formulario con los valores y la ruta especificada en server.js.

    El formulario se guarda en server/assets.

5.  server.js - Generado el nuevo formulario, y guardado en server, crea una copia del mismo archivo y lo envia a public/assets para fácil acceso.

    Success: devuelve en consola el mismo objeto con los valores del formulario recibido.

6.  index.js - Abre la copia del nuevo formulario en public/assets en una nueva ventana, en esta se puede imprimir el formulario.


El objeto enviado al servidor tiene las siguientes propiedades:

let objeto = {
    properties: {
        apt: ""
        city: ""
        country: ""
        dateEnd: "2022-12-31"
        dateEnter: ""
        daysDiscount2019: ""
        daysDiscount2020: ""
        daysDiscount2021: ""
        daysDiscount2022: ""
        email: ""
        homeAddress: ""
        lastName: "lopez"
        lastTaxForm: ""
        name: "nataly"
        phone: ""
        postalCode: ""
        ssn: ""
        ssn2: ""
        state: ""
        taxes-no: "0"
        taxes-yes: "1"
    }
}




Flujo de datos de encriptación:

    index.html -> index.js -> server.js -> encrypter.mjs -> server.js -> index.js


    El objeto encriptado queda así:

            iv: "61383d280e01dd52cdf77372448e0529"
            properties: 
                apt: "2b96d33efba58e589fe42220b5160cec"
                city: "2b96d33efba58e589fe42220b5160cec"
                country: "2b96d33efba58e589fe42220b5160cec"
                dateEnd: "17d9573acff90e3a8dabc796bee0468d"
                dateEnter: "2b96d33efba58e589fe42220b5160cec"
                daysDiscount2019: "2b96d33efba58e589fe42220b5160cec"
                daysDiscount2020: "2b96d33efba58e589fe42220b5160cec"
                daysDiscount2021: "2b96d33efba58e589fe42220b5160cec"
                daysDiscount2022: "2b96d33efba58e589fe42220b5160cec"
                email: "2b96d33efba58e589fe42220b5160cec"
                homeAddress: "2b96d33efba58e589fe42220b5160cec"
                lastName: "7c4f4c499dd363b00a8ec996c17a9f98"
                lastTaxForm: "2b96d33efba58e589fe42220b5160cec"
                name: "13099a26acb0f77e7364666b0614e79e"
                phone: "2b96d33efba58e589fe42220b5160cec"
                postalCode: "2b96d33efba58e589fe42220b5160cec"
                ssn: "2b96d33efba58e589fe42220b5160cec"
                ssn2: "2b96d33efba58e589fe42220b5160cec"
                state: "2b96d33efba58e589fe42220b5160cec"
                taxes-no: "5827c2b754af2b45721d6412a053c960"
                taxes-yes: "735e6edfe8f263195f622ced3855aab7"


Flujo de datos de desencriptación:

    server.js -> decryptor.mjs -> server.js -> index.js
