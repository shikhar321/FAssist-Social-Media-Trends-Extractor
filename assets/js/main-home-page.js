(() => {
    console.log("Script Loaded!!") ; 

    console.log(document.getElementById("electronic-appliances-form"));
    document.getElementById("electric-app-btn").addEventListener("click" , (event) => {
        document.getElementById("electronic-appliances-form").style.display= "block" ; 
        document.getElementById("smart-devices-form").style.display = "none" ; 
        document.getElementById("clothings-form").style.display = "none" ; 
    }) ;


    document.getElementById("smart-device-btn").addEventListener("click" , (event) => {
        document.getElementById("electronic-appliances-form").style.display = "none" ; 
        document.getElementById("smart-devices-form").style.display = "block" ; 
        document.getElementById("clothings-form").style.display = "none" ; 
    }) ;


    document.getElementById("clothings-btn").addEventListener("click" , (event) => { 
        document.getElementById("electronic-appliances-form").style.display = "none" ; 
        document.getElementById("smart-devices-form").style.display = "none" ; 
        document.getElementById("clothings-form").style.display = "block" ; 
    }) ;

})()

