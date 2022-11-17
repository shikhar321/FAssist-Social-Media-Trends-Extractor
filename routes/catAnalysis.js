const express = require("express") ; 

const passport = require("passport") ; 

const router = express.Router() ; 

const dataFetcherEA = require("../controller/datafetcher") ; 
const dataFetchcerClothing = require("../controller/data_fetcher") ; 

router.get("/electronic-appliances" , passport.checkAuthentication ,dataFetcherEA.getDataFormFlipkart) ; 

router.get("/smart-devices" , passport.checkAuthentication , dataFetcherEA.getDataFormFlipkart) ; 

router.get("/clothings" , passport.checkAuthentication , dataFetchcerClothing.getDataFormFlipkart) ; 


module.exports = router ; 