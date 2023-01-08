function liquidar(){
  alertaGastos();

    var wage = document.getElementById("wage").value;
    if(wage > 0) {
    calcularOtherExpenses();
    var income = document.getElementById("totalI").value;
    var expenses = document.getElementById("totalE").value;
    var profit = Math.round(income - expenses);
    var rateAdjuste = 0.9235;
    var profitAdjusted = Math.round(rateAdjuste * profit);
    var deductionSelfEmpTax = Math.round(profit - profitAdjusted);
    if( profit < 400){
        var taxOne = 0;
        var taxTwo = 0;
    } else{
         var taxOne = Math.round(profitAdjusted *0.124);
         var taxTwo = Math.round(profitAdjusted *0.029);
    };
    var totalTaxPartOne = taxOne + taxTwo;
    var deductionSelfEmpTax = Math.round(totalTaxPartOne *0.5);
    if( profit > 400){
        var condition = profit - deductionSelfEmpTax; 
    } else{
        var condition = profit;
    };
    var baseAdjusted = condition;
    console.log(baseAdjusted);
    if( baseAdjusted < 10276 ){
      var taxPartTwo = Math.round(baseAdjusted *0.1);
      console.log("10%");
      
    }else{
      var taxPartTwo = Math.round(baseAdjusted *0.12);
      console.log("12%");
    }
    // var taxPartTwo = Math.round(baseAdjusted *0.1);
    var totalTaxYear = totalTaxPartOne + taxPartTwo; 
    var redondear = Math.round((totalTaxYear));
    if( income > 0 && expenses >= 0){

        if(profit>=0){        
        console.log(totalTaxYear);
        console.log(redondear)
        console.log("Total de impuestos a pagar es "+ totalTaxYear);
        alert("Total de impuestos a pagar "+ redondear);
        document.getElementById('selfEmploymentTax').innerHTML = totalTaxPartOne;
        document.getElementById('otherTax').innerHTML = taxPartTwo;
        document.getElementById('totalTax').innerHTML = totalTaxYear;
        hidefinanzas();
        window.scrollTo(0, document.body.scrollHeight);

        //variables liquidacion

        document.getElementById('netProfit').value = profit;
        document.getElementById('profitAdjusted').value = profitAdjusted;
        document.getElementById('deductionSelfEmp').value = deductionSelfEmpTax;
        document.getElementById('taxOne').value = taxOne;
        document.getElementById('taxTwo').value = taxTwo;
        document.getElementById('totalTaxPartOne').value = totalTaxPartOne;
        document.getElementById('deductionSelfEmpTax').value = deductionSelfEmpTax;
        document.getElementById('baseAdjusted').value = baseAdjusted;
        document.getElementById('taxPartTwo').value = taxPartTwo;
        document.getElementById('totalTaxYear').value = totalTaxYear;
        

        // window.scrollTo({ top: 0, behavior: 'smooth' });
        
        //document.getElementById("totalTax").focus();
    
    }else{ alert("Valide los valores ingresados. Recuerde que sus gastos no pueden ser mayor que sus ingresos. Si requiere ayuda presione el icono de chat");
        document.getElementById('collapse1').click();
        document.getElementById("wage").focus();

        }
}else{
    alert("El Ingreso Neto (Ingresos - Gastos) no puede ser  menor que cero para declarar impuestos. Valide los valores registrados, Si requiere ayuda presione el icono de chat");
}

} else{
    alert("El Salario principal debe ser mayor a $0");
    document.getElementById('collapse1').click();
        document.getElementById("wage").focus();
}

}

  //mayusculas
function myFunction() {
    let x = document.getElementById("fname");
    x.value = x.value.toUpperCase();
  }

    //round1
  function roundTax1(num){
    var a =  Math.round((num));
    return a;
  } 

  function calcularOtherExpenses(){
    var numeros = [];
    var suma = 0;
    
    var a1 = parseInt(document.getElementById("transport").value);
    numeros.push(a1);
    var a2 = parseInt(document.getElementById("education").value);
    numeros.push(a2);
    
    for(var i=0; i<numeros.length; i++){
      if(isNaN(numeros[i])){
        numeros[i] = 0;
      }
      suma+=numeros[i];
    }
    document.getElementById('otherExpenses').value = suma;
    console.log(suma);
    }