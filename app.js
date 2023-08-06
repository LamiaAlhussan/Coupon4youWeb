const express= require('express')
const app = express()
const bodyParser =require('body-parser')
//connect to db
const db = require('./config/database')

const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const passportSetup = require('./config/passport-setup')

// ejs template
app.set('view engine','ejs')

//bring body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//bring static


app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(express.static('uploads'))



app.use(session({
    secret: 'projectSummer',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))
app.use(flash())

// app.get('*', (req, res, next) => {
//   res.locals.admin = req.admin || null ;
//   next();
// });

// bring passport
app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req,res)=>{
    res.redirect('/coupon4you')
})

// bring home page for coupon 4 you

const coupons = require('./routes/event-routes')

app.use('/coupon4you',coupons)

app.listen(3000,()=>{
console.log('app in web')
})