import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';


export async function createPdf1040(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();

        //Usar ``
        //No '' 

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
        //Net Profit -8
        form.getTextField('topmostSubform[0].Page1[0].f1_50[0]',).setText(`${values.netProfit}`);
        //NetProfit -9
        form.getTextField('topmostSubform[0].Page1[0].f1_51[0]',).setText(`${values.netProfit}`);
        //DEDUCT. PART SELF EMP (SE FORM)-10a
        form.getTextField('topmostSubform[0].Page1[0].Line10_ReadOrder[0].f1_52[0]',).setText(`${values.deductionSelfEmp}`);
        //DEDUCT. PART SELF EMP (SE FORM)-10d
        form.getTextField('topmostSubform[0].Page1[0].f1_55[0]',).setText(`${values.deductionSelfEmp}`);
        //BASE AJUSTADA (H=A-G)
        form.getTextField('topmostSubform[0].Page1[0].f1_56[0]',).setText(`${values.baseAdjusted}`);
        //BASE AJUSTADA  (H=A-G)
        form.getTextField('topmostSubform[0].Page1[0].f1_62[0]',).setText(`${values.baseAdjusted}`);

        //page2
        //TAX PART 2 (I=H*10%) -16
        form.getTextField('topmostSubform[0].Page2[0].f2_2[0]').setText(`${values.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) -18
        form.getTextField('topmostSubform[0].Page2[0].f2_4[0]').setText(`${values.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) -22
        form.getTextField('topmostSubform[0].Page2[0].f2_8[0]').setText(`${values.taxPartTwo}`);
        //TAX PART 2 (I=H*10%) - 23b
        form.getTextField('topmostSubform[0].Page2[0].f2_10[0]').setText(`${values.totalTaxPartOne}`);
        //TAX PART 1 - 23d
        form.getTextField('topmostSubform[0].Page2[0].f2_12[0]').setText(`${values.totalTaxPartOne}`);
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

        console.log('PDF created');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}

export async function createPdfOI(input, output, values){
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

        console.log('PDF created');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}

export async function createPdfC1040(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();


    //INICIA SCHEDULE C

//FULL NAME
form.getTextField('topmostSubform[0].Page1[0].Pg1Header[0].f1_1[0]',).setText(`${values.name} ${values.lastName}`);
//SSN
form.getTextField('topmostSubform[0].Page1[0].f1_2[0]').setText(`${values.ssn}`);
//CONCEPTO SERVICIO- CONSTANTE
form.getTextField('topmostSubform[0].Page1[0].f1_3[0]').setText('FAMILY SERVICE');
//CODE SERVICIO-- CONSTANTE
form.getTextField('topmostSubform[0].Page1[0].BComb[0].f1_4[0]').setText('624100');

//CASH-- CONSTANTE--- validar no funciona el comando
form.getCheckBox('topmostSubform[0].Page1[0].c1_1[0]').check();

//PARTICIPATION IN THE OPERATION-- YES -- CONSTANTE
form.getCheckBox('topmostSubform[0].Page1[0].c1_2[0]').check();
//PAYMENTS W2- NO- CONSTATE
form.getCheckBox('topmostSubform[0].Page1[0].c1_4[1]').check();

//1.INCOME
form.getTextField('topmostSubform[0].Page1[0].f1_10[0]').setText(`${values.totalI}`);
//3.INCOME
form.getTextField('topmostSubform[0].Page1[0].f1_12[0]').setText(`${values.totalI}`);
//5.INCOME
form.getTextField('topmostSubform[0].Page1[0].f1_14[0]').setText(`${values.totalI}`);
//7.INCOME
form.getTextField('topmostSubform[0].Page1[0].f1_16[0]').setText(`${values.totalI}`);
//10.COMISSION FEES-TIPS
form.getTextField('topmostSubform[0].Page1[0].Lines8-17[0].f1_19[0]').setText(`${values.tips}`);
//15.INSURANCE (DIFFERENT TO HEALTH)
form.getTextField('topmostSubform[0].Page1[0].Lines8-17[0].f1_24[0]').setText(`${values.health}`);
// //PROFESIONAL SERVICE
form.getTextField('topmostSubform[0].Page1[0].Lines8-17[0].f1_27[0]').setText(`${values.car}`);
//22.SUPPLIES
form.getTextField('topmostSubform[0].Page1[0].Lines18-27[0].f1_33[0]').setText(`${values.supply}`);
//24.A TRAVEL
form.getTextField('topmostSubform[0].Page1[0].Lines18-27[0].f1_35[0]').setText(`${values.entertainment}`);
//24.B MEALS
form.getTextField('topmostSubform[0].Page1[0].Lines18-27[0].f1_36[0]').setText(`${values.food}`);
//27.A OTHER EXPENSES
form.getTextField('topmostSubform[0].Page1[0].Lines18-27[0].f1_39[0]').setText(`${values.otherExpenses}`);
//28. TOTAL EXPENSES
form.getTextField('topmostSubform[0].Page1[0].f1_41[0]').setText(`${values.totalE}`);
//29.PROFIT
form.getTextField('topmostSubform[0].Page1[0].f1_42[0]').setText(`${values.netProfit}`);
//31. NET PROFIT
form.getTextField('topmostSubform[0].Page1[0].f1_46[0]').setText(`${values.netProfit}`);

 // CONDICIONAL OTROS INGRESOS
 let valEducation = parseInt((`${values.education}`));
 let valUber = parseInt((`${values.transport}`));
 if( valEducation > 0 && valUber > 0){
//concept other expenses 1 -- constante
form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_15[0]').setText('EDUCATION AND PROFESSIONAL DEVELOPMENT');
//other expenses 1 $
form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_16[0]').setText(`${values.education}`);

//concept other expenses 2 -- constante
form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item2[0].f2_17[0]').setText('TRANSPORTATION EXPENSES');
//other expenses2 $
form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item2[0].f2_18[0]').setText(`${values.transport}`);

 }else if(valEducation > 0 && valUber <= 0){
    //concept other expenses 1 -- constante
form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_15[0]').setText('EDUCATION AND PROFESSIONAL DEVELOPMENT');
//other expenses 1 $
form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_16[0]').setText(`${values.education}`);

 } else if(valEducation <= 0 && valUber > 0){
    console.log(valUber);
    console.log(valEducation);
        //concept other expenses 1 -- constante
    form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_15[0]').setText('TRANSPORTATION EXPENSES');
    //other expenses 1 $
    form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_16[0]').setText(`${values.transport}`);
    } else{
            //vacios
            //concept other expenses 1 -- constante
            form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_15[0]').setText('');
            //other expenses 1 $
            form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item1[0].f2_16[0]').setText(``);
            
            //concept other expenses 2 -- constante
            form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item2[0].f2_17[0]').setText('');
            //other expenses2 $
            form.getTextField('topmostSubform[0].Page2[0].PartVTable[0].Item2[0].f2_18[0]').setText(``);
            }
        

//total other expenses
form.getTextField('topmostSubform[0].Page2[0].f2_33[0]').setText(`${values.otherExpenses}`);

//END FORM


        form.flatten();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log('PDF created');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}

export async function createPdfSE(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();

        //INICIA SCHEDULE SE

        //FULL NAME
        form.getTextField('topmostSubform[0].Page1[0].f1_01[0]').setText(`${values.name} ${values.lastName}`);

        //SSN
        form.getTextField('topmostSubform[0].Page1[0].f1_02[0]').setText(`${values.ssn}`);

        //2.NET PROFIT
        form.getTextField('topmostSubform[0].Page1[0].f1_05[0]').setText(`${values.netProfit}`);
        //3.NET PROFIT
        form.getTextField('topmostSubform[0].Page1[0].f1_06[0]').setText(`${values.netProfit}`);
        //4A. PROFIT ADJUSTED
        form.getTextField('topmostSubform[0].Page1[0].f1_07[0]').setText(`${values.profitAdjusted}`);
        //4C PROFIT ADJUSTED
        form.getTextField('topmostSubform[0].Page1[0].f1_09[0]').setText(`${values.profitAdjusted}`);
        //6 PROFIT ADJUSTED
        form.getTextField('topmostSubform[0].Page1[0].f1_12[0]').setText(`${values.profitAdjusted}`);
        //9. CONSTANTE 142.800
        form.getTextField('topmostSubform[0].Page1[0].f1_18[0]').setText('147,000');        
        //10. TAX 12.4%
        form.getTextField('topmostSubform[0].Page1[0].f1_19[0]').setText(`${values.taxOne}`);
        //11 TAX 2.9%
        form.getTextField('topmostSubform[0].Page1[0].f1_20[0]').setText(`${values.taxTwo}`);
        //12 TOTAL TAX PART ONE
        form.getTextField('topmostSubform[0].Page1[0].f1_21[0]').setText(`${values.totalTaxPartOne}`);
        //13 DEDUCTION SELF EMPOMENT TAX 50%
        form.getTextField('topmostSubform[0].Page1[0].f1_22[0]').setText(`${values.deductionSelfEmpTax}`);
        

// END FORM SE


        form.flatten();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log('PDF created');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}

export async function createPdfAI1(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();


        //INICIA SCHEDULE AI1- SCHEDULE 1

        //PAGE 1

        //fullName
        form.getTextField('form1[0].Page1[0].f1_01[0]').setText(`${values.name} ${values.lastName}`);
        // //ssn
        form.getTextField('form1[0].Page1[0].f1_02[0]').setText(`${values.ssn}`);
        // 3. NET PROFIT
        form.getTextField('form1[0].Page1[0].f1_06[0]').setText(`${values.netProfit}`);
        // 10. NET PROFIT
        form.getTextField('form1[0].Page1[0].f1_35[0]',).setText(`${values.netProfit}`);

        //PAGE 2

        // 15. DEDUCTIBLE PART SE TAX
        form.getTextField('form1[0].Page2[0].f2_05[0]').setText(`${values.deductionSelfEmpTax}`);
        // 26. DEDUCTIBLE PART SE TAX
        form.getTextField('form1[0].Page2[0].f2_31[0]').setText(`${values.deductionSelfEmpTax}`);

        //END SCHEDULE 1
        

// END FORM SE


        form.flatten();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log('PDF created');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}

export async function createPdfAT2(input, output, values){
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const form = pdfDoc.getForm();


        //INICIA SCHEDULE AT2- SCHEDULE 2

        //fullName
        form.getTextField('form1[0].Page1[0].f1_01[0]',).setText(`${values.name} ${values.lastName}`);
        //ssn
        form.getTextField('form1[0].Page1[0].f1_02[0]').setText(`${values.ssn}`);
        //4.SE TAX (part one)
        form.getTextField('form1[0].Page1[0].f1_06[0]').setText(`${values.totalTaxPartOne}`);
        //21.SE TAX (part one)
        form.getTextField('form1[0].Page2[0].f2_25[0]').setText(`${values.totalTaxPartOne}`);

        //END SCHEDULE 2
        
        form.flatten();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log('PDF created');

        return pdfBytes;

    }catch(err){
        console.log(err);  
        return(err);
    }  
}