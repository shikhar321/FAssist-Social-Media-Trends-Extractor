(() => {
    
    console.log("Script Loaded");

    var viewImageBtn = document.getElementsByClassName("show-images-btn");;

    for (let i = 0; i < viewImageBtn.length; i += 1) {
        viewImageBtn[i].addEventListener("click", function() {
            
            if (document.getElementsByClassName("keyword-image-container mt-5")[i].style.display == "") {        
                document.getElementsByClassName("keyword-image-container mt-5")[i].style.display = "flex" ; 
                console.log(document.getElementsByClassName("keyword-image-container mt-5")[i].style.display) ;
            } else if(document.getElementsByClassName("keyword-image-container mt-5")[i].style.display == "flex"){    
                document.getElementsByClassName("keyword-image-container mt-5")[i].style.display = ""
                console.log(document.getElementsByClassName("keyword-image-container mt-5")[i].style.display) ;

            }

        });
    }

})(); 