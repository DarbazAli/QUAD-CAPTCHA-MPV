const bodyParser = require('body-parser');
const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./Schema').Person;



const app = express();
console.clear();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/*==================================================== 
    CONNECT TO DB
=====================================================*/
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



// create the home url
app.get('/', (req, res) => {
    res.render('index', {title: 'QUAD CAPTCHA', message: "Hello There"})
})

app
    .route('/register')
    .post( (req, res) => {
        const {email, quad_captcha} = req.body;
        if ( quad_captcha ) {
            console.log('thankyou', email, quad_captcha)
        }
        res.redirect('/')
    })

app
    .route('/thank')
    .get((req, res) => {
        // const { check, email } = req.body;
        res.send(`Hello, it looks like you passed the cpatcha`)
    })