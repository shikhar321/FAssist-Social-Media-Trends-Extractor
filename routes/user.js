const express = require("express") ; 

const passport = require('passport');

const router = express.Router() ; 

const userController = require("../controller/userController") ;
const fashionOnFlip = require("../controller/fashion-on-flipkart")  ;
const electronicAppOnFlip = require("../controller/electronic-appliances-on-flipkart") ;
const topTweetsFashion = require("../controller/top-tweets-fashion") ; 
const topTweetsTech = require("../controller/top-tweets-tech") ; 

router.post("/sign-up" , userController.createNewUser) ; 
router.post("/otp-check" , userController.checkOTP) ; 

router.get("/home-page" , passport.checkAuthentication , userController.showHomePage) ; 

router.get("/get-flip-result-fashion/:search" , passport.checkAuthentication , fashionOnFlip.getMatchForFlipkart) ; 

router.get("/get-flip-result-electronic-devices/:search" , passport.checkAuthentication , electronicAppOnFlip.getMatchForFlipkart)

router.get("/log-out", userController.destroySession) ; 

router.use("/category-analysis" , require("./catAnalysis")) ;

router.use("/get-social-trends" , require("./social-trends") ) ; 

router.get("/get-top-tweets/fashion" , topTweetsFashion.findTopTweets) ; 
router.get("/get-top-tweets/tech" , topTweetsTech.findTopTweets) ; 

 

router.post("/sign-in" ,passport.authenticate(
    "local" ,
    {failureRedirect : '/sign-in'} , //incase of any error redirect to /sign-in page.
),userController.createSessionForValidUserMainMethod)

module.exports = router  ; 