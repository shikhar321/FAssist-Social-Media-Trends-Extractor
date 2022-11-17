const mongoose = require("mongoose") ; 

mongoose.connect("mongodb+srv://PuruBhargava:Blacky%401234@cloudconnect.vmvqour.mongodb.net/?retryWrites=true&w=majority") ;
 

const db = mongoose.connection ; 

db.on("error" , (error) => console.log(`Error in connecting to Database: ${error}`)) ; 
db.once("open" , () => console.log(`Successfully Conendcted to the Database.`)) ; 




