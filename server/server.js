const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;
const cors = require('cors'); 
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const passport = require('passport');
const app = express();
const port = process.env.SERVER_PORT;
const usernameEnv = process.env.USERNAME;
const passwordEnv = process.env.PASSWORD;
const cookieParserSecret = process.env.COOKIE_PARSER_SECRET;




//Express carga el html de forma estatica al acceder a la carpeta public
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieParserSecret));
app.use(session({
    secret: cookieParserSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  if (req.session) {
    req.session.touch();
  }
  next();
});

//Cambiar username y password en prod
passport.use(new passportLocal((username, password, done) => {
    if(username === usernameEnv && password === passwordEnv){
        //cambiar id y name en prod
        return done(null, {id: 1, name: 'Administrator'})
    }
    done(null, false)
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    //el id y name tienen que ser los mismos de la funcion de arriba passportLocal
    done(null, {id: 1, name: 'Administrator'})
});

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.redirect('/login')
})


app.get('/admin', (request, response, next) => {
    if(request.isAuthenticated()){return next()};

    response.redirect('/login')
} ,(req, res) => {
    res.render(path.join(__dirname, "./views/admin.ejs"))
})

app.post('/admin', (req, res, next) => {
    req.logOut((err) => {
        if(err){return  next(err)};

        res.redirect('/login')
    })
})



app.get('/login', (req, res) => {
    res.render("login"); 
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
}))



//Endpoint para recibir los valores del formulario, recibe un objeto
app.post('/post', async (req, res) => {
    const {data} = req.body;
    
    //Devuelve un objeto con mensaje 'failed', en caso de error
    if(!data){return res.status(400).send({status: 'failed'})};
    
    //Envia el objeto para crear el pdf
    // hub(data);


    //Usa un import dinamico para poder usar ES modules con common JS, importa el encriptador
    const encrypter = await import('./encrypter.mjs');

    //Metodo para encriptar los valores del objeto recibido desde el front
    const encryptedData = await encrypter.encryptHub(data);

    //Devuelve el mismo objeto recibido del frontend en caso de exito
    res.status(200).send({
        status: data,
        status2: encryptedData
    })
})

//Endpoint para recibir los valores del formulario, recibe un objeto
app.post('/postAdmin', async (req, res) => {
    const {data} = req.body;
    console.log(data, 'postAdmin')
    
    //Devuelve un objeto con mensaje 'failed', en caso de error
    if(!data){return res.status(400).send({status: 'failed'})};
    
    //Envia el objeto para crear el pdf
    await hub(data);

    //Devuelve el mismo objeto recibido del frontend en caso de exito
    res.status(200).send({status: data})
})


// get decrypted data 
app.post('/decrypted', async (req, res) => {
    const {data} = req.body;
    console.log(data);

     //Usa un import dinamico para poder usar ES modules con common JS, importa el desencriptador
     const decryptor = await import('./decryptor.mjs');

     //Metodo para encriptar los valores del objeto recibido desde el front, en produccion el objeto tiene que ser recibido desde la base de datos
     const decryptedData = await decryptor.decryptHub(data);
 
    res.status(200).send({
        status2: decryptedData
    })

})


app.post("/api/orders", async (req, res) => {
    const paypal = await import('./paypal-api.mjs');

    try {
      const order = await paypal.createOrder();
      res.json(order);
    } catch (err) {
      res.status(500).send(err.message);
    }
});
  
app.post("/api/orders/:orderID/capture", async (req, res) => {
    const paypal = await import('./paypal-api.mjs');
    
    const { orderID } = req.params;
    try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//Funcion para crear el pdf
async function hub(data){
    //Usa un import dinamico para poder usar ES modules con common JS
    const generator = await import('./pdfGenerator.mjs');


    //Metodo para crear el pdf, importado de pdfGenerator
    //Parametro 1: Ruta del formulario base: server/assets
    //Parametro 2: Ruta del nuevo formulario: server/assets, se reescribe el archivo existente, crea uno nuevo de no haberlo
    //parametro 3: Objeto enviado desde el front
    // console.log(__dirname)
    const pdfFile = await generator.createPdf1040(path.join(__dirname, '../server/assets/1.Form1040NR.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_1.pdf`), data);
    const pdfFileOI = await generator.createPdfOI(path.join(__dirname, '../server/assets/2.Schedule_OI.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_2.pdf`), data);
    const pdfFileC = await generator.createPdfC1040(path.join(__dirname, '../server/assets/3.ScheduleC1040.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_3.pdf`), data);
    const pdfFileSE = await generator.createPdfSE(path.join(__dirname, '../server/assets/4.ScheduleSE.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_4.pdf`), data);
    const pdfFileAI1 = await generator.createPdfAI1(path.join(__dirname, '../server/assets/5.ScheduleAI1.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_5.pdf`), data);
    const pdfFileAT2 = await generator.createPdfAT2(path.join(__dirname, '../server/assets/6.ScheduleAT2.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_6.pdf`), data);

    //Creado el nuevo formulario, este metodo crea una copia del mismo en la carpeta public/assets, para facial accesso desde el front
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_1.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_1.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_2.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_2.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_3.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_3.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_4.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_4.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_5.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_5.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_6.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_6.pdf`), callback)
}



//Funcion para registrar el error en consolo al copiar el nuevo formulario, tambien imprime mensaje en caso de exito al copiar
function callback(err) {
    if(err){throw err};
    console.log('source.txt was copied to destination.txt');
}

//Asignacion del puerto
app.listen(port, () => console.log(`Server has started on port: ${port}`))