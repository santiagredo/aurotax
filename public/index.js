const urlBdSever = "https://gd05688e24a07c4-aurotaxbd.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/taxpayer/taxpayer"
// const baseUrl = 'http://localhost:8383';
const baseUrl = "https://aurotax.com";
const getUrl = '/get';
const postUrl = '/post';
const pdfUrl = '/pdf'



//La clase pdfValues captura los valores de cada entrada del formulario
const form = document.getElementsByClassName("pdfValues");
const form2 = document.getElementsByClassName("pdfValues2");



//Función para enviar la captura de valores del formulario al servidor
// Guarda la informacion de la opcion 1
async function postInfo(){
    //Función para envolver todos los valores del formulario en un objeto. Los valores son enviados como objeto al servidor
    let obj = objCreator();
    console.log("Object received in postInfo")
    console.log(obj)
    //Con los valores en un objeto, se envía el objeto al servidor
    const res = await fetch(`${baseUrl}${postUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: obj
        })
    })

    //Respuesta del servidor. Recibe un objeto: {status: data}. Devuelve el mismo objeto enviado
    const data = await res.json();
    console.log(data.status);
    sendEncryptData(data.status2);

    //Funcion para descargar/abrir el pdf
     //await downloadPdf();
}

//Función para enviar la captura de valores del formulario al servidor y generar los PDF.
async function postInfo1(){
    //Función para envolver todos los valores del formulario en un objeto. Los valores son enviados como objeto al servidor
    let obj = objCreator();
    console.log(obj)


    //Con los valores en un objeto, se envía el objeto al servidor
    const res = await fetch(`${baseUrl}${postUrl}Admin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: obj
        })
    })

    //Respuesta del servidor. Recibe un objeto: {status: data}. Devuelve el mismo objeto enviado
    const data = await res.json();
    console.log('Server res')
    console.log(data.status);

    // sendEncryptData(data.status);

    //Funcion para descargar/abrir el pdf
    await downloadPdf(data.status);
    
}


//Funcion para envolver los valores del formulario en un objeto
function objCreator(){
    const formElements = Array.from(form);

    let obj =  Object.fromEntries(
        formElements.map(element => [element.id, element.value])
    )
    console.log("Object created successfully")
    console.log(obj)
    return(obj)
}

//Funcion para envolver los valores del formulario en un objeto
function objCreator2(){
    const formElements = Array.from(form2);

    let obj2 =  Object.fromEntries(
        formElements.map(element => [element.id, element.value])
    )
    console.log(obj2)
    console.log("no deberia ir")
    return(obj2)
}

//Funcion para descargar/abrir el archivo pdf
//El servidor genera un pdf en la carpeta server/assets, luego hace una copia de ese archivo en la carpte public/assets, al cual ingresa esta funcion
async function downloadPdf(objRec){
    console.log('downloadPdf objRec')
    console.log(objRec)


    let dataRec = objRec;

    //Por alguna razón, toca abrir el pdf dos veces, la primera apertura no muestra los datos recientes, no es problema del back, ni del código del front, ya que los archivos sí se actualizan bien 

    //Loader abre el archivo en una nueva ventana, y la cierra a los 10 milisegundos
    function loader(data){
        let temp = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_1.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp.close()}, 10)
        let temp2 = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_2.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp2.close()}, 10)
        let temp3 = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_3.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp3.close()}, 10)
        let temp4 = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_4.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp4.close()}, 10)
        let temp5 = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_5.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp5.close()}, 10)
        let temp6 = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_6.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp6.close()}, 10)
    }
    loader(dataRec);

    //Este timeout abre por segunda vez el pdf 1 segundo después. 
    setTimeout(() => {
        window.open(`./assets/form1Pdf/${dataRec.name}_${dataRec.lastName}_${dataRec.email}_1.pdf`)
        window.open(`./assets/form1Pdf/${dataRec.name}_${dataRec.lastName}_${dataRec.email}_2.pdf`)
        window.open(`./assets/form1Pdf/${dataRec.name}_${dataRec.lastName}_${dataRec.email}_3.pdf`)
        window.open(`./assets/form1Pdf/${dataRec.name}_${dataRec.lastName}_${dataRec.email}_4.pdf`)
        window.open(`./assets/form1Pdf/${dataRec.name}_${dataRec.lastName}_${dataRec.email}_5.pdf`)
        window.open(`./assets/form1Pdf/${dataRec.name}_${dataRec.lastName}_${dataRec.email}_6.pdf`)
    },1000)
}

async function downloadPdf2(dataObj){
    const data = dataObj;

    //Por alguna razón, toca abrir el pdf tres veces, la primera apertura no muestra los datos recientes, no es problema del back, ni del código del front, ya que los archivos sí se actualizan bien 

    //Loader abre el archivo en una nueva ventana, y la cierra a los 10 milisegundos
    function loader2(data){
        let temp = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_1.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp.close()}, 10)
        let temp2 = window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_2.pdf`,'windowname','width=1,height=1,left=5,top=3')
        setTimeout(() => {temp2.close()}, 10)
    }
    loader2(data);

    setTimeout(() => {
        loader2(data)
    }, 1000)

    //Este timeout abre por segunda vez el pdf 3 segundos después. 
    setTimeout(() => {
        window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_1.pdf`)
        window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_2.pdf`)
    },3000)


    //Código para descargar el pdf
    // const anchor = document.createElement("a");
    // anchor.href = './assets/copyOfGeneratedPDF.pdf';
    // anchor.download = 'downloadableCopyOfGeneratedPDF.pdf';

    // document.body.appendChild(anchor);
    // anchor.click();
    // document.body.removeChild(anchor);
}

async function sendEncryptData(data){
    // const data = await res.json();
    let dataTosend=JSON.stringify(data);
    let botton =  document.getElementById("sendData")
    console.log(dataTosend);
    $.ajax({
        url : urlBdSever,
        type : 'POST',
        data:dataTosend,
        contentType:'application/json',
        success : function(json){
            botton.disabled = true; 
            swal("Informacion enviada con exito!","No olvides enviar un mensaje al administrador via whatsapp notificando el envio de la informacion.", "success").then(value => {
                setTimeout(() => {location.reload(); }, 1000);
                window.location.href = "https://wa.me/573167782676?text=Hola%20,%20ya%20envie%20mi%20informacion.";
               });

        },
        error : function(xhr, status){
          swal("Error al enviar!","Comuniquese con el administrador.", "warning").then(value => {
            setTimeout(() => {location.reload(); }, 1000);
            window.location.href = "https://wa.me/573167782676?text=Hola%20,%20hay%un%20error%20al%20enviar%20la%20información.";
           });
            
        }
    });
} 


async function optDosEnd(){
    let botton =  document.getElementById("sendData2")
    
    setTimeout(() => {
        botton.disabled = true; 
    }, 10000)
}
        