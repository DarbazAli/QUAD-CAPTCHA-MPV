const bodyParser = require('body-parser');
const express = require('express')

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

// create the home url
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', message: "Hello There"})
})

app
    .route('/register')
    .post( (req, res) => {
        const {email, quad_captcha} = req.body;
        // console.log(email, quad)
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