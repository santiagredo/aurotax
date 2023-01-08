import {urlFrontSever} from "./config";
import {urlBdSever} from "./config";

//Urls para hacer peticiones al servidor
const baseUrlBd = urlBdSever;
const baseUrl2 = urlFrontSever;
// const baseUrl2 = 'https://152.70.118.197:8383/';
// const baseUrl2 = 'http://localhost:8383' 
const postUrl2 = '/decrypted'

//Función para enviar la captura de valores del formulario al servidor
async function getAllDecryptedData(obj){
     
    //Con los valores en un objeto, se envía el objeto al servidor
    const res = await fetch(`${baseUrl2}${postUrl2}`, {
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
    // console.log("Aqui");
    // console.log(data.status2);
    // console.log("fin");
    return data.status2;
    

}

function findByIdDesencryted1(){
    let idTaxPayer= sessionStorage.getItem('idTaxPayer');

    $.ajax({
        type: "GET",
        url: baseUrlBd,
        // url: "http://155.248.236.50:8080/api/taxpayer/" + idTaxPayer,
        dataType: "json",
        crossDomain: true,
        contentType: "application/json",
        complete: async function(response){
            if(response.status ==200){
                const data = JSON.parse(response.responseText);  
                // console.log(data); 
                    const data2 = await getAllDecryptedData(data);
                     console.log("vamos bien");

                    document.getElementById('nameLabel3').innerHTML = `${data2.name}`
                    document.getElementById('lastNameLabel3').innerHTML = `${data2.lastName}`
                    
                    document.getElementById("idTaxPayer").value = `${data2.idTaxPayer}`
                    document.getElementById("name").value = `${data2.name}`
                    document.getElementById("lastName").value = `${data2.lastName}`
                    document.getElementById("ssn").value = `${data2.ssn}`
                    document.getElementById("country").value = `${data2.country}`
                    document.getElementById("homeAddress").value = `${data2.homeAddress}`
                    document.getElementById("apt").value = `${data2.apt}`
                    document.getElementById("city").value = `${data2.city}`
                    document.getElementById("state").value = `${data2.state}`
                    document.getElementById("postalCode").value = `${data2.postalCode}`
                    document.getElementById("phone").value = `${data2.phone}`
                    document.getElementById("email").value = `${data2.email}`
                    document.getElementById("dateEnter").value = `${data2.dateEnter}`
                    document.getElementById("dateEnd").value = `${data2.dateEnd}`
                    document.getElementById("days2020").value = `${data2.days2020}`
                    document.getElementById("days2021").value = `${data2.days2021}`
                    document.getElementById("days2022").value = `${data2.days2022}`
                    document.getElementById("taxes").value = `${data2.taxes}`
                    document.getElementById("lastTaxForm").value = `${data2.lastTaxForm}`
                    document.getElementById("changeStatus").value = `${data2.changeStatus}`
                    document.getElementById("detailChangeStatus").value = `${data2.detailChangeStatus}`

                    document.getElementById("netProfit").value = `${data2.netProfit}`
                    document.getElementById("profitAdjusted").value = `${data2.profitAdjusted}`
                    document.getElementById("deductionSelfEmp").value = `${data2.deductionSelfEmp}`
                    document.getElementById("taxOne").value = `${data2.taxOne}`
                    document.getElementById("taxTwo").value = `${data2.taxTwo}`
                    document.getElementById("totalTaxPartOne").value = `${data2.totalTaxPartOne}`
                    document.getElementById("deductionSelfEmpTax").value = `${data2.deductionSelfEmpTax}`
                    document.getElementById("baseAdjusted").value = `${data2.baseAdjusted}`
                    document.getElementById("taxPartTwo").value = `${data2.taxPartTwo}`
                    document.getElementById("totalTaxYear").value = `${data2.totalTaxYear}`

                    document.getElementById("totalI").value = `${data2.totalI}`
                    document.getElementById("totalE").value = `${data2.totalE}` 
                    document.getElementById("otherExpenses").value = `${data2.otherExpenses}` 

                    document.getElementById("transport").value = `${data2.transport}` 
                    document.getElementById("education").value = `${data2.education}` 
                    document.getElementById("food").value = `${data2.food}` 
                    document.getElementById("entertainment").value = `${data2.entertainment}` 
                    document.getElementById("tips").value = `${data2.tips}` 
                    document.getElementById("car").value = `${data2.car}` 
                    document.getElementById("health").value = `${data2.health}` 
                    document.getElementById("supply").value = `${data2.supply}` 
                    

            } else{
                alert("No se han cargado los registros");
            }
        }

    });


}
