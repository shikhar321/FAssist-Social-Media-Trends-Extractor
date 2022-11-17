module.exports.showHomePage = (request , response) => {
    if(request.isAuthenticated()){
        // If the user is already authenticated then this will automatically redirect back to 
        // profile page.
        // What actually this function do is that it checks the session cookie for the user id and decryptes it 
        // then find whether that user exits in Users DB.
        return response.redirect("/users/home-page") ; 
    } 

    response.render("home" , {
        layout: "layout.ejs" , 
        title : "Home Page | FAssist"
    }) ; 
}

module.exports.showSignInPage = (request , response) => {
    if(request.isAuthenticated()){
        // If the user is already authenticated then this will automatically redirect back to 
        // profile page.
        // What actually this function do is that it checks the session cookie for the user id and decryptes it 
        // then find whether that user exits in Users DB.
        return response.redirect("/users/home-page") ; 
    }
    response.render("sign-in" , {
        layout : "layout.ejs" , 
        title : "Sign-in | FAssist"
    })  ;
}

module.exports.showSignUpPage = (request , response) => {
    if(request.isAuthenticated()){
        // If the user is already authenticated then this will automatically redirect back to 
        // profile page.
        // What actually this function do is that it checks the session cookie for the user id and decryptes it 
        // then find whether that user exits in Users DB.
        return response.redirect("/users/home-page") ; 
    }
    response.render("sign-up" , {
        layout : "layout.ejs" , 
        title : "Sign-Up | FAssist"
    }) ;
}

module.exports.showOTPPage = (request , response) => {
    if(request.isAuthenticated()){
        // If the user is already authenticated then this will automatically redirect back to 
        // profile page.
        // What actually this function do is that it checks the session cookie for the user id and decryptes it 
        // then find whether that user exits in Users DB.
        return response.redirect("/users/home-page") ; 
    }
    response.render("otp-page" , {
        layout: "layout.ejs" , 
        title : "Verify Account | FAssist"
    })
}