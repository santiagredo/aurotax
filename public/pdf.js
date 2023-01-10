//Urls para hacer peticiones al servidor
const baseUrlBd = "https://gd05688e24a07c4-aurotaxbd.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/taxpayer/taxpayer";
const baseUrl2 = 'http://localhost:8383';
const postUrl2 = '/decrypted';



function findByIdDecrypted1(){
    let idTaxPayer= sessionStorage.getItem('idTaxPayer');
    console.log(`El TPID es: ${idTaxPayer}`)
    $.ajax({
        type: "GET",
        url: `${baseUrlBd}/${idTaxPayer}`,
        dataType: "json",
        crossDomain: true,
        contentType: "application/json",
        complete: async function(response){
            if(response.status ==200){
                const data = JSON.parse(response.responseText);  
                console.log(data.items[0]); 
                    const data2 = await getAllDecryptedData(data.items[0]);
                    console.log(data2)
                    document.getElementById('nameLabel3').innerHTML = `${data2.name}`
                    document.getElementById('lastNameLabel3').innerHTML = `${data2.lastname}`
                    document.getElementById("idTaxPayer").value = `${data2.idtaxpayer}`
                    document.getElementById("name").value = `${data2.name}`
                    document.getElementById("lastName").value = `${data2.lastname}`
                    document.getElementById("ssn").value = `${data2.ssn}`
                    document.getElementById("country").value = `${data2.country}`
                    document.getElementById("homeAddress").value = `${data2.homeaddress}`
                    document.getElementById("apt").value = `${data2.apt}`
                    document.getElementById("city").value = `${data2.city}`
                    document.getElementById("state").value = `${data2.state}`
                    document.getElementById("postalCode").value = `${data2.postalcode}`
                    document.getElementById("phone").value = `${data2.phone}`
                    document.getElementById("email").value = `${data2.email}`
                    document.getElementById("dateEnter").value = `${data2.dateenter}`
                    document.getElementById("dateEnd").value = `${data2.dateend}`
                    document.getElementById("days2020").value = `${data2.days2020}`
                    document.getElementById("days2021").value = `${data2.days2021}`
                    document.getElementById("days2022").value = `${data2.days2022}`
                    document.getElementById("taxes").value = `${data2.taxes}`
                    document.getElementById("lastTaxForm").value = `${data2.lasttaxform}`
                    document.getElementById("changeStatus").value = `${data2.changestatus}`
                    document.getElementById("detailChangeStatus").value = `${data2.detailchangestatus}`
                    document.getElementById("netProfit").value = `${data2.netprofit}`
                    document.getElementById("profitAdjusted").value = `${data2.profitadjusted}`
                    document.getElementById("deductionSelfEmp").value = `${data2.deductionselfemp}`
                    document.getElementById("taxOne").value = `${data2.taxone}`
                    document.getElementById("taxTwo").value = `${data2.taxtwo}`
                    document.getElementById("totalTaxPartOne").value = `${data2.totaltaxpartone}`
                    document.getElementById("deductionSelfEmpTax").value = `${data2.deductionselfempTax}`
                    document.getElementById("baseAdjusted").value = `${data2.baseadjusted}`
                    document.getElementById("taxPartTwo").value = `${data2.taxparttwo}`
                    document.getElementById("totalTaxYear").value = `${data2.totaltaxyear}`
                    document.getElementById("totalI").value = `${data2.totali}`
                    document.getElementById("totalE").value = `${data2.totale}` 
                    document.getElementById("otherExpenses").value = `${data2.otherexpenses}` 
                    document.getElementById("transport").value = `${data2.transport}` 
                    document.getElementById("education").value = `${data2.education}` 
                    document.getElementById("food").value = `${data2.food}` 
                    document.getElementById("entertainment").value = `${data2.entertainment}` 
                    document.getElementById("tips").value = `${data2.tips}` 
                    document.getElementById("car").value = `${data2.car}` 
                    document.getElementById("health").value = `${data2.health}` 
                    document.getElementById("supply").value = `${data2.supply}`
            } else{
                alert("No se han cargado los registros")
            }
        }
    })
}



async function getAllDecryptedData(obj){
     
    const res = await fetch(`${baseUrl2}${postUrl2}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: obj
        })
    })
    const data = await res.json();
    return data.status2;
}