const { response } = require("express");
const OTP = require("../models/otpSchema");
const users = require("../models/userSchema");
const otpMailer = require("../mailer/OTPMailer") ; 
const dataFetcher = require("./datafetcher");


module.exports.createNewUser = (request, response) => {
    // First of checking the confirm password and passord should match if not then give notifiaction to user
    // via Noty 


    if (request.body.password != request.body.CPassword) {
        console.error("Password entered not same.");
        request.flash("error", "Password entered not same.")
        return response.redirect("back"); // and going back.
    }
    // Then finding the user via email input field so that we can check that the user 
    // already exists or not.
    users.findOne({ email: request.body.email }, function (error, user) {
        if (error) {
            //if error then give notification via Noty.
            console.log(`Something went wrong: ${error}`);
            request.flash("error", "Something went wrong.");
            return response.redirect("back"); // and going back.
        }
        if (user) {
            // If the user is found the user is already so give notification of this via 
            // Noty.
            console.error("Email Already in use!");
            request.flash("error", "Email already in use.");
            return response.redirect("/sign-in"); // and going to sign-in page.
        }
        var uid;
        if (!user) {
            // if user is not there then we are creating the one.


            var randomString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var genOTP = (Math.floor(Math.random() * 10000)) +
                randomString[(Math.floor(Math.random() * 100) % 52)] +
                randomString[(Math.floor(Math.random() * 100) % 52)] +
                randomString[(Math.floor(Math.random() * 100) % 52)] +
                randomString[(Math.floor(Math.random() * 100) % 52)];

            OTP.create({
                OTP: genOTP,
                email: request.body.email,
                name: request.body.name,
                password: request.body.password,
            }, function (error, OTPUser) {
                if (error) {
                    console.log("Something Went wrong !bnf!: " + error);
                    users.deleteOne({ email: request.body.email }, function (error) {
                        if (error) {
                            console.log("Something Went Wrong");
                        }
                    });
                    request.flash("error", "Something went wrong");
                    response.redirect("/sign-up");
                }

                otpMailer.otpMailSender(request.body.email , genOTP) ;
                return response.redirect("/verify-account"); // and then go to otp page.
            });
        }
    });
}

module.exports.checkOTP = async (request, response) => {
    var checkedOTP = await OTP.findOne({ OTP: request.body.OTP });

    if (checkedOTP) {
        users.create({
            email: checkedOTP.email,
            name: checkedOTP.name,
            password: checkedOTP.password,
        }, function (error, newUser) {
            if (error) {
                //if error then give notification via Noty.
                console.error(`Error in creating new User: ${error}`);
                request.flash("error", "Error in creating user");
                return response.redirect("back");
            }
            // if user is created successful then we give notication via noty for successful account 
            // creation. 
            console.log(`New User Created Succesfully : ${newUser}`);
        });
        request.flash("success", "Verification was Successful !!");
        OTP.deleteOne({ OTP: request.body.OTP }, function (error) {
            if (error) {
                console.log(`Something went wrong: ${error}`);
            }
        });
        return response.redirect("/sign-in");
    }
    else {
        request.flash("error", "OTP Entered is wrong !!");
        return response.redirect("/sign-up");
    }

}

module.exports.showHomePage = (request, response) => {

    response.render("main-home-page", {
        title: "Category Analysis | FAssist",
        layout: "main-home-page.ejs"
    });
}


module.exports.destroySession = function (request, resposne, next) {
    request.logout(function (err) {
        if (err) { return next(err); }
        request.flash("success", "Logged out Successfully!!!");
        return resposne.redirect("/");
    });
    // Passport exposes a logout() function on req (also aliased as logOut() ) 
    // that can be called from any route handler which needs to terminate a login session.

}

module.exports.createSessionForValidUserMainMethod = (request, response) => {
    request.flash("success", "Logged in Successfully!!!");
    return response.redirect("/users/home-page");
}