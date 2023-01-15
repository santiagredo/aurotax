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

    const data = await res.json();
    console.log(data.status);
    sendEncryptData(data.status2);

     //await downloadPdf();
}


async function postInfo1(){
    let obj = objCreator();
    console.log(obj)

    const res = await fetch(`${baseUrl}${postUrl}Admin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: obj
        })
    })

    const data = await res.json();
    console.log('Server res')
    console.log(data.status);

    await downloadPdf(data.status);
}


function objCreator(){
    const formElements = Array.from(form);

    let obj =  Object.fromEntries(
        formElements.map(element => [element.id, element.value])
    )
    console.log("Object created successfully")
    console.log(obj)
    return(obj)
}


function objCreator2(){
    const formElements = Array.from(form2);

    let obj2 =  Object.fromEntries(
        formElements.map(element => [element.id, element.value])
    )
    console.log(obj2)
    console.log("no deberia ir")
    return(obj2)
}


//The server generates a pdf in the server/assets folder, then makes a copy of that file in the public/assets folder, which this function passes into
async function downloadPdf(objRec){
    console.log('downloadPdf objRec')
    console.log(objRec)


    let dataRec = objRec;

    //For some reason, I have to open the pdf twice, the first opening does not show the recent data, it is not a problem with the back, nor with the front code, since the files do update well

    //Loader opens the file in a new window, and closes it after 10 milliseconds    
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

    //This timeout opens the pdf a second time 1 second later.
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

    //For some reason, you have to open the pdf three times, the first opening does not show the recent data, it is not a problem with the back, nor with the front code, since the files update well

    //Loader opens the file in a new window, and closes it after 10 milliseconds 
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

    //This timeout opens the pdf a second time 3 seconds later. 
    setTimeout(() => {
        window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_1.pdf`)
        window.open(`./assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_2.pdf`)
    },3000)
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
        