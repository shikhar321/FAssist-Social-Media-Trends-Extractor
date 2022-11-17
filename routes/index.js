const express = require("express") ; 

const router = express.Router() ; 

const homeController = require("../controller/homeController") ; 


router.get("/" , homeController.showHomePage) ; 

router.get("/sign-in" , homeController.showSignInPage) ;

router.get("/sign-up" , homeController.showSignUpPage)  ;

router.get("/verify-account" , homeController.showOTPPage) ; 

router.use("/users" , require("./user")) ; 

module.exports = router ; 