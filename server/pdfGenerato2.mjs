import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';


export async function createPdf10402(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();


        //name
        // form.getTextField('form1040-NR[0].Page1[0].f1_01[0]').setText(`${values.name} ${values.lastName}`);

        //INICIA 1040NR
        //single--CONSTANTE
        form.getCheckBox('topmostSubform[0].Page1[0].c1_1[0]',).check();  
        //name
        form.getTextField('topmostSubform[0].Page1[0].f1_5[0]',).setText(`${values.name}`); 
        //last Name
        form.getTextField('topmostSubform[0].Page1[0].f1_6[0]',).setText(`${values.lastName}`); 
        //ssn
        form.getTextField('topmostSubform[0].Page1[0].f1_7[0]',).setText(`${values.ssn}`); 
        // //homeAddress
        form.getTextField('topmostSubform[0].Page1[0].f1_8[0]',).setText(`${values.homeAddress}`); 
        // //apt
        form.getTextField('topmostSubform[0].Page1[0].f1_9[0]',).setText(`${values.apt}`); 
        // //city
        form.getTextField('topmostSubform[0].Page1[0].f1_10[0]',).setText(`${values.city}`); 
        // //state
        form.getTextField('topmostSubform[0].Page1[0].f1_11[0]',).setText(`${values.state}`); 
        // //postalCode
        form.getTextField('topmostSubform[0].Page1[0].f1_12[0]',).setText(`${values.postalCode}`); 
        //virtual currency -- constante
        form.getCheckBox('topmostSubform[0].Page1[0].c1_3[1]',).check();

        //income -1b
        form.getTextField('topmostSubform[0].Page1[0].f1_29[0]',).setText(`${values.totalI}`);
        //income -1z
        form.getTextField('topmostSubform[0].Page1[0].f1_39[0]',).setText(`${values.totalI}`);
        //income -9
        form.getTextField('topmostSubform[0].Page1[0].f1_51[0]',).setText(`${values.totalI}`);
        //BASE AJUSTADA (H=A-G)
        form.getTextField('topmostSubform[0].Page1[0].f1_56[0]',).setText(`${values.totalI}`);
        //BASE AJUSTADA  (H=A-G)
        form.getTextField('topmostSubform[0].Page1[0].f1_62[0]',).setText(`${values.totalI}`);

        //page2
        //TAX PART 2 (I=H*10%) -16
        form.getTextField('topmostSubform[0].Page2[0].f2_2[0]').setText(`${values.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) -18
        form.getTextField('topmostSubform[0].Page2[0].f2_4[0]').setText(`${values.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) -22
        form.getTextField('topmostSubform[0].Page2[0].f2_8[0]').setText(`${values.taxPartTwo}`);
        //TOTAL TAX YEAR
        form.getTextField('topmostSubform[0].Page2[0].f2_13[0]').setText(`${values.totalTaxYear}`);
        //TOTAL TAX YEAR
        form.getTextField('topmostSubform[0].Page2[0].f2_35[0]').setText(`${values.totalTaxYear}`);
        //CONSTANTE
        form.getTextField('topmostSubform[0].Page2[0].f2_40[0]').setText('CHILDCARE PROVIDER');
        //PHONE
        form.getTextField('topmostSubform[0].Page2[0].f2_42[0]').setText(`${values.phone}`); 
        //Email
        form.getTextField('topmostSubform[0].Page2[0].f2_43[0]').setText(`${values.email}`); 
        

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log('PDF1 created Modelo 2');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}

export async function createPdfOI2(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();


        //Full name
        form.getTextField('form1040-NR[0].Page1[0].f1_01[0]').setText(`${values.name} ${values.lastName}`);
        //ssn
        form.getTextField('form1040-NR[0].Page1[0].f1_02[0]').setText(`${values.ssn}`);
        //Country Nationality
        form.getTextField('form1040-NR[0].Page1[0].f1_03[0]').setText(`${values.country}`);
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
        let answerStatus = (`${values.changeStatus}`);
        if( answerStatus == 0){
        //change status-- YES
        form.getCheckBox('form1040-NR[0].Page1[0].c1_4[0]').check();
        //Detail change STATUS
        form.getTextField('form1040-NR[0].Page1[0].f1_06[0]').setText(`${values.detailChangeStatus}`);
    
        }else{
        console.log("NO");
         //change status --NO
         form.getCheckBox('form1040-NR[0].Page1[0].c1_4[1]').check();
        }
              
        //H.2020DAYS
        form.getTextField('form1040-NR[0].Page1[0].f1_24[0]').setText(`${values.days2020}`);
        //H.2021DAYS
        form.getTextField('form1040-NR[0].Page1[0].f1_25[0]').setText(`${values.days2021}`);
        //H.2022DAYS
        form.getTextField('form1040-NR[0].Page1[0].f1_26[0]').setText(`${values.days2022}`);

         // CONDICIONAL STATUS
         let answerTaxes = (`${values.taxes}`);
         if( answerTaxes == 0){
        //TAX PRIOR YEAR-- YES
        form.getCheckBox('form1040-NR[0].Page1[0].c1_6[0]').check();
    
         //Detail change STATUS
         form.getTextField('form1040-NR[0].Page1[0].f1_06[0]').setText(`${values.detailChangeStatus}`);
        //I.LAST YEAR TAX FORM
        form.getTextField('form1040-NR[0].Page1[0].f1_27[0]').setText(`${values.lastTaxForm}`);
     
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

        form.flatten();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log('PDF2 created Modelo2');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}
