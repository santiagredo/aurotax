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
const usernameEnv = process.env.ADMINISTRATOR_USERNAME;
const passwordEnv = process.env.ADMINISTRATOR_PASSWORD;
const cookieParserSecret = process.env.COOKIE_PARSER_SECRET;



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


passport.use(new passportLocal((username, password, done) => {
    if(username === usernameEnv && password === passwordEnv){
        return done(null, {id: 1, name: 'Administrator'})
    }
    done(null, false)
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    //id and name must be the same as function passportLocal above
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




app.post('/post', async (req, res) => {
    const {data} = req.body;

    if(!data){return res.status(400).send({status: 'failed'})};
        
    const encrypter = await import('./encrypter.mjs');
    
    const encryptedData = await encrypter.encryptHub(data);
    
    res.status(200).send({
        status: data,
        status2: encryptedData
    })
})



app.post('/postAdmin', async (req, res) => {
    const {data} = req.body;
        
    if(!data){return res.status(400).send({status: 'failed'})};
    
    await hub(data);

    res.status(200).send({status: data})
})



app.post('/decrypted', async (req, res) => {
    const {data} = req.body;
    console.log("Object received from paid form")
    console.log(data)

     const decryptor = await import('./decryptor.mjs');
     
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


//Function to generate PDFs
async function hub(data){
    const generator = await import('./pdfGenerator.mjs');


    //Method to generate a PDF file, import from pdfGenerator
    //Param #1: Base PDF route; server/assets
    //Param #2: New PDF route; server/assets
    //param #3: Object received from the front-end


    const pdfFile = await generator.createPdf1040(path.join(__dirname, '../server/assets/1.Form1040NR.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_1.pdf`), data);
    const pdfFileOI = await generator.createPdfOI(path.join(__dirname, '../server/assets/2.Schedule_OI.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_2.pdf`), data);
    const pdfFileC = await generator.createPdfC1040(path.join(__dirname, '../server/assets/3.ScheduleC1040.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_3.pdf`), data);
    const pdfFileSE = await generator.createPdfSE(path.join(__dirname, '../server/assets/4.ScheduleSE.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_4.pdf`), data);
    const pdfFileAI1 = await generator.createPdfAI1(path.join(__dirname, '../server/assets/5.ScheduleAI1.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_5.pdf`), data);
    const pdfFileAT2 = await generator.createPdfAT2(path.join(__dirname, '../server/assets/6.ScheduleAT2.pdf'),path.join(__dirname,`../server/assets/${data.name}_${data.lastName}_${data.email}_6.pdf`), data);

    //These functions move the files to public/assets for an easier retrieval
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_1.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_1.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_2.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_2.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_3.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_3.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_4.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_4.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_5.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_5.pdf`), callback)
    fs.rename(path.join(__dirname, `../server/assets/${data.name}_${data.lastName}_${data.email}_6.pdf`), path.join(__dirname, `../public/assets/form1Pdf/${data.name}_${data.lastName}_${data.email}_6.pdf`), callback)
}



//Shows success message if file is copied, or throws an error message instead
function callback(err) {
    if(err){throw err};
    console.log('source.txt was copied to destination.txt');
}

//Port assignment, 0.0.0.0 is used to change the server to IPv4, and avoid errors filling the forms
app.listen(port, '0.0.0.0', () => console.log(`Server has started on port: ${port}`))