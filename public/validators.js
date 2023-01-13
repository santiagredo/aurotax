// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos

function validation() {
    'use strict'
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    let forms = document.querySelectorAll('.needs-validation');
     // Bucle sobre ellos y evitar el envío
     Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)  
    
    })
}


//calculadora de dias

// Input DateEnd
function showContentDate(){
    element = document.getElementById("group_dateExit");
    let select = document.getElementById("dateQuestion").value;
    if (select === "0" ) {
        element.style.display='block'; 
        document.getElementById("dateEnd").focus();
    }
    else {
        element.style.display='none';
        $("#dateEnd").val("2022-12-31");
    }
}


//2019
function calculardiasDiscount2019(){
    let timeStart = new Date(document.getElementById("dateEnter").value);
    let timeEnd = new Date("2019-12-31");
    let actualDate = new Date();
    if (timeEnd > timeStart)
    {
        let diff = timeEnd.getTime() - timeStart.getTime();
        document.getElementById("days2019").value = Math.round(diff / (1000 * 60 * 60 * 24));
    }
    else if (timeEnd != null && timeEnd < timeStart) {
        //alert("La fecha final de la promoción debe ser mayor a la fecha inicial");
        document.getElementById("days2019").value = 0;
    }
}


//2020
function calculardiasDiscount2020(){
    let timeStart = new Date(document.getElementById("dateEnter").value);
    let timeEnd = new Date("2020-12-31");
    let lastYear = document.getElementById("days2019").value
    let actualDate = new Date();

    if(timeEnd > timeStart){
        let diff = timeEnd.getTime() - timeStart.getTime();
        let diff2= Math.round((diff / (1000 * 60 * 60 * 24)-lastYear));
        if(diff2 >="366"){
        document.getElementById("days2020").value ="366";

        } else{
        document.getElementById("days2020").value = diff2;
        }
    }else if (timeEnd != null && timeEnd < timeStart){
        // alert("La fecha final de la promoción debe ser mayor a la fecha inicial");
        document.getElementById("days2020").value = 0;
    }
}


//2021
function calculardiasDiscount2021(){
    let timeStart = new Date(document.getElementById("dateEnter").value);
    let timeEnd = new Date("2021-12-31");
    let lastYear = document.getElementById("days2020").value
    let actualDate = new Date();

    if (timeEnd > timeStart){
        let diff = timeEnd.getTime() - timeStart.getTime();
        let diff2= Math.round((diff / (1000 * 60 * 60 * 24)-lastYear));

        if(diff2 >="365"){
        document.getElementById("days2021").value ="365";

        }else{
        document.getElementById("days2021").value = diff2;
        }
    }else if (timeEnd != null && timeEnd < timeStart){
        // alert("La fecha final de la promoción debe ser mayor a la fecha inicial");
        document.getElementById("days2021").value = 0;
    }
}


//2022
function calculardiasDiscount2022(){
    let timeStart = new Date(document.getElementById("dateEnter").value);
    let timeEnd = new Date(document.getElementById("dateEnd").value);
    let year2019 = new Number(document.getElementById("days2019").value);
    let year2020 = new Number(document.getElementById("days2020").value);
    let year2021 = new Number(document.getElementById("days2021").value);
    let actualDate = new Date();

    if (timeEnd > timeStart){
        let diff = timeEnd.getTime() - timeStart.getTime();
        let diff2= Math.round(diff / (1000 * 60 * 60 * 24));
        let remanent = diff2 - year2019-year2020-year2021;
        let weeks = ((remanent)/7).toFixed(1); 
        if(diff2>365){
        document.getElementById("days2022").value = remanent;
        document.getElementById("weeksHelp").value = weeks;
        document.getElementById('totalWeekHelp').innerHTML = weeks;
        }else{
            document.getElementById("days2022").value = remanent+1;
            document.getElementById("weeksHelp").value = weeks;
            document.getElementById('totalWeekHelp').innerHTML = weeks;
        }
    }else if (timeEnd != null && timeEnd <= timeStart){
        alert("La fecha salida del país debe ser mayor a la fecha de ingreso");
        document.getElementById("days2022").value = 0;
    }
}


// Input forms from last year
function showContent1(){
    element = document.getElementById("inputLastTaxForm");
    let select = document.getElementById("taxes").value;
    if (select === "0" ) {
        element.style.display='block'; 
        document.getElementById("lastTaxForm").focus();
    }
    else {
        element.style.display='none';
        $("#lastTaxForm").val("");
    }
}


// Input forms from last year
function showContentStatus1(){
    element = document.getElementById("inputStatus");
    let select = document.getElementById("changeStatus").value;
    if (select === "0" ) {
        element.style.display='block'; 
        document.getElementById("detailChangeStatus").focus();
    }
    else {
        element.style.display='none';
        $("#detailChangeStatus").val("");
    }
}


//Input ssn
function validateSsn(){
    element1 = document.getElementById("ssn").value;
    element2 = document.getElementById("ssn2").value;
    ssnAlert = document.getElementById("ssnAlert");
    if (element1 != element2) {
        ssnAlert.style.display='block';
    }
    else {
        ssnAlert.style.display='none';
    }
}


//Input ssn
function validateSsn2(){
    element1 = document.getElementById("ssn").value;
    element2 = document.getElementById("ssn2").value;
    ssnAlert = document.getElementById("ssnAlert2");
    ssnAlert2 = document.getElementById("alertSsn1");
    if (element1.length > 9 || element1.length < 9){
        ssnAlert.style.display='block';
        ssnAlert2.style.display='block';
    }
    else {
        ssnAlert.style.display='none';
        ssnAlert2.style.display='none';
    }
}


// Estimador de income
function helpIncome(){
    let  wageHelp = document.getElementById("wageHelp").value
    let  weeksHelp = document.getElementById("weeksHelp").value
    let  totalHelp = Math.round(wageHelp * weeksHelp);
    console.log(totalHelp);

    if(wageHelp > 0){
        document.getElementById("incomeHelp").value = totalHelp
        document.getElementById("wage").value = totalHelp
    } else{
        document.getElementById("wage").value = totalHelp
        sumIncome();
        alert("Ingrese un valor para continuar.");   
    }
}


//ocultar mostrar income estimado
$(document).ready(function(){

    let incomeDiv = document.getElementById("ingresosDiv");
    let btnNextIncome = document.getElementById("btnNextIncome");

    $("#btnHelpIncome").click(function(){
       $("#helpIncome").each(function() {
         displaying = $(this).css("display");
         if(displaying == "block") {
            incomeDiv.style.display="block";
            btnNextIncome.style.display="none";
            helpIncome();
           $(this).fadeOut('slow',function() {
            $(this).css("display","none");
           });
         } else {
            incomeDiv.style.display="none";
            btnNextIncome.style.display="block";
           $(this).fadeIn('slow',function() {
             $(this).css("display","block");
           });
         }
       });
     });
});


//Ocultar estimador
function ocultarEstimador(){
    elementz = document.getElementById("helpIncome");
    let incomeDiv = document.getElementById("ingresosDiv");
    elementa = document.getElementById("incomeHelp").value;

    if(elementa > 0){
        sumIncome();
        elementz.style.display='none';
        incomeDiv.style.display='block';
        showTotalIncome();
        helpIncome();
        // document.getElementById("wage").focus();
        // document.getElementById('collapse2').click();
        // document.getElementById("transport").focus();
    }else{
        elementz.style.display='block';
        incomeDiv.style.display='none';
        sumIncome();
        helpIncome();
    }

}


function hidecollapse(){
    collapse1 = document.getElementById("collapseIngresos");
    collapse2 = document.getElementById("collapseGastos");
    sumIncome();
    incomeAnual = document.getElementById("totalI").value;
    if( incomeAnual > 0){
        collapse2.style.display='block';
        document.getElementById('collapse2').click();
        document.getElementById("transport").focus();
    }else{
        alert("Recuerde que sus ingresos anuales deben ser mayor de cero para continuar.")
        document.getElementById('collapse1').click();
    }
}

 
function saveInfoGeneral(){
    let name, lastName, ssn, ssn2, country, homeAddress, postalCode, state, phone, email;days2022;{
        name= $("#name").val();
        lastName= $("#lastName").val();
        ssn= $("#ssn").val();
        ssn2= $("#ssn2").val();
        country= $("#country").val();
        homeAddress= $("#homeAddress").val();
        postalCode= $("#postalCode").val();
        state= $("#state").val();
        phone= $("#phone").val();
        email= $("#email").val();
        controlDays= $("#days2022").val();

        if(name.length==0 ||
            ssn.length==0||
            ssn.length<9||
            ssn.length>9||
             lastName.length==0 || 
             country== "Seleccione un país"|| 
             country.length==0 ||
             homeAddress.length==0||
             postalCode.length==0||
             state==""||
             phone.length==0||
             email.length==0||
             controlDays==0||
             name.length>30){

                alert("Valide que todos los campos obligatorios esten debidamente diligenciados. El formulario no se ha enviado. Si tiene dudas puede presionar el icono de chat."); 
        } else{
            if(ssn2 != ssn){
                alert("Social Security Number debe ser igual en ambos campos. Recuerde que debe ser un numero de 9 digitos. Sin espacios o caracteres especiales.")
                } else{
                     //validamos input formLastYear
                     let element = document.getElementById("lastTaxForm").value;
                     let select = document.getElementById("taxes");
                    if ( select === 1 && element.length == 0) {
                        alert("Diligencie el codigo del formulario de impuestos entregado el año anterior ej: 1040-NR");   
                    } else {
                        //validamos cambio de estatus
                        let element99 = document.getElementById("detailChangeStatus").value;
                        let select99 = document.getElementById("changeStatus");
                        if ( select99 === 1 && element99.length == 0) {
                            alert("Diligencie la fecha del cambio de status y el tipo. Ej. 10/31/2022 change of status to student");   
                       } else {
                        //validamos terminos
                         let terms = document.getElementById("terms");
                        if(terms.checked){
                            document.getElementById('nameLabel').innerHTML = name
                            document.getElementById('nameLabel1').innerHTML = name
                            alert("Hola "+ name +", "+"Excelente trabajo");
                            hideGeneral();
                          } else{
                            alert("Confirme que leyo y que acepta los terminos y condiciones")}
                    }
                }
        }
    }
}
}


function clean(){
    
    $("#name").val("");
    $("#lastName").val("");
    $("#ssn").val("");
    $("#ssn2").val("");
    $("#country").val("Seleccione un país");
    $("#homeAddress").val("");
    $("#apt").val("");
    $("#city").val("");
    $("#postalCode").val("");
    $("#state").val("Seleccione el estado de residencia");
    $("#phone").val("");
    $("#email").val("");
    $("#dateEnter").val("");
    $("#dateEnd").val("2022-12-31");
    $("#lastTaxForm").val("");
    $("#terms").val("");

}


function limpiar(){
    $('input[type="text"]').val('');
    $('input[type="number"]').val('');
};


function recargar(){
    elementx = document.getElementById("sendData2");

    if(elementx.disabled == true ){
        location.reload()
        limpiar();
        alert("Gracias por confiar en nosotros.");
    }
};


function showDays() {
	let element = document.getElementById("days");
	element.style.display = "block";
}


function showAlertDays(){
    let days2020 = document.getElementById("days2022").value;
    let alertDays = document.getElementById("alertDays");
    let alertDays1 = document.getElementById("alertDays1");

    if( days2020<=1){
        alertDays.style.display = "block";
        alertDays1.style.display = "block";
    }else{
        alertDays.style.display = "none";
        alertDays1.style.display = "none";
    }
	

}


function showGeneral() {
	let element = document.getElementById("general");
    let element2 = document.getElementById("finanzas");
    let element3 = document.getElementById("resumen")
	element.style.display = "block";
    element2.style.display = "none";
    element3.style.display = "none";
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo({ top: 0, behavior: 'smooth' });

}


function hideGeneral() {
	let element = document.getElementById("general");
    let element2 = document.getElementById("finanzas");
    let element3 = document.getElementById("resumen")
	element.style.display = "none";
    element2.style.display = "block";
    element3.style.display = "none";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // document.getElementById('collapse1').click();
    // document.getElementById("wage").focus();
    document.getElementById('btnHelpIncome').click();


}


function hidefinanzas() {
	let element3 = document.getElementById("finanzas");
    let element4 = document.getElementById("resumen");
	element3.style.display = "none";
    element4.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('collapse1').click();
    document.getElementById("wage").focus();
}


function showFinanzas() {
	let element = document.getElementById("general");
    let element2 = document.getElementById("finanzas");
    let element3 = document.getElementById("resumen")
	element.style.display = "none";
    element2.style.display = "none";
    element3.style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById('collapse1').click();
    document.getElementById("wage").focus();
    
}


//Input total Ingresos
function showTotalIncome(){
    element1 = document.getElementById("totalI").value;
    inputTotalIncome = document.getElementById("totalIncomeDiv");
    let btnNextIncome = document.getElementById("btnNextIncome");

    if (element1>0){
        inputTotalIncome.style.display='block';
        btnNextIncome.style.display='block';
        
    }
    else {
        inputTotalIncome.style.display='none';
        btnNextIncome.style.display='none';
    }
}


//Input total Ingresos
function showTotalHelpIncome(){
    element1 = document.getElementById("wageHelp").value;
    inputHelpIncome = document.getElementById("incomeHelpDiv");

    if (element1>0){
        inputHelpIncome.style.display='block';
    }
    else {
        inputHelpIncome.style.display='none';
    }
}


//Input total Egresos
function showTotalExpenses(){
    element1 = document.getElementById("totalE").value;
    inputTotalExpensesDiv = document.getElementById("totalExpensesDiv");

    if (element1>0){
        inputTotalExpensesDiv.style.display='block';
    }
    else {
        inputTotalExpensesDiv.style.display='none';
    }
}


function alertaGastos(){
    element1 = document.getElementById("totalE").value;
    alertGastos= document.getElementById("alertaGastosDiv"); 

    if (element1 == 0){
        alertGastos.style.display='block';
    }
    else {
        alertGastos.style.display='none';
    }
}


//mayusculas
function upperCase(string) {
    let x = string.toUpperCase();
    return x;
}