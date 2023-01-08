const { PDFDocument } = PDFLib

const form3 = document.getElementsByClassName("pdfValues2");

  async function fillForm1(input,output,values1) {
    try{

    let values1 = objCreator3();

      // Fetch the PDF with form fields
    const formUrl = './assets/form2Pdf/aupairtax.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    // Get all fields in the PDF by their names

      //INICIA 1040NR
        //single--CONSTANTE
        form.getCheckBox('topmostSubform[0].Page1[0].c1_1[0]',).check();  
        //name
        form.getTextField('topmostSubform[0].Page1[0].f1_5[0]',).setText(`${values1.name}`); 
        //last Name
        form.getTextField('topmostSubform[0].Page1[0].f1_6[0]',).setText(`${values1.lastName}`); 
        //ssn
        form.getTextField('topmostSubform[0].Page1[0].f1_7[0]',).setText(`${values1.ssn}`); 
        // //homeAddress
        form.getTextField('topmostSubform[0].Page1[0].f1_8[0]',).setText(`${values1.homeAddress}`); 
        // //apt
        form.getTextField('topmostSubform[0].Page1[0].f1_9[0]',).setText(`${values1.apt}`); 
        // //city
        form.getTextField('topmostSubform[0].Page1[0].f1_10[0]',).setText(`${values1.city}`); 
        // //state
        form.getTextField('topmostSubform[0].Page1[0].f1_11[0]',).setText(`${values1.state}`); 
        // //postalCode
        form.getTextField('topmostSubform[0].Page1[0].f1_12[0]',).setText(`${values1.postalCode}`); 
        //virtual currency -- constante
        form.getCheckBox('topmostSubform[0].Page1[0].c1_3[1]',).check();

        //income -1b
        form.getTextField('topmostSubform[0].Page1[0].f1_29[0]',).setText(`${values1.totalI}`);
        //income -1z
        form.getTextField('topmostSubform[0].Page1[0].f1_39[0]',).setText(`${values1.totalI}`);
        //income -9
        form.getTextField('topmostSubform[0].Page1[0].f1_51[0]',).setText(`${values1.totalI}`);
        //BASE AJUSTADA (H=A-G)
        form.getTextField('topmostSubform[0].Page1[0].f1_56[0]',).setText(`${values1.totalI}`);
        //BASE AJUSTADA  (H=A-G)
        form.getTextField('topmostSubform[0].Page1[0].f1_62[0]',).setText(`${values1.totalI}`);

        //page2
        //TAX PART 2 (I=H*10%) -16
        form.getTextField('topmostSubform[0].Page2[0].f2_2[0]').setText(`${values1.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) -18
        form.getTextField('topmostSubform[0].Page2[0].f2_4[0]').setText(`${values1.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) -22
        form.getTextField('topmostSubform[0].Page2[0].f2_8[0]').setText(`${values1.taxPartTwo}`);
        //TOTAL TAX YEAR
        form.getTextField('topmostSubform[0].Page2[0].f2_13[0]').setText(`${values1.totalTaxYear}`);
        //TOTAL TAX YEAR
        form.getTextField('topmostSubform[0].Page2[0].f2_35[0]').setText(`${values1.totalTaxYear}`);
        //CONSTANTE
        form.getTextField('topmostSubform[0].Page2[0].f2_40[0]').setText('CHILDCARE PROVIDER');
        //PHONE
        form.getTextField('topmostSubform[0].Page2[0].f2_42[0]').setText(`${values1.phone}`); 
        //Email
        form.getTextField('topmostSubform[0].Page2[0].f2_43[0]').setText(`${values1.email}`); 
        
        // end 1040

        // Inicia OI

         //Full name
         form.getTextField('form1040-NR[0].Page1[0].f1_01[0]').setText(`${values1.name} ${values1.lastName}`);
         //ssn
         form.getTextField('form1040-NR[0].Page1[0].f1_02[0]').setText(`${values1.ssn}`);
         //Country Nationality
         form.getTextField('form1040-NR[0].Page1[0].f1_03[0]').setText(`${values1.country}`);
         //current resindence country
         form.getTextField('form1040-NR[0].Page1[0].f1_04[0]').setText('UNITED STATES OF AMERICA');
         // // app Greencard YES
         // form.getCheckBox('form1040-NR[0].Page1[0].c1_1[0]',).check();
         // app Greencard NO-- CONSTANTE
         form.getCheckBox('form1040-NR[0].Page1[0].c1_1[1]',).check();
         // Citizen NO -- CONSTANTE
         form.getCheckBox('form1040-NR[0].Page1[0].c1_2[1]',).check();
         //D2.greencard holder-NO -- CONSTANTE
         form.getCheckBox('form1040-NR[0].Page1[0].c1_3[1]',).check();
         //visa type -- CONSTANTE
         form.getTextField('form1040-NR[0].Page1[0].f1_05[0]').setText('J1');
 
          // CONDICIONAL STATUS
         let answerStatus = (`${values1.changeStatus}`);
         if( answerStatus == 0){
         //change status-- YES
         form.getCheckBox('form1040-NR[0].Page1[0].c1_4[0]').check();
         //Detail change STATUS
         form.getTextField('form1040-NR[0].Page1[0].f1_06[0]').setText(`${values1.detailChangeStatus}`);
     
         }else{
         console.log("NO");
          //change status --NO
          form.getCheckBox('form1040-NR[0].Page1[0].c1_4[1]').check();
         }
               
         //H.2020DAYS
         form.getTextField('form1040-NR[0].Page1[0].f1_24[0]').setText(`${values1.days2020}`);
         //H.2021DAYS
         form.getTextField('form1040-NR[0].Page1[0].f1_25[0]').setText(`${values1.days2021}`);
         //H.2022DAYS
         form.getTextField('form1040-NR[0].Page1[0].f1_26[0]').setText(`${values1.days2022}`);
 
          // CONDICIONAL STATUS
          let answerTaxes = (`${values1.taxes}`);
          if( answerTaxes == 0){
         //TAX PRIOR YEAR-- YES
         form.getCheckBox('form1040-NR[0].Page1[0].c1_6[0]').check();
     
          //Detail change STATUS
          form.getTextField('form1040-NR[0].Page1[0].f1_06[0]').setText(`${values1.detailChangeStatus}`);
         //I.LAST YEAR TAX FORM
         form.getTextField('form1040-NR[0].Page1[0].f1_27[0]').setText(`${values1.lastTaxForm}`);
      
          }else{
          console.log("NO");
         //TAX PRIOR YEAR-- NO
         form.getCheckBox('form1040-NR[0].Page1[0].c1_6[1]').check();
          }
         
         //J.TRUST-NO-- CONSTANTE
         form.getCheckBox('form1040-NR[0].Page1[0].c1_7[1]').check();
         //K.COMPENSATION NO-- CONSTANTE
         form.getCheckBox('form1040-NR[0].Page1[0].c1_9[1]').check();
         //TERMINA SCHEDULE OI


    // Serialize the PDFDocument to bytes (a Uint8Array)
    var name = $("#name").val()+"_"+ $("#lastName").val()+"_AuroTax_2022";
    const pdfBytes = await pdfDoc.save()
    const fileName = name;
    
    var ok = $("#name").val();
if (ok == ""){
  }
  else{
    download(pdfBytes,fileName, "application/pdf");
    swal("Descarga exitosa! revisa tu carpeta de descargas.","Gracias por utilizar los servicios de AUROTAX.COM. Recuerde realizar el envio de su formulario 1040NR y pago correspondiente! Para mayor informacion visite Aurotax.com, en la sección: tutoriales.", "success").then(value => {
        setTimeout(() => {location.reload(); }, 1000)
       });
    

}
    // Trigger the browser to download the PDF document
    }catch(err) {  
  }  
  }fillForm1('aupairtax.pdf','output.pdf');

  function objCreator3(){
    const formElements = Array.from(form3);

    let obj3 =  Object.fromEntries(
        formElements.map(element => [element.id, element.value])
    )
    return(obj3)
}
  