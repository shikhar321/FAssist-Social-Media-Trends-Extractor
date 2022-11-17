const express = require("express") ; 

const passport = require("passport") ; 

const router = express.Router() ; 

const tweetAnalysisFashion = require("../controller/tweet-analysis-fashion") ; 
const tweetAnalysisSmartDevices = require("../controller/tweet-analysis-Electronic-Appliances") ; 


router.get("/fashion" , passport.checkAuthentication ,tweetAnalysisFashion.getfashiontweets) ; 
router.get("/electronic-appliances" , passport.checkAuthentication , tweetAnalysisSmartDevices.getSmartDevicetweets) ; 



module.exports = router ; 