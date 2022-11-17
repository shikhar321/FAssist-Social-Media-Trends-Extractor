const express = require("express") ; 

const port = 7777 ; 

const expressLayouts = require("express-ejs-layouts") ; 

const passport = require("passport") ; 

const passportLocal = require("./config/passport-local-stratergy") ; 

const cookieParser = require("cookie-parser") ; 

var bodyParser = require('body-parser') ; 

const flash = require("connect-flash") ;

const middleware = require("./config/middleware") ; 

const session = require("express-session") ; 

const MongoStore = require("connect-mongo") ; 

const db = require("./config/mongoose") ; 

const path = require("path") ; 

const app = express() ; 

app.use(expressLayouts) ; 

app.set("layout extractStyles" , true) ; 

app.set("layout extractStyles" , true) ; 

app.set("view engine" , "ejs"); 

app.set("views" , path.join(__dirname , "views") ) ; 

app.use(cookieParser()) ; 

app.use(express.static(path.join(__dirname , "assets"))) ; 

app.use(express.urlencoded()) ; 


app.use(session({
    name : "CloudConnect" , 
    resave : false , 
    secret : "This is Serious" , 
    saveUninitialized : false , 
    cookie : {
        maxAge : (1000 * 120 * 60 ) 
    },
    store: MongoStore.create({
                 mongoUrl: "mongodb+srv://PuruBhargava:Blacky%401234@cloudconnect.vmvqour.mongodb.net/?retryWrites=true&w=majority"
        })
})) ; 


//  these are neccessary middleware for passport.
app.use(passport.initialize()) ; 
app.use(passport.session()) ; 

// to set the user making the request to set in the response.locals
app.use(passport.setAuthenticatedUser) ; 

app.use(flash()); 

app.use(middleware.setFlash) ; 

app.use("/" , require("./routes/index")) ; 

app.listen(process.env.PORT || port , (error) => {
    return error ? console.log(`Something Went Wrong:  ${error}`)
    : console.log(`Server is up and running on the port: ${port}`) ; 
}) ; 