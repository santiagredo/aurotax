function liquidar2() {
    var wage = document.getElementById("wage").value;
    var income = document.getElementById("totalI").value;
    if (wage > 0) {
        if (income < 10276) {
            var taxPartTwo = Math.round(income * 0.1);
        } else {
            var taxPartTwo = Math.round(income * 0.12);
        }
        var totalTaxYear = taxPartTwo;
        var redondear = Math.round(totalTaxYear);

        alert("Total de impuestos a pagar " + redondear);
        document.getElementById("otherTax").innerHTML = taxPartTwo;
        document.getElementById("totalTax").innerHTML = totalTaxYear;
        hidefinanzas();
        window.scrollTo(0, document.body.scrollHeight);

        //variables liquidacion

        document.getElementById("taxPartTwo").value = taxPartTwo;
        document.getElementById("totalTaxYear").value = totalTaxYear;
    } else {
        alert("El Salario principal debe ser mayor a $0");
        document.getElementById("collapse1").click();
        document.getElementById("wage").focus();
    }
}

//mayusculas
function myFunction() {
    let x = document.getElementById("fname");
    x.value = x.value.toUpperCase();
}

//round1
function roundTax1(num) {
    var a = Math.round(num);
    return a;
}

function calcularOtherExpenses() {
    var numeros = [];
    var suma = 0;

    var a1 = parseInt(document.getElementById("transport").value);
    numeros.push(a1);
    var a2 = parseInt(document.getElementById("education").value);
    numeros.push(a2);

    for (var i = 0; i < numeros.length; i++) {
        if (isNaN(numeros[i])) {
            numeros[i] = 0;
        }
        suma += numeros[i];
    }
    document.getElementById("otherExpenses").value = suma;
    console.log(suma);
}
